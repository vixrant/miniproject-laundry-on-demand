import React from 'react';

import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import ShopList from '../containers/Dashboard/Shops/ShopList';
import Map from '../containers/Map';


function Dashboard() {
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col sm={2} className="p-1 bg-warning">
          <ShopList />
        </Col>
        <Col className="p-0">
          <div className="d-flex flex-column w-100 h-100">
            <Map />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
