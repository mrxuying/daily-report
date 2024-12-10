import * as TYPES from '../actiontypes';
import utils from '../../assets/utils';

let initial = {
  list: null
};

export default function storeReducer(state=initial, action) {
  state = utils.clone(state);
  switch (action.type) {
    case TYPES.LIST:
      state.list = action.list;
      break;
    default:
  }
  return state
};