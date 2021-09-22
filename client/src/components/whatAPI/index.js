import React from 'react';
import PropTypes from 'prop-types';

const WhatAPI = ({ toggleMockedData, config }) => {
  // eslint-disable-next-line
  console.log(config.apiDetails);
  return (
    <div className='absolute bottom-8 text-center left-1/2 w-72 -ml-36'>
      <button className='text-xs mb-2' onClick={() => toggleMockedData()}>
        Show <span className='underline'>mocked</span> data
      </button>
      <div className='bg-yellow-100 px-5 py-2 text-xs rounded-2xl border border-yellow-300 text-yellow-700 shadow-xl'>
        What APIs are being used on this page?
      </div>
    </div>
  );
};
WhatAPI.propTypes = {
  toggleMockedData: PropTypes.func.isRequired,
  config: PropTypes.shape({
    apiDetails: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
  }),
};

export default WhatAPI;
