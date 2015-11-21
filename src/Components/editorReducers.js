const initialState = {
  challenges: [

  ],
  'fileStore': {},
  'activeFile': '',
  'activeChallenge': {},
  'view': 'ChallengeSelect'
};

export default function (prevState = initialState, action) {
  switch (action.type) {
    case 'updateChallenge':
      let challenges = prevState.challenges.slice();

      challenges = challenges.map(function(challenge){
        if(challenge.id === action.payload.id){
          return(Object.assign({}, challenge, action.payload.props));
        }
        return(challenge);
      });

      return(Object.assign({}, prevState, {challenges: challenges}));

      break;
    case 'loadChallenge':
      return(Object.assign({}, prevState, action.payload));
      break;
    case 'saveChallenge':

      break;
    case 'create':

      break;
    default:
      return(prevState);
      break;
  }
}