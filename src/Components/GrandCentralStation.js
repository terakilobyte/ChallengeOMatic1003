import React, { Component } from 'react';
import Menu from './Menu';
import ChallengeSelect from './ChallengeSelect';
import ChallengeEdit from './ChallengeEdit';
import SelectChallenge from './SelectChallenge';
import Editor from './Editor';

export default class GrandCentralStation extends Component {
  constructor(props) {
    super (props);
    this.state = {
      'view': 'ChallengeSelect',
      'fileStore': {},
      'activeChallenge': {}
    };
    this.backView = this.backView.bind(this);
    this.saveFiles = this.saveFiles.bind(this);
    this.exportFiles = this.exportFiles.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleFileIsSelected = this.handleFileIsSelected.bind(this);
    this.handleChallengeClick = this.handleChallengeClick.bind(this);
  }

  backView() {
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
      this.setState({
        'fileStore': JSON.parse(upload.target.result),
        'activeChallenge': {}
      });
    }.bind(this);
    reader.readAsText(file);
  }

  handleChallengeClick(id) {
    this.setState({
      'activeChallenge':
        this.state.fileStore.challenges.filter((challenge) => {
          return challenge.id === id;
      }).pop(),
    });
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
      selectChallenges = <SelectChallenge
        data = {this.state.fileStore}
        challengeClick = {this.handleChallengeClick}
        />;
    }

    if (Object.keys(this.state.activeChallenge).length) {
      return (
        <div className = 'app'>
          <Menu elements = {elements} />
          <Editor challenge={this.state.activeChallenge} />
        </div>
      );
    } else {

      return (
        <div className = 'app'>
          <Menu elements = {elements} />
          {componentToRender}
          {selectChallenges}
        </div>
      );
    }
  }
}

