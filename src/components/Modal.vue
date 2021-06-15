<template>
  <transition name="slide">
    <!-- v-show写在这里也行，写在index.vue里也行，但最好写在这，因为影响动画效果 -->
    <div class="modal" v-show="showModal">  
      <div class="mask"></div>
      <!-- 弹出填写地址的框 -->
      <div class="modal-dialog">  
        <div class="modal-header">
          <span>{{title}}</span>
          <!-- 关闭按钮 -->
          <a href="javascript:;" class="icon-close" v-on:click="$emit('cancel')"></a>
        </div>
        <div class="modal-body">
          <!-- 定义一个插槽可以往里面插东西，在index.vue里写了slot的名称 -->
          <slot name="body"></slot>  
        </div>
        <div class="modal-footer">
            <!-- 从子组件向父组件传递，emit,个按钮，有时候有一个 -->
            <a href="javascript:;" class="btn" v-if="btnType==1" v-on:click="$emit('submit')">{{sureText}}</a> 
            <a href="javascript:;" class="btn" v-if="btnType==2" v-on:click="$emit('cancel')">{{cancelText}}</a> 
          <div class="btn-group" v-if="btnType==3"> 
            <!-- 如果是不满足上面条件，就是两个按钮都有 -->
            <a href="javascript:;" class="btn" v-on:click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn" v-on:click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default{
    name:'modal',
    props:{ //接收父组件传递过来的信息
      //弹窗类型：小small、中middle、大large、表单form
      modalType:{
        type:String,
        default:'form'
      },
      //弹框标题
      title:String,
      //按钮类型：1：确定按钮 2：取消按钮  3：确定取消
      btnType:String,
      sureText:{
        type:String,
        default:'确定'
      },
      cancelText:{
        type:String,
        default:'取消'
      },
      showModal:Boolean //不能直接设置为true
    }
  }
</script>
