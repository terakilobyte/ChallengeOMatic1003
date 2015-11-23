import React, { Component } from 'react';
import {connect} from 'react-redux';
import store from './../store';
import {
  backAction,
  loadFile,
  loadChallenge,
  fileSelect
} from './editorActionsCreator';

import $ from 'jquery';

import Menu from './Menu';
import TabBar from './Tabs';
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
    let dispatch = this.props.dispatch;
    backAction(dispatch, {
      view: 'challengeSelect'
    });
  }

  exportFiles() {
    $.post('/export', {
      data: this.props.fileStore,
      success: function(data){
        console.log(data);
      }
    });
  }

  handleFileSelect(to) {
    let dispatch = this.props.dispatch;
    fileSelect(dispatch, {
      activeFile: to
    });
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
        }.bind(this);
        reader.readAsText(file);
      }
    }
  }

  handleChallengeClick(id) {
    let dispatch = this.props.dispatch;
    if(id === 'new'){
      $.getJSON('/mongoid', function(mongoid){
        mongoid = mongoid.objectId
        
        let oldFileStore = this.props.fileStore;
        
        oldFileStore.challenges.push({
            "id": mongoid,
            "title": mongoid,
            "description": [
          	  ""
            ],
            "tests": [
          	  ""
            ],
            "challengeSeed": [
              ""
            ],
            "MDNlinks": [
          	  ""
            ],
            "solutions": [
          	  ""
            ],
            "type": "",
            "challengeType": 0,
            "nameCn": "",
            "descriptionCn": [],
            "nameFr": "",
            "descriptionFr": [],
            "nameRu": "",
            "descriptionRu": [],
            "nameEs": "",
            "descriptionEs": [],
            "namePt": "",
            "descriptionPt": []
        });
        
        AddedChallenge = {fileStore: oldFileStore};
        
        createChallenge(dispatch, 
          AddedChallenge
        );
      })
    }
    else {
      loadChallenge(dispatch, {
        'activeChallenge':
          this.props.fileStore[this.props.activeFile]
            .challenges.filter((challenge) => {
              return challenge.id === id;
            }).pop(), 'view': 'ChallengeEdit'
      });
    }
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
      <Menu elements = {elements} />;

    let tabs;

    tabs = Object.keys(this.props.fileStore).length === 0 ? ''
      : <TabBar action = {this.handleFileSelect} files = {this.props.fileStore} />;

    if (Object.keys(this.props.view === 'ChallengeEdit' &&
        this.props.activeChallenge).length) {
      return (
        <div className = 'app'>
          {menu}
          {tabs}
          <Editor id={this.props.activeChallenge.id} />
        </div>
      );
    } else {

      return (
        <div className = 'app'>
          {menu}
          {tabs}
          {componentToRender}
          {selectChallenges}
        </div>
      );
    }
  }
}

export default connector(GrandCentralStation);