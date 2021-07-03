module.exports = { //记着加s,不是export而是exports
  devServer: {
    host:'localhost',
    port:8080,
    proxy:{
      '/api':{  //接口里会写api,但是实际上会被下面pathRewrite的给干掉
        target:'http://mall-pre.springboot.cn',
        changeOrigin:true,
        pathRewrite:{  //改完配置文件之后要重启服务
          '/api':''
        }
      }
    }
  },
  productionSourceMap:false
}