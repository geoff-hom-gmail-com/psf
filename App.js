import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

let keyCounter = 1;
// For unique keys. (https://reactjs.org/docs/lists-and-keys.html) Increment, then assign.

const expandableRowDefaultProps = {
  rowComponent: null,
  table: null,
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

const expandableRowPropTypes = {
  rowComponent: PropTypes.element,
  table: PropTypes.element,
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

// Classes/functions are listed alphabetically.

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

class PSF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // To report fetch error.
      error: null,

      user: {},
    };
  }

  // move this later to wherever it belongs; maybe I can extract Fetch code with render prop?
  componentDidMount() {
    const user = {
      id: 1,
      name: 'Bob Graham',
      projects: [
        {
          name: 'Firebird',
          quotes: [
            {
              description: 'Transmission',
              vendor: 'Transmissions, Inc.',
              expirationDate: '8.22.18',
              cost: 2200,
            },
            {
              description: 'Engine',
              vendor: 'Trump Engines',
              expirationDate: '8.29.18',
              cost: 4000,
            },
          ],
        },
        {
          name: 'House',
          quotes: [],
        },
      ],
    };

    // const testLocal = false;
    // Uncomment line below to test locally.
    const testLocal = true;

    if (testLocal) {
      this.setState({
        user,
      });
    } else {
      const url = 'https://jsonplaceholder.typicode.com/users/1';
      // To test fetch error, use line below.
      // const url = "https://wrongdomain.typicode.com";

      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          // I thought fetch didn't throw an error on 404. However, I couldn't
          // get the error below to throw on 404. Leaving it in case.
          throw new Error(`Response was not ok. Status: ${response.status}.`);
        })
        .then((json) => {
          // console.log("json name: ", json.name);
          // Not sure how best to get data. Probably call function here to populate user from json.
          // PrevState and the spread operator are safer: https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react. Not sure how to safely and cleanly update the state of just one property. Perhaps don't want to have entire user object in component state. It's not the model; it's managing the UI state of the component.
          this.setState(prevState => ({
            user: { ...prevState.user, name: json.name },
          }));
        })
        .catch((error) => {
          // console.log(`There was a fetch error: ${error.message}.`);
          this.setState({ error });
        });
    }
  }

  render() {
    const error = this.state.error;
    const user = this.state.user;
    const projectTableHeader = (
      <TableHeader rootClassName="project-table-header">
        <p />
        <p className="project-name">Project name</p>
        <p className="project-quotes">Quotes</p>
        <p>New?</p>
      </TableHeader>
    );
    const quoteTableHeader = (
      <TableHeader rootClassName="quote-table-header">
        <p className="quote-description">Description</p>
        <p className="quote-vendor">Vendor</p>
        <p className="quote-expiration">Expires</p>
        <p className="quote-cost">$</p>
      </TableHeader>
    );

    return (
      <div className="App">
        {/* Would prefer error message at top. In practice, it currently
          appears on page's bottom. Why? Something to do with being async?
          */}
        {error ? `There was a fetch error: ${error.message}.` : null}

        <PSFHeader user={user} />

        {/* A project table. Each row can expand into a quote table. */}
        <Table
          data={user.projects}
          header={projectTableHeader}
          mapFunction={(project) => {
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
          }}
          rootClassName="project-table"
        />

        <PSFFooter />
      </div>
    );
  }
}

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
