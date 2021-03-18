<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  data() {
    return {
      info: {
        //控制添加弹窗显示
        show: false,
        //控制按钮为添加还是修改
        isAdd: true,
        // 控制标题
        title: "",
      },
    };
  },
  components: {
    vAdd,
    vList,
  },
  methods: {
    add() {
      this.info.show = true;
      this.info.isAdd = true;
      this.info.title = "添加商品分类";
    },
    edit(id) {
      this.info.show = true;
      this.info.isAdd = false;
      this.info.title = "编辑商品分类";
      this.$refs.add.getDetail(id);
    },
  },
};
</script>

<style scoped>
.el-button {
  margin-top: 25px;
  margin-bottom: 10px;
}
 
</style>