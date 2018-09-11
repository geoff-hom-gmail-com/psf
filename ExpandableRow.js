import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './App.css';

const expandableRowPropTypes = {
  rowComponent: PropTypes.element,
  table: PropTypes.element,
};

const expandableRowDefaultProps = {
  rowComponent: null,
  table: null,
};

// Show a row. Can toggle a table below that.
class ExpandableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTable: false,
    };
  }

  toggleTable() {
    this.setState(prevState => ({ showTable: !prevState.showTable }));
  }

  render() {
    return (
      <Fragment>
        <div className="expandable-project-row">
          <button onClick={() => this.toggleTable()} type="button">
            +/-
          </button>
          {this.props.rowComponent}
        </div>
        {this.state.showTable ? this.props.table : null}
      </Fragment>
    );
  }
}

ExpandableRow.propTypes = expandableRowPropTypes;
ExpandableRow.defaultProps = expandableRowDefaultProps;

export default ExpandableRow;
