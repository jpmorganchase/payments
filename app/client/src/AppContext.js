import * as React from 'react';
import PropTypes from 'prop-types';
const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [displayingMockedData, setDisplayingMockedData] = React.useState(true);
  const [displayingApiData, setDisplayingApiData] = React.useState(false);
  return (
    <AppContext.Provider
      value={{
        displayingMockedData,
        setDisplayingMockedData,
        displayingApiData,
        setDisplayingApiData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
AppContextProvider.propTypes = {
  children: PropTypes.node,
};

export { AppContextProvider, AppContext };
