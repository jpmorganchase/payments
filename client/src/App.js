import React from 'react';
import Sidebar from './components/sidebar';
import Header from './components/header';
import StatusTable from './components/statusTable';

const App = () => {
  const [pacmanData, setPacmanData] = React.useState(null);

  React.useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setPacmanData(data));
  }, []);

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Header />
        <div className='flex flex-shrink-0 flex-col'>
          <div className='flex relative items-start px-8 h-12 flex-col'>
            <span className='text-2xl tracking-wide'>API Statusss</span>
          </div>
        </div>
        <div className='flex w-full p-8 flex-col'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            {pacmanData ? (
              <StatusTable pacmanData={pacmanData} />
            ) : (
              <p> Loading</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
