var handleChallengeClick;
var handleOpenedFileClick;
var handleFileLoad;
var reStart;
var getCurrentMode;
var saveCurrentFile;
var exportCurrentFile;

var mode;
var fileStore = [];

var currentFile;
var currentFileData;
var codeMirrors = [];

var ActiveFilesComponent = React.createClass({
  render: function(){
    var openFiles = fileStore.map(function(file){
      return(
        <a className = "file" onClick = {handleOpenedFileClick}>{Object.keys(file)[0]}</a>
      );
    });
    return(
      <ul className = "menu">{openFiles}</ul>
    );
  }
});

var Menu = React.createClass({
  render: function(){
    var back = "";
    var fileSelect = "";

    mode = getCurrentMode();

    if(mode === "challengeEdit"){
      back = <a onClick = {reStart}>Back</a>;
    }
    else {
      fileSelect = <a><div className = "picker"><input id = "file" type = "file"/></div></a>;
    }

    return(
      <div>
        <ActiveFilesComponent />
        <ul className = "menu">{back} {fileSelect}<a onClick = {saveCurrentFile}>Save All</a><a onClick = {exportCurrentFile}>Export All</a></ul>
      </div>
    );
  }
});

var EditorComponent = React.createClass({
  componentDidMount: function(){
    for(var key in this.props.data[0]) {
      codeMirrors.push({name: key, mirror: CodeMirror.fromTextArea(
        document.getElementById(key),
        {
          lineNumbers: true,
          mode: 'javascript',
          theme: 'dracula',
          runnable: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          scrollbarStyle: 'simple',
          lineWrapping: true,
          gutters: ['CodeMirror-lint-markers']
        }
      )});
    }

    codeMirrors.map(function(mirrorData){
      if(mirrorData.name === "description" || mirrorData.name === "tests" || mirrorData.name === "challengeSeed"){
        mirrorData.mirror.setSize("100%", "52vh");
      }
      else {
        mirrorData.mirror.setSize("100%", "8vh");
      }
    });

  },
  render: function(){

    var inputs = [];

    for(var key in this.props.data[0]){
      var data = JSON.stringify(this.props.data[0][key]);

      if(key === "description" || key === "tests" || key === "challengeSeed"){
        data = data.replace(/\"\s*?\,\s*?\"/gi, "\n");
      }

      if(data[0] === '"'){
        data = data.slice(1);
        data = data.slice(0, data.length-2);
      }

      if(data[0] === "["){
        data = data.slice(2);
        data = data.slice(0, data.length-3);
      }

      inputs.push(<li className = "input"><h4>{key}</h4><textarea id = {key} name = {key} defaultValue = {data} /></li>);
    }

    return(
      <form>
        <ul className = "inputList">
          {inputs}
        </ul>
      </form>
    );
  }
});

var SelectDialogComponent = React.createClass({
  render: function(){
    var data = this.props.data.map(function(challenge){
      return(
        <li className = "challenge" data = {challenge.id} onClick = {handleChallengeClick}>
          {challenge.title}
        </li>
      );
    });

    return(
      <ul className = "challengeList">
        {data}
      </ul>
    );
  }
});

var EditorContainerComponent = React.createClass({
  handleChallengeClick: function(e){
    this.setState({"mode": "challengeEdit", "data" : this.state.data.filter(function(challenge){
      return(challenge.id === $(e.target).attr('data'));
    })});
  },
  saveCurrentChallenge: function(cb){
    var newChallengeData = {};

    for (var i in codeMirrors){

      if(codeMirror.name === "tests" || codeMirror.name === "description" || codeMirror.name === "challengeSeed"){
        newChallengeData[codeMirror.name] = JSON.stringify(codeMirror.mirror.getValue().split("\n"));
      }
      else{
        newChallengeData[codeMirror.name] = JSON.stringify(codeMirror.mirror.getValue());
      }
    }

    var challengeToReplace;

    for(var i in currentFileData){
      var challenge = currentFileData[i];
      if(challenge.id === newChallengeData.id){
        challengeToReplace = i;
      }
    }

    if(challengeToReplace !== undefined){
      currentFileData[challengeToReplace] = newChallengeData;
    }

    if(fileStore.filter(function(challenge){return(challenge[currentFile.name])}).length === 0){
      var challengeDataObject = {};
      challengeDataObject[currentFile.name] = currentFileData;

      fileStore.push(challengeDataObject);
    }
    if(typeof cb !== 'undefined' && typeof cb === 'function'){
      setTimeout(cb(), 1000);
    }
  },
  exportCurrentFile: function(){
    function exportChain(){
      if(fileStore[0] !== undefined && fileStore[0] !== null) {
        var fileName = Object.keys(fileStore[0])[0];
        console.log(fileStore[0][fileName]);
        $.ajax({
          method: "post",
          async: false,
          data: {file: fileName, data: JSON.stringify(fileStore[0][fileName])},
          dataType: "text"
        }).done(function (data) {
          if (fileStore.length > 0) {
            window.location = data;
            setTimeout(function () {
              fileStore.shift();
              exportChain();
            }, 500);
          }
        });
      }
    }
    this.saveCurrentChallenge(exportChain());
  },
  reStart: function(){
    if(this.state.mode === "challengeEdit"){
      this.setState({"mode": "challengeSelect", "data": currentFileData});
    }
    else{
      this.setState({"mode": "select", "data": []});
    }

  },
  handleOpenedFileClick: function(e){
    var fileToOpen = fileStore.filter(function(file){
      return(Object.keys(file)[0] === e.target.text);
    })[0][e.target.text];
    this.setState({"mode": "challengeSelect", "data": fileToOpen});
  },
  handelFileLoad: function(){
    var self = this;
    if(this.state.mode !== "challengeEdit"){
      $('#file').on('change', function(){
        var files = $(this).prop('files');

        var file = files[0];

        currentFile = file;

        if(fileStore.filter(function(challengeFile){return(Object.keys(challengeFile)[0] === currentFile.name);}).length === 0) {
          var reader = new FileReader();

          reader.onload = function(data){
            data = JSON.parse(data.srcElement.result).challenges;
            currentFileData = data;
            saveCurrentFile();
            self.setState({"mode":"challengeSelect", "data": data});
          };
          reader.readAsText(file);
        }
        else {
          var data = fileStore.filter(function(challengeFile){
            return(Object.keys(challengeFile)[0] === currentFile.name);
          })[0];
          currentFileData = data[Object.keys(data)[0]];
          saveCurrentFile();
          self.setState({"mode":"challengeSelect", "data": currentFileData});
        }
      });
    }
  },
  getInitialState: function(){
    return({
      "mode": "select",
      "data": []
    });
  },
  componentDidUpdate: function(){
    this.handelFileLoad();
  },
  componentDidMount: function(){
    this.componentDidUpdate();
  },
  getCurrentMode : function(){
    return(this.state.mode);
  },
  render: function(){
    handleChallengeClick = this.handleChallengeClick;
    handleOpenedFileClick = this.handleOpenedFileClick;
    handleFileLoad = this.handelFileLoad;
    saveCurrentFile = this.saveCurrentChallenge;
    exportCurrentFile = this.exportCurrentFile;
    getCurrentMode = this.getCurrentMode;
    reStart = this.reStart;
    if(this.state.mode === "select"){
      return(
        <div className = "Init">
          <div className = "picker">
            <input id = "file" type = "file"/>
          </div>
        </div>
      );
    }
    else if(this.state.mode === "challengeSelect"){
      return(
        <div>
          <Menu />
          <SelectDialogComponent data = {this.state.data} />
        </div>
      );
    }
    else {
      return(
        <div>
          <Menu />
          <EditorComponent data = {this.state.data} />
        </div>
      );
    }
  }
});

ReactDOM.render(<EditorContainerComponent data = {[]} />, document.getElementById('mount'));