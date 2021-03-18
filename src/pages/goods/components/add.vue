<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="opened">
      <el-form :model="form">
        <el-form-item label="一级菜单：" :label-width="formLabelWidth">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changeCate"
          >
            <!-- <el-option label="顶级菜单" :value="0"></el-option> -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级菜单：" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <!-- <el-option label="顶级菜单" :value="0"></el-option> -->
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称：" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格：" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格：" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
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
        <el-form-item label="商品规格：" :label-width="formLabelWidth">
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="changeSpec"
          >
            <!-- 遍历商品规格列表 -->
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性：" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" multiple placeholder="请选择">
            <!-- 遍历菜单列表 -->
            <el-option
              v-for="(item, index) in secondSpec"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品：" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.isnew" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否热卖：" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.ishot" :label="2">否</el-radio>
          </template>
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
        <el-form-item label="描述：" :label-width="formLabelWidth">
          <div id="div1"></div>
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
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import { warningAlert, successAlert } from "../../../utils/alert";
import { addGoods, getOneGoods, updateGoods } from "../../../utils/request";
export default {
  props: ["info"],
  data() {
    return {
      imageUrl: "", //要显示在页面中的图片地址
      formLabelWidth: "120px",
      secondCate: [], //获取二级分类列表
      secondSpec: [], //获取规格属性列表
      editor: "", //存放富文本内容
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  methods: {
    // 对话框打开结束之后的回调
    ...mapActions({
      requestCateList: "cate/cateListActions",
      requestSpecList: "spec/specListActions",
      requestCount: "goods/countActions",
      requestGoodsList: "goods/goodsListActions",
    }),
    //改变商品分类，二级标题随之改变
    changeCate() {
      this.form.second_cateid = "";
      var index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCate = this.cateList[index].children;
    },
    //改变商品规格，二级标题随之改变
    changeSpec() {
      this.form.specsattr = [];
      var index = this.specList.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.secondSpec = this.specList[index].attrs;
    },
    //上传图片
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
    opened() {
      this.editor = new E("#div1");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    cancel() {
      this.info.show = false;
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imageUrl = "";
    },
    confirm() {
      this.form.description = this.editor.txt.html();
      // console.log(this.form);
      addGoods(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.requestCount();
        this.requestGoodsList();
      });
    },
    update() {
      this.form.description = this.editor.txt.html();
      updateGoods(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.requestGoodsList();
      });
    },
    getDetail(id) {
      getOneGoods({ id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg + this.form.img;
        this.form.specsattr = this.form.specsattr.split(",");
      });
    },
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
      specList: "spec/specList",
    }),
  },
  mounted() {
    this.requestCateList();
    this.requestSpecList();
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