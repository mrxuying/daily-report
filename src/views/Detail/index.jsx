import React, { useEffect, useState } from 'react'
import { Badge } from 'antd-mobile'
import { LeftOutline, LikeOutline, MessageOutline, MoreOutline, StarOutline } from 'antd-mobile-icons'

import './index.less'
import { api } from '../../api'
import SkeletonCustom from '../../components/SkeletonCustom'
import { flushSync } from 'react-dom'


export default function Detail(props) {

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
          <span><StarOutline /></span>
          <span><MoreOutline /></span>
        </div>

      </div>
    </div>
  )
}
