import React, { useState } from 'react';
import axios from 'axios';
import ListJobs from './ListJobs';
import './home.scss';

const Home = () => {
  const initialValues = {
    location: "",
    jobTitle: "",
  };

  const [values, setValues] = useState(initialValues);
  const [searchData, setSearchData] = useState([]);
  const [poolTimer, setPoolTimer] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSearch = async () => {
    const response = await axios.post(`http://localhost:8080/search?query=${values.jobTitle}`);
    switch (response.status) {
      case 201:
        checkResultStatus(response.data);
        break;
      case 200:
        setSearchData(response.data);
        break;
      default:
        console.log('default case');
    }
  }

  const checkResultStatus = async (uuid) => {
    const resultStatus = await axios.get(`http://localhost:8080/status/${uuid}`);
    console.log(resultStatus);
    switch (resultStatus.status) {
      case 200:
        fetchResult(uuid);
        clearInterval(poolTimer);
        break;
      case 202:
        const timer = setTimeout(checkResultStatus, 10000, uuid)
          setPoolTimer(timer);
        break;
      default:
        clearInterval(poolTimer);
    }
  }
  
  const fetchResult = async (uuid) => {
    const result = await axios.get(`http://localhost:8080/result/${uuid}`);

    switch (result.status) {
      case 200:
        setSearchData(result.data);
        break;
      default:
        console.log('default case'); 
    }
  }

  return(
    <div>
      <h1 className="main-head">Welcome to DevjJobs</h1>
      <div className='main-form'>
        <input type='text' value={values.location} name="location" onChange={handleInputChange} />
        <input type='text' value={values.jobTitle} name="jobTitle" onChange={handleInputChange} />
        <button type="submit" onClick={handleSearch}> Search </button>
      </div>
      { searchData.length > 0 && <ListJobs searchData={searchData} />}
    </div>
  )
}

export default Home;