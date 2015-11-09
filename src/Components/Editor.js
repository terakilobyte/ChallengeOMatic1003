import React, {Component} from 'react';

// unfinished editor view!! warning!!
// see something, say something. Report wild components to responsible
// authorities immediately. Visit gitter.im/freecodecamp

export default class Editor extends Component {
  render() {
    return (
      <p>
        {JSON.stringify(this.props.challenge)}
      </p>
    );
  }
}

Editor.propTypes = {
  challenge: React.PropTypes.object
};
