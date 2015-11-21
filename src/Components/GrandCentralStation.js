import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loadChallenge} from './editorActionsCreator';

import Menu from './Menu';
import ChallengeSelect from './ChallengeSelect';
import ChallengeEdit from './ChallengeEdit';
import SelectChallenge from './SelectChallenge';
import Editor from './Editor';

import './../style.css';

const connector = connect(function(state, props){
  return(
    {}
  );
});

class GrandCentralStation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'view': 'ChallengeSelect',
      'fileStore': {},
      'activeFile': '',
      'activeChallenge': {}
    };
    this.backView = this.backView.bind(this);
    this.exportFiles = this.exportFiles.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleFileIsSelected = this.handleFileIsSelected.bind(this);
    this.handleChallengeClick = this.handleChallengeClick.bind(this);
  }

  backView() {
    this.setState({'view': 'ChallengeSelect'});
  }

  //saveFiles(newInstance) {
  //
  //  alert('save');
  //
  //  /*let dump = this.state.fileStore;
  //  let self = this;
  //
  //  for (var i in this.state.fileStore[this.state.activeFile].challenges){
  //    var challenge = this.state.fileStore[this.state.activeFile].challenges[i];
  //    if(challenge.title === self.state.activeChallenge.title){
  //      break;
  //    }
  //  }
  //
  //  this.state.fileStore[this.state.activeFile].challenges[i] = newInstance;
  //
  //  this.setState({fileStore: dump});*/
  //}

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
          newFileStoreObject[file.name] = JSON.parse(upload.target.result);

          loadChallenge (this.props.dispatch, {
            challenges: newFileStoreObject[file.name].challenges
          });
          
          this.setState({
            fileStore: newFileStoreObject,
            activeFile: file.name,
            activeChallenge: {}
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
          <Editor id={this.state.activeChallenge.id} />
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

export default connector(GrandCentralStation);