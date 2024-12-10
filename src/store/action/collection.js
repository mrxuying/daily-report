import * as TYPES from '../actiontypes';
import {api} from '../../api';

const collectionAction = {
    // 异步获取收藏列表,同步到redux中
    async queryCollectionListAsync() {
        let list = null;
        try {
            let { code, data } = await api.collectionList();
            if (+code === 0) {
                list = data;
            }
        } catch (_) { }
        return {
            type: TYPES.COLLECTIONS,
            collections: list
        };
    },
    // 清空收藏列表
    clearCollectionList() {
        return {
            type: TYPES.COLLECTIONS,
            collections: null
        };
    },
    // 移除某一项收藏
    removeCollectionListById(id) {
        return {
            type: TYPES.REMOVE_COLLECTION,
            id
        };
    }
};
export default collectionAction;