import * as TYPES from '../actiontypes';
import _ from '../../assets/utils';

let initial = {
    collections: null
};
export default function collectionReducer(state = initial, action) {
    state = _.clone(state);
    switch (action.type) {
        case TYPES.COLLECTIONS:
            state.collections = action.collections;
            break;
        case TYPES.REMOVE_COLLECTION:
            if (Array.isArray(state.collections)) {
                state.collections = state.collections.filter(item => {
                    return +item.id !== +action.id;
                });
            }
            break;
        default:
    }
    return state;
};