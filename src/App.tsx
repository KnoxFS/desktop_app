import React from 'react';
import './App.css';
import Layout from './components/Layout';
import FilesList from './screens/FilesList';

const App = (): JSX.Element => {
  return (
    <Layout>
      <FilesList />
    </Layout>
  );
};

export default App;
