import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './job.scss';
import pinImg from '../../images/pin.png';
import leftArrowImg from '../../images/left-arrow.png';
import { formatDate } from '../../utils';

const Job = (props) => {
  const location = useLocation();

  const [job, setJob] = useState(null)
  const [isJobApplied, setIsJobApplied] = useState(null);
  
  const history = useHistory();

  // Set current job in state.
  // Manage to persist data on browser back button.
  useEffect(() => {
    console.log('location', location);
    const currentJob = location.state.job;
    setJob(currentJob);
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    setIsJobApplied(appliedJobs.indexOf(currentJob?.Title) > -1);

    history.listen((loc, action) => {
      if (action === 'POP' && loc.pathname === '/') {
        history.replace(loc.pathname, { jobs: location.state.jobs, jobTitle: location.state.jobTitle });
      }
    })
  }, [location, history]);

  //Implement apply job on clicking Apply button.
  //Applied jobs are stored in local storage.
  const applyForJob = () => {
    let appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    if (appliedJobs.indexOf(job?.Title) === -1) {
      appliedJobs.push(job?.Title);
      localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    }
    setIsJobApplied(true);
  }

  const goToBack = () => {
    history.goBack();
  }

  return (
    <div className='job-detail'>
      <div>
        <img src={leftArrowImg} alt='left arrow' onClick={goToBack} />
      </div>
      {isJobApplied ? <span className='applied'>Applied</span> :<button className='apply-btn apply-top-btn' onClick={applyForJob}>Apply</button> }
      <div><h2>{job?.Title}</h2></div>
      <div>{job?.Company}</div>
      <div><img src={pinImg} alt='pin' width='12' height='12' /> {job?.Location}</div>
      <div>{formatDate(job?.Published)}</div>
      <div className='description' dangerouslySetInnerHTML={{ __html: job?.Description }} />
      {!isJobApplied && <button className='apply-btn' onClick={applyForJob}>Apply</button>}
    </div>
   )
}

export default Job;