import React, { useState, useCallback, useMemo } from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import { useParams, NavLink } from 'react-router-dom';

import { useMutation, useQuery } from 'react-apollo';
import * as queries from '../graphql/queries';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { useList, useToggle } from 'react-use';

function AddItemModal({ isOpen, toggle, onAdd }) {
  const { data: itemTypes } = useQuery(queries.GET_ITEM_TYPES);
  const [q, setQ] = useState(0);
  const [item, setItem] = useState(0);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    onAdd({
      ...item,
      quantity: q,
    });
    toggle();
  }, [item, q, toggle]);

  return (
    <Modal color="info" toggle={toggle} isOpen={isOpen}>
      <ModalHeader>Add Item</ModalHeader>
      <ModalBody className="d-flex flex-column">
        <Label>Type</Label>
        <Input type="select" value={item.type_id || '-'} onChange={e => setItem(itemTypes.item_types.find(t => t.type_id === e.target.value))}>
          <option value="-"> - </option>
          {itemTypes && itemTypes.item_types.map((t, i) => <option key={t.type_id} value={t.type_id}>{t.name} - {t.dry_cleaning_price} - {t.ironing_price}</option>)}
        </Input>
        <Label className="mt-1">Quantity</Label>
        <Input type="number" value={q} onChange={e => setQ(e.target.value)} />
        {(q && item)
          ? (
            <div className="mt-1">
              <h6>Total Price: {q * item.dry_cleaning_price}</h6>
            </div>
          )
          : ''
        }
      </ModalBody>
      <ModalFooter>
        <form onSubmit={onSubmit}>
          <Button color="info" type="submit">Submit</Button>
        </form>
      </ModalFooter>
    </Modal>
  );
}

function ItemsPicker() {
  const [modalOpen, toggleModal] = useToggle(false);
  const [itemsList, listOps] = useList();

  return (
    <Card color="secondary">
      <CardBody>
        <ListGroup flush>
          {itemsList.map(e => <ListGroupItem>{e.name} x {e.quantity}</ListGroupItem>)}
        </ListGroup>
      </CardBody>
      <CardFooter className="d-flex flex-column">
        <Button onClick={toggleModal}>Add Item</Button>
        <AddItemModal toggle={toggleModal} isOpen={modalOpen} onAdd={listOps.push} />
      </CardFooter>
    </Card>
  );
}

function Appointment() {
  const { id } = useParams();

  const [sDate, setSDate] = useState();

  const addAppointment = useMutation(queries.ADD_APPOINTMENT);

  const { data: shopData } = useQuery(queries.GET_SHOP_BY_ID, {
    variables: {
      id,
    },
  });

  const name = useMemo(() => {
    if (shopData) {
      return `with ${shopData.shops_by_pk.name}`;
    }

    return '';
  }, [shopData]);

  return (
    <div className="w-100 h-100 d-flex p-10 justify-content-center alig-items-center bg-warning p-1">
      <Card>
        <CardHeader>
          <h1>Booking an Appointment {name}</h1>
        </CardHeader>
        <CardBody className="d-flex flex-column">
          <span color="text-black-50">Select date to schedule:</span>

          <DatePicker
            customInput={<Input />}
            selected={sDate}
            onChange={setSDate}
            className="mb-2"
          />
          <ItemsPicker />
        </CardBody>
        <CardFooter className="justify-content-center w-100">
          <form>
            <Button disabled={!sDate} tag={NavLink} to="/" className=" w-100 btn-outline-success">SUBMIT</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Appointment;
