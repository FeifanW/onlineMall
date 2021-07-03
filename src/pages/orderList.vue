<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <!-- 控制什么时候显示什么时候不显示 -->
          <loading v-if="loading"></loading>
          <!-- 从后台获取的数据进行遍历 -->
          <div class="order" v-for="(order,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">  
                <!-- 订单的时间 -->
                {{order.createTime}}
                <span>|</span>
                <!-- 收货人 -->
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <!-- 后端已经把图片放到了CDN服务器了，在后端的接口哪里 -->
                    <img v-lazy="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <!-- 商品名称，以及总价 -->
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <!-- 20就是已经付款 -->
              <div class="good-state fr" v-if="order.status == 20">
                <!-- 订单状态 -->
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <!-- 不是20就是未付款 -->
              <div class="good-state fr" v-else>
                <!-- 支付需要订单号 -->
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <el-pagination
            v-if="false"
            class="pagination"
            background
            layout="prev, pager, next"
            :pageSize="pageSize"
            :total="total"
            @current-change="handleChange"
            >
          </el-pagination>
          <div class="load-more">
            <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
          </div>
          <!-- <div class="load-more" v-if="false">
              <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
          </div>
          <div class="scroll-more"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="true"
            infinite-scroll-distance="410"
            v-if="false"
          >
            <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
          </div> -->
          <no-data v-if="!loading && list.length==0"></no-data>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import Loading from './../components/Loading'
import NoData from './../components/NoData'
import { Pagination,Button } from 'element-ui'
export default{
  name:'orderList',
  data(){
    return {
      loading:false,
      list:[],
      pageSize:10,  //上面el-pagination的属性，每一页显示的条数
      pageNum:1,
      total:0  //这个total的值从接口来,总条数
    }
  },
  components:{
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]:Pagination,
    [Button.name]:Button  //Button.name就是el-Button
  },
  mounted(){
    this.getOrderList() //初始化这个方法
  },
  methods: {
    getOrderList(){
      this.loading = true;
      this.axios.get('/orders',{  //post请求的话不需要加params
        params:{
          pageSize:10,
          pageNum:this.pageNum
        }
      }).then((res)=>{
        this.loading = false;
        this.list = this.list.concat(res.list);  //没有数据的时候显示空，把数组拼接起来
        this.total = res.total; //从接口获得total
      }).catch(()=>{
        this.loading = false;  //报错用catch抓取，一样
      })
    },
    goPay(orderNo){
      // 三种路由跳转方式 query params 和 name
      // 也可以用name的形式传参
      // this.$router.push({
      //   name:'order-pay',  这个name就是路由配置里的name
      // })
      this.$router.push({
        path:'/order/pay',
        query:{  //params传参会显示在地址栏上
          orderNo
        }
      })
    },
    handleChange(pageNum) {  //分页器可以获取第几页
      this.pageNum = pageNum;
      this.getOrderList();
    },
    loadMore(){
      this.pageNum++;
      this.getOrderList();  //翻页之后再次获取一次列表，需要的效果是第二页内容加上去而不是覆盖掉
    }
  }
}
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .order-list{
    .wrapper{
      background-color:$colorJ;
      padding-top:33px;
      padding-bottom:110px;
      .order-box{
        .order{
          @include border();
          background-color:$colorG;
          margin-bottom:31px;
          &:last-child{
            margin-bottom:0;
          }
          .order-title{
            @include height(74px);
            background-color:$colorK;
            padding:0 43px;
            font-size:16px;
            color:$colorC;
            .item-info{
              span{
                margin:0 9px;
              }
            }
            .money{
              font-size:26px;
              color:$colorB;
            }
          }
          .order-content{
            padding:0 43px;
            .good-box{
              width:88%;
              .good-list{
                display: flex;
                align-items: center;
                height:145px;
                .good-img{
                  width:112px;
                  img{
                    width:100%;
                  }
                }
                .good-name{
                  font-size:20px;
                  color:$colorB;
                }
              }
            }
            .good-state{
              @include height(145px);
              font-size: 20px;
              color:$colorA;
              a{
                color:$colorA;
              }
            }
          }
        }
        .pagination{
          text-align:right;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{  //分页器的颜色
          background-color: #FF6600;
        }
        .load-more{
          text-align: center;
        }
        .el-button--primary{
          background-color: #FF6600;
          border-color: #FF6600;
        }
        .load-more,.scroll-more{
          text-align:center;
        }
      }
    }
  }
</style>