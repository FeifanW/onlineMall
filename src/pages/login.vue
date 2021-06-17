<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt=""></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3><span class="checked">账号登录</span><span class="sep-line"></span>扫码登录</h3>

          <div class="input">
            <input type="text" placeholder="请输入账号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click='register'>手机短信登录 / 注册</div>
            <div class="reg">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="javascript:;">简体</a><span>|</span>
        <a href="javascript:;">繁体</a><span>|</span>
        <a href="javascript:;">English</a><span>|</span>
        <a href="javascript:;">常见问题</a><span>|</span>
        <a href="javascript:;">隐私政策</a>
      </div>
      <p class="copyright">Copyright ©2021 mi.futurefe.com All Rights Reserved.</p>
    </div>
  </div>
</template>
<script>
export default{
  name:'login',
  data() {  //用冒号的话是全局生效
    return {
      username:'',
      password:'',
      userId:'',
      res:{}
    }
  },
  methods:{
    login(){
      let {username,password} = this; //解构赋值
      this.axios.post('/user/login',{
        username,   //key和值相同的时候就可以省略了
        password
      }).then((res)=>{  //在拦截器里面处理过，所以返回的就是data里面的数据，接口文档在门户_用户接口.md
        //把userId可以先保存在cookie里面，可以安装一下vue-cookie
        this.$cookie.set('userId',res.id,{expires:'1M'}) //设置有效时间,1个月过期
        //为了刷新后也保存登录人的信息，要用到vuex
        //tp-do 保存用户名
        this.$router.push('/index');  //输入点击之后跳转到首页
      })
    },
    register() {
      this.axios.post('/user/register',{
        username:'admin1',   //key和值相同的时候就可以省略了
        password:'admin1',
        email:'admin1@163.com'
      }).then(()=>{  //在拦截器里面处理过，所以返回的就是data里面的数据，接口文档在门户_用户接口.md
        alert('注册成功')
      })
    }
  }
}
</script>
<style lang="scss">
 @import './../assets/scss/config.scss';  //引入主题色
  .login{
    background: $colorG;
    &>.container{   //这样属性只针对当前，而不会影响到下面的wrapper里的container样式
      //background-color: aquamarine;
      height: 112px;
      img{
        position: absolute;
        width: auto;
        height: 103px;
        padding-left: 65px;
        vertical-align: middle;
      }
    }
    .wrapper{
      background: url('/imgs/login-bg.jpg') no-repeat center; //防止背景平铺
      .container{
        height: 576px;
        position: relative;
        .login-form{
          box-sizing: border-box;
          width: 410px;
          height: 510px;
          background-color: $colorG;
          position: absolute;
          margin: 37px 369px 29px 813px;  //背景是一个完整图片，和设计稿不太相同，所以
          padding: 0px;
          h3{
            height: 23px;
            font-size: 24px;
            text-align: center;
            margin: 40px auto 49px;
            vertical-align: middle;
            color: $colorC;
            .checked{
              color: $colorA;
            }
            .sep-line{
              margin: auto 32px;
              width: 1px;
              height: 23px;
              border: 1px solid #D7D7D7;
            }
          }
          .input{
            display: inline-block;
            width: 348px;
            height: 50px;
            margin: auto 31px 20px;
            input{
              box-sizing: border-box;
              width: 348px;
              height: 100%;
              border: 1px solid #E5E5E5;
              padding-left: 18px;
              font-size: 14px;
            }
          }
          .btn{
            width: 348px;
            line-height: 50px;
            font-size: 16px;
            margin-top: 10px;
            margin: 10px 31px 0;
            font-weight: bold;
          }
          .tips{
            width: 348px;
            margin: 14px 31px 0;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            cursor: pointer;
            .sms{
              color: $colorA;
            }
            .reg{
              color: $colorD;
              span{
                margin: 0 7px;
              }
            }
          }
        }
      }
    }
    .footer{
      height:100px;
      padding-top:60px;
      color:#999999;
      font-size:16px;
      text-align:center;
      .footer-link{
        a{
          color:#999999;
          display:inline-block;
        }
        span{
          margin:0 10px;
        }
      }
      .copyright{
        margin-top:13px;
      }
    }
  }
</style>