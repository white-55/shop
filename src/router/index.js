import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


const login = () => import('../pages/login/login')
const index = () => import('../pages/index/index')
const home = () => import('../pages/home/home')
const menu = () => import('../pages/menu/menu')
const role = () => import('../pages/role/role')
const manager = () => import('../pages/manager/manager')
const cate = () => import('../pages/cate/cate')
const spec = () => import('../pages/spec/spec')
const goods = () => import('../pages/goods/goods')




export default new Router({
  routes: [
    {
      path: '/login',
      component: login,
      name: '登录'
    },
    {
      path: '/',
      component: index,
      name: '首页',
      children: [
        {
          path: 'home',
          component: home
        },
        {
          path: 'menu',
          component: menu,
          name: '菜单列表',
        },
        {
          path:'role',
          component:role,
          name:'角色列表'
        },
        {
          path:'manager',
          component:manager,
          name:'管理员列表'
        },
        {
          path:'cate',
          component:cate,
          name:'商品分类'
        },
        {
          path:'spec',
          component:spec,
          name:'商品规格'
        },
        {
          path:'goods',
          component:goods,
          name:'商品管理'
        },
        {
          path: '',
          redirect: '/home',
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    },
  ]
})
