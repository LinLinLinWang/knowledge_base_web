// module.exports = {
//     devServer: {
//         proxy: {
//             '/api': {
//                 target: '127.0.0.1:8888',
//                 ws: true,
//                 changeOrigin: true,
//                 pathRewrite: {
//                     // 替换target中的请求地址，请求http://aaa/xxx这个地址的时候直接写成/api/xxx即可
//                     '^/api': ''
//                 }
//             }
//         }
//     }
// }
