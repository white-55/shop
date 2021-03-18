import { getManager, managerCount } from '../../utils/request'
const state = {
  managerList: [],
  //每页显示的数据数目
  size: 2,
  //当前页码数
  page: 1,
  count: 0
}

const mutations = {
  changeManagerList(state, arr) {
    state.managerList = arr
  },
  changeManagerCount(state, num) {
    state.count = num
  },
  changePage(state, page) {
    state.page = page
  }
}

const actions = {
  managerListActions(context) {
    var params = {
      size: context.state.size,
      page: context.state.page
    }
    //发起获取管理员列表请求
    getManager(params).then(res => {
      if ((res.data.list == null || res.data.list.length == 0) && context.state.page > 1) {
        // 将page-1
        var p = context.state.page - 1;
        context.commit('changePage', p);
        // 自调
        context.dispatch('managerListActions');
        return;
      }
      context.commit("changeManagerList", res.data.list)
    })
  },
  managerCountActions(context) {
    managerCount().then(res => {
      context.commit("changeManagerCount", res.data.list[0].total)
    })
  },
  pageActions(context, page) {
    context.commit('changePage', page)
  }
}

const getters = {
  managerList(state) {
    return state.managerList
  },
  managerCount(state) {
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