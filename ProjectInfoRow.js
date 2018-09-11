import PropTypes from 'prop-types';
import React from 'react';
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

function ProjectInfoRow(props) {
  return (
    <div className="project-info-row">
      <p className="project-name">{props.data.name}</p>
      <p className="project-quotes">{props.data.quotes.length}</p>
      <p>{props.hasNew ? '(NEW)' : ' '}</p>
      <button type="button">EDIT</button>
    </div>
  );
}

ProjectInfoRow.propTypes = projectInfoRowPropTypes;
ProjectInfoRow.defaultProps = projectInfoRowDefaultProps;

export default ProjectInfoRow;
