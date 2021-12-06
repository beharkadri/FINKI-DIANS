import React, { Fragment } from 'react';
import MapSection from '../components/MapSection/MapSection';

function Map({ institutions }) {
  return (
    <Fragment>
      <MapSection institutions={institutions} />
    </Fragment>
  );
}

export default Map;
