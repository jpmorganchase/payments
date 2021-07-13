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
        <div className='flex w-full p-4 md:p-8 flex-col'>
          <div className='table-overflow overflow-x-auto'>
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
