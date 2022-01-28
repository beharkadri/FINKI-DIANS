import { useState, useContext } from "react";
import { MenuContext } from "../../context/menu";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LeaveReview from "../LeaveReview/LeaveReview";
import AuthContext from "../../context/auth-context";
import { useHistory } from "react-router-dom";
import SeeReviews from "../SeeReviews/SeeReviews";
import useGeoLocation from "../../hooks/use-geolocation";
import L from "leaflet";

import userMarker from "../../assets/Icons/marker.png";
import classes from "./MapSection.module.scss";
import MapMarker from "./MapMarker";

const markerIcon = new L.Icon({
  iconUrl: userMarker,
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const corner1 = L.latLng(40.5776464, 20.0139859);
const corner2 = L.latLng(42.5040261, 23.3349122);
const bounds = L.latLngBounds(corner1, corner2);

const MapSection = ({ institutions }) => {
  const authCtx = useContext(AuthContext);
  const [searchParams] = useContext(MenuContext);

  const history = useHistory();
  const location = useGeoLocation();

  const [leaveReviewModal, setLeaveReviewModal] = useState(false);
  const [seeReviewsModal, setSeeReviewsModal] = useState(false);
  const [LRinstitutionId, setLRInstitutionId] = useState("");
  const [SRinstitutionId, setSRInstitutionId] = useState("");

  const leaveReviewHandler = (insId) => {
    if (authCtx.isLoggedIn) {
      setLRInstitutionId(insId);
      setLeaveReviewModal(!leaveReviewModal);
    } else {
      history.replace("/auth");
    }
  };
  const seeReviewsHandler = (insId) => {
    setSRInstitutionId(insId);
    setSeeReviewsModal(!seeReviewsModal);
  };

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
    return searchParams != null && searchParams.city !== "City"
      ? arr.filter(
          (institution) =>
            institution.city.toLowerCase() === searchParams.city.toLowerCase()
        )
      : arr;
  };

  const filterBySearchTerm = (arr) => {
    return searchParams != null && searchParams.searchTerm !== ""
      ? arr.filter((institution) =>
          institution.name
            .toLowerCase()
            .includes(searchParams.searchTerm.toLowerCase())
        )
      : arr;
  };

  //Search by institution category, city and search term simultaniously
  const filter = (arr) => {
    return filterBySearchTerm(filterByCity(filterByCategory(arr)));
  };

  const filteredInstitutions = filter(institutions);

  return (
    <div className={classes.map}>
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
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredInstitutions !== undefined &&
          filteredInstitutions.map((obj) => (
            <MapMarker
              key={obj.id}
              id={obj.id}
              position={[obj.latitude, obj.longitude]}
              name={obj.name}
              amenity={obj.amenity}
              latitude={obj.latitude}
              longitude={obj.longitude}
              onLeaveReview={leaveReviewHandler}
              onSeeReviews={seeReviewsHandler}
            />
          ))}

        {location.loaded && (
          <Marker
            icon={markerIcon}
            position={[location.coordinates.lat, location.coordinates.lng]}
          >
            <Popup>Your Location...</Popup>
          </Marker>
        )}
      </MapContainer>
      {leaveReviewModal && (
        <LeaveReview
          show={leaveReviewModal}
          title="Leave a review for institution"
          user={authCtx.email}
          institutionId={LRinstitutionId}
          close={leaveReviewHandler}
        />
      )}

      {seeReviewsModal && (
        <SeeReviews
          show={seeReviewsModal}
          title={"All reviews for institution"}
          institutionId={SRinstitutionId}
          close={seeReviewsHandler}
        />
      )}
    </div>
  );
};

export default MapSection;
