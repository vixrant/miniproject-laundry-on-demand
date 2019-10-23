import React from 'react';

import { Treemap } from 'recharts';

import { useQuery } from 'react-apollo';
import * as queries from '../../../graphql/queries';

export default function CityStats() {
  const { data, loading, error } = useQuery(queries.GET_CITY_CUSTOMERS_COUNT);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error! {error}</h2>;
  }

  return (
    <Treemap
      width={730}
      height={250}
      data={data.customers_by_count}
      dataKey="count"
      stroke="#fff"
      fill="#8884d8"
      ratio={4 / 3}
    />
  );
}
