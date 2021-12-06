import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Modal from '../Modal/Modal';

const MapSection = ({ institutions }) => {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  const toggleHandler = () => setModal(!modal);
  const toggleHandler1 = () => setModal1(!modal1);
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
                <button onClick={() => toggleHandler1()}>See reviews</button>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
      <Modal
        show={modal}
        title={`Leave a review for institution`}
        close={toggleHandler}
      >
        <textarea placeholder='Tell us about your experiences in this institution...'></textarea>
      </Modal>
      <Modal show={modal1} title={`Institution reviews`} close={toggleHandler1}>
        <div>
          <h3>User</h3>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
        <div>
          <h3>User</h3>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
        <div>
          <h3>User</h3>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
      </Modal>
    </>
  );
};

export default MapSection;
