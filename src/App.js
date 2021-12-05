import Layout from './components/layout/Layout';
import MapSection from './components/MapSection/MapSection';
import LandingSection from './components/LandingSection/LandingSection';
import TeamSection from './components/TeamSection/TeamSection';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Layout>
        <LandingSection />
        <MapSection />
        <TeamSection />
      </Layout>
    </div>
  );
}

export default App;
