// https://reactjs.org/docs/higher-order-components.html

import React, { Component } from 'react';
import RouteParser from 'route-parser';

// This function takes a component...
export default function withData(WrappedComponent, urlPattern, optionalParams) {
  // ...and returns another component...
  class HOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {},
      };
    }

    componentDidMount() {
      let _this = this;
      let oReq = new XMLHttpRequest();

      // Reverse engineer route with parameters (like ID)
      let route = new RouteParser(urlPattern);
      let routeParams = Object.assign(
        {},
        this.props.match.params,
        optionalParams || {},
      );
      let dataPath = route.reverse(routeParams);

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
