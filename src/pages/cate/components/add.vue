<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类：" :label-width="formLabelWidth">
          <el-select v-model="form.pid">
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 遍历分类列表 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称：" :label-width="formLabelWidth">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <div>
          <p>图片：</p>
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>

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
          <el-button type="primary" v-if="info.isAdd" @click="confirm"
            >确 定</el-button
          >
          <el-button type="primary" v-else @click="update">修 改</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert, warningAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import { addCate,getOneCate,updateCate } from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
      imageUrl: "",
      formLabelWidth: "120px",
    };
  },
  methods: {
    changeImg(e) {
      // 1.处理文件大小
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("文件大小不能超过2M");
        return;
      }
      // 2.处理文件后缀
      var ext = [".jpg", ".png", ".jpeg", ".gif"];
      var extName = e.name.slice(e.name.lastIndexOf("."));
      if (!ext.some((item) => item == extName)) {
        warningAlert("上传文件格式不正确");
        return;
      }
      // 上传显示的文件
      // 将文件生成url地址,并显示在页面中
      this.imageUrl = URL.createObjectURL(e.raw);
      // 将文件存放到form.img中
      this.form.img = e.raw;
    },
    //关闭窗口并清空数据
    cancel() {
      this.info.show = false;
      this.form = {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      };
      this.imageUrl = "";
    },
    confirm() {
      addCate(this.form).then((res) => {
        this.cancel();
        this.requestCateList();
        successAlert(res.data.msg);
      });
    },
    ...mapActions({
      requestCateList: "cate/cateListActions",
    }),
    getDetail(id) {
      getOneCate({ id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg + this.form.img;
      });
    },
    update() {
      updateCate(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.requestCateList();
      });
    },
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
    }),
  },
  mounted() {
    this.requestCateList();
  },
};
</script>

<style scoped>
p {
  width: 120px;
  height: 40px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>