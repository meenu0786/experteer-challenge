import React, { useState, useEffect } from 'react';
import ListJobs from './ListJobs';
import './home.scss';
import Loader from "../Shared/Loader";
import { getRequest, postRequest } from '../../api';
import { useLocation, useHistory } from 'react-router-dom';

const Home = () => {
  const initialValues = {
    location: "Munich",
    jobTitle: "",
  };

  const [values, setValues] = useState(initialValues);
  const [searchData, setSearchData] = useState([]);
  const [poolTimer, setPoolTimer] = useState(1);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [loaderText, setLoaderText] = useState(null);

  const location = useLocation();
  const history = useHistory();

  let timerCount = 0;
  
  useEffect(() => {
    // Persist data on browser back button or back arrow from job page.
    if (location.state) {
      setSearchData(location.state.jobs);
      const val = { location: 'Munich', jobTitle: location.state.jobTitle }
      setValues(val);
      history.replace();
    }
  }, [location, history]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Search query on jobsearcher api.
  // Perform different actions based on status code.
  const handleSearch = async () => {
    try {
      setSearchData([]);
      setLoaderText('Request is being processed and results will be available shortly.');
      setIsLoaderVisible(true);
      const response = await postRequest(`/search?query=${values.jobTitle}`);
      switch (response.status) {
        case 201:
          checkResultStatus(response.data);
          break;
        case 200:
          setSearchData(response.data);
          clearTimeout(poolTimer);
          setIsLoaderVisible(false);
          setLoaderText(null);
          break;
        default:
          console.log('default case');
      }
    } catch(err) {
      console.log(err.message);
    }
  }

  // Check status of result (has been fetched or not) from jobsearcher api.
  // If result is not fetched then perform poolinf to check result status.
  const checkResultStatus = async (uuid) => {
    try {
      let timer;
      const resultStatus = await getRequest(`/status/${uuid}`);
      setLoaderText('Your results will appear here...');
      if (poolTimer > 7) clearTimeout(poolTimer);
      switch (resultStatus.status) {
        case 200:
          fetchResult(uuid, timer);
          break;
        case 202:
          timer = setTimeout(checkResultStatus, 10000, uuid);
          setPoolTimer(timer);
          timerCount += 1;
          if (timerCount > 6) { 
            clearTimeout(timer);
            timerCount = 0;
          }
          break;
        default:
          clearTimeout(timer);
      }
    } catch(err) {
      console.log(err.message);
    }
  }
  
  // Fetch search result from jobsearcher api and set state data based on that.
  const fetchResult = async (uuid, timer) => {
    try {
      const result = await getRequest(`/result/${uuid}`); //await axios.get(`http://localhost:8080/result/${uuid}`);
      switch (result.status) {
        case 200:
          setSearchData(result.data);
          clearTimeout(timer);
          setIsLoaderVisible(false);
          setLoaderText(null);
          break;
        default:
          console.log('default case'); 
      }
    } catch(err) {
      console.log(err.message);
    }
  }

  return(
    <div>
      <h1 className="main-head">Welcome to DevJobs</h1>
      <div className='main-form'>
        <input type='text' placeholder='Location' value={values.location} name="location" onChange={handleInputChange} />
        <input type='text' placeholder='Find your dream job now' value={values.jobTitle} name="jobTitle" onChange={handleInputChange} />
        <button type="submit" onClick={handleSearch}> Search </button>
      </div>
      { isLoaderVisible && <Loader text={loaderText} />}
      { searchData.length > 0 && <ListJobs searchData={searchData} jobTitle={values.jobTitle} />}
    </div>
  )
}

export default Home;