export function updateChallenge(dispatch, payload) {
  dispatch ({
    type: 'updateChallenge',
    payload
  });
}

export function loadFile(dispatch, payload) {
  dispatch ({
    type: 'loadFile',
    payload
  });
}

export function loadChallenge(dispatch, payload) {
  dispatch ({
    type: 'loadChallenge',
    payload
  });
}

export function saveChallenge(dispatch, payload) {
  dispatch ({
    type: 'saveChallenge',
    payload
  });
}

export function exportChallenge(payload) {
  return {
    type: 'exportChallenge',
    payload
  };
}