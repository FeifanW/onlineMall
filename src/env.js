let baseURL;    //根据不同的环境，返回不同的url地址
// 用这种的方式的前提是JSONP跨域，或者CROS跨域，用代理的话完全没必要
//代理的方法就是改vue.config
//如果env不生效，就可以用注入环境变量创建一个.env.test 在里面写NODE_ENV='test'
switch (process.env.NODE_ENV) {  //可以获取当前传过来的参数，获取当前nodejs进程里的环境变量
  case 'development':
    baseURL = 'http://dev-mall-pre.springboot.cn/api';
    break;
  case 'test':
    baseURL = 'http://test-mall-pre.springboot.cn/api';
    break;
  case 'prev':
    baseURL = 'http://prev-mall-pre.springboot.cn/api';
    break;
  case 'prod':
    baseURL = 'http://mall-pre.springboot.cn/api';
    break;
  default:
    baseURL = 'http://mall-pre.springboot.cn/api';
    break;
}

export default {
  baseURL
}