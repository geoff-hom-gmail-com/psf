import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactModal from 'react-modal';

import './App.css';

const projectInfoRowPropTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    quotes: PropTypes.array,
  }),
  hasNew: PropTypes.bool,
};

const projectInfoRowDefaultProps = {
  data: {
    name: 'Project Meta',
    quotes: [],
  },
  hasNew: false,
};

class ProjectInfoRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  render() {
    return (
      <div className="project-info-row">
        <p className="project-name">{this.props.data.name}</p>
        <p className="project-quotes">{this.props.data.quotes.length}</p>
        <p>{this.props.hasNew ? '(NEW)' : ' '}</p>
        <button onClick={this.openModal} type="button">
          Edit
        </button>
        <ReactModal contentLabel="User Details" isOpen={this.state.modalIsOpen}>
          <p>{`Description: ${this.props.data.name}`}</p>
          <p><a href="mailto:nowhere@fakedomain.com">Email vendor</a></p>
          <p>Budget: ___</p>
          <button onClick={this.closeModal} type="button">
            Close
          </button>
        </ReactModal>
      </div>
    );
  }
}

ProjectInfoRow.propTypes = projectInfoRowPropTypes;
ProjectInfoRow.defaultProps = projectInfoRowDefaultProps;

export default ProjectInfoRow;
