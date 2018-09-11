import PropTypes from 'prop-types';
import React from 'react';
import './App.css';
import logo from './logo.svg';

const psfHeaderPropTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const psfHeaderDefaultProps = {
  user: {
    name: 'Guest',
  },
};

function PSFHeader(props) {
  // Allow no user, null user, and user without name.
  const name = props.user ? props.user.name : 'Guest';

  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <h1 className="title">{`Welcome, ${name || 'Guest'}`}</h1>
      <button type="button">User Details</button>
    </header>
  );
}

PSFHeader.propTypes = psfHeaderPropTypes;
PSFHeader.defaultProps = psfHeaderDefaultProps;

export default PSFHeader;
