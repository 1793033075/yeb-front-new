<template>
    <div>
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router unique-opened>
                        <template v-for="(item,index) in routes">
                            <el-submenu index="1"  :key="index" v-if="!item.hidden">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>{{item.name}}</span>
                                </template>
                                .
                                <el-menu-item :index="children.path" v-for="(children,indexj) in item.children" :key="indexj" >{{children.name}}</el-menu-item>
                            </el-submenu>
                        </template>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view/>
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
        computed:{
            routes(){
                return this.$store.state.routes;
            }
        },
        methods:{
            // selectMenu(index){
            //     this.$router.push(index);
            //
            // }
        }
    }
</script>

<style scoped>

</style>
