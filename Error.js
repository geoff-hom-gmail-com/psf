import PropTypes from 'prop-types';
import React from 'react';
import './App.css';

const errorPropTypes = {
  message: PropTypes.string.isRequired,
};

// Show error in error section. Ends message with a period.
function Error(props) {
  return <p className="error">{`Error: ${props.message}.`}</p>;
}

Error.propTypes = errorPropTypes;

export default Error;
