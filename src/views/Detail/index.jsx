import React, { useEffect, useState, useMemo } from 'react'
import { Badge, Toast } from 'antd-mobile'
import { LeftOutline, LikeOutline, MessageOutline, MoreOutline, StarOutline } from 'antd-mobile-icons'
import { connect } from 'react-redux'

import './index.less'
import { api } from '../../api'
import SkeletonCustom from '../../components/SkeletonCustom'
import { flushSync } from 'react-dom'
import action from '../../store/action'

function Detail(props) {

  let { navigate, params } = props;//路由中默认传了
  let [newsDetail, setNewsDetail] = useState(null),
    [extra, setExtra] = useState(null);
  let id = params.id.replace(':', '');
  let link;

  const handleStyle = (result) => {
    if (!Array.isArray(result?.css)) return;
    let css = result?.css[0];
    if (!css) return;
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = css;
    document.head.appendChild(link);
  }

  const handleImage = (result) => {
    let imagePlaceHolder = document.querySelector('.img-place-holder');
    if (!imagePlaceHolder) return;
    let tempImg = new Image();
    tempImg.src = result?.image;
    tempImg.onload = () => {
      imagePlaceHolder.appendChild(tempImg);
    }
    //图片加载成功，则把整个图片区域移除
    tempImg.onerror = () => {
      let parent = imagePlaceHolder.parentNode;
      parent.parentNode.removeChild(parent);
    }

  }

  useEffect(() => {
    (async () => {
      try {
        let news = await api.queryNewsInfo(id);
        //必须要先处理样式，才能获取到后端返回的html节点
        flushSync(() => {
          handleStyle(news);
          setNewsDetail(news);
          //同步处理样式，就不会出现无样式文本到有样式的闪屏
        })

        // handleImage(news);
      } catch (error) { }

    })()
    //组件销毁时，需要将添加进来的样式移除
    // return () => {
    //   if (link) document.head.removeChild(link);
    // }
  }, []);//eslint-disable-line

  useEffect(() => {
    (async () => {
      try {
        let extraNum = await api.queryStoryExtra(id)
        setExtra(extraNum)
      } catch (error) { }
    })()
  }, []);//eslint-disable-line

  useEffect(() => {
    handleStyle(newsDetail);
    handleImage(newsDetail);
    // //组件销毁时，需要将添加进来的样式移除
    return () => {
      if (link) document.head.removeChild(link);
    }
  }, [newsDetail]);//eslint-disable-line

  //--------------------------处理收藏，点赞------------------------
  let {
    base: { userInfo: user },
    queryUserInfoAsync,
    collections: { collections },
    queryCollectionListAsync,
    removeCollectionListById,
    location
  } = props;

  useEffect(() => {
    (async () => {
      // 第一次渲染完:如果userInfo不存在,我们派发任务同步登录者信息
      if (!user) {
        let { userInfo } = await queryUserInfoAsync();
        user = userInfo;//eslint-disable-line
      }
      // 如果已经登录 && 没有收藏列表信息:派发任务同步收藏列表
      if (user && !collections) {
        queryCollectionListAsync();
      }
    })();
  }, []);

  //判断用户是否收藏了这条新闻
  const isCollected = useMemo(() => {
    if (!collections) return false;
    return collections.some(item => {
      return +item.news.id === +id;
    });
  }, [collections, params]);//eslint-disable-line

  const handleStar = async () => {
    //如果用户没有登录，则跳转到登录页
    if (!user) {
      Toast.show({
        icon: 'fail',
        content: 'Please Login'
      })
      navigate(`/login?to=${location.pathname}`, { replace: true })
      return;
    }

    //用户登录后会返回到详情页，通过上面useEffect重新获取到了用户信息
    //如果用户收藏过了，则取消收藏
    if (isCollected) {
      // 移除收藏前，先判断redux中是否存在，不存在这不发请求
      let item = collections.find(item => {
        return +item.news.id === +id;
      });
      if (!item) return;

      let { code } = await api.removeCollection(item.id);
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: 'Failed, please refresh'
        });
        return;
      }
      Toast.show({
        icon: 'success',
        content: 'Collect success'
      });
      removeCollectionListById(item.id); //告诉redux中也把这一项移除掉
      return;

    }

    //否则就收藏
    try {
      let { code } = await api.collect(id)
      if (+code === 0) {
        Toast.show({
          icon: 'success',
          content: 'collect success'
        })
        //更新redux收藏列表
        queryCollectionListAsync()
      }
    } catch (error) { }

  }

  return (
    <div className='detail-box'>
      {
        !newsDetail ? <SkeletonCustom /> :
          <div className="content" dangerouslySetInnerHTML={{ __html: newsDetail.body }}></div>
      }


      <div className="bottom-safearea">
        <div className="back" onClick={() => { navigate(-1) }}>
          <LeftOutline />
        </div>
        <div className="icons">
          <Badge content={extra ? extra.comments : 0}>
            <MessageOutline />
          </Badge >
          <Badge content={extra ? extra.popularity : 0}>
            <LikeOutline />
          </Badge >
          <span className={isCollected ? 'collected' : ''} ><StarOutline onClick={handleStar} /></span>
          <span><MoreOutline /></span>
        </div>

      </div>
    </div>
  )
}

export default connect(
  state => {
    return {
      base: state.base,
      collections: state.collections
    }
  },
  { ...action.base, ...action.collection }
)(Detail)
