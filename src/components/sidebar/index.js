import React from 'react';

const Sidebar = () => {
  return (
    <nav className='w-64 flex-shrink-0'>
      <div className='flex-auto bg-gray-200 h-full'>
        <div className='flex flex-col overflow-y-auto h-full'>
          <ul className='relative m-0 p-0 list-none h-full'>
            <li className='text-2xl p-4 w-full flex relative justify-start'>
              Unicorn Finance
            </li>
            <li className='px-4 w-full flex relative'>
              <div className='flex-auto my-1'>
                <span className='text-gray-400 text-xs uppercase font-medium'>
                  General
                </span>
              </div>
            </li>

            <li className='text-gray-900 flex relative px-2 mx-2 rounded-lg hover:bg-gray-300 cursor-pointer'>
              <div className='mr-4 my-auto'>
                <span className='material-icons align-middle block'>home</span>
              </div>
              <div className='flex-auto my-1'>
                <span>Home</span>
              </div>
            </li>

            <li className='text-gray-900 flex relative px-2 mx-2 rounded-lg hover:bg-gray-300 cursor-pointer'>
              <div className='mr-4 my-auto'>
                <span className='material-icons align-middle block'>
                  credit_card
                </span>
              </div>
              <div className='flex-auto my-1'>
                <span>Payments</span>
              </div>
            </li>
            <li className='px-4 w-full flex relative'>
              <div className='flex-auto my-1'>
                <span className='text-gray-400 text-xs uppercase font-medium'>
                  Health
                </span>
              </div>
            </li>

            <li className='text-indigo-600 flex relative px-2 mx-2 bg-gray-300 rounded-lg hover:bg-gray-300 cursor-pointer'>
              <div className='mr-4 my-auto'>
                <span className='material-icons align-middle block'>
                  support
                </span>
              </div>
              <div className='flex-auto my-1'>
                <span>API Status</span>
              </div>
            </li>
          </ul>
          <div className='flex end mb-2'>
            <ul className='w-full'>
              <li className='text-gray-900 flex relative px-2 mx-2 rounded-lg hover:bg-gray-300 cursor-pointer'>
                <div className='mr-4 my-auto'>
                  <span className='material-icons align-middle block'>
                    help_outline
                  </span>
                </div>
                <div className='flex-auto my-1'>
                  <span>Help</span>
                </div>
              </li>

              <li className='text-gray-900 flex relative px-2 mx-2 rounded-lg hover:bg-gray-300 cursor-pointer'>
                <div className='mr-4 my-auto'>
                  <span className='material-icons align-middle block'>
                    logout
                  </span>
                </div>
                <div className='flex-auto my-1'>
                  <span>Logout</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
