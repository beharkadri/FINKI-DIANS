import MapSection from '../components/MapSection/MapSection';

import useContent from '../hooks/use-content';

const Map = () => {
  const { institutions } = useContent('institutions');

  return <MapSection institutions={institutions} />;
};

export default Map;
