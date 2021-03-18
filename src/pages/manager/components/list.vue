<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status == 1">启用</el-button>
          <el-button type="danger" v-else>禁止</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template v-slot="prop">
          <el-button type="primary" @click="edit(prop.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(prop.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="managerCount"
      @current-change="changePage"
      :page-size="2"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delManager } from "../../../utils/request";
import { successAlert } from "../../../utils/alert";
export default {
  methods: {
    ...mapActions({
      requestManagerList: "manager/managerListActions",
      requestManagerCount: "manager/managerCountActions",
      requestPage: "manager/pageActions",
    }),
    changePage(page) {
      this.requestPage(page);
      this.requestManagerList();
    },
    edit(uid) {
      this.$emit("edit", uid);
    },
    del(uid) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delManager({ uid }).then((res) => {
            successAlert("删除成功");
            this.requestManagerCount();
            this.requestManagerList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  computed: {
    ...mapGetters({
      //管理员列表
      tableData: "manager/managerList",
      //管理员总数
      managerCount: "manager/managerCount",
    }),
  },
  mounted() {
    this.requestManagerList();
    this.requestManagerCount();
  },
};
</script>

<style>
.el-pagination {
  position: fixed;
  top: 60vh;
  right: 40vw;
}
</style>