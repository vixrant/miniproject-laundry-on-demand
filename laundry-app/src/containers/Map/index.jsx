import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import { useHistory } from 'react-router-dom';
import { useLocalStorage, useGeolocation } from 'react-use';

import { useQuery } from 'react-apollo';
import * as queries from '../../graphql/queries';

import theme from './theme';


const OPTIONS = {
  disableDefaultUI: true,
  gestureHandling: 'greedy',
  styles: theme,
};


function MyMap(props) {
  const loc = useGeolocation();

  const history = useHistory();
  const [id, _setId] = useLocalStorage('id');

  const { data: shopsList } = useQuery(queries.GET_SHOPS);

  return (
    <GoogleMap defaultZoom={16} defaultCenter={{ lat: 19.1115838, lng: 72.8316312 }} options={OPTIONS}>
      {!loc.loading && <Marker position={{ lat: 19.1115938, lng: 72.8316312 }} />}
      {
        shopsList && shopsList.shops.map(s => <Marker onClick={() => history.push(`/shop/${s.user_id}`)} position={{ lat: s.address.latitude, lng: s.address.longitude }} />)
      }
    </GoogleMap>
  );
}

const LaundroMap = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
    loadingElement: <div className="h-100 w-100" />,
    containerElement: <div className="h-100 w-100" />,
    mapElement: <div className="h-100 w-100" />,
  }),
  withScriptjs,
  withGoogleMap,
)(MyMap);

export default LaundroMap;

LaundroMap.propTypes = {
  loc: PropTypes.object.isRequired,
};
