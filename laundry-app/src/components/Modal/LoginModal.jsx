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

function LoginModal(props) {
  const { toggle, isOpen } = props;
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onToken = useCallback((res) => {
    localStorage.setItem('token', res.data.data.token);
    localStorage.setItem('name', res.data.data.name);
    localStorage.setItem('id', res.data.data.id);
    toggle();
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/signin', {
      email,
      password,
    })
      .then(onToken)
      .catch(err => alert(JSON.stringify(err)));
  }, [email, password]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>
        SIGN IN
      </ModalHeader>
      <form onSubmit={onSubmit}>
        <ModalBody>
          <FormText>Email</FormText>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />

          <FormText>Password</FormText>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="info" size="sm" outline>Sign in</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default LoginModal;

LoginModal.defaultProps = {
  isOpen: false,
};

LoginModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};
