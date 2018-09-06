import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

let keyCounter = 1;
// For unique keys. (https://reactjs.org/docs/lists-and-keys.html) Increment, then assign.

// Classes/functions are listed alphabetically.

class App extends Component {
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
      "id": 1,
      "name": "Bob Graham",
      "projects": [
        {
          "name": "Firebird",
          "quotes": [
            {
              "description": "Transmission",
              "vendor": "Transmissions, Inc.",
              "expirationDate": "8.22.18",
              "cost": 2200
            }, {
              "description": "Engine",
              "vendor": "Trump Engines",
              "expirationDate": "8.29.18",
              "cost": 4000
            }
          ]
        }, {
          "name": "House",
          "quotes": []
        }
      ]
    };

    let testLocal = false;
    // Uncomment line below to test locally.
    testLocal = true;

    if (testLocal) {
      this.setState({
        user
      });
    } else {
      let url = "https://jsonplaceholder.typicode.com/users/1";
      // To test fetch error, uncomment line below.
      // url = "https://wrongdomain.typicode.com";

      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          // I thought fetch didn't throw an error on 404. However, I couldn't get the error below to throw on 404. Leaving it in case.
          throw new Error(`Response was not ok. Status: ${response.status}.`);
        })
        .then(json => {
          // console.log("json name: ", json.name);
          // Not sure how best to get data. Probably call function here to populate user from json.
          // PrevState and the spread operator are safer: https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react. Not sure how to safely and cleanly update the state of just one property. Perhaps don't want to have entire user object in component state. It's not the model; it's managing the UI state of the component.
          this.setState(prevState => ({user: {...prevState.user, name: json.name} }) );
        })
        .catch(error => {
          console.log(`There was a fetch error: ${error.message}.`);
          this.setState({error});
        });
    }
  }

  render() {
    const error = this.state.error;
    const user = this.state.user;
    const projectTableHeader =
      <TableHeader rootClassName={"project-table-header"}>
        <p></p>
        <p className="project-name">Project name</p>
        <p className="project-quotes">Quotes</p>
        <p>New?</p>
      </TableHeader>;
    const quoteTableHeader =
      <TableHeader rootClassName={"quote-table-header"}>
        <p className="quote-description">Description</p>
        <p className="quote-vendor">Vendor</p>
        <p className="quote-expiration">Expires</p>
        <p className="quote-cost">$</p>
      </TableHeader>;

    return (
      <div className="App">
        {/* Would prefer error message at top. In practice, it currently appears on page's bottom. Why? Something to do with being async?
          */}
        {error ?
          `There was a fetch error: ${error.message}.` :
          null
        }
        <Header user={user} />

        {/* A project table. Each row can expand into a quote table. */}
        <Table
          data={user.projects}
          header={projectTableHeader}
          mapFunction={project => {
            const quoteTable =
              <Table
                data={project.quotes}
                header={quoteTableHeader}
                mapFunction={quote =>
                  <QuoteRow data={quote} key={++keyCounter} />
                }
                rootClassName={"quote-table"} />;

            return (
              <ExpandableRow
                key={++keyCounter}
                rowComponent={<ProjectInfoRow data={project} />}
                table={quoteTable} />
            )}
          }
          rootClassName={"project-table"} />

        <Footer />
      </div>
    );
  }
}

// Show a row. Can toggle a table below that.
class ExpandableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTable: false,
    };
  }

  toggleTable() {
    this.setState({
      showTable: !this.state.showTable,
    });
  }

  render() {
    return (
      <Fragment>
        <div className="expandable-project-row">
          <button onClick={() => this.toggleTable()}>+/-</button>
          {this.props.rowComponent}
        </div>
        {this.state.showTable ? this.props.table : null}
      </Fragment>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <h1><a href="https://www.psf.com/">PSF</a></h1>
      </footer>
    )
  }
}

class Header extends Component {
  static defaultProps = {
    user: {
      name: "Guest"
    },
  }

  render() {
    return (
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="title">Welcome, {this.props.user.name}</h1>
        <button>User Details</button>
      </header>
    );
  }
}

class ProjectInfoRow extends Component {
  static defaultProps = {
    data: {
      name: "Project Meta",
      quotes: []
    },
  }

  render() {
    return (
      <div className="project-info-row">
        <p className="project-name">{this.props.data.name}</p>
        <p className="project-quotes">{this.props.data.quotes.length}</p>
        <p>{this.props.hasNew ? '(NEW)' : ' '}</p>
        <button>EDIT</button>
      </div>
    );
  }
}

class QuoteRow extends Component {
  static defaultProps = {
    data: {
      description: "Quote 3",
      vendor: "Fav Vendor",
      expirationDate: "N/A",
      cost: "10"
    },
  }

  render() {
    return (
      <div className="quote-row">
        <p className="quote-description">{this.props.data.description}</p>
        <p className="quote-vendor">{this.props.data.vendor}</p>
        <p className="quote-expiration">{this.props.data.expirationDate}</p>
        <p className="quote-cost">${this.props.data.cost}</p>
        <button>Details</button>
      </div>
    );
  }
}

// Make a table. Takes in a map function to make the rows.
class Table extends Component {
  static defaultProps = {
    data: [],
  }

  render() {
    return (
      <div className={this.props.rootClassName}>
        {this.props.header}
        {this.props.data.map(this.props.mapFunction)}
      </div>
    );
  }
}

class TableHeader extends Component {
  render() {
    return (
      <div className={this.props.rootClassName}>
        {this.props.children}
      </div>
    );
  }
}

export default App;
