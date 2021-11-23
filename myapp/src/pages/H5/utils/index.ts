/** 判断是IOS还是安卓 */
export const isAndriodOrIos = () => {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

  return { isAndroid, isIOS };
};
