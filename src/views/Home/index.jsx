import React, { useEffect, useRef, useState } from 'react'
import { Swiper, Image, Divider, DotLoading } from 'antd-mobile';
import { Link } from 'react-router-dom';

import HomeHead from '../../components/HomeHead'
import utils from '../../assets/utils'
import './index.less'
import { api } from '../../api'
import NewsItem from '../../components/NewsItem';
import SkeletonCustom from '../../components/SkeletonCustom'

export default function Home() {

  let [today, setToday] = useState(utils.formatTime(null, "{0}{1}{2}"));
  let [banner, setBanner] = useState([]);
  let [newsList, setNewsList] = useState([])
  let loadingMore = useRef()
  //控制元素是否渲染，可以使用ref
  //1、没有数据之前，不渲染，这时候是ref.current获取不到元素dom
  //2、没有数据之前，挂载元素，但是通过样式来隐藏元素

  useEffect(() => {
    //组件挂载完成后，请求接口
    (async () => {
      try {
        let { date, stories, top_stories } = await api.queryNewsLatest();
        setToday(date);
        setBanner(top_stories);
        newsList.push({ date, stories })

        setNewsList([...newsList])
      } catch (error) { }
    })()
  }, []);//eslint-disable-line

  useEffect(() => {
    //设置监听器
    let ob = new IntersectionObserver(async changes => {
      let { isIntersecting } = changes[0];
      if (isIntersecting) {
        //如果被监听的组件出现则请求接口，并更新状态
        try {
          let time = newsList[newsList.length - 1]['date'];
          let newsListBefore = await api.queryNewsBefore(time);
          newsList.push(newsListBefore)
          setNewsList([...newsList]);
        } catch (error) { }
      }
    });
    let loadMoreElement = loadingMore.current;//这样赋值是应为组件移除后loadingMore.current找不到了
    //监听触底的loading元素
    ob.observe(loadingMore.current);
    //当组件销毁时，移除监听器
    return () => {
      ob.unobserve(loadMoreElement);
      ob = null;
    }

  }, []);//eslint-disable-line

  return (
    <div className='home-box'>
      <HomeHead today={today} />
      <div className="swiper-box">
        {
          banner.length > 0 ? <Swiper autoplay={true} loop={true}>
            {
              banner.map((item) => {
                return (
                  <Swiper.Item key={item.id}>
                    <Link to={{ pathname: `/detail/:${item.id}` }}>
                      {/* <img src={item.image} alt="" /> */}
                      <Image src={item.image} lazy />
                      <div className="desc">
                        <h3 className="title">{item.title}</h3>
                        <p className="author">{item.hint}</p>
                      </div>
                    </Link>
                  </Swiper.Item>
                )
              })
            }
          </Swiper> : null
        }
      </div>
      {
        newsList.length > 0 ?
          <>
            {
              newsList.map((item) => {
                return (
                  <div className="news-box" key={item.date}>
                    <Divider contentPosition='left' >{item.date}</Divider>
                    <div className="list">
                      {
                        item.stories.map((storyItem) => {
                          return (
                            <NewsItem key={storyItem.id} story={storyItem} />
                          )
                        })
                      }
                    </div>
                  </div>
                )
              }
              )
            }
          </> : <SkeletonCustom />
      }
      <div className="load-more-box" ref={loadingMore} style={{ display: newsList.length === 0 ? 'none' : 'block' }}>
        Loading
        <DotLoading />
      </div>
    </div>
  )
}
