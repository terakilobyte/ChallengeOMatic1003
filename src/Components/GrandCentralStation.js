import React, { Component } from 'react';
import Menu from './Menu';
import ChallengeSelect from './ChallengeSelect';
import ChallengeEdit from './ChallengeEdit';
import SelectChallenge from './SelectChallenge';

export default class GrandCentralStation extends Component {
  constructor(props) {
    super (props);
    this.state = {
      'view': 'ChallengeSelect',
      'fileStore': {}
    };
    this.backView = this.backView.bind(this);
    this.saveFiles = this.saveFiles.bind(this);
    this.exportFiles = this.exportFiles.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleFileIsSelected = this.handleFileIsSelected.bind(this);
    this.handleChallengeClick = this.handleChallengeClick.bind(this);
  }

  backView() {
    console.log();
    if (this.state.view === 'ChallengeEdit') {
      this.setState({'view': 'ChallengeSelect'});
    }
  }

  saveFiles() {
    this.setState({'view': 'ChallengeEdit'});
    console.log(2);
  }

  exportFiles() {
    console.log(3);
  }

  handleFileSelect() {
    console.log(4);
  }

  handleFileIsSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(upload) {
      console.log(this);
      this.setState({
        'fileStore': JSON.parse(upload.target.result)
      });
    }.bind(this);
    reader.readAsText(file);
  }

  handleChallengeClick() {
    console.log('I wrote the damn function, happy?');
  }

  render() {
    let componentToRender = <ChallengeSelect />;
    let elements = [];
    let selectChallenges;
    if(this.state.view === 'ChallengeSelect'){
      elements = [
        {
          name: 'Save',
          action: this.saveFiles
        },
        {
          name: 'Export',
          action: this.exportFiles
        },
        {
          name: 'Choose File',
          action: this.handleFileSelect,
          handleChange: this.handleFileIsSelected
        }
      ];
      componentToRender = <ChallengeSelect />;
    }
    else {
      elements = [
        {
          name: 'Back',
          action: this.backView
        },
        {
          name: 'Save',
          action: this.saveFiles
        },
        {
          name: 'Export',
          action: this.exportFiles
        }
      ];
      componentToRender = <ChallengeEdit />;
    }

    if (Object.keys(this.state.fileStore).length) {
      console.log('fileStore has length');
      selectChallenges = <SelectChallenge
        data = {this.state.fileStore}
        challengeClick = {this.handleChallengeClick}
        />;
    }

    return (
      <div className = 'app'>
        <Menu elements = {elements} />
        {componentToRender}
        {selectChallenges}
      </div>
    );
  }
}

