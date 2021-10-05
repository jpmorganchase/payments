import React from 'react';
import ufLogoLarge from '../../images/uf-logo.svg';
import avatar from '../../images/avatar.png';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='flex lg:flex-none w-full lg:w-44 border-b lg:border-r border-gray-200'>
    <nav className='px-8 py-4 lg:p-8 lg:pr-0 flex flex-row lg:flex-col justify-between w-full items-center'>
      <div className='flex flex-row lg:flex-col'>
        <NavLink to='accounts' className='mb-0 lg:mb-12 block'>
          <img src={ufLogoLarge} alt='Unicorn Finance Logo' className=' mt-2 lg:mt-0 w-4/5 lg:w-4/6' />
        </NavLink>
        <ul className=' ml-0 -my-4 lg:-ml-8 lg:my-0 text-gray-500 text-sm flex flex-row lg:flex-col'>
          <li className='border-t-2 lg:border-l-2 lg:border-t-0 border-transparent'>
            <a href='#' className='block px-4 py-8 lg:py-2 lg:px-8 hover:text-gray-700'>
              Dashboard
            </a>
          </li>

          <NavLink
            activeClassName='border-pink-500 text-gray-900'
            to='accounts'
            className='border-t-2 lg:border-l-2 lg:border-t-0 border-transparent px-4 py-8 lg:py-2 lg:px-8 hover:text-gray-700'
          >
            <li className=''>Accounts</li>
          </NavLink>
        </ul>
      </div>
      <div>
        <ul className='hidden lg:block -ml-8 text-gray-500 text-xs mb-4'>
          <NavLink
            activeClassName='border-pink-500 text-gray-900'
            to='service_status'
            className='block px-8 py-2 hover:text-gray-700 border-l-2'
          >
            <li>Service status</li>
          </NavLink>
          <li className='border-l-2 border-transparent'>
            <a className='block px-8 py-2 hover:text-gray-700' href='#'>
              Settings
            </a>
          </li>
        </ul>
        <div className='flex text-sm relative'>
          <span className='block absolute bg-red-500 p-1 left-10 -top-1 rounded-xl'></span>
          <img
            className='rounded-xl'
            src={avatar}
            alt='Avatar'
            width='40'
            height='40'
          />
          <div className='hidden lg:block flex flex-col pl-4'>
            <p className='font-medium'>Business Unicorn</p>
            <a
              className=' text-xs text-gray-500 underline hover:no-underline'
              href='#'
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Sidebar;
