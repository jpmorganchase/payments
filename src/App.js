import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import SampleComponent from "./components/sample1";


function App() {
  return (
    <div className="flex min-h-screen">
      <nav class="w-64 flex-shrink-0">
          <div class="flex-auto bg-gray-200 h-full">
            <div class="flex flex-col overflow-y-auto h-full">
              <ul class="relative m-0 p-0 list-none h-full">
                <li class="text-2xl p-4 w-full flex relative justify-start">
                  Unicorn Finance
                </li>
                <li class="px-4 w-full flex relative">
                  <div class="flex-auto my-1">
                    <span class="text-gray-400 text-xs uppercase font-medium">General</span>
                  </div>
                </li>

                <li class="text-gray-900 flex relative px-2 mx-2 rounded-lg hover:bg-gray-300 cursor-pointer">
                  <div class="mr-4 my-auto">
                    <span class="material-icons align-middle block">home</span>
                  </div>
                  <div class="flex-auto my-1">
                    <span>Home</span>
                  </div>
                </li>

                <li class="text-gray-900 flex relative px-2 mx-2 rounded-lg hover:bg-gray-300 cursor-pointer">
                  <div class="mr-4 my-auto">
                  	<span class="material-icons align-middle block">credit_card</span>
                  </div>
                  <div class="flex-auto my-1">
                    <span>Payments</span>
                  </div>
                </li>
                <li class="px-4 w-full flex relative">
                  <div class="flex-auto my-1">
                    <span class="text-gray-400 text-xs uppercase font-medium">Health</span>
                  </div>
                </li>

                <li class="text-indigo-600 flex relative px-2 mx-2 bg-gray-300 rounded-lg hover:bg-gray-300 cursor-pointer">
                  <div class="mr-4 my-auto">
                    <span class="material-icons align-middle block">support</span>
                  </div>
                  <div class="flex-auto my-1">
                    <span>API Status</span>
                  </div>
                </li>
              </ul>
              <div class="flex end mb-2">
              	<ul class="w-full">
              		<li class="text-gray-900 flex relative px-2 mx-2 rounded-lg hover:bg-gray-300 cursor-pointer">
      		            <div class="mr-4 my-auto">
      		              <span class="material-icons align-middle block">help_outline</span>
      		            </div>
      		            <div class="flex-auto my-1">
      		              <span>Help</span>
      		            </div>
               		 </li>

              		<li class="text-gray-900 flex relative px-2 mx-2 rounded-lg hover:bg-gray-300 cursor-pointer">
      		            <div class="mr-4 my-auto">
      		              <span class="material-icons align-middle block">logout</span>
      		            </div>
      		            <div class="flex-auto my-1">
      		              <span>Logout</span>
      		            </div>
               		 </li>
              	</ul>
              </div>
            </div>
          </div>
        </nav>
        <div class="flex flex-col w-full">
            <header class="left-auto top-0 right-0">
              <div class="h-12 px-6 flex relative items-center justify-end">
                <button class="flex mx-4 hover:text-gray-200 focus:outline-none">
                 <span class="material-icons">notifications</span>
                </button>

                <button class="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none">
                  <img class="h-full w-full object-cover" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" />
                </button>
              </div>
            </header>

            <div class="flex flex-shrink-0 flex-col">
                  <div class="flex relative items-center px-8 h-12">
                    <span class="text-2xl tracking-wide">API Status</span>
                  </div>
            </div>
            <div class="flex w-full p-8">
                	<div class="flex flex-col w-full">
            		  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            		    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            		      <div class="overflow-hidden border-b border-gray-200 ">
            		        <table class="min-w-full ">
            		          <thead class="bg-gray-100">
            		            <tr>
            		              <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            		                Description
            		              </th>
            		              <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            		                API
            		              </th>
            		              <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            		                Status
            		              </th>
            		              <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            		                Start Date
            		              </th>
            		              <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            		                End Date
            		              </th>
            		              <th scope="col" class="relative px-4 py-2">
            		                <span class="material-icons">notifications_active</span>
            		              </th>
            		            </tr>
            		          </thead>
            		          <tbody class="bg-white divide-y divide-gray-200">
            		            <tr>
            		              <td class="px-4 py-2 whitespace-nowrap">
            		                Description here
            		              </td>
            		              <td class="px-4 py-2 whitespace-nowrap">
            		                API Name here
            		              </td>
            		              <td class="px-4 py-2 whitespace-nowrap">
            		                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            		                  COMPLETE
            		                </span>
            		              </td>
            		              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
            		                Mar 4, 21 - 09:30AM
            		              </td>
            		              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
            		                Mar 4, 21 - 17:30PM
            		              </td>
            		              <td class="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
            		                <a href="#" class="text-indigo-600 hover:text-indigo-900">Set reminder</a>
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
