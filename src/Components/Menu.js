import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import {Tab, Tabs} from 'material-ui/lib/tabs';

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
    this.state = {'activeTab': '', 'tabChange': function() {
      this.props.action((arguments[1].split(/\=1\$/gi)[1])
        .replace(/\=01/gi, '.'));
      this.setState({'activeTab': (arguments[1]
        .split(/\=1\$/gi)[1]).replace(/\=01/gi, '.')});
    }};
  }

  render() {
    let MenuElements = this.props.elements.map((elem, ix) => {
      let potentialInput;
      if (elem.name === 'Choose File') {
        potentialInput = (
          <input
            type = 'file' multiple
            style={styles.fileInput}>
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

    let fileNames = [];
    let FileElements = [];
    for (var i in this.props.files) {
      let file = this.props.files[i];
      fileNames.push(i);
      FileElements.push(
        <Tab key= { i }
             label = { i }
             onClick = {this.state.tabChange.bind(this)}
             value = { i }
        >
          {file.name}
        </Tab>
      );
    }

    return (
      <div>
        <ul>
          {MenuElements}
        </ul>
        <Tabs onActive = { this.props.action }
              valueLink={{value: this.state.activeTab,
                requestChange: function() {console.log('tab changes');}}
              }>
          {FileElements}
        </Tabs>
      </div>
    );
  }
}

Menu.propTypes = {
  action: React.PropTypes.func,
  elements: React.PropTypes.array,
  files: React.PropTypes.object
};
