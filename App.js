import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Quote(props) {
  return(
    <div className="quote">
      <p className="quote-description">{props.description}</p>
      <p className="quote-vendor">{props.vendor}</p>
      <p className="quote-expiration">{props.expirationDate}</p>
      <p className="quote-money">${props.money}</p>
      <button>Details</button>
    </div>
  )
}

class Project extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        showQuotes: false,
      };
    }

  handleClick() {
    console.log("hi2");
  //  alert('This is a test4');
    this.setState({
      showQuotes: !this.state.showQuotes,
    });
  }

  render() {

    // Add unique key to each quote. Instead of index, should use something else. Each quote should have a unique id in the database, or for production, could use short-id (https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)
    const quotes = this.props.quotes.map((quote, index) => {
      return React.cloneElement(quote, {key: index});
    });

    return(
      <div>
        <div className="project">
          {/* Upon clicking the button, quotes are shown/hidden.
            */}
          <button onClick={() => this.handleClick()}>
            +/-
          </button>
          <p className="project-name">{this.props.name}</p>
          <p className="project-quotes">{this.props.quotes.length}</p>
          <p>{this.props.hasNew ? '(NEW)' : ''}</p>
          <button>EDIT</button>
        </div>
        {/* If showQuotes = true, then show (evaluate) quotes.
          */}
        <div className="quotes">
          {this.state.showQuotes && quotes}
        </div>
      </div>
    );
  }
}

function ProjectTable(props) {

  // Placeholders until we connect to database.
  const carQuote1 = <Quote
    description="Transmission"
    vendor="Transmissions, Inc."
    expirationDate="8/22/18"
    money={2200}
  />
  const carQuote2 = <Quote
    description='Engine'
    vendor="Trump Engines"
    expirationDate="8/29/18"
    money={4000}
  />
  const carQuote3 = <Quote
    description="Tires"
    vendor="Goodyear"
    expirationDate="10/3/18"
    money={800}
  />
  const quotesForCar = [carQuote1, carQuote2, carQuote3];

  const houseQuote1 = <Quote
    description="Fence"
    vendor="John's Fence Builders"
    expirationDate="9/30/18"
    money={1000}
  />
  const houseQuote2 = <Quote
    description="3 Bathrooms"
    vendor="Home Depot"
    expirationDate="8/31/18"
    money={15600}
  />
  const quotesForHouse = [houseQuote1, houseQuote2];

  return(
    <div className="App-main">
      {/* Projects listed here.
        */}
      <Project
        name="Car"
        quotes={quotesForCar}
        hasNew={false}
      />
      <Project
        name="House"
        quotes={quotesForHouse}
        hasNew={false}
      />
    </div>
  );
}

function Footer(props) {
  return(
    <footer className="App-footer">
      <h1><a href="https://www.psf.com/">PSF</a></h1>
    </footer>
  )
}

class Header extends Component {
  render() {
    return(
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome, {this.props.user.name}</h1>
        <button>User Details</button>
      </header>
    );
  }
}

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
    // To test fetch error.
    // fetch("https://www.typicode.com/users/1")

    let testLocal = false;
    // Uncomment line below to test locally.
    testLocal = true;
    const user = {
      "id": 1,
      "name": "Bob Graham",
      "projects": [
        {
          "name": "Car2",
          "quotes": [
            {
              "description": "transmission"
            }, {
              "description": "engine"
            }
          ]
        }, {
          "name": "House2"
        }
      ]
    };

    if (testLocal) {
      this.setState({user});
    } else {
      fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          // I thought fetch didn't throw an error on 404. However, I couldn't get the error below to throw on 404. Leaving it in case.
          throw new Error(`Response was not ok. Status: ${response.status}.`);
        })
        .then(json => {
          // console.log("Old JSON: ", json);
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
        {/* Would prefer error message at top. In practice, it currently appears on page's bottom. Why?
          */}
        {error &&
          <div>There was a fetch error: {error.message}.</div>
        }
        <div>Hello, {this.state.user.name}.</div>
        <Header user={this.state.user}/>
        <ProjectTable />
        <Footer />
      </div>
    );
  }
}

export default App;
