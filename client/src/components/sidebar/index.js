import React from 'react';
import ufLogoLarge from '../../images/uf-logo.svg';
import ufLogoMini from '../../images/uf-logo-mini.svg';

const Sidebar = () => {
  return (
    <nav className=" w-30 md:w-64 flex-shrink-0">
      <div className="flex-auto bg-gray-100 h-full">
        <div className="flex flex-col overflow-y-auto h-full">
          <ul className="relative m-0 p-0 list-none h-full">
            <li className="text-2xl p-4 w-full flex relative justify-start">
                        <span className=" hidden md:block">
                        <img src={ufLogoLarge} />
                        </span>
              <span className="block md:hidden">
                <img src={ufLogoMini} />
                        </span>
            </li>
            <li className="px-4 w-full flex relative">
              <div className="flex-auto my-1">
                <span className="text-gray-700 text-xs uppercase font-medium hidden md:block">General</span>
              </div>
            </li>

            <li
              className="text-gray-900 flex relative p-2 md:py-1 md:px-2 mx-2 rounded-lg hover:bg-gray-300 cursor-pointer">
              <div className="md:mr-4 my-auto w-full md:w-auto text-center">
                <span className="material-icons align-middle block w-full text-center">home</span>
              </div>
              <div className="flex-auto my-1 hidden md:block">
                <span className="">Home</span>
              </div>
            </li>

            <li
              className="text-gray-900 flex relative p-2 md:py-1 md:px-2 mx-2 rounded-lg hover:bg-gray-300 cursor-pointer">
              <div className="md:mr-4 my-auto w-full md:w-auto text-center">
                <span className="material-icons align-middle block w-full text-center">credit_card</span>
              </div>
              <div className="flex-auto my-1  hidden md:block">
                <span className="">Payments</span>
              </div>
            </li>
            <li className="px-4 w-full flex relative">
              <div className="flex-auto my-1">
                <span className="text-gray-700 text-xs uppercase font-medium hidden md:block">Health</span>
              </div>
            </li>

            <li
              className="text-indigo-600 flex relative p-2 md:py-1 md:px-2 mx-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer">
              <div className="md:mr-4 my-auto w-full md:w-auto text-center">
                <span className="material-icons align-middle block w-full text-center">support</span>
              </div>
              <div className="flex-auto my-1 hidden md:block">
                <span className="">API Status</span>
              </div>
            </li>
          </ul>
          <div className="flex end mb-2">
            <ul className="w-full">
              <li
                className="text-gray-900 flex relative p-2 md:py-1 md:px-2 mx-2 rounded-lg hover:bg-gray-300 cursor-pointer">
                <div className="md:mr-4 my-auto w-full md:w-auto text-center">
                  <span className="material-icons align-middle block w-full text-center">help_outline</span>
                </div>
                <div className="flex-auto my-1 hidden md:block">
                  <span className="">Help</span>
                </div>
              </li>

              <li
                className="text-gray-900 flex relative p-2 md:py-1 md:px-2 mx-2 rounded-lg hover:bg-gray-300 cursor-pointer">
                <div className="md:mr-4 my-auto w-full md:w-auto text-center">
                  <span className="material-icons align-middle block ">logout</span>
                </div>
                <div className="flex-auto my-1 hidden md:block">
                  <span className="">Logout</span>
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
