import React, { useEffect } from "react";
import { SwipeAction, Toast } from 'antd-mobile';
import styled from "styled-components";
import { connect } from 'react-redux';
import action from '../../store/action';
import NavBarAgain from '../../components/NavBarCustom';
import NewsItem from '../../components/NewsItem';
import SkeletonAgain from '../../components/SkeletonCustom';
import { api } from "../../api";

/* 样式 */
const CollectionBox = styled.div`
    .box {
      padding:30px;
    }
`;

function Collection(props) {
  let { collections, queryCollectionListAsync, removeCollectionListById } = props;
  useEffect(() => {
    // 第一次加载完毕:如果redux中没有收藏列表,则异步派发获取
    if (!collections) {
      (async () => {
        await queryCollectionListAsync();
      })()
    }
  }, []);//eslint-disable-line

  // 移除收藏
  const handleRemove = async (id) => {
    try {
      let { code } = await api.removeCollection(id);
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: '移除失败'
        });
        return;
      }
      Toast.show({
        icon: 'success',
        content: '移除成功'
      });
      removeCollectionListById(id);
    } catch (_) { }
  };

  return <CollectionBox>
    <NavBarAgain title="我的收藏" />
    {collections ?
      <div className="box">
        {collections.map(item => {
          let { id, news } = item;
          return <SwipeAction key={id} rightActions={[{
            key: 'delete',
            text: '删除',
            color: 'danger',
            onClick: handleRemove.bind(null, id)
          }]}>
            <NewsItem story={news} />
          </SwipeAction>;
        })}
      </div> :
      <SkeletonAgain />
    }
  </CollectionBox>;
};
export default connect(
  state => state.collections,
  action.collection
)(Collection);