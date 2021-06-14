/* eslint-disable no-console */
import React from 'react';
import Sidebar from './components/sidebar';
import Header from './components/header';
import ApiStatusContent from './components/apiStatusContent';

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
        {pacmanData ? <ApiStatusContent pacmanData={pacmanData}/> : <p> Loading</p>}
        
      </div>
    </div>
  );
};

export default App;
