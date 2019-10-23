import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'reactstrap';

export default function LaundromatCard(props) {
  const { name } = props;

  return (
    <Card>
      <Card.Header>{name}</Card.Header>
    </Card>
  );
}

LaundromatCard.propTypes = {
  name: PropTypes.string.isRequired,
};
