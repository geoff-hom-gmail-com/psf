import PropTypes from 'prop-types';
import React from 'react';

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

function QuoteRow(props) {
  return (
    <div className="quote-row">
      <p className="quote-description">{props.data.description}</p>
      <p className="quote-vendor">{props.data.vendor}</p>
      <p className="quote-expiration">{props.data.expirationDate}</p>
      <p className="quote-cost">{`$${props.data.cost}`}</p>
      <button type="button">Details</button>
    </div>
  );
}

QuoteRow.propTypes = quoteRowPropTypes;
QuoteRow.defaultProps = quoteRowDefaultProps;

export default QuoteRow;
