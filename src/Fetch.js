import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import Error from './Error';

const fetchPropTypes = {
  functionUsingData: PropTypes.func.isRequired,
  localData: PropTypes.shape({}),
  testLocal: PropTypes.bool,
  url: PropTypes.string.isRequired,
};

const fetchDefaultProps = {
  localData: null,
  testLocal: false,
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

Fetch.propTypes = fetchPropTypes;
Fetch.defaultProps = fetchDefaultProps;

export default Fetch;
