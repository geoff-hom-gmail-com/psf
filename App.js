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
      <p>{props.description}</p>
      <p>{props.vendor}</p>
      <p>{props.expirationDate}</p>
      <p>${props.money}</p>
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
    console.log("hi");
  //  alert('This is a test4');
    this.setState({
      showQuotes: !this.state.showQuotes,
    });
  }

  render() {
    const quotesFromDB = [1, 2];
    const quotes = quotesFromDB.map((quote, index) => {
      return (
        <Quote key={index.toString()}
          description={'(description, quote ' + (index + 1) + ')'}
          vendor="Trump"
          expirationDate="(date format)"
          // Return random number between 2000 and 4999. For sample data.
          money={Math.floor((Math.random() * 3000) + 2000)}
        />
      );
    });

    return(
      <div>
        <div className="project">
          {/* Upon clicking the button, quotes are shown/hidden.
            */}
          <button onClick={() => this.handleClick()}>
            +/-
          </button>
          <p>{this.props.name}</p>
          <p>{this.props.quotes}</p>
          {/* <p>{this.props.hasNew ? '(NEW)' : ''}</p> */}
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
  return(
    <div className="App-main">
      {/* Projects listed here.
        */}
      <Project
        name="Space Force"
        quotes={7}
        hasNew={true}
      />
      <Project
        name="P4"
        quotes={2}
        hasNew={false}
      />
    </div>
  );
}

function Footer(props) {
  return(
    <footer className="App-footer">
      <h1><a href="https://www.psf.com/">PSF website</a></h1>
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
