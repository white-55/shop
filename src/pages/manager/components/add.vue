<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色：" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密 码：" :label-width="formLabelWidth">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="菜单状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#409EFF"
            inactive-color="grey"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" v-if="info.isAdd" @click="confirm">确 定</el-button>
          <el-button type="primary" v-else @click="update">修 改</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import {
  addManager,
  getOneManager,
  updateManager,
} from "../../../utils/request";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    cancel() {
      this.info.show = false;
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    confirm() {
      addManager(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        // 更新页数
        this.requestManagerCount();
        this.requestManagerList();
      });
    },
    update() {
      updateManager(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        // 更新页数
        this.requestManagerCount();
        // 更新列表
        this.requestManagerList();
      });
    },
    //获取管理员详情
    getDetail(uid) {
      getOneManager({ uid }).then((res) => {
        this.form = res.data.list;
        // 清空密码
        this.form.password = "";
      });
    },
    ...mapActions({
      requestRoleList: "role/roleListActions",
      requestManagerList: "manager/managerListActions",
      requestManagerCount: "manager/managerCountActions",
    }),
  },
  computed: {
    ...mapGetters({
      roleList: "role/roleList",
    }),
  },
  mounted() {
    this.requestRoleList();
  },
};
</script>

<style>
</style>