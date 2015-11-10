import React, { Component } from 'react';
import Menu from './Menu';
import ChallengeSelect from './ChallengeSelect';
import ChallengeEdit from './ChallengeEdit';
import SelectChallenge from './SelectChallenge';
import Editor from './Editor';

export default class GrandCentralStation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'view': 'ChallengeSelect',
      'fileStore': {},
      'fileStoreInstance': {},
      'activeFile': '',
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
    this.setState({'view': 'ChallengeSelect'});
  }

  saveFiles() {
    // this.setState({'view': 'ChallengeEdit'});
    
    //This is still under construction!!! At the moment it'll only save to the first file :p 
    
    var mutatedInstance = this.state.fileStoreInstance;
    mutatedInstance[this.state.activeFile].challenges[0].title = this.state.fileStoreInstance[this.state.activeFile].challenges[0].title + "tset";
    
    this.setState({fileStore: mutatedInstance});
    console.log(2);
  }

  exportFiles() {
    console.log(3);
  }

  handleFileSelect(to) {
    this.setState({
      'activeFile': to
    });
  }

  handleFileIsSelected(event) {
    let files = event.target.files;
    for (let i in files) {
      if (files.hasOwnProperty(i)) {
        let file = files[i];
        let reader = new FileReader();

        reader.onload = function(upload) {
          let newFileStoreObject = this.state.fileStore;
          let newFileStoreInstanceObject = this.state.fileStoreInstance;
          newFileStoreObject[file.name] = JSON.parse(upload.target.result);
          newFileStoreInstanceObject[file.name] = JSON.parse(upload.target.result);
          
          this.setState({
            'fileStore': newFileStoreObject,
            'fileStoreInstance': newFileStoreInstanceObject,
            'activeFile': file.name,
            'activeChallenge': {}
          });
        }.bind(this);
        reader.readAsText(file);
      }
    }
  }

  handleChallengeClick(id) {
    this.setState({
      'activeChallenge':
        this.state.fileStore[this.state.activeFile]
          .challenges.filter((challenge) => {
            return challenge.id === id;
          }).pop(), 'view': 'ChallengeEdit'
    });
  }

  render() {
    console.log(this.state.fileStore);
    console.log(this.state.fileStoreInstance);
    let componentToRender = <ChallengeSelect />;
    let elements = [];
    let selectChallenges;
    if (this.state.view === 'ChallengeSelect') {
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
    } else {
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
        data = {this.state.fileStore[this.state.activeFile]}
        challengeClick = {this.handleChallengeClick}
        />;
    }

    let menu =
      <Menu action = {this.handleFileSelect}
            elements = {elements}
            files = {this.state.fileStore} />;

    if (Object.keys(this.state.view === 'ChallengeEdit' &&
        this.state.activeChallenge).length) {
      return (
        <div className = 'app'>
          {menu}
          <Editor challenge={this.state.activeChallenge} />
        </div>
      );
    } else {

      return (
        <div className = 'app'>
          {menu}
          {componentToRender}
          {selectChallenges}
        </div>
      );
    }
  }
}

