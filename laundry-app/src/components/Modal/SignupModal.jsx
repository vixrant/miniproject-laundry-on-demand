import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Input,
  FormText,
} from 'reactstrap';

import { useHistory } from 'react-router-dom';

function SignupModal(props) {
  const { toggle, isOpen } = props;
  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onToken = useCallback((res) => {
    localStorage.setItem('token', res.data.token);
    toggle();
    history.push('/admin');
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/signup', {
      email,
      password,
      is_shop_owner: 0,
    })
      .then(onToken)
      .catch(err => alert(JSON.stringify(err)));
  }, [email, password]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        SIGNUP AS CUSTOMER
      </ModalHeader>
      <form onSubmit={onSubmit}>
        <ModalBody>
          <FormText>Your Name</FormText>
          <Input value={name} onChange={e => setName(e.target.value)} />

          <FormText>Email</FormText>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />

          <FormText>Password</FormText>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="info" size="sm" outline>Sign up</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default SignupModal;

SignupModal.defaultProps = {
  isOpen: false,
};

SignupModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};
