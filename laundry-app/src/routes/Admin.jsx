import React, { useState } from 'react';

import classnames from 'classnames';

import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Button,
} from 'reactstrap';

import CustomersStats from '../containers/Admin/Customers';

function NavTab({ id, onClick, activeTab, children }) {
  return (
    <NavItem>
      <NavLink
        className={classnames({ active: activeTab === id })}
        onClick={() => { onClick(id); }}
      >
        {children}
      </NavLink>
    </NavItem>
  );
}

export default function Admin() {
  const [activeTab, setTab] = useState(1);

  return (
    <main>
      <Nav tabs>
        <NavTab id={1} onClick={setTab} activeTab={activeTab}>Customers</NavTab>
        <NavTab id={2} onClick={setTab} activeTab={activeTab}>Shops</NavTab>
        <NavTab id={3} onClick={setTab} activeTab={activeTab}>Appointments</NavTab>
        {/* <NavTab id={4} onClick={setTab} activeTab={activeTab}>Bills</NavTab> */}
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId={1}>
          <CustomersStats />
        </TabPane>

        <TabPane tabId={2}>
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </main>
  );
}
