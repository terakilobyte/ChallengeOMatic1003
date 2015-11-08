import React, {Component} from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default class SelectChallenge extends Component {

  constructor(props) {
    super(props);
  }

  handleClick(id) {
    this.props.challengeClick(id);
  }

  render() {
    let data = this.props.data.challenges.map((challenge) => {
      return (
        <ListItem
          key = {challenge.id}
          data-challengid = {challenge.id}
          primaryText={challenge.title}
          onClick = {this.handleClick.bind(this, challenge.id)}
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
};
