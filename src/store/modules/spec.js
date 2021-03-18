import { getSpec, specCount } from "../../utils/request";

const state = {
  specList: [],
  //每页显示的数据数目
  size: 2,
  //当前页码数
  page: 1,
  count: 0
}

const mutations = {
  changeSpecList(state, arr) {
    state.specList = arr;
  },
  changeCount(state, num) {
    state.count = num;
  },
  changePage(state, page) {
    state.page = page;
  }
}

const actions = {
  specListActions(context) {
    var params = {
      size:context.state.size,
      page:context.state.page,
    }
    getSpec(params).then(res => {
      if((res.data.list == null || res.data.list.length == 0) && context.state.page > 1){
        var p = context.state.page - 1;
        context.commit('changePage',p);
        context.dispatch('specListActions');
      }
      context.commit('changeSpecList', res.data.list)
    })
  },
  specCountActions(context) {
    specCount().then(res => {
      context.commit('changeCount', res.data.list[0].total)
    })
  },
  pageActions(context,page) {
    context.commit('changePage', page)
  }
}

const getters = {
  specList(state) {
    return state.specList
  },
  specCount(state) {
    return state.count
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}