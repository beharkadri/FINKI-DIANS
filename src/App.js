import { Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import Map from './pages/Map';
import HowToSearch from './pages/HowToSearch';
import FeedBack from './pages/Feedback';
import Team from './pages/Team';
import './App.css';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>

        <Route path='/map' exact>
          <Map />
        </Route>

        <Route path='/how-to-search' exact>
          <HowToSearch />
        </Route>

        <Route path='/feedback' exact>
          <FeedBack />
        </Route>

        <Route path='/team' exact>
          <Team />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
