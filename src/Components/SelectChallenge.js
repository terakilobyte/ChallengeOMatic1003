import React, {Component} from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default class SelectChallenge extends Component {
  render() {
    let challenge;
    let data = this.props.data.challenges.map((challenge) => {
      return (
        <ListItem
          key = {challenge.id}
          primaryText={challenge.title}
          onClick = {this.props.challengeClick}
        />
      )
    });

    return (
      <List>
        {data}
      </List>
    )
  }
}

SelectChallenge.propTypes = {
  challengeClick: React.PropTypes.func
}
