<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add.vue";
import vList from "./components/list.vue";
export default {
  data() {
    return {
      info:{
        show:false,
        title:'',
        isAdd:true
      }
      
    };
  },
  methods: {
    add() {
      this.info.show = true;
      this.info.title = "添加菜单";
      this.info.isAdd = true;
    },
    edit(id){
      this.info.show = true;
      this.info.title = "编辑菜单";
      this.$refs.add.getDetail(id);
      this.info.isAdd = false;
    },
    
  },
  components: {
    vAdd,
    vList,
  },
};
</script>

<style scoped>
.el-button {
  margin-top: 25px;
  margin-bottom: 10px;
}
</style>