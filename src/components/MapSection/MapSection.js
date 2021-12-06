import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Modal from '../Modal/Modal';

const MapSection = ({ institutions }) => {
  const [modal, setModal] = useState(false);

  const toggleHandler = () => setModal(!modal);
  return (
    <>
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
                {obj.amenity} <br /> {obj.name}.<br />
                <button onClick={() => toggleHandler()}>Leave a review</button>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
      <Modal
        show={modal}
        title={`Leave a review for institution`}
        close={toggleHandler}
      ></Modal>
    </>
  );
};

export default MapSection;
