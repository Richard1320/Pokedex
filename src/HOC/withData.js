// https://reactjs.org/docs/higher-order-components.html

import React, { Component } from 'react';
import URLPattern from 'url-pattern';

import { fileFetchData } from '../Helpers';

// This function takes a component...
export default function withData(WrappedComponent, jsonFiles, optionalParams) {
  // ...and returns another component...
  class HOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {},
      };
      this.routePattern = [];

      // Check if multiple JSON files are to be loaded
      if (Array.isArray(jsonFiles)) {
        for (let i = 0; i < jsonFiles.length; i++) {
          this.routePattern.push(new URLPattern(jsonFiles[i]));
        }
      } else {
        this.routePattern.push(new URLPattern(jsonFiles));
      }
    }

    componentDidMount() {
      // Reverse engineer route with parameters (like ID)
      let routeParams = Object.assign(
        {},
        this.props.match.params,
        optionalParams || {}
      );
      for (let i = 0; i < this.routePattern.length; i++) {
        let dataPath = this.routePattern[i].stringify(routeParams);
        this.fetchData(dataPath);
      }
    }
    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (
        prevProps.match.params.id &&
        prevProps.match.params.id !== this.props.match.params.id
      ) {
        // Reset state data
        this.setState({
          data: {},
        });

        let routeParams = this.props.match.params;

        for (let i = 0; i < this.routePattern.length; i++) {
          let dataPath = this.routePattern[i].stringify(routeParams);
          this.fetchData(dataPath);
        }
      }
    }
    fetchDataCallback(json) {
      let data = Object.assign(this.state.data, json);

      this.setState({
        data: data,
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
