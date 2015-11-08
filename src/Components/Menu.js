import React, { Component } from 'react';

export default class Menu extends Component {
  constructor ( props ){
    super (props);
  }
  render() {
    let MenuElements = this.props.elements.map(function (elem) {
      return (<a key = {elem.name} onClick = {elem.action} className = "menuElement" > { elem.name } </a>)
    });

    return (
      <ul>
        {MenuElements}
      </ul>
    );
  }
}