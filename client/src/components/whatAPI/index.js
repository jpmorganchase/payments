import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@headlessui/react';

// eslint-disable-next-line
const WhatAPI = ({ toggleMockedData, mockedDataEnabled, config }) => {
  return (
    <div className='absolute bottom-8 text-center left-1/2 w-72 -ml-36'>
      <Switch.Group>
        <div className='flex items-center mb-2'>
          <Switch.Label className='text-xs mr-4'>Show mocked data</Switch.Label>
          <Switch
            checked={mockedDataEnabled}
            onChange={toggleMockedData}
            className={`${
              mockedDataEnabled
                ? 'bg-gradient-to-r from-pink-500 to-red-500 '
                : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11 txt-xs`}
          >
            <span className='sr-only'>Show mocked data</span>
            <span
              className={`${
                mockedDataEnabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        </div>
      </Switch.Group>
      <div className='bg-yellow-100 px-5 py-2 text-xs rounded-2xl border border-yellow-300 text-yellow-700 shadow-xl'>
        What APIs are being used on this page?
      </div>
    </div>
  );
};
WhatAPI.propTypes = {
  toggleMockedData: PropTypes.func.isRequired,
  mockedDataEnabled: PropTypes.bool.isRequired,
  config: PropTypes.shape({
    apiDetails: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
  }),
};

export default WhatAPI;
