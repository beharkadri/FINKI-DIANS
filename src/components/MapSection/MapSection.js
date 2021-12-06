import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapSection = ({ institutions }) => {
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
      {institutions !== undefined &&
        institutions.map((obj) => (
          <Marker key={obj.id} position={[obj.latitude, obj.longitude]}>
            <Popup>
              {obj.amenity} <br /> {obj.name}.
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapSection;
