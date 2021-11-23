import React from 'react';
import Main from './components/Main';
import { Provider } from 'mobx-react';
import stores from './store';

// 判断是移动端还是PC端
(() => {
  if (
    (navigator.userAgent.indexOf('Android') > -1 ||
      navigator.userAgent.indexOf('Linux') > -1 ||
      !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
  ) {
    // ['flexible_css.debug.js', 'flexible.debug.js'].forEach(filename => {
    //   import(
    //     /* webpackChunkName: "flexible" */ `../../../public/flexible/${filename}`
    //   );
    // });

    // 使用viewport做移动端页面自适应
    const flexible = () => {
      const rate = window.screen.width / 375; // 按照750px的高保真做，计算页面缩放比率
      document.querySelector('meta[name="viewport"]')?.setAttribute('content', `width=device-width, initial-scale=${rate}`);
    };
    flexible();
    window.onresize = () => {
      flexible();
    };
  }
})();

if (
  // @ts-ignore
  process.env.NODE_ENV === 'development' &&
  (navigator.userAgent.indexOf('Android') > -1 ||
    navigator.userAgent.indexOf('Linux') > -1 ||
    !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
) {
  fetch('https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js').then(res => {
    if (res.status === 200) {
      res.text().then(code => {
        try {
          // eslint-disable-next-line no-eval
          window.eval(code);
          // eslint-disable-next-line no-new
          new (window as any).VConsole();
          console.log(screen.width);
        } catch (error) {
          console.error('控制台加载失败！！！');
        }
      });
    } else {
      console.warn('获取vconsole.min.js失败！！！');
    }
  });
}

const H5 = (props: any) => {
  return <Provider {...stores}><Main {...props}/></Provider>;
};

export default H5;
