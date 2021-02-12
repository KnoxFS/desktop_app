import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import FilesList from './screens/FilesList';

const Navigation: React.FC = () => {
  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/account">
          <Layout />
        </Route>
        <Route path="/">
          <FilesList />
        </Route>
      </Switch>
    </MemoryRouter>
  );
};

export default Navigation;
