<template>
    <div>
        <el-container style="width:100%; border: 1px solid #eee">
            <el-header class="homeHeader">
                <div class="title">云e办</div>
                <el-dropdown @command="commandHandler">
                    <span class="el-dropdown-link" style="color: white">
                       {{this.user.name}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item command="logout">注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router unique-opened>
                        <template v-for="(item,index) in routes">
                            <el-submenu :index="index+''" :key="index" v-if="!item.hidden">
                                <template slot="title">
                                    <i :class="item.iconCls" style="color: blueviolet;margin-right: 10px"></i>
                                    <span>{{item.name}}</span>
                                </template>
                                <el-menu-item :index="children.path" v-for="(children,indexj) in item.children"
                                              :key="indexj">{{children.name}}
                                </el-menu-item>
                            </el-submenu>
                        </template>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <el-breadcrumb v-if="this.$router.currentRoute.path!=='/home'">
                            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                        </el-breadcrumb>
                        <div class="homeWelcome" v-if="this.$router.currentRoute.path==='/home'">
                            <img class="img" src="../assets/bg.jpg"/>
                            <span class="text" style="text-align: center">欢迎来到云e办系统</span>
                        </div>
                        <router-view class="homeRouterView"/>
                    </el-main>
                    <el-footer class="homeFooter" style="height: 30px" >
                        <div class="title">Copyrights © 2023 london city govt. All rights reserved.</div>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                user: JSON.parse(window.sessionStorage.getItem('user'))
            }
        },
        computed: {
            routes() {
                return this.$store.state.routes;
            }
        },
        methods: {
            commandHandler(command) {
                if (command === 'logout') {
                    this.$confirm('此操作将退出系统，是否继续', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //注销登录
                        this.postRequest('/logout');
                        //清空用户信息
                        window.sessionStorage.removeItem('tokenStr');
                        window.sessionStorage.removeItem('user');
                        //清除菜单信息
                        this.$store.commit('initRoutes', []);
                        //跳转到登录页
                        this.$router.replace('/')
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消删除'
                        });
                    });

                }
            }
        }
    }
</script>

<style>
    .homeHeader {
        background: cornflowerblue;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
    }

    .homeFooter {
        background-color: cornflowerblue;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 0px;
        padding: 0 10px;
        box-sizing: border-box;
    }

    .title {
        font-size: 15px;
        font-family: "华文宋体";
        color: white;
    }

    .homeHeader .title {
        font-size: 30px;
        font-family: 华文行楷;
        color: white;
    }

    .homeWelcome {
        position: relative;/*相对布局*/
        height: 80%;
    }
    .homeWelcome .img{
        position: absolute;/*设为绝对定位*/
        opacity: 0.7;/*设置透明度*/
        width: 100%;
        height: auto;
        /*z-index: -1;!*置于底层*!*/
    }
    .homeWelcome .text{
        width: inherit;
        color: cornflowerblue;
        position: relative;/*设为绝对定位*/
        /*z-index: 2;!*置于顶层*!*/
        font-size: 100px;
        font-family: 华文行楷;
        padding-top: 100px;
    }

    .homeRouterView {
        margin-top: 18px;
    }

</style>
