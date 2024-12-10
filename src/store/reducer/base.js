import * as TYPES from '../actiontypes';
import utils from '../../assets/utils';

let initial = {
  userInfo: null
};

export default function baseReducer(state=initial, action) {
  //这里需要克隆一份公共状态出来
  state = utils.clone(state);
  switch (action.type) {
    case TYPES.BASE_INFO:
      state.userInfo = action.userInfo;
      break;
  
    default:
  }
  return state
};