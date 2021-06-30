import React from 'react';
import './home.scss';
import { useHistory } from "react-router-dom";
import pinImg from '../../images/pin.png';

const ListJobs = (props) => {
  const history = useHistory();

  const navigateToJob = (job) => {
    console.log('push history')
    history.push(`jobs/${job.Title.replaceAll(' ', '-')}`, { state: job });
  }

  return (
    <div>
      { props.searchData.map((job, index) => {
        return (
        <div className='job-card' key={index} onClick={() => navigateToJob(job)}>
          <h4>{job.Title}</h4>
          <div>{job.Company}</div>
          <div className='description' dangerouslySetInnerHTML={{ __html: job.Description }} />
          <div><img src={pinImg} alt='pin' width='12' height='12' /> {job.Location}</div>
          <div>{job.Published}</div>
        </div>
      )})}
    </div>
  )
}

export default ListJobs;