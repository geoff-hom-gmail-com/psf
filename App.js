import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './App.css';
import localData from './localTesting';
import logo from './logo.svg';

let keyCounter = 1;
// For unique keys. (https://reactjs.org/docs/lists-and-keys.html) Increment, then assign.

// Classes/functions are listed alphabetically.

// Default props.
const expandableRowDefaultProps = {
  rowComponent: null,
  table: null,
};

const fetchDefaultProps = {
  localData: null,
  testLocal: false,
};

const projectInfoRowDefaultProps = {
  data: {
    name: 'Project Meta',
    quotes: [],
  },
  hasNew: false,
};

const psfHeaderDefaultProps = {
  user: {
    name: 'Guest',
  },
};

const quoteRowDefaultProps = {
  data: {
    description: 'Quote 3',
    vendor: 'Fav Vendor',
    expirationDate: 'N/A',
    cost: 10,
  },
};

const tableDefaultProps = {
  data: [],
  header: null,
};

const tableHeaderDefaultProps = {};

// PropTypes.
const errorPropTypes = {
  message: PropTypes.string.isRequired,
};

const expandableRowPropTypes = {
  rowComponent: PropTypes.element,
  table: PropTypes.element,
};

const fetchPropTypes = {
  functionUsingData: PropTypes.func.isRequired,
  localData: PropTypes.shape({}),
  testLocal: PropTypes.bool,
  url: PropTypes.string.isRequired,
};

const projectInfoRowPropTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    quotes: PropTypes.array,
  }),
  hasNew: PropTypes.bool,
};

const psfHeaderPropTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const quoteRowPropTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
    vendor: PropTypes.string,
    expirationDate: PropTypes.string,
    cost: PropTypes.number,
  }),
};

const tablePropTypes = {
  data: PropTypes.array,
  header: PropTypes.element,
  mapFunction: PropTypes.func.isRequired,
  rootClassName: PropTypes.string.isRequired,
};

const tableHeaderPropTypes = {
  children: PropTypes.array.isRequired,
  rootClassName: PropTypes.string.isRequired,
};

// Show error in error section. Ends message with a period.
const Error = props => <p className="error">{`Error: ${props.message}.`}</p>;
Error.propTypes = errorPropTypes;

const ExpandableProjectRow = (project) => {
  const quoteTableHeader = (
    <TableHeader rootClassName="quote-table-header">
      <p className="quote-description">Description</p>
      <p className="quote-vendor">Vendor</p>
      <p className="quote-expiration">Expires</p>
      <p className="quote-cost">$</p>
    </TableHeader>
  );
  const quoteTable = (
    <Table
      data={project.quotes}
      header={quoteTableHeader}
      mapFunction={quote => <QuoteRow data={quote} key={(keyCounter += 1)} />}
      rootClassName="quote-table"
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
ExpandableRow.defaultProps = expandableRowDefaultProps;
ExpandableRow.propTypes = expandableRowPropTypes;

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

const ProjectInfoRow = props => (
  <div className="project-info-row">
    <p className="project-name">{props.data.name}</p>
    <p className="project-quotes">{props.data.quotes.length}</p>
    <p>{props.hasNew ? '(NEW)' : ' '}</p>
    <button type="button">EDIT</button>
  </div>
);
ProjectInfoRow.defaultProps = projectInfoRowDefaultProps;
ProjectInfoRow.propTypes = projectInfoRowPropTypes;

const PSF = () => {
  // To toggle local testing.
  // const testLocal = false;
  const testLocal = true;

  const url = 'https://jsonplaceholder.typicode.com/users/1';
  // To test fetch error, use line below.
  // const url = "https://wrongdomain.typicode.com";

  const projectTableHeader = (
    <TableHeader rootClassName="project-table-header">
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
              rootClassName="project-table"
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

const PSFHeader = (props) => {
  // Allow no user, null user, and user without name.
  const name = props.user ? props.user.name : 'Guest';

  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <h1 className="title">{`Welcome, ${name || 'Guest'}`}</h1>
      <button type="button">User Details</button>
    </header>
  );
};
PSFHeader.defaultProps = psfHeaderDefaultProps;
PSFHeader.propTypes = psfHeaderPropTypes;

const QuoteRow = props => (
  <div className="quote-row">
    <p className="quote-description">{props.data.description}</p>
    <p className="quote-vendor">{props.data.vendor}</p>
    <p className="quote-expiration">{props.data.expirationDate}</p>
    <p className="quote-cost">{`$${props.data.cost}`}</p>
    <button type="button">Details</button>
  </div>
);
QuoteRow.defaultProps = quoteRowDefaultProps;
QuoteRow.propTypes = quoteRowPropTypes;

// Make a table. Takes in a map function to make the rows.
const Table = props => (
  <div className={props.rootClassName}>
    {props.header}
    {props.data.map(props.mapFunction)}
  </div>
);
Table.defaultProps = tableDefaultProps;
Table.propTypes = tablePropTypes;

const TableHeader = props => <div className={props.rootClassName}>{props.children}</div>;
TableHeader.defaultProps = tableHeaderDefaultProps;
TableHeader.propTypes = tableHeaderPropTypes;

export default PSF;
