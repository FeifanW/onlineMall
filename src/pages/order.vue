<template>
  <div>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavFooter from '../components/NavFooter'
import ServiceBar from '../components/ServiceBar.vue'
export default {
  name:'order',
  data(){
    return {
      title:'',
      tip:''
    }
  },
  components:{
    ServiceBar,
    NavFooter
  }
}
</script>