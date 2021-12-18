import { useState, useContext } from 'react';
import { MenuContext } from '../../context/menu';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Modal from '../Modal/Modal';

const MapSection = ({ institutions }) => {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  const toggleHandler = () => setModal(!modal);
  const toggleHandler1 = () => setModal1(!modal1);

  const [searchParams] = useContext(MenuContext);

  const filterByCategory = (arr) => {
    const filtered =
      searchParams != null && searchParams.categories != null
        ? arr.filter(
            (institution) =>
              searchParams.categories[institution.amenity] === true
          )
        : arr;
    return filtered.length !== 0 ? filtered : arr;
  };

  const filterByCity = (arr) => {
    return searchParams != null && searchParams.city !== '---'
      ? arr.filter((institution) => institution.city === searchParams.city)
      : arr;
  };

  const filterBySearchTerm = (arr) => {
    return searchParams != null && searchParams.searchTerm !== ''
      ? arr.filter((institution) =>
          institution.name.includes(searchParams.searchTerm)
        )
      : arr;
  };

  //Search by institution category, city and search term simultaniously
  const filter = (arr) => {
    return filterBySearchTerm(filterByCity(filterByCategory(arr)));
  };

  const filteredInstitutions = filter(institutions);

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
        {filteredInstitutions !== undefined &&
          filteredInstitutions.map((obj) => (
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
