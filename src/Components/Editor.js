import './../../node_modules/codemirror/lib/codemirror.css';
import './../../node_modules/codemirror/theme/dracula.css';
import './../../node_modules/codemirror/addon/scroll/simplescrollbars.css';

import React, {Component} from 'react';

import {updateChallenge} from './editorActionsCreator';

import {connect} from 'react-redux';

import CodeMirror from './../../node_modules/codemirror/lib/codemirror';
import './../../node_modules/codemirror/mode/javascript/javascript';
import './../../node_modules/codemirror/addon/edit/closebrackets';
import './../../node_modules/codemirror/addon/edit/matchbrackets';
import './../../node_modules/codemirror/addon/scroll/simplescrollbars';
import './../../node_modules/codemirror/addon/scroll/annotatescrollbar';
import './../../node_modules/codemirror/addon/scroll/scrollpastend';
import './../../node_modules/codemirror/addon/lint/lint';

const connector = connect(function(state, props){
  //State from redux
  return(state.challenges.reduce(function(prevC, challenge){
    if(challenge.id === props.id) {
      return(challenge)
    }
    else {
      return(prevC);
    }
  }, {}));

});

class Editor extends Component {

  constructor(props){
    super (props);

    /*var codeMirrorData = [];

     var unrenderedCodeMirrors = [];

     for ( var i in this.props.challenge ){
     var challengeDataField = this.props.challenge[i];
     codeMirrorData.push([i, challengeDataField]);
     }

     codeMirrorData = codeMirrorData.filter(function(field){
     return(field[0] !== 'id');
     });

     unrenderedCodeMirrors = codeMirrorData.map(function(data){
     if(Array.isArray(data[1])){
     data[1] = data[1].join('\n')
     }
     return(
     <div key = {data[0]}>
     <h3>{data[0]}</h3>
     <textarea id = {data[0]}>{data[1]}</textarea>
     </div>
     );
     });

     this.state = {
     codeMirrorData: codeMirrorData,
     unrenderedCodeMirrors: unrenderedCodeMirrors
     };*/
  }

  componentDidMount(){
    /*let codeMirrors = [];
    this.state.codeMirrorData.map(function(codeMirror){
      let editor = CodeMirror.fromTextArea(document.getElementById(codeMirror[0]), {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'dracula',
        runnable: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        scrollbarStyle: 'simple',
        lineWrapping: true,
        gutters: ['CodeMirror-lint-markers']
      });

      editor.on('change', function(instance, changeObj){
        updateChallenge(
          {
            id: challenge.id,
            props: {
              [codeMirror[0]]: changeObj.text
            }

          }
        );
      });

      codeMirrors.push(editor);
    });*/
  }

  render() {
    //this.props.save({});

    //console.log(this.props.challenge);
    /*{this.state.unrenderedCodeMirrors}*/

    return (
      <div>
      </div>
    );
  }
}

Editor.propTypes = {
  challenge: React.PropTypes.object
};


export default connector(Editor);