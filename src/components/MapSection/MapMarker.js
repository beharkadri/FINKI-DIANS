import { Marker, Popup } from 'react-leaflet';
import useGeoLocation from '../../hooks/use-geolocation';

import classes from './MapMarker.module.scss';

const MapMarker = (props) => {

    const location = useGeoLocation();

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


    return <Marker key={props.id} position={[props.latitude, props.longitude]}>
    <Popup>
      <div className={classes.popup}>
        <section className={classes.content}>
          <span>
            {props.name} - {props.amenity}
          </span>
          <br />
          {location.loaded === true && (
            <span>
              Distance:{' '}
              {getDistance(location.coordinates, {
                lat: props.latitude,
                lng: props.longitude,
              })}
            </span>
          )}
        </section>
        <button
          className={classes.btn}
          onClick={() => props.onLeaveReview(props.id)}
        >
          Leave a review
        </button>
        <button
          className={classes.btn}
          onClick={() => props.onSeeReviews(props.id)}
        >
          See reviews
        </button>
      </div>
    </Popup>
  </Marker>
}

export default MapMarker;

