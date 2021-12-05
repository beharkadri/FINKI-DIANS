<<<<<<< HEAD
import Layout from './components/layout/Layout';
import MapSection from './components/MapSection/MapSection';
import LandingSection from './components/LandingSection/LandingSection';
import TeamSection from './components/TeamSection/TeamSection';
=======
import { Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import Map from './pages/Map';
import HowToSearch from './pages/HowToSearch';
import FeedBack from './pages/Feedback';
import Team from './pages/Team';
>>>>>>> 399d0ef28040976d1561065e7dc4bc1e4ae1dd8f
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
