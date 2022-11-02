import * as React from 'react';
import { AccountType } from './types/accountTypes';

interface AppContextInterface {
  setDisplayingMockedData: (displayingMockedData: boolean) => void,
  setDisplayingApiData: (displayingApiData:boolean) => void,
  setSelectedAccount: (account: AccountType | Record<string, never>) => void,
  selectedAccount: AccountType | Record<string, never>,
  displayingApiData: boolean,
  displayingMockedData: boolean,

}

interface Props {
  children: React.ReactNode
}

const appCtxDefaultValue: AppContextInterface = {
  displayingApiData: false,
  displayingMockedData: true,
  setDisplayingApiData: () => {},
  setDisplayingMockedData: () => {},
  selectedAccount: {},
  setSelectedAccount: () => {},
};

const AppContext = React.createContext<AppContextInterface>(appCtxDefaultValue);

function AppContextProvider({ children }: Props) {
  const [displayingMockedData, setDisplayingMockedData] = React.useState(appCtxDefaultValue.displayingMockedData);
  const [displayingApiData, setDisplayingApiData] = React.useState(appCtxDefaultValue.displayingApiData);
  const [selectedAccount, setSelectedAccount] = React.useState(appCtxDefaultValue.selectedAccount);

  return (
    <AppContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        displayingMockedData,
        setDisplayingMockedData,
        displayingApiData,
        setDisplayingApiData,
        selectedAccount,
        setSelectedAccount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };
