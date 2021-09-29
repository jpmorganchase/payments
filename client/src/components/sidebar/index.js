import React from 'react';
import ufLogoLarge from '../../images/uf-logo.svg';
import avatar from '../../images/avatar.png';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className='border-r border-gray-200 p-8 flex flex-col justify-between'>
      <div>
        <NavLink to='accounts' className='mb-12 block'>
          <img src={ufLogoLarge} alt='Unicorn Finance Logo' />
        </NavLink>
        <ul className='-ml-8 text-gray-500 text-sm'>
          <li className='border-l-2 border-transparent'>
            <a href='#' className='block px-8 py-2 hover:text-gray-700'>
              Dashboard
            </a>
          </li>

          <NavLink
            activeClassName='border-pink-500 text-gray-900'
            to='accounts'
            className='border-l-2 block px-8 py-2 hover:text-gray-700'
          >
            <li className=' border-transparent '>Accounts</li>
          </NavLink>
        </ul>
      </div>
      <div>
        <ul className='-ml-8 text-gray-500 text-xs mb-4'>
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
          <div className=' flex flex-col pl-4'>
            <p className='font-medium'>Alan Torrance</p>
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
  );
};

export default Sidebar;
