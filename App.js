import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Header(props) {
  return(
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome, David</h1>
      <button>User Details</button>
    </header>
  );
}

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

function Main(props) {

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

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
