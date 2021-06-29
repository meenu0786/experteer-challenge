import React from 'react';
import './home.scss';

const ListJobs = (props) => {
  return (
    <div>
      { props.searchData.map((job, index) => {
        return <div className='job-card' key={index}>
          <h4>{job.Title}</h4>
          <div>{job.Company}</div>
          <div className='description' dangerouslySetInnerHTML={{ __html: job.Description }} />
          <div>{job.Location}</div>
        </div>
      }) }
    </div>
  )
}

export default ListJobs;