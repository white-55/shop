import { getGoods, goodsCount } from '../../utils/request'
const state = {
  goodsList: [],
  count: 0,
  page: 1,
  size: 2,
}

const mutations = {
  changeGoodsList(state, arr) {
    state.goodsList = arr
    console.log(state.goodsList);
  },
  changeCount(state, num) {
    state.count = num
  },
  changePage(state, page) {
    state.page = page
    console.log(state.page);
  }
}

const actions = {
  goodsListActions(context) {
    var params = {
      page: context.state.page,
      size: context.state.size
    }
    getGoods(params).then(res => {
      console.log(params);
      // if ((res.data.goodsList == null || res.data.goodsList.length == 0) && context.state.page > 1) {
      //   var p = context.state.page - 1;
      //   context.commit('changePage', p);
      //   context.dispatch('goodsListActions');
      //   return
      // }
      context.commit('changeGoodsList', res.data.list)
    })
  },
  countActions(context) {
    goodsCount().then(res => {
      context.commit('changeCount', res.data.list[0].total)
    })

  },
  pageActions(context,page) {
    context.commit('changePage', page)
  }
}

const getters = {
  goodsList(state) {
    return state.goodsList
  },
  goodsCount(state) {
    return state.count
  },
  size(state) {
    return state.size
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}