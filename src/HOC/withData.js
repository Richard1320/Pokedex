// https://reactjs.org/docs/higher-order-components.html

import React, { Component } from 'react';
import URLPattern from 'url-pattern';

import { fileFetchData } from '../Helpers';

// This function takes a component...
export default function withData(WrappedComponent, jsonFiles, params = {}) {
  // ...and returns another component...
  class HOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {},
      };
      this.routePatterns = [];

      // Check if multiple JSON files are to be loaded
      if (Array.isArray(jsonFiles)) {
        jsonFiles.forEach(jsonFile => {
          this.routePatterns.push(new URLPattern(jsonFile));
        });
      } else {
        this.routePatterns.push(new URLPattern(jsonFiles));
      }
    }

    componentDidMount() {
      // Reverse engineer route with parameters (like ID)
      let routeParams = Object.assign(
        {},
        this.props.match.params,
        params.optionalRouteParams || {}
      );
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
    fetchDataCallback(json, passedParams) {
      let data;
      let keyName;
      try {
        // Assign JSON data to new object property
        keyName = params.keyNames[passedParams.index];
        data = this.state.data;
        data[keyName] = json;
      } catch (err) {
        // Merge JSON with existing data
        data = Object.assign(this.state.data, json);
      }

      this.setState({
        data: data,
      });
    }
    fetchData(routeParams) {
      // Loop through array of JSON files
      this.routePatterns.forEach((routePattern, index) => {
        let passParams = { index: index };
        let dataPath = routePattern.stringify(routeParams);
        if (!dataPath) return;
        fileFetchData(dataPath, this.fetchDataCallback.bind(this), passParams);
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent {...this.props} data={this.state.data} />;
    }
  }

  return HOC;
}
