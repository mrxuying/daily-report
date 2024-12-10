import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'antd-mobile'
import { Link } from 'react-router-dom'

import './index.less'

export default function NewsItem(props) {
  console.log(props)
  let { story } = props;
  if (!Array.isArray(story.images)) story.images = [story.image]
  return (
    <div className='news-item-box'>
      <Link to={{ pathname: `/detail/:${story.id}` }}>
        <div className="news-content">
          <h4>{story.title}</h4>
          {story.hint ? <p>{story.hint}</p> : null}
        </div>
        <Image src={story.images[0]} lazy />
      </Link>
    </div>
  )
}

NewsItem.propTypes = {
  story: PropTypes.object.isRequired
}
