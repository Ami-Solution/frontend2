import objectAssign from 'object-assign';

import * as types from '../constants/history';

const initialState = {
  positionList: [],
  isFetched: false,
  questions: {
    howLongStay: 0,
    unemploymentPeriod: 0
  }
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case types.POSITION_INITIAL: {
      const initialPositionList = JSON.parse(window.localStorage.getItem('positionList'));
      return objectAssign({}, state, { positionList: initialPositionList });
    }
    case types.ADD_POSITION: {
      const positionList = state.positionList;
      positionList.push(action.payload.values);
      window.localStorage.positionLis = JSON.stringify(positionList);
      return objectAssign({}, state, positionList);
    }
    case types.DELETE_POSITION: {
      const editPositionList = state.positionList;
      const index = editPositionList.indexOf(editPositionList.find(p => p.id === action.payload.id));
      editPositionList.splice(index, 1);
      window.localStorage.setItem('positionList',  JSON.stringify(editPositionList));
      return objectAssign({}, state, { positionList: editPositionList });
    }
    case types.HISTORY_FILE_UPLOAD: {
      const file = {
        ipfs_hash: action.payload.ipfs_hash,
        mimetype: action.payload.meta.mimetype,
        name: action.payload.meta.name
      };
      return objectAssign({}, state, { file });
    }
    case types.POLICY_UPDATE: {
      return objectAssign({}, state);
    }
    case types.POLICY_SIGN_START:
      return objectAssign({}, state, { isFetched: true });
    case types.POLICY_SIGN_SUCCESS:
      return objectAssign({}, state, { isFetched: false });
    case types.POLICY_SIGN_ERROR:
      return objectAssign({}, state, { isFetched: false });
    default:
      return state;
  }
}

export default profileReducer;
