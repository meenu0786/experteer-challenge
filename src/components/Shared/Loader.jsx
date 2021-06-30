import React from 'react';
import './loader.scss';
import loaderImg from '../../images/loader.gif';

const Loader = (props) => {
  return (
    <div className="loader">
      <h2>{props.text}</h2>
      <img src={loaderImg} alt='loader' />
    </div>
  )
}

export default Loader;