import React from 'react';

import { Provider as ReduxProvider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import client from './graphql/client';

import Navbar from './components/Navbar';
import Appointment from './routes/Appointment';
import Dashboard from './routes/Dashboard';
import Admin from './routes/Admin';

import store from './store';
import ShopPage from './routes/ShopPage';


const Providers = ({ children }) => (
  <BrowserRouter>
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </ReduxProvider>
  </BrowserRouter>
);

function App() {
  return (
    <Providers>
      <div className="d-flex flex-column vh-100">
        <Navbar />
        <main className="d-flex flex-column flex-grow-1">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/shop/:id/new">
              <Appointment />
            </Route>
            <Route exact path="/shop/:id">
              <ShopPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Providers>
  );
}

export default App;
