import * as TYPES from '../actiontypes';

const storeAction = {
  queryList(){
    return {
      type: TYPES.LIST,
      list: []
    }
  }
};

export default storeAction;