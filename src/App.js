import { useState, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MenuContext } from './context/menu';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import Map from './pages/Map';
import FeedBack from './pages/Feedback';
import Team from './pages/Team';
import './App.css';
import AuthPage from './pages/AuthPage';
import AuthContext from './context/auth-context';

const App = () => {
  const [searchParams, setSearchParams] = useState(null);
  const authCtx = useContext(AuthContext);

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
            {authCtx.isLoggedIn && <FeedBack />}
            {!authCtx.isLoggedIn && <Redirect to='/auth' />}
          </Route>

          <Route path='/team' exact>
            <Team />
          </Route>
          {!authCtx.isLoggedIn && (
            <Route path='/auth'>
              <AuthPage />
            </Route>
          )}
        </Switch>
      </Layout>
    </MenuContext.Provider>
  );
};

export default App;
