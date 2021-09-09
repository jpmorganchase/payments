import React from 'react';
import Sidebar from './components/sidebar';
import Header from './components/header';
import PacmanTable from './components/pacmanTable';

const App = () => {
  const [pacmanData, setPacmanData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/gatherPacman')
      .then((res) => res.json())
      .then((data) => setPacmanData(data));
  }, []);

  return (
    <div className='flex min-h-screen justify-center'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header />
        <div className='flex w-full p-4 md:p-8 flex-col'>
          <div className='table-overflow overflow-x-auto'>
            {pacmanData && pacmanData.data ? (
              <PacmanTable pacmanData={pacmanData.data} />
            ) : (
              <p> Loading</p>
            )}
          </div>
        </div>
      </div>
      {pacmanData && pacmanData.mocked && (
        <div className='rounded-3xl shadow-xl bg-yellow-300 bottom-5 border border-yellow-400 px-8 py-2 md:w-1/2 sm:4/6  absolute text-center'>
          Mock data for demo purposes. There are no upcoming outages!
        </div>
      )}
    </div>
  );
};

export default App;
