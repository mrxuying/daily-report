import { Button } from 'antd-mobile'
import React, { useState } from 'react'

import './index.less'
// import { flushSync } from 'react-dom';

export default function ButtonCustom(props) {
  //获取参数
  let options = { ...props };
  let { children, onClick: handle } = options;
  delete options.children;
  // delete options.onClick;

  let [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await handle();
    } catch (error) { }
    setLoading(false);
  };

  if (handle) {
    options.onClick = handleClick;
    // console.log(options.onClick)
  }

  return (
    <Button {...options} loading={loading} loadingText={children} >{children}</Button>
  );
}


