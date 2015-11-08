import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  fileInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    width: '100%',
    opacity: '0'
  },
  buttonStyle: {
    paddingRight: '5px'
  }
}

export default class Menu extends Component {
  constructor ( props ){
    super (props);
  }
  render() {
    let MenuElements = this.props.elements.map(function (elem, ix) {
      let potentialInput;
      let style;
      if (elem.name === 'Choose File') {
        potentialInput = <input type = 'file' style={styles.fileInput} multiple></input>
      }
      return (
        <span style={styles.buttonStyle} key={ix}>
        <RaisedButton key= {elem.name}
          onClick = {elem.action}
          onChange = {elem.handleChange}
          label = { elem.name }
         >
           {potentialInput}
        </RaisedButton>
        </span>
      )
    });

    return (
      <ul>
        {MenuElements}
      </ul>
    );
  }
}

Menu.propTypes = {
  elements: React.PropTypes.array
}
