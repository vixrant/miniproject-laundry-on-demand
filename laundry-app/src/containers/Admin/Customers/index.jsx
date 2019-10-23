import React from 'react';

import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import { Query } from 'react-apollo';
import * as queries from '../../../graphql/queries';

import CustomersTable from './CustomersTable';
import CityStats from './CityStats';

export default function UserStats() {
  return (
    <Container fluid>
      <Row>
        <Col sm={3} className="d-flex flex-column align-items-center justify-content-center">
          hi
        </Col>
        <Col sm={9}>
          {/* <CustomersTable /> */}
        </Col>
      </Row>
      <Row>
        <Col>
            {/* <CityStats /> */}
        </Col>
      </Row>
    </Container>
  );
}
