import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './App.css';
import Error from './Error';
import ExpandableRow from './ExpandableRow';
import localData from './localTesting';
import ProjectInfoRow from './ProjectInfoRow';
import PSFHeader from './PSFHeader';
import QuoteRow from './QuoteRow';
import Table from './Table';

let keyCounter = 1;
// For unique keys. (https://reactjs.org/docs/lists-and-keys.html) Increment, then assign.

// Classes/functions are listed alphabetically.

// PropTypes.

const fetchPropTypes = {
  functionUsingData: PropTypes.func.isRequired,
  localData: PropTypes.shape({}),
  testLocal: PropTypes.bool,
  url: PropTypes.string.isRequired,
};

const tableHeaderPropTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
};

// Default props.

const fetchDefaultProps = {
  localData: null,
  testLocal: false,
};

const tableHeaderDefaultProps = {};


const ExpandableProjectRow = (project) => {
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
};

// Fetch url, then send the data to the given function.
class Fetch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      json: null,
    };
  }

  componentDidMount() {
    if (this.props.testLocal) {
      this.setState({ json: this.props.localData });
    } else {
      fetch(this.props.url)
        .then((response) => {
          // We check the response status as fetch won't throw on 404, but we want it to.
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Response was not ok. Status: ${response.status}.`);
        })
        .then((json) => {
          this.setState({ json });
        })
        .catch((error) => {
          this.setState({ error });
        });
    }
  }

  render() {
    const error = this.state.error;
    const json = this.state.json;
    return (
      <Fragment>
        {error ? <Error message={`Fetch: ${error.message}`} /> : null}
        {json ? this.props.functionUsingData(json) : null}
      </Fragment>
    );
  }
}
Fetch.defaultProps = fetchDefaultProps;
Fetch.propTypes = fetchPropTypes;

const PSF = () => {
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
};

const PSFFooter = () => (
  <footer className="footer">
    <h1>
      <a href="https://www.psf.com/">PSF</a>
    </h1>
  </footer>
);

const TableHeader = props => <div className={props.className}>{props.children}</div>;
TableHeader.defaultProps = tableHeaderDefaultProps;
TableHeader.propTypes = tableHeaderPropTypes;

export default PSF;
