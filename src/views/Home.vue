<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">云E办</div>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link" >
                        {{user}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">个人中心</el-dropdown-item>
                        <el-dropdown-item command="b">设置</el-dropdown-item>
                        <el-dropdown-item command="logout">注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router unique-opened>
                        <template v-for="(item,index) in routes">
                            <el-submenu :index="index+''"  :key="index" v-if="!item.hidden">
                                <template slot="title">
                                    <i :class="item.iconCls" style="color: blueviolet;margin-right: 10px"></i>
                                    <span>{{item.name}}</span>
                                </template>
                                <el-menu-item :index="children.path" v-for="(children,indexj) in item.children" :key="indexj" >{{children.name}}</el-menu-item>
                            </el-submenu>
                        </template>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <el-breadcrumb v-if="this.$router.currentRoute.path!='/home'">
                            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                        </el-breadcrumb>
                        <div v-if="this.$router.currentRoute.path=='/home'">
                            <img src="../assets/timg1.jpg"  width="100%" height="100%">
                        </div>
                        <router-view class="homeRouterView"/>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                user:"测试",
                // user: JSON.parse(window.sessionStorage.getItem('user'))
            }
        },
        computed:{
            routes(){
                return this.$store.state.routes;
            }
        },
        methods:{
            handleCommand(command){
                //this.$message('click on item ' + command);
                if(command=='logout'){
                        this.$confirm('此操作将退出系统, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            //注销登录
                            this.postRequest('/logout');
                            //清空用户信息
                            window.sessionStorage.removeItem('tokenStr');
                            window.sessionStorage.removeItem('user');
                            //清空菜单
                            this.$store.commit('initRoutes',[]);
                            //页面跳转
                            this.$router.replace('/')
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消注销'
                            });
                        });
                    }

                }
            }
        }
</script>

<style>
    .homeHeader{
        background: cornflowerblue;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
    }
    .homeHeader .title{
        font-size:30px;
        font-family: 华文行楷;
        color: white;
    }
    .homeRouterView{
        margin-top:10px
    }

</style>
