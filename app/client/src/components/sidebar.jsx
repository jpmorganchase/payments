/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Popover } from '@headlessui/react';
import ufLogoLarge from '../images/uf-logo.svg';
import avatar from '../images/avatar.png';

const linkClassName = 'border-t-2 lg:border-l-2 lg:border-t-0 border-transparent px-4 py-8 lg:py-2 lg:px-8 hover:text-gray-700';
const activeClassName = 'border-pink-500 text-gray-900';
const submenuClassName = 'block px-8 py-2 hover:text-gray-700 border-l-2 ml-2';

function Sidebar() {
  return (
    <div className="flex lg:flex-none w-full lg:w-1/12 border-b lg:border-r border-gray-200 ">
      <nav className="px-8 py-4 lg:p-8 lg:pr-0 flex flex-row lg:flex-col justify-between w-full items-center ">
        <div className="flex flex-row lg:flex-col">
          <NavLink to="accounts" className="mb-0 lg:mb-12 block" data-cy="logo">
            <img
              src={ufLogoLarge}
              alt="Unicorn Finance Logo"
              className=" mt-2 lg:mt-0 w-4/5 lg:w-4/6"
            />
          </NavLink>
          <ul className=" ml-0 -my-4 lg:-ml-8 lg:my-0 text-gray-500 text-sm flex flex-row lg:flex-col">
            <NavLink to="#" className={linkClassName} data-cy="dashboardLink">
              <li className="">Dashboard</li>
            </NavLink>

            <NavLink
              to="accounts"
              data-cy="accountsLink"
              className={({ isActive }) => (isActive ? `${activeClassName} ${linkClassName}` : linkClassName)}
            >
              <li className="">Accounts</li>
            </NavLink>
          </ul>
        </div>

        <div className="lg:bottom-0 lg:fixed mb-2 lg:w-auto" data-cy="popover">
          <Popover className="relative lg:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="block absolute bg-red-500 p-1 left-10 -top-1 rounded-xl" />
              <img className="rounded-xl w-10 h-10" src={avatar} alt="Avatar" />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 w-max max-w-sm px-4 mt-3 transform -translate-x-3/4 left-1/2">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid bg-white p-7 grid-cols-1 gap-3">
                  <a href="/service_status" data-cy="serviceStatusLink">
                    Service Status
                  </a>
                  <a href="#">Settings</a>
                </div>
                <div className="relative p-4 bg-gray-50 grid grid-cols-1 gap-2">
                  <p className="font-medium w-auto">Business Unicorn</p>

                  <a
                    className=" text-xs text-gray-500 underline hover:no-underline"
                    href="#"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </Popover.Panel>
          </Popover>

          <ul className="hidden lg:block -ml-8 text-gray-500 text-xs mb-4">
            <NavLink
              data-cy="serviceStatusDesktopLink"
              className={({ isActive }) => (isActive
                ? `${activeClassName} ${submenuClassName}`
                : submenuClassName)}
              to="service_status"
            >
              <li>Service status</li>
            </NavLink>
            <NavLink className={submenuClassName} to="service_status">
              <li>Settings</li>
            </NavLink>
          </ul>
          <div className="hidden lg:flex text-sm relative">
            <span className="block absolute bg-red-500 p-1 left-10 -top-1 rounded-xl" />
            <img className="rounded-xl w-10 h-10 " src={avatar} alt="Avatar" />
            <div className=" lg:block flex flex-col pl-4">
              <p className="font-medium w-8/12">Business Unicorn</p>
              <a
                className=" text-xs text-gray-500 underline hover:no-underline"
                href="#"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
