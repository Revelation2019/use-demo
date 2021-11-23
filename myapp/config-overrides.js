// const {
//   override,
//   addWebpackModuleRule
// } = require("customize-cra");

// module.exports = {
//   webpack: override(
//     addWebpackModuleRule({
//       test: /\.worker\.ts$/, 
//       use: [{
//         loader: 'worker-loader',
//         options: {
//           name: '[name]:[hash:8].js',// 打包后chunk的名称
//           inline: true, // 开启内联模式,免得爆缺少标签或者跨域的错误
//         }
//       },{
//         loader: 'babel-loader',
//         options: {
//           presets: ['@babel/preset-env'],
//         },
//       }]
//     }),
//   )
// };

module.exports = function override(config, env) {
  console.log(config)
  return config;
}