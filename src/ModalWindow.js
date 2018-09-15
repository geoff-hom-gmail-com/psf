import PropTypes from 'prop-types';
import React from 'react';

import './App.css';

const modalWindowPropTypes = {
  children: PropTypes.array.isRequired,
};

function ModalWindow(props) {
  return (
    <div className="modal-window">
      <button className="modal-close-button" type="button">X</button>
      {props.children}
    </div>
  );
}

ModalWindow.propTypes = modalWindowPropTypes;

export default ModalWindow;
