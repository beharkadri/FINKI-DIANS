import MapSection from '../components/MapSection/MapSection';
import MobileMapMenu from '../components/NavigationMenu/MobileMapMenu/MobileMapMenu';

import useContent from '../hooks/use-content';

const Map = () => {
  const { institutions } = useContent('institutions');

  return (
    <>
      <MobileMapMenu />
      <MapSection institutions={institutions} />
    </>
  );
};

export default Map;
