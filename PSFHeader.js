import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './App.css';
import logo from './logo.svg';
import Modal from './Modal';

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

    // Allow user without name.
    this.name = props.user ? props.user.name : 'Guest';
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    // show the Modal, somehow; I guess it's always there, mounted away properly as the entire header was rendered. It's basically returning null if the props for "open" is false. So it's mounting nothing or all of it, but it's always mounted. Here, we can just store state of whether to have the modal open or closed, then pass that as props.
    console.log('test12');
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
        <Modal>
          <div className="modal">
            <p>this should be in modal</p>
            <button type="button">ClickHere</button>
          </div>
        </Modal>
      </header>
    );
  }
}

PSFHeader.propTypes = psfHeaderPropTypes;
PSFHeader.defaultProps = psfHeaderDefaultProps;

export default PSFHeader;
