/* eslint-disable no-restricted-globals */
const webWorker: Worker = self as any; // 创建主进程this指针
webWorker.addEventListener('message', event => {
  console.log(event.data.msg);
  // 部署message事件接收主进程的信息
  webWorker.postMessage({
    msg: '消息已收到，好久不见！' // 使用 postMessage 方法向主进程传输信息
  });
});
// 无法在 "--isolatedModules" 下编译“Worker.ts”，因为它被视为全局脚本文件。请添加导入、导出或空的 "export {}" 语句来使它成为模块。
export default null as any;
