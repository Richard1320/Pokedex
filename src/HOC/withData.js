// https://reactjs.org/docs/higher-order-components.html

import React, { Component } from 'react';
import URLPattern from 'url-pattern';

import { fileFetchData } from '../Helpers';

// This function takes a component...
export default function withData(WrappedComponent, URL, optionalParams) {
  // ...and returns another component...
  class HOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {},
      };
      this.routePattern = new URLPattern(URL);
    }

    componentDidMount() {
      // Reverse engineer route with parameters (like ID)
      let routeParams = Object.assign(
        {},
        this.props.match.params,
        optionalParams || {}
      );
      let dataPath = this.routePattern.stringify(routeParams);
      this.fetchData(dataPath);
    }
    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (
        prevProps.match.params.id &&
        prevProps.match.params.id !== this.props.match.params.id
      ) {
        let routeParams = this.props.match.params;
        let dataPath = this.routePattern.stringify(routeParams);
        this.fetchData(dataPath);
      }
    }
    fetchDataCallback(json) {
      this.setState({
        data: json,
      });
    }
    fetchData(dataPath) {
      if (!dataPath) return;
      fileFetchData(dataPath, this.fetchDataCallback.bind(this));
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  }

  return HOC;
}
