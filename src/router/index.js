import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Manage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: ()=> import('../views/Manage'),
    redirect:"/Information",
    children:[
      {path:'information',name:'首页',component: ()=> import('../views/Information.vue')},
      {path:'room',name:'房间管理',component: ()=> import('../views/Room.vue')},
      {path:'roomType',name:'房间类型',component: ()=> import('../views/RoomType.vue')},
      {path:'typeIllustration',name:'统计图示',component: ()=> import('../views/TypeIllustration.vue')},
      {path:'bookOrder',name:'订单日志',component: ()=> import('../views/BookOrder.vue')},
      {path:'orderAnalysis',name:'订单分析',component: ()=> import('../views/OrderAnalysis.vue')},
      {path:'user',name:'User',component: ()=> import('../views/User.vue')},
      {path:'CheckIn',name:'客户住房',component: ()=> import('../views/CheckIn.vue')},
      {path:'CheckOut',name:'客户退房',component: ()=> import('../views/CheckOut.vue')},
      {path:'Users',name:'用户管理',component: ()=> import('../views/Users')}
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component:()=>import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  localStorage.setItem("currentPathName",to.name)
  next()
})
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

export default router
