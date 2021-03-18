<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }">
      <el-table-column prop="id" label="角色编号"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status == 1">启用</el-button>
          <el-button type="danger" v-else>禁止</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from '../../../utils/alert';
import { delRole } from "../../../utils/request";
export default {
  computed: {
    ...mapGetters({
      tableData: "role/roleList",
    }),
  },
  methods: {
    //对接role.js 的actions
    ...mapActions({
      resquestRoleList: "role/roleListActions",
    }),
    //编辑角色
    edit(id) {
      this.$emit("edit", id);
    },
    //删除角色
    del(id) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delRole({id}).then(res=>{
            successAlert('删除成功');
            this.resquestRoleList();
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    //1.发起请求，获取角色列表
    this.resquestRoleList();
  },
};
</script>

<style>
</style>