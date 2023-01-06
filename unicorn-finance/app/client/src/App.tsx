import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';

import Layout from './components/layout';
import AccountPage from './pages/AccountPage';
import PaymentsPage from './pages/PaymentsPage';
import ServiceStatusPage from './pages/ServiceStatusPage';

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AccountPage />} />
          <Route path="accounts" element={<AccountPage />} />
          <Route path="service_status" element={<ServiceStatusPage />} />
          <Route path="payments" element={<PaymentsPage />} />
        </Route>
      </Routes>
    </AppContextProvider>
  );
}

export default App;
