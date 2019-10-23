import React, { useEffect, useCallback } from 'react';

import { useToggle, useLocalStorage } from 'react-use';

import {
  Navbar,
  NavbarBrand,
  Button,
  ButtonGroup,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';

import LoginModal from '../Modal/LoginModal';
import SignupModal from '../Modal/SignupModal';

const UnauthButtons = ({ toggleLoginModal, toggleSignupModal }) => (
  <ButtonGroup size="sm">
    <Button color="secondary" onClick={() => toggleLoginModal()}>Login</Button>
    <Button color="dark" onClick={() => toggleSignupModal()}>Register</Button>
  </ButtonGroup>
);

const AuthenticatedButtons = ({ name }) => {
  const onLogOut = useCallback(() => {
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
  }, [localStorage]);

  return (
    <ButtonGroup size="sm">
      <Button color="info">Hello, {name}</Button>
      <Button outline color="warning" onClick={onLogOut}>Log Out</Button>
    </ButtonGroup>
  )
};

function CustomNavbar(props) {
  const [loginModalOpen, toggleLoginModal] = useToggle();
  const [signupModalOpen, toggleSignupModal] = useToggle();

  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');

  return (
    <Navbar sticky="top" color="primary">
      <NavLink to='/'>
        <NavbarBrand className="text-light">
          Laundromat
        </NavbarBrand>
      </NavLink>
      <section className="flex-grow-1 d-flex justify-content-end">
        {!token
          ? <UnauthButtons toggleLoginModal={toggleLoginModal} toggleSignupModal={toggleSignupModal} />
          : <AuthenticatedButtons name={name} />
        }
        <LoginModal isOpen={loginModalOpen} toggle={toggleLoginModal} />
        <SignupModal isOpen={signupModalOpen} toggle={toggleSignupModal} />
      </section>
    </Navbar>
  );
}

export default CustomNavbar;
