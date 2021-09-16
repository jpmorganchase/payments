import React from 'react';
import ufLogoLarge from '../../images/uf-logo.svg';
// import ufLogoMini from '../../images/uf-logo-mini.svg';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (

    <nav className='border-r border-gray-200 p-8 flex flex-col justify-between'>
         <div>
          <div className="mb-12">
          <img src={ufLogoLarge} alt='Unicorn Finance Logo' />
          </div>
          <ul className='-ml-8 text-gray-500 text-sm'>
            <li className='border-l-2 border-transparent'>
              <a href="#" className='block px-8 py-2 hover:text-gray-700'>
                Dashboard
              </a>
            </li>

            <li className="border-l-2 border-transparent">
              <Link
                to='account'
                className='block px-8 py-2 hover:text-gray-700'
              >
                Account
              </Link>
            </li>
          </ul>
          </div>
        <div>
                <ul className="-ml-8 text-gray-500 text-xs mb-4">
                  <li className="border-l-2 border-pink-500">
                   <Link
                    to='service_status'
                    className='block px-8 py-2 text-gray-900 hover:text-gray-700'
                   >Service status
                   </Link>
                  </li>
                  <li className="border-l-2 border-transparent">
                    <a className="block px-8 py-2 hover:text-gray-700"  href="#">Settings</a>
                  </li>
                </ul>
                <div className="flex text-sm relative">
                  <span className="block absolute bg-red-500 p-1 left-10 -top-1 rounded-xl"></span>
                  <img className="rounded-xl w-10 h-10 " src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=73a9df4b7bd1b330db1e903e08575ec1"/>
                  <div className=" flex flex-col pl-4">
                    <p className="font-medium">Alan Torrance</p>
                    <a className=" text-xs text-gray-500 underline hover:no-underline" href="#">Logout</a>
                  </div>
                </div>
        </div>
    </nav>
  );
};

export default Sidebar;
