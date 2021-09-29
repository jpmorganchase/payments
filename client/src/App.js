import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const ServiceStatusPage = lazy(() =>
  import('./components/pages/ServiceStatusPage/ServiceStatusPage'),
);
const AccountPage = lazy(() =>
  import('./components/pages/AccountPage/AccountPage'),
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path='/' component={AccountPage} />
          <Route exact path='/accounts' component={AccountPage} />
          <Route path='/service_status' component={ServiceStatusPage} />
        </Switch>
      </Suspense>
    </Router>
  </QueryClientProvider>
);

export default App;
