// https://reactjs.org/docs/higher-order-components.html

import React, { Component } from 'react';
import URLPattern from 'url-pattern';
import axios from 'axios';

// This function takes a component...
export default function withData(WrappedComponent, jsonFile) {
  // ...and returns another component...
  class HOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {},
      };
      this.routePattern = new URLPattern(jsonFile);
    }

    componentDidMount() {
      // Reverse engineer route with parameters (like ID)
      let routeParams = Object.assign({}, this.props.match.params);
      this.fetchData(routeParams);
    }
    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      let prevID;
      let newID;
      try {
        prevID = prevProps.match.params.id;
        newID = this.props.match.params.id;
      } catch (err) {
        return;
      }
      if (prevID !== newID) {
        // Reset state data
        this.setState({
          data: {},
        });

        let routeParams = this.props.match.params;

        this.fetchData(routeParams);
      }
    }
    fetchDataCallback(response) {
      // Merge JSON with existing data
      let data = Object.assign(this.state.data, response.data);

      this.setState({
        data: data,
      });
    }
    fetchData(routeParams) {
      // Loop through array of JSON files
      let dataPath = this.routePattern.stringify(routeParams);
      if (!dataPath) return;
      axios.get(dataPath).then(this.fetchDataCallback.bind(this));
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent {...this.props} data={this.state.data} />;
    }
  }

  return HOC;
}
