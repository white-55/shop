<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :uniqueOpened="true"
        default-active="/"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
        <el-menu-item index="/">
          <template>
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </template>
        </el-menu-item>
        <template v-for="item in user.menus">
          <el-submenu :key="item.id" v-if="item.children" :index="item.title" >
            <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
        </template>    
        <el-menu-item v-for="i in item.children" :key="i.id" :index="'/'+i.url">{{i.title}}</el-menu-item>       
          </el-submenu>
          
          <el-menu-item v-else  :key="item.id" :index="'/'+item.url">{{item.title}}</el-menu-item>
          </template>  

          
                  
        <!-- <el-submenu index="2"> -->
          <!-- <template #title>
            <i class="el-icon-setting"></i>
            系统设置
          </template>
          <el-menu-item-group>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/manager">管理员管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template #title>
            <i class="el-icon-s-goods"></i>
            商城管理
          </template>
          <el-menu-item index="/cate">商品分类</el-menu-item>
          <el-menu-item index="/spec">商品规格</el-menu-item>
          <el-menu-item index="/goods">商品管理</el-menu-item>
          <el-menu-item index="/member">会员管理</el-menu-item>
          <el-menu-item index="/banner">轮播图管理</el-menu-item>
          <el-menu-item index="/seckill">秒杀活动</el-menu-item>
        </el-submenu> -->
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
       {{ user.username }}
        <el-button type="primary" @click="logOut">退出</el-button>
      </el-header>
      <el-main>
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
  data() {
    return {
      // username: "",
    };
  },
  methods: {
    ...mapActions({
      "reqUser":"userActions"
    }),
    logOut(){
      this.reqUser(null);
      this.$router.push('/login');
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>

<style scoped>
.el-header {
  text-align: right;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
}

.el-aside {
  height: 100vh;
  background-color: #545c64;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-submenu,
.el-menu-item {
  width: 200px;
}

</style>