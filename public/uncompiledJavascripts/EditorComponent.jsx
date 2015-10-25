var handleChallengeClick;
var reStart;
var saveCurrentFile;
var exportCurrentFile;

var currentFile;
var currentFileData;
var codeMirrors = [];

var Menu = React.createClass({
  render: function(){
    return(
      <ul className = "menu"><a onClick = {reStart}>Back</a><a onClick = {saveCurrentFile}>Save</a><a onClick = {exportCurrentFile}>Export!</a></ul>
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

      data = data.split('"');

      data.shift();
      data.pop();

      data = data.join('');

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
  saveCurrentChallenge: function(){
    var newChallengeData = {};

    for (var i in codeMirrors){
      var codeMirror = codeMirrors[i];

      if(codeMirror.name === "tests" || codeMirror.name === "description" || codeMirror.name === "challengeSeed"){
        newChallengeData[codeMirror.name] = codeMirror.mirror.getValue().split("\n");
      }
      else{
        newChallengeData[codeMirror.name] = codeMirror.mirror.getValue();
      }
    }

    var challengeToReplace;

    for(var i in currentFileData){
      var challenge = currentFileData[i];
      if(challenge.id === newChallengeData.id){
        challengeToReplace = i;
      }
    }

    currentFileData[challengeToReplace] = newChallengeData;
  },
  exportCurrentFile: function(){
    this.saveCurrentChallenge();
    $.ajax({
      method: "post",
      data: {file: currentFile.name, data: JSON.stringify(currentFileData)},
      dataType: "text"
    }).done(function(data){
      window.location = data;
    });
  },
  reStart: function(){
    if(this.state.mode === "challengeEdit"){
      this.setState({"mode": "challengeSelect", "data": currentFileData});
    }
    else{
      this.setState({"mode": "select", "data": []});
    }

  },
  getInitialState: function(){
    return({
      "mode": "select",
      "data": []
    });
  },
  componentDidUpdate: function(){
    this.componentDidMount();
  },
  componentDidMount: function(){
    var self = this;
    if(this.state.mode === "select"){
      $('#file').on('change', function(){
        var files = $(this).prop('files');

        var file = files[0];

        currentFile = file;

        var reader = new FileReader();

        reader.onload = function(data){
          data = JSON.parse(data.srcElement.result).challenges;
          currentFileData = data;
          self.setState({"mode":"challengeSelect", "data": data});
        };
        reader.readAsText(file);
      });
    }
  },
  render: function(){
    handleChallengeClick = this.handleChallengeClick;
    saveCurrentFile = this.saveCurrentChallenge;
    exportCurrentFile = this.exportCurrentFile;
    reStart = this.reStart;
    if(this.state.mode === "select"){
      return(
        <div className = "picker">
          <input id = "file" type = "file"/>
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