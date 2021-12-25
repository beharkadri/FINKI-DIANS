import { useState, useContext } from 'react';
import { MenuContext } from '../../context/menu';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LeaveReview from '../LeaveReview/LeaveReview';
import AuthContext from '../../context/auth-context';
import { useHistory } from 'react-router-dom';
import SeeReviews from '../SeeReviews/SeeReviews';
import useGeoLocation from '../../hooks/use-geolocation';
import L from 'leaflet';

import userMarker from '../../assets/Icons/marker.png';

const markerIcon = new L.Icon({
  iconUrl: userMarker,
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const corner1 = L.latLng(40.5776464, 20.0139859);
const corner2 = L.latLng(42.5040261, 23.3349122);
const bounds = L.latLngBounds(corner1, corner2);

import classes from './MapSection.module.scss';

const MapSection = ({ institutions }) => {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [institutionId, setInstitutionId] = useState('');
  const [institutionId1, setInstitutionId1] = useState('');

  const location = useGeoLocation();

  const toggleHandler = (insId) => {
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

  function getDistance(from, to) {
    // return distance in meters
    var lon1 = toRadian(from.lng),
      lat1 = toRadian(from.lat),
      lon2 = toRadian(to.lng),
      lat2 = toRadian(to.lat);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a =
      Math.pow(Math.sin(deltaLat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    var result = (c * EARTH_RADIUS * 1000).toFixed(2);

    return result > 1000
      ? (result / 1000).toFixed(2) + ' km.'
      : result + ' meters.';
  }
  function toRadian(degree) {
    return (degree * Math.PI) / 180;
  }

  return (
    <>
      <MapContainer
        center={bounds.getCenter()}
        zoom={9}
        minZoom={8}
        scrollWheelZoom={true}
        bounds={bounds}
        maxBounds={bounds}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {filteredInstitutions !== undefined &&
          filteredInstitutions.map((obj) => (
            <Marker key={obj.id} position={[obj.latitude, obj.longitude]}>
              <Popup>
                <div className={classes.popup}>
                  <section className={classes.content}>
                    <span>
                      {obj.name} - {obj.amenity}
                    </span>
                    {location.loaded === true && (
                      <span>
                        Distance:{' '}
                        {getDistance(location.coordinates, {
                          lat: obj.latitude,
                          lng: obj.longitude,
                        })}
                      </span>
                    )}
                  </section>
                  <button
                    className={classes.btn}
                    onClick={() => toggleHandler(obj.id)}
                  >
                    Leave a review
                  </button>{' '}
                  <button
                    className={classes.btn}
                    onClick={() => toggleHandler1(obj.id)}
                  >
                    See reviews
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        {location.loaded === true && (
          <Marker
            icon={markerIcon}
            position={[location.coordinates.lat, location.coordinates.lng]}
          >
            <Popup>Your Location...</Popup>
          </Marker>
        )}
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
