import React, { Component } from 'react';
import withData from './withData';
import '../scss/component-home.scss';

class Home extends Component {
  render() {
    return (
      <div className="component--home">
        <h2>HELLO</h2>
        <p>
          Cras facilisis urna ornare ex volutpat, et convallis erat elementum.
          Ut aliquam, ipsum vitae gravida suscipit, metus dui bibendum est, eget
          rhoncus nibh metus nec massa. Maecenas hendrerit laoreet augue nec
          molestie. Cum sociis natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus.
        </p>

        <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
      </div>
    );
  }
}
var path = '../data/api/v2/ability/1/index.json';
const WrappedComponent = withData(Home, path);

export default WrappedComponent;
