import { useState, useContext } from 'react';
import { MenuContext } from '../../context/menu';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LeaveReview from '../LeaveReview/LeaveReview';
import AuthContext from '../../context/auth-context';
import { useHistory } from 'react-router-dom';
import SeeReviews from '../SeeReviews/SeeReviews';

const MapSection = ({ institutions }) => {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [institutionId, setInstitutionId] = useState('');
  const [institutionId1, setInstitutionId1] = useState('');

  const toggleHandler = (insId) => {
    console.log('HANDLER CALL');
    if (authCtx.isLoggedIn) {
      setInstitutionId(insId);
      setModal(!modal);
    } else {
      history.replace('/auth');
    }
  };
  const toggleHandler1 = (insId) => {
    setInstitutionId1(insId);
    setModal1(!modal1);
  };

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
                <button onClick={() => toggleHandler(obj.id)}>
                  Leave a review
                </button>
                <button onClick={() => toggleHandler1(obj.id)}>
                  See reviews
                </button>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
      {modal === true && (
        <LeaveReview
          show={modal}
          title='Leave a review for institution'
          user={authCtx.email}
          institutionId={institutionId}
          close={toggleHandler}
        />
      )}

      {modal1 === true && (
        <SeeReviews
          show={modal1}
          title={'All reviews for institution'}
          institutionId={institutionId1}
          close={toggleHandler1}
        />
      )}
    </>
  );
};

export default MapSection;
