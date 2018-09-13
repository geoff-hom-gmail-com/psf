import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import './App.css';

const modalWindowPropTypes = {
  children: PropTypes.array.isRequired,
};

class ModalWindow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal-window">
        <button className="modal-close-button" type="button">X</button>
        {this.props.children}
      </div>
    );
  }
}

ModalWindow.propTypes = modalWindowPropTypes;

export default ModalWindow;
