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
};

export default class Menu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let MenuElements = this.props.elements.map((elem, ix) => {
      let potentialInput;
      if (elem.name === 'Choose File') {
        potentialInput = (
          <input
            type = 'file' multiple
            style = {styles.fileInput}>
          </input>
        );
      }
        return (
          <span key = { ix }
                style = {styles.buttonStyle}>
          <RaisedButton key = {elem.name}
                        label = { elem.name }
                        onChange = {elem.handleChange}
                        onClick = {elem.action}
          >
            {potentialInput}
          </RaisedButton>
          </span>
        );
    });



    return (
      <div>
        <ul>
          {MenuElements}
        </ul>
      </div>
    );
  }
}

Menu.propTypes = {
  action: React.PropTypes.func,
  elements: React.PropTypes.array,
  files: React.PropTypes.object
};
