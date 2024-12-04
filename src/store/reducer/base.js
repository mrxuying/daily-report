import * as TYPES from '../actiontypes';
import utils from '../../assets/utils';

let initial = {
  info: null
};

export default function baseReducer(state=initial, action) {
  state = utils.clone(state);
  switch (action.type) {
    case 1:
  
    default:
  }
  return state
};