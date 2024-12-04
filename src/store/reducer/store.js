import * as TYPES from '../actiontypes';
import utils from '../../assets/utils';

let initial = {
  list: null
};

export default function storeReducer(state=initial, action) {
  state = utils.clone(state);
  switch (action.type) {
    case 1:
  
    default:
  }
  return state
};