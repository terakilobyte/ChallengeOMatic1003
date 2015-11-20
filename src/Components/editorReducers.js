const initialState = {
  challenges: [

  ]
};

export default function (prevState, action) {
  switch (action.type) {
    case 'updateChallenge':
      //action.payload
      //action.payload.id
      //action.payload.props

      let challenges = prevState.challenges.slice();

      challenges = challenges.map(function(challenge){
        if(challenge.id === action.payload.id){
          return(Object.assign({}, challenge, action.payload.props));
        }
        return(challenge);
      });

      return(Object.assign({}, prevState, {challenges: challenges}));

      break;
    case 'save':

      break;
    case 'load':

      break;
    case 'create':

      break;
    default:
      return(prevState);
      break;
  }
}