import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import {initMenu} from "@/utils/menu"
import {getRequest} from "@/utils/api";
import {postRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {deleteRequest} from "@/utils/api";
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest=postRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.deleteRequest=deleteRequest;

Vue.config.productionTip = false;
Vue.use(ElementUI);

//导航守卫
router.beforeEach((to,from,next)=>{
  if(window.sessionStorage.getItem('tokenStr')){
    initMenu(router,store);
    next()
  }else{
    if(to.path=='/'){
      next();
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
