import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd-mobile';

import './index.less';

export default function SkeletonCustom(props) {

  let { lineCount } = props;

  return (
    <div className='skeleton-custom-box'>
      <Skeleton.Title animated />
      <Skeleton.Paragraph lineCount={lineCount} animated />
    </div>
  );
}

SkeletonCustom.defaultProps = {
  lineCount: 5
};

SkeletonCustom.propTypes = {
  lineCount: PropTypes.number
};
