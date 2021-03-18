<template>
  <div class="container">
    <div class="box">
      <h2>欢迎登录</h2>
      <el-input placeholder="请输入用户名" v-model="user.username"></el-input>
      <el-input
        type="password"
        placeholder="请输入密码"
        v-model="user.password"
      ></el-input>
      <div class="btn">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { warningAlert, successAlert } from "../../utils/alert";
import { reqLogin } from "../../utils/request";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      "reqUser":"userActions"
    }),
    // login(){
    //   // console.log(this.user);
    //   if(this.user.username != '' && this.user.password != ''){
    //     // 允许发起请求
    //     reqLogin(this.user).then(res=>{
    //         successAlert(res.data.msg);
    //         // 将用户信息存入到localStorage中
    //         if(localStorage.getItem('user') !== null){
    //           localStorage.removeItem('user')
    //         }
    //         localStorage.setItem('user',JSON.stringify(res.data.list))
    //         this.$router.push('/')
    //     })
    //   }else{
    //     warningAlert('用户名和密码不能为空！')
    //   }

    login() {
      //vuex结合sessionStorage
      if ((this.user.username !== "") | (this.user.password !== "")) {
        //允许发起请求
        reqLogin(this.user).then((res) => {
          successAlert(res.data.msg);
          // 将数据存入vuex中
          this.reqUser(res.data.list);
          this.$router.push("/");
        });
      } else {
        warningAlert("请输入名户名或者密码");
      }
    },
  },
};
</script>

<style scoped>
.container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #855267, #476095);
}

.box {
  width: 350px;
  height: 210px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
  padding: 25px;
}
.el-input,
.el-button {
  width: 90%;
  margin: 10px;
}
</style>