import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactModal from 'react-modal';

import './App.css';

const quoteRowPropTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
    vendor: PropTypes.string,
    expirationDate: PropTypes.string,
    cost: PropTypes.number,
  }),
};

const quoteRowDefaultProps = {
  data: {
    description: 'Quote 3',
    vendor: 'Fav Vendor',
    expirationDate: 'N/A',
    cost: 10,
  },
};

class QuoteRow extends Component {
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
      <div className="quote-row">
        <p className="quote-description">{this.props.data.description}</p>
        <p className="quote-vendor">{this.props.data.vendor}</p>
        <p className="quote-expiration">{this.props.data.expirationDate}</p>
        <p className="quote-cost">{`$${this.props.data.cost}`}</p>
        <button onClick={this.openModal} type="button">
          Details
        </button>
        <ReactModal contentLabel="User Details" isOpen={this.state.modalIsOpen}>
          <p>{`Vendor: ${this.props.data.vendor}`}</p>
          <p>{`Description: ${this.props.data.description}`}</p>
          {/* To get the project name, not sure the best way.
            Could have quote.projectName field. Or pass props.project into QuoteRow.
            Passing a function/callback may also work.  */}
          <p>Project: (parent?)</p>
          <button onClick={this.closeModal} type="button">
            Close
          </button>
        </ReactModal>
      </div>
    );
  }
}

QuoteRow.propTypes = quoteRowPropTypes;
QuoteRow.defaultProps = quoteRowDefaultProps;

export default QuoteRow;
