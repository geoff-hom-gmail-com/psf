import React, { Component } from 'react';
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

// move this later to wherever it belongs
  componentDidMount() {
    let testLocal = false;
    // Uncomment line below to test locally.
    testLocal = true;

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

    if (testLocal) {
      console.log("testing local");
      this.setState({
        user
      });
    } else {
      // To test fetch error, uncomment below and comment normal URL.
      // fetch("https://www.typicode.com/users/1")

      fetch("https://jsonplaceholder.typicode.com/users/1")
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
    return (
      <div className="App">
        {/* Would prefer error message at top. In practice, it currently appears on page's bottom. Why? Something to do with being async?
          */}
        {error ?
          <div>There was a fetch error: {error.message}.</div> :
          null
        }
        <Header user={this.state.user}/>
        <ProjectTable projects={this.state.user.projects}/>
        <Footer />
      </div>
    );
  }
}

class ExpandableProjectRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuotes: false,
    };
  }

  toggleQuotes() {
    this.setState({
      showQuotes: !this.state.showQuotes,
    });
  }

  render() {
    return(
      <div>
        <div className="expandable-project-row">
          <button onClick={() => this.toggleQuotes()}>+/-</button>
          <ProjectInfoRow project={this.props.project} />
        </div>
        {this.state.showQuotes ?
          <QuoteTable quotes={this.props.project.quotes}/> :
          null
        }
      </div>
    );
  }
}

class Footer extends Component {
  render() {
    return(
      <footer className="footer">
        <h1><a href="https://www.psf.com/">PSF</a></h1>
      </footer>
    )
  }
}

class Header extends Component {
  render() {
    return(
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="title">Welcome, {this.props.user.name}</h1>
        <button>User Details</button>
      </header>
    );
  }
}

class ProjectInfoRow extends Component {
  render() {
    return(
      <div className="project-info-row">
        <p className="project-name">{this.props.project.name}</p>
        <p className="project-quotes">{this.props.project.quotes.length}</p>
        <p>{this.props.hasNew ? '(NEW)' : ' '}</p>
        <button>EDIT</button>
      </div>
    );
  }
}

class ProjectTable extends Component {
  render() {
    const projects = [];
    const theProjects = this.props.projects;
    if (theProjects) {
      theProjects.forEach( (project) => {
        projects.push(
          <ExpandableProjectRow
            project={project}
            key={++keyCounter}
          />
        );
      });
    }

    return(
      <div className="project-table">
        <ProjectTableHeader />
        {projects}
      </div>
    );
  }
}

class ProjectTableHeader extends Component {
  render() {
    return(
      <div className="project-table-header">
        <p></p>
        <p className="project-name">Project name</p>
        <p className="project-quotes">Quotes</p>
        <p>New?</p>
      </div>
    );
  }
}

class QuoteRow extends Component {
  render() {
    return(
      <div className="quote-row">
        <p className="quote-description">{this.props.quote.description}</p>
        <p className="quote-vendor">{this.props.quote.vendor}</p>
        <p className="quote-expiration">{this.props.quote.expirationDate}</p>
        <p className="quote-cost">${this.props.quote.cost}</p>
        <button>Details</button>
      </div>
    );
  }
}

class QuoteTable extends Component {
  render() {
    const quotes = [];
    const theQuotes = this.props.quotes;
    if (theQuotes) {
      theQuotes.forEach( (quote) => {
        quotes.push(
          <QuoteRow
            quote={quote}
            key={++keyCounter}
          />
        );
      });
    }

    return(
      <div className="quote-table">
        <QuoteTableHeader />
        {quotes}
      </div>
    );
  }
}

class QuoteTableHeader extends Component {
  render() {
    return(
      <div className="quote-table-header">
        <p className="quote-description">Description</p>
        <p className="quote-vendor">Vendor</p>
        <p className="quote-expiration">Expires</p>
        <p className="quote-cost">$</p>
      </div>
    );
  }
}

export default App;
