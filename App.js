import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import './App.css';
import ExpandableRow from './ExpandableRow';
import Fetch from './Fetch';
import localData from './localTesting';
import ProjectInfoRow from './ProjectInfoRow';
import PSFHeader from './PSFHeader';
import QuoteRow from './QuoteRow';
import Table from './Table';

let keyCounter = 1;
// For unique keys. (https://reactjs.org/docs/lists-and-keys.html) Increment, then assign.

// Classes/functions are listed alphabetically.

// PropTypes.

const tableHeaderPropTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
};

// Default props.

const tableHeaderDefaultProps = {};

function ExpandableProjectRow(project) {
  const quoteTableHeader = (
    <TableHeader className="quote-table-header">
      <p className="quote-description">Description</p>
      <p className="quote-vendor">Vendor</p>
      <p className="quote-expiration">Expires</p>
      <p className="quote-cost">$</p>
    </TableHeader>
  );
  const quoteTable = (
    <Table
      className="quote-table"
      data={project.quotes}
      header={quoteTableHeader}
      mapFunction={quote => <QuoteRow data={quote} key={(keyCounter += 1)} />}
    />
  );

  return (
    <ExpandableRow
      key={(keyCounter += 1)}
      rowComponent={<ProjectInfoRow data={project} />}
      table={quoteTable}
    />
  );
}

function PSF() {
  // To toggle local testing.
  // const testLocal = false;
  const testLocal = true;

  const url = 'https://jsonplaceholder.typicode.com/users/1';
  // To test fetch error, use line below.
  // const url = "https://wrongdomain.typicode.com";

  const projectTableHeader = (
    <TableHeader className="project-table-header">
      <p />
      <p className="project-name">Project name</p>
      <p className="project-quotes">Quotes</p>
      <p>New?</p>
    </TableHeader>
  );

  return (
    <div className="psf">
      <Fetch
        functionUsingData={user => (
          <Fragment>
            <PSFHeader user={user} />

            {/* A project table. Each row can expand into a quote table. */}
            <Table
              data={user.projects}
              header={projectTableHeader}
              mapFunction={ExpandableProjectRow}
              className="project-table"
            />

            <PSFFooter />
          </Fragment>
        )}
        localData={localData}
        testLocal={testLocal}
        url={url}
      />
    </div>
  );
}

function PSFFooter() {
  return (
    <footer className="footer">
      <h1>
        <a href="https://www.psf.com/">PSF</a>
      </h1>
    </footer>
  );
}

function TableHeader(props) {
  return <div className={props.className}>{props.children}</div>;
}

TableHeader.propTypes = tableHeaderPropTypes;
TableHeader.defaultProps = tableHeaderDefaultProps;

export default PSF;
