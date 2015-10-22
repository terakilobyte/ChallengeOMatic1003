var handleChallengeClick;

var codeMirrors = [];

var EditorComponent = React.createClass({
  componentDidMount: function(){
    for(var key in this.props.data[0]) {
      codeMirrors.push({name: key, mirror: CodeMirror.fromTextArea(
        document.getElementById(key),
        {
          lineNumbers: true,
          mode: 'text',
          theme: 'monokai',
          runnable: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          scrollbarStyle: 'null',
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

        console.log(data);
      }

      data = data.split('"');

      data.shift();
      data.pop();

      data = data.join('');

      inputs.push(<li><h4>{key}</h4><textarea id = {key} name = {key} defaultValue = {data} /></li>);
    }

    return(
      <form>
        <ul>
          <li><h3 className = "button">Export!</h3></li>
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
  getInitialState: function(){
    return({
      "mode": "select",
      "data": []
    });
  },
  componentDidMount: function(){
    var self = this;
    if(this.state.mode === "select"){
      $('#file').on('change', function(){
        var files = $(this).prop('files');

        var file = files[0];
        var reader = new FileReader();

        reader.onload = function(data){
          data = JSON.parse(data.srcElement.result).challenges;
          self.setState({"mode":"challengeSelect", "data": data});
        };
        reader.readAsText(file);
      });
    }
  },
  render: function(){
    handleChallengeClick = this.handleChallengeClick;
    if(this.state.mode === "select"){
      return(
        <div className = "picker">
          <input id = "file" type = "file"/>
        </div>
      );
    }
    else if(this.state.mode === "challengeSelect"){
      return(
        <SelectDialogComponent data = {this.state.data} />
      );
    }
    else {
      return(
        <EditorComponent data = {this.state.data} />
      );
    }
  }
});

ReactDOM.render(<EditorContainerComponent data = {[]} />, document.getElementById('mount'));