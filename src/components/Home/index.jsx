import React, { useState } from 'react';
import ListJobs from './ListJobs';
import './home.scss';
import Loader from "../Shared/Loader";
import { getRequest, postRequest } from '../../api';

const Home = () => {
  const initialValues = {
    location: "Munich",
    jobTitle: "",
  };

  const [values, setValues] = useState(initialValues);
  const [searchData, setSearchData] = useState([]);
  const [poolTimer, setPoolTimer] = useState(1);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  let timerCount = 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSearch = async () => {
    try {
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
          break;
        default:
          console.log('default case');
      }
    } catch(err) {

    
      }
  }

  const checkResultStatus = async (uuid) => {
    try {
      let timer;
      const resultStatus = await getRequest(`/status/${uuid}`); //await axios.get(`http://localhost:8080/status/${uuid}`);
      console.log('poolTimer', poolTimer);
      console.log(timerCount);
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

    }
  }
  
  const fetchResult = async (uuid, timer) => {
    try {
      const result = await getRequest(`/result/${uuid}`); //await axios.get(`http://localhost:8080/result/${uuid}`);
      switch (result.status) {
        case 200:
          setSearchData(result.data);
          clearTimeout(timer);
          setIsLoaderVisible(false);
          break;
        default:
          console.log('default case'); 
      }
    } catch(err) {

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
      { isLoaderVisible && <Loader text='Your results will appear here...' />}
      { searchData.length > 0 && <ListJobs searchData={searchData} />}
    </div>
  )
}

export default Home;