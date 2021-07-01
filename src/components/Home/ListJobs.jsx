import React from 'react';
import './home.scss';
import { useHistory } from "react-router-dom";
import pinImg from '../../images/pin.png';
import { formatDate } from '../../utils';

const ListJobs = (props) => {
  const history = useHistory();
  const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];

  const navigateToJob = (job) => {
    history.push(`jobs/${job.Title.replaceAll(' ', '-')}`, 
      { job: job, jobs: props.searchData, jobTitle: props.jobTitle });
  }

  return (
    <div>
      { props.searchData.map((job, index) => {
        return (
        <div className='job-card' key={index} onClick={() => navigateToJob(job)}>
          <h4>{job.Title} {appliedJobs.indexOf(job.Title) > -1 && <span className='applied'>Applied</span>}</h4>
          <div>{job.Company}</div>
          <div className='description' dangerouslySetInnerHTML={{ __html: job.Description }} />
          <div><img src={pinImg} alt='pin' width='12' height='12' /> {job.Location}</div>
          <div>{formatDate(job.Published)}</div>
        </div>
      )})}
    </div>
  )
}

export default ListJobs;