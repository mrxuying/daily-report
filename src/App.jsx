// 响应式计算样式rem
import 'lib-flexible';
import './index.less'

//处理响应式布局中的最大宽度问题
(function () {
  const handleMax = () => {
    let html = document.documentElement,
      root = document.getElementById('root'),
      deviceWidth = html.clientWidth;
    root.style.maxWidth = '750PX';
    if (deviceWidth >= 750) {
      html.style.fontSize = '750px';
    }
  };
  handleMax();
  // window.addEventListener('resize', handleMax);
})()

export default function App() {
  return (
    <div className='box'>
      App...
    </div>
  )
}
