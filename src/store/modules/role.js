import {getRole} from '../../utils/request'

const state = {
  roleList:[]
}

//操作数据
const mutations = {
  //将接收到的数据复制给state
  changeRoleList(state,arr){
    state.roleList = arr;
  }
}

const actions = {
  roleListActions(context){
    //2.发起请求 获取角色列表,成功就进入then
    getRole().then(res=>{
      // 传数据给mutations
      context.commit('changeRoleList',res.data.list)
    })
  }
}

const getters = {
  roleList(state){
    return state.roleList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  //命名空间
  namespaced:true
}