import React, { Component } from 'react';
import {connect} from 'react-redux';
import store from './../store';
import {loadFile} from './editorActionsCreator';
import {loadChallenge} from './editorActionsCreator';

import $ from 'jquery';

import Menu from './Menu';
import ChallengeSelect from './ChallengeSelect';
import ChallengeEdit from './ChallengeEdit';
import SelectChallenge from './SelectChallenge';
import Editor from './Editor';

import './../style.css';

const connector = connect(function(state, props){
  return(
    state
  );
});

class GrandCentralStation extends Component {
  constructor(props) {
    super(props);
    this.backView = this.backView.bind(this);
    this.exportFiles = this.exportFiles.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleFileIsSelected = this.handleFileIsSelected.bind(this);
    this.handleChallengeClick = this.handleChallengeClick.bind(this);
  }

  backView() {
    //this.setState({'view': 'ChallengeSelect'});
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

    //let dump = this.state.fileStore

    console.log(3);
  }

  handleFileSelect(to) {
    /*console.log(to);
    this.setState({
      'activeFile': to
    });*/
  }

  handleFileIsSelected(event) {
    let files = event.target.files;
    for (let i in files) {
      if (files.hasOwnProperty(i)) {
        let file = files[i];
        let reader = new FileReader();
        let dispatch = this.props.dispatch;

        reader.onload = function(upload) {
          let newFileStoreObject = this.props.fileStore;
          newFileStoreObject[file.name] =
            JSON.parse(upload.target.result);

          loadFile (dispatch, {
            fileStore: newFileStoreObject,
            activeFile: file.name,
            challenges: newFileStoreObject[file.name].challenges,
            activeChallenge: {}
          });
          this.setState({view: 'challengeSelect'});
        }.bind(this);
        reader.readAsText(file);
      }
    }
  }

  handleChallengeClick(id) {
    let dispatch = this.props.dispatch;
    loadChallenge(dispatch, {
      'activeChallenge':
        this.props.fileStore[this.props.activeFile]
          .challenges.filter((challenge) => {
            return challenge.id === id;
          }).pop(), 'view': 'ChallengeEdit'
    });
  }

  render() {
    let componentToRender = <ChallengeSelect />;
    let elements = [];
    let selectChallenges;
    if (this.props !== null && this.props.view === 'ChallengeSelect') {
      elements = [
        {
          name: 'Choose File',
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
          name: 'Export',
          action: this.exportFiles
        }
      ];
      componentToRender = <ChallengeEdit />;
    }

    if (this.props !== null && this.props.fileStore && Object.keys(this.props.fileStore).length) {
      selectChallenges = <SelectChallenge
        data = {this.props.fileStore[this.props.activeFile]}
        challengeClick = {this.handleChallengeClick}
        />;
    }

    let menu =
      <Menu action = {this.handleFileSelect}
            elements = {elements}
            files = {this.props.fileStore} />;


    if (Object.keys(this.props.view === 'ChallengeEdit' &&
        this.props.activeChallenge).length) {
      return (
        <div className = 'app'>
          {menu}
          <Editor id={this.props.activeChallenge.id} />
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