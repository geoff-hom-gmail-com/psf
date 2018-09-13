import PropTypes from 'prop-types';
import React from 'react';

import './App.css';

const tableHeaderPropTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
};

const tableHeaderDefaultProps = {};

function TableHeader(props) {
  return <div className={props.className}>{props.children}</div>;
}

TableHeader.propTypes = tableHeaderPropTypes;
TableHeader.defaultProps = tableHeaderDefaultProps;

export default TableHeader;
