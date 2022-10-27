import React from 'react';
import { Switch } from '@headlessui/react';

type WhatApiType = {
  toggleMockedData: () => void,
  toggleApiData: () => void,
  apiDataEnabled: boolean,
  mockedDataEnabled: boolean,

};
function WhatAPI(params: WhatApiType) {
  const {
    apiDataEnabled, toggleApiData, toggleMockedData, mockedDataEnabled,
  } = params;
  return (
    <div className="fixed bottom-0 text-center left-1/2 -ml-56 mb-2">
      <div className="bg-yellow-100 pl-4 pr-2 py-2 text-xs rounded-3xl border border-yellow-300 text-yellow-700 shadow-xl flex items-center">
        <Switch.Group>
          <div className="flex items-center ml-4">
            <Switch.Label className="text-xs mr-2">
              What APIs are being used on this page?
            </Switch.Label>
            <Switch
              checked={apiDataEnabled}
              onChange={toggleApiData}
              className={`${
                apiDataEnabled ? 'bg-green-400 ' : 'bg-gray-200'
              } relative inline-flex items-center h-6 rounded-full w-11 txt-xs`}
              data-cy="showApiData"
            >
              <span className="sr-only">Show api data</span>
              <span
                className={`${
                  apiDataEnabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
          </div>
        </Switch.Group>

        <Switch.Group>
          <div className="flex items-center ml-4">
            <Switch.Label className="text-xs mr-2">
              Show mocked data
            </Switch.Label>
            <Switch
              data-cy="showMockedData"
              checked={mockedDataEnabled}
              onChange={toggleMockedData}
              className={`${
                mockedDataEnabled ? 'bg-green-400 ' : 'bg-gray-200'
              } relative inline-flex items-center h-6 rounded-full w-11 txt-xs`}
            >
              <span className="sr-only">Show mocked data</span>
              <span
                className={`${
                  mockedDataEnabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
          </div>
        </Switch.Group>
      </div>
    </div>
  );
}

export default WhatAPI;
