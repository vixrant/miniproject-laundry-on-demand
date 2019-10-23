import React from 'react';

import {
  Card,
  CardBody,
  CardFooter,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

import { useQuery } from 'react-apollo';
import * as queries from '../../../graphql/queries';

function ShopList() {
  const { error, data, loading } = useQuery(queries.GET_SHOPS);
  const history = useHistory();

  if (error) {
    return <span>Couldn't fetch shops!{JSON.stringify(error)}</span>;
  }

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data.shops.map(s => (
        <Card color="secondary" className="my-1" onClick={() => history.push(`/shop/${s.user_id}`)}>
          <CardBody>{s.name}</CardBody>
          <CardFooter>Rating: {_.mean(s.rating.map(e => e.score))}</CardFooter>
        </Card>
      ))}
    </>
  );
}

export default ShopList;
