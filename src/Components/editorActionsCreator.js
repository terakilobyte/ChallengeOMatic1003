export function updateChallenge(payload) {
  return {
    type: 'updateChallenge',
    payload
  };
}

export function loadChallenge(dispatch, payload) {
  dispatch ({
    type: 'loadChallenge',
    payload
  });
}

export function saveChallenge(payload) {
  return {
    type: 'saveChallenge',
    payload
  };
}

export function exportChallenge(payload) {
  return {
    type: 'exportChallenge',
    payload
  };
}