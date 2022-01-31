import { useState, useContext } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { MenuContext } from './context/menu';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import Map from './pages/Map';
import FeedBack from './pages/Feedback';
import Team from './pages/Team';
import AuthPage from './pages/AuthPage';
import AuthContext from './context/auth-context';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

import './App.scss';

const App = () => {
  const [searchParams, setSearchParams] = useState(null);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const path = history.location.pathname;

  return path !== '/hm-admin' && path !== '/hm-admin/dashboard' ? (
    <>
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
            <Route path='*' exact>
              <Redirect to='/' />
            </Route>
          </Switch>
        </Layout>
      </MenuContext.Provider>
    </>
  ) : (
    <Switch>
      <Route path='/hm-admin' exact>
        <AdminLogin />
      </Route>
      <ProtectedRoute path='/hm-admin/dashboard' exact component={Admin}>
        <Admin />
      </ProtectedRoute>
    </Switch>
  );
};

export default App;
