import React, { Component } from 'react';
import Menu from './Menu';
import ChallengeSelect from './ChallengeSelect';
import ChallengeEdit from './ChallengeEdit';

export default class GrandCentralStation extends Component {
  constructor(props) {
    super (props);
    let self;
    super (self);
    this.state = { "view": "ChallengeSelect", "fileStore": {} };
  }
  backView(){
    console.log();
    if (self.state.view === "ChallengeEdit") {
      self.setState({"view": "ChallengeSelect"});
    }
  }
  saveFiles(){
    self.setState({"view": "ChallengeEdit"});
    console.log(2);
  }
  exportFiles(){
    console.log(3);
  }
  handleFileSelect(){
    console.log(4);
  }
  render() {
    self = this;
    let componentToRender = <ChallengeSelect />;
    let elements = [];
    if(this.state.view === "ChallengeSelect"){
      elements = [
        {
          name: "Save",
          action: this.saveFiles
        },
        {
          name: "Export",
          action: this.exportFiles
        },
        {
          name: "Choose File",
          action: this.handleFileSelect
        }
      ];
      componentToRender = <ChallengeSelect />;
    }
    else {
      elements = [
        {
          name: "Back",
          action: this.backView
        },
        {
          name: "Save",
          action: this.saveFiles
        },
        {
          name: "Export",
          action: this.exportFiles
        }
      ];
      componentToRender = <ChallengeEdit />;
    }
    return (
      <div className = "app">
        <Menu elements = {elements} />
        {componentToRender}
      </div>
    );
  }
}

