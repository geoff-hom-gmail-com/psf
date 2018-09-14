import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactModal from 'react-modal';

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

class PSFHeader extends Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);
    // Allow user without name.
    this.name = props.user ? props.user.name : 'Guest';
    this.openModal = this.openModal.bind(this);

    this.state = {
      modalIsOpen: false,
    };
  }

  componentWillMount() {
    ReactModal.setAppElement('#root');
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  render() {
    return (
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        {/* Allow no user, null user. */}
        <h1 className="title">{`Welcome, ${this.name || 'Guest'}`}</h1>
        <button onClick={this.openModal} type="button">
          User Details
        </button>
        <ReactModal contentLabel="User Details" isOpen={this.state.modalIsOpen}>
          <p>This should be in modal</p>
          <button onClick={this.closeModal} type="button">
            Close
          </button>
        </ReactModal>
      </header>
    );
  }
}

PSFHeader.propTypes = psfHeaderPropTypes;
PSFHeader.defaultProps = psfHeaderDefaultProps;

export default PSFHeader;
