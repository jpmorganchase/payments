/* eslint-disable no-console */
import React, {useEffect, useState} from 'react';
import SampleComponent from './components/sample1';
import StatusChecker from './api/statusChecker';
import Sidebar from './components/sidebar';

const  App = ()  => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiStatus, setApiStatus] = useState([]);

  useEffect(() => {
    StatusChecker.fetchApiStatus()
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setApiStatus(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  console.log(error);
  console.log(isLoaded);
  console.log(apiStatus);

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <header className='left-auto top-0 right-0'>
          <div className='h-12 px-6 flex relative items-center justify-end'>
            <button className='flex mx-4 hover:text-gray-200 focus:outline-none'>
              <span className='material-icons'>notifications</span>
            </button>

            <button className='relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none'>
              <img
                className='h-full w-full object-cover'
                src='https://www.w3schools.com/howto/img_avatar.png'
                alt='Avatar'
              />
            </button>
          </div>
        </header>

        <div className='flex flex-shrink-0 flex-col'>
          <div className='flex relative items-center px-8 h-12'>
            <span className='text-2xl tracking-wide'>API Status</span>
          </div>
        </div>
        <div className='flex w-full p-8'>
          <div className='flex flex-col w-full'>
            <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                <div className='overflow-hidden border-b border-gray-200 '>
                  <table className='min-w-full '>
                    <thead className='bg-gray-100'>
                      <tr>
                        <th
                          scope='col'
                          className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Description
                        </th>
                        <th
                          scope='col'
                          className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          API
                        </th>
                        <th
                          scope='col'
                          className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Status
                        </th>
                        <th
                          scope='col'
                          className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Start Date
                        </th>
                        <th
                          scope='col'
                          className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          End Date
                        </th>
                        <th scope='col' className='relative px-4 py-2'>
                          <span className='material-icons'>
                            notifications_active
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      <tr>
                        <td className='px-4 py-2 whitespace-nowrap'>
                          Description here
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap'>
                          API Name here
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap'>
                          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                            COMPLETE
                          </span>
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                          Mar 4, 21 - 09:30AM
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                          Mar 4, 21 - 17:30PM
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap text-right text-sm font-medium'>
                          <div className='text-indigo-600 hover:text-indigo-900'>
                            Set reminder
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SampleComponent />
      </div>
    </div>
  );
}

export default App;
