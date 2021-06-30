import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './job.scss';

const Job = (props) => {
  const location = useLocation();

  const [job, setJob] = useState(null)
  const [isJobApplied, setIsJobApplied] = useState(null);
  
  useEffect(() => {
    const currentJob = location.state.state;
    setJob(currentJob);
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    setIsJobApplied(appliedJobs.indexOf(currentJob?.Title) > -1);
  }, [location]);

  const applyForJob = () => {
    let appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    if (appliedJobs.indexOf(job?.Title) === -1) {
      appliedJobs.push(job?.Title);
      localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    }
    setIsJobApplied(true);
  }

  return (
    <div className='job-detail'>
      {isJobApplied ? <span className='applied'>Applied</span> :<button className='apply-top-btn' onClick={applyForJob}>Apply</button> }
      <div>{job?.Title}</div>
      <div>{job?.Company}</div>
      <div>{job?.Location}</div>
      <div>{job?.Published}</div>
      <div className='description' dangerouslySetInnerHTML={{ __html: job?.Description }} />
      {!isJobApplied && <button className='apply-btn' onClick={applyForJob}>Apply</button>}
    </div>
   )
}

export default Job;