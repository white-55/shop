import { getMenu } from "../../utils/request"

const state = {
  menuList:[]
}

const mutations = {
  changeMenuList(state,arr){
    state.menuList = arr
  }
}

const actions = {
  menuListActions(context){
    getMenu({istree:true}).then(res=>{
      // console.log(res);
      context.commit("changeMenuList",res.data.list)
    })
  }
}

const getters = {
  menuList(state){
    return state.menuList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}
