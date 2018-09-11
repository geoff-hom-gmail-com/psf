import PropTypes from 'prop-types';
import React from 'react';
import './App.css';

const tablePropTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.array,
  header: PropTypes.element,
  mapFunction: PropTypes.func.isRequired,
};

const tableDefaultProps = {
  data: [],
  header: null,
};

// Make a table. Takes in a map function to make the rows.
function Table(props) {
  return (
    <div className={props.className}>
      {props.header}
      {props.data.map(props.mapFunction)}
    </div>
  );
}

Table.propTypes = tablePropTypes;
Table.defaultProps = tableDefaultProps;

export default Table;
