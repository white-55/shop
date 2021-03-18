<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="规格名称：" :label-width="formLabelWidth">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in attrArr"
          :key="index"
          label="规格属性："
          :label-width="formLabelWidth">
          <el-col :span="16">
            <el-input v-model="item.value"></el-input>
          </el-col>
          <el-button type="primary" v-if="index == 0" @click="addAttr"
            >添加规格属性</el-button
          >
          <el-button type="danger" v-else @click="delAttr(index)"
            >删 除</el-button
          >
        </el-form-item>
        <el-form-item label="规格状态：" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="blue"
            inactive-color="grey"
            :active-value="1"
            :inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="info.isAdd"
          >确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert, warningAlert } from "../../../utils/alert";
import { addSpec, getOneSpec, updateSpec } from "../../../utils/request";
import { mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      formLabelWidth: "120px",
      attrArr: [{ value: "" }], //规格属性值
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestCount: "spec/specCountActions",
      requestSpecList: "spec/specListActions",
    }),
    addAttr() {
      this.attrArr.push({ value: "" });
    },
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    cancel() {
      this.info.show = false;
      this.attrArr = [{ value: "" }],
      this.form = {
          specsname: "",
          attrs: "",
          status: 1,
        };
    },
    confirm() {
      if (this.attrArr.some(item => item.value === "")) {
        warningAlert("规格属性值不能为空");
        return;
      }
      this.form.attrs = this.attrArr.map(item => item.value).join(",");
      addSpec(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.requestCount();
        this.requestSpecList();
      });
    },
    update() {
      if (this.attrArr.some((item) => item.value === "")) {
        warningAlert("规格属性值不能为空");
        return;
      }
      this.form.attrs = this.attrArr.map((item) => item.value).join(",");
      updateSpec(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.requestSpecList();
      });
    },
    getDetail(id) {
      getOneSpec({ id }).then((res) => {
        this.form = res.data.list[0];
        var arr = this.form.attrs.split(",");
        this.attrArr = [];
        for (let i in arr) {
          this.attrArr.push({ value: arr[i] });
        }
      });
    },
  },
};
</script>

<style>
</style>