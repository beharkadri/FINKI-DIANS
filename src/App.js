import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MenuContext } from './context/menu';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import Map from './pages/Map';
import FeedBack from './pages/Feedback';
import Team from './pages/Team';
import './App.css';

const App = () => {
  const [searchParams, setSearchParams] = useState(null);

  console.log('APP CALL');
  return (
    <MenuContext.Provider value={[searchParams, setSearchParams]}>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>

          <Route path='/map' exact>
            <Map />
          </Route>

          <Route path='/feedback' exact>
            <FeedBack />
          </Route>

          <Route path='/team' exact>
            <Team />
          </Route>
        </Switch>
      </Layout>
    </MenuContext.Provider>
  );
};

export default App;
