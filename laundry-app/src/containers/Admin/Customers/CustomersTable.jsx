import React from 'react';

import {
  Table,
} from 'reactstrap';

import { useQuery } from 'react-apollo';
import * as queries from '../../../graphql/queries';

export default function CustomersTable() {
  const { data, loading, error } = useQuery(queries.GET_CUSTOMERS);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error! {error}</h2>;
  }

  const rows = data.customers.map(c => (
    <tr>
      <td>{c.id}</td>
      <td>{c.name}</td>
      <td>{c.email || '-'}</td>
      <td>{c.address || '-'}</td>
      <td>{c.city || '-'}</td>
      <td>{c.latitude || '-'}</td>
      <td>{c.longitude || '-'}</td>
    </tr>
  ));

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>City</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  );
}
