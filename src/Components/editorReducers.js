const initialState = {
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

      let fileStore = prevState.fileStore;

      let newFileStore = fileStore[prevState.activeFile];

      newFileStore.challenges = challenges;

      fileStore[prevState.activeFile] = newFileStore;

      return(Object.assign({}, prevState, fileStore));

      break;
    case 'loadChallenge':
      return(Object.assign({}, prevState, action.payload));
      break;
    case 'loadFile':
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