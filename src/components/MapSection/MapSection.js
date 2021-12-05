import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

//import './App.css';

import healthcareObjectsData from '../../Data/healthcare_objects_filtered.json';

const MapSection = () => {
  const [objects, setObjects] = useState(healthcareObjectsData);

  const clickHandler = (event) => {
    setObjects(healthcareObjectsData);

    event.target.outerText !== 'show all' &&
      setObjects(
        objects.filter((obj) => event.target.outerText === obj.amenity)
      );
  };

  return (
    <MapContainer
      center={[41.9932326, 21.4154083]}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {objects.map((obj) => (
        <Marker position={[obj.latitude, obj.longitude]}>
          <Popup>
            {obj.amenity} <br /> {obj.name}.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapSection;
