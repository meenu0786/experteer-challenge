import React from 'react';
import './home.scss';
import { useHistory } from "react-router-dom";

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
          <div>{job.Location}</div>
        </div>
      )})}
    </div>
  )
}

export default ListJobs;