<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="菜单名称：" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单：" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型：" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.type" :label="1">目录</el-radio>
            <el-radio v-model="form.type" :label="2">菜单</el-radio>
          </template>
        </el-form-item>
        <el-form-item
          label="菜单图标："
          :label-width="formLabelWidth"
          v-if="form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option
              v-for="item in icons"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址：" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in urls"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
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
          <el-button type="primary" @click="confirm" v-if="info.isAdd"
            >确 定</el-button
          >
          <el-button type="primary" @click="update" v-else>修 改</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import { addMenu, getOneMenu,updateMenu } from "../../../utils/request";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        id: "",
        pid: "",
        title: "",
        type: 1,
        status: 1,
        icon: "",
        url: "",
      },
      // 所有图标
      icons: ["el-icon-setting", "el-icon-help", "el-icon-menu"],
      // 所有菜单地址
      urls: [
        "menu",
        "home",
        "role",
        "manager",
        "cate",
        "spec",
        "goods",
        "member",
        "banner",
        "seckill",
      ],
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/menuList",
    }),
  },
  methods: {
    ...mapActions({
      requestMenuList: "menu/menuListActions",
    }),
    cancel() {
      this.info.show = false;
      //重置表单
      this.form = {
        url: "",
        pid: "",
        title: "",
        type: 1,
        status: 1,
        icon:'',
      };
    },
    //添加
    confirm() {
      addMenu(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.requestMenuList();
      });
    },
    //获取菜单详情
    getDetail(id) {
      getOneMenu({ id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    update() {
      updateMenu(this.form).then(res=>{
        successAlert(res.data.msg);
        this.cancel();
        this.requestMenuList()
      });
    },
  },
  mounted() {
    this.requestMenuList();
  },
};
</script>

<style>
</style>