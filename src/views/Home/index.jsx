import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    (async () => {
      try {
        let { date, stories, top_stories } = await api.queryNewsLatest();
        setToday(date);
        setBanner(top_stories);
        // newsList.push({date, stories})

        setNewsList([{ date, stories }, ...newsList])
      } catch (error) { }
    })()
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


      <div className="load-more-box">
        Loading
        <DotLoading />
      </div>
    </div>
  )
}
