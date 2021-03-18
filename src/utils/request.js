import axios from 'axios'
import qs from 'qs'
import store from '../store/index'
// 引入弹出信息
import { successAlert, warningAlert, errorAlert } from './alert'
// 基础路径
const baseUrl = "/api";

// 在请求拦截中设置请求头
axios.interceptors.request.use(config => {
  console.group('本次请求路径为:' + config.url)
  if (config.url !== baseUrl + '/api/userlogin') {
    // 需要设置请求头
    config.headers.authorization = store.state.user.token
  }
  console.log(config);
  return config
})

// 响应拦截
axios.interceptors.response.use(res => {
  console.group('本次响应路径为：' + res.config.url);
  if (res.data.code !== 200) {
    errorAlert(res.data.msg);
    return
  }
  console.log(res);
  // successAlert(res.data.msg);
  return res
})

// 添加菜单
export const addMenu = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menuadd',
    data: qs.stringify(data)
  })
}

// 菜单列表
export const getMenu = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/menulist',
    params,
  })
}

// 获取菜单详情
export const getOneMenu = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/menuinfo',
    params,
  })
}

// 修改菜单
export const updateMenu = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menuedit',
    data: qs.stringify(data)
  })
}

// 删除菜单
export const delMenu = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menudelete',
    data: qs.stringify(data)
  })
}

// 添加角色
export const addRloe = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/roleadd',
    data: qs.stringify(data)
  })
}

// 角色列表
export const getRole = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/rolelist',
    params,
  })
}

// 获取角色详情
export const getOneRole = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/roleinfo',
    params,
  })
}

// 修改角色信息
export const updateRole = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/roleedit',
    data: qs.stringify(data),
  })
}

// 删除角色
export const delRole = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + "/api/roledelete",
    data: qs.stringify(data)
  })
}

// 添加管理员
export const addManager = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + "/api/useradd",
    data: qs.stringify(data)
  })
}

// 管理员列表
export const getManager = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + "/api/userlist",
    params
  })
}

// 管理员总数
export const managerCount = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/usercount',
    params,
  })
}

// 获取管理员详情
export const getOneManager = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/userinfo',
    params,
  })
}

// 修改管理员信息
export const updateManager = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/useredit',
    data: qs.stringify(data),
  })
}

// 删除管理员
export const delManager = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + "/api/userdelete",
    data: qs.stringify(data)
  })
}

// 登录
export const reqLogin = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/userlogin',
    data: qs.stringify(data)
  })
}

// 添加商品分类
export const addCate = (data) => {
  // 使用FormData来处理带有文件的数据
  var form = new FormData()
  for (let i in data) {
    form.append(i, data[i])
  }
  return axios({
    method: 'post',
    url: baseUrl + '/api/cateadd',
    data: form
  })
}

// 商品分类列表
export const getCate = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/catelist',
    params,
  })
}

// 获取商品分类详情
export const getOneCate = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/cateinfo',
    params,
  })
}

// 修改商品分类信息
export const updateCate = (data)=>{
  var form = new FormData()
  for(let i in data){
    form.append(i,data[i])
  }
  return axios({
    method:'post',
    url:baseUrl+'/api/cateedit',
    data:form,
  })
}


// 删除分类
export const delCate = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + "/api/catedelete",
    data: qs.stringify(data)
  })
}

// 添加商品规格
export const addSpec = (data)=>{
  return axios({
    method:'post',
    url:baseUrl + '/api/specsadd',
    data:qs.stringify(data),
  })
}

// 商品规格列表
export const getSpec = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/specslist',
    params,
  })
}

// 商品规格总数
export const specCount = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/specscount',
    params,
  })
}

// 获取商品规格详情
export const getOneSpec = (params) =>{
  return axios ({
    method:'get',
    url: baseUrl + '/api/specsinfo',
    params,
  })
}

// 修改商品分类信息
export const updateSpec = (data)=>{
  // var form = new FormData()
  // for(let i in data){
  //   form.append(i,data[i])
  // }
  return axios({
    method:'post',
    url:baseUrl+'/api/specsedit',
    data:qs.stringify(data)
  })
}

// 删除商品规格
export const delSpec = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + "/api/specsdelete",
    data: qs.stringify(data)
  })
}

// 添加商品
export const addGoods = (data)=>{
  var form = new FormData()
  for(let i in data){
    form.append(i,data[i])
  }
  return axios({
    method:'post',
    url:baseUrl + '/api/goodsadd',
    data:form
  })
}

// 获取商品总数
export const goodsCount = ()=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/goodscount'
  })
}


// 获取商品列表
export  const getGoods = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/goodslist',
    params,
  })
}

// 获取商品详情
export const getOneGoods = (params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/goodsinfo',
    params,
  })
}

// 修改商品
export const updateGoods = (data)=>{
  var form = new FormData()
  for(let i in data){
    form.append(i,data[i])
  }
  return axios({
    method:'post',
    url:baseUrl+'/api/goodsedit',
    data:form
  })
}


// 删除商品
export const delGoods = (data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/goodsdelete',
    data:qs.stringify(data)
  })
}