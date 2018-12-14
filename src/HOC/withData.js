// https://reactjs.org/docs/higher-order-components.html

import React, { Component } from 'react';
import RouteParser from 'route-parser';

let _this;
let route;

// This function takes a component...
export default function withData(WrappedComponent, urlPattern, optionalParams) {
  // ...and returns another component...
  class HOC extends Component {
    constructor(props) {
      super(props);
      _this = this;
      route = new RouteParser(urlPattern);
      this.state = {
        data: {},
      };
    }

    componentDidMount() {
      // Reverse engineer route with parameters (like ID)

      let routeParams = Object.assign(
        {},
        this.props.match.params,
        optionalParams || {},
      );
      let dataPath = route.reverse(routeParams);
      this.fetchData(dataPath);
    }
    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (
        prevProps.match.params.id &&
        prevProps.match.params.id !== this.props.match.params.id
      ) {
        let routeParams = this.props.match.params;
        let dataPath = route.reverse(routeParams);
        this.fetchData(dataPath);
      }
    }
    fetchData(dataPath) {
      let oReq = new XMLHttpRequest();
      oReq.addEventListener('load', function() {
        let json = JSON.parse(this.responseText);
        _this.setState({
          data: json,
        });
      });
      oReq.open('GET', dataPath);
      oReq.send();
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  }

  return HOC;
}
