<template>
    <div>
        <div class="permissManaTool">
            <el-input placeholder="请输入英文名..." v-model="roles.name" size="small">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input placeholder="请输入中文名..." v-model="roles.nameZh" size="small"></el-input>
            <el-button size="small" type="primary" icon="el-icon-plus">添加角色</el-button>
        </div>
        <div class="permissManaMain">
            <el-collapse accordion @change="change">
                <el-collapse-item :title="role.nameZh" :name="role.id" v-for="(role,index) in roles" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可访问资源</span>
                            <el-button style="float: right; padding: 3px 0;color: red" type="text"
                                       icon="el-icon-delete">删除
                            </el-button>
                        </div>
                        <div>
                            <el-tree show-checkbox
                                     :data="allMenus"
                                     :props="defaultProps"
                                     :default-checked-keys="selectedMenus"
                                     node-key="id">
                            </el-tree>
                            <div style="display: flex;justify-content: flex-end">
                                <el-button type="info" icon="el-icon-close" circle size="mini" style="margin-right: 20px"></el-button>
                                <el-button type="success" icon="el-icon-check" circle size="mini"></el-button>
                            </div>
                        </div>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PermissMana",
        data() {
            return {
                roles: {
                    name: '',//英文名
                    nameZh: ''//中文名
                },
                allMenus: [],
                selectedMenus:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        mounted() {
            this.initRoles()
        },
        methods: {
            change(rid) {
                if (rid) {
                    this.initAllMenus()
                    this.initSelectedMenus(rid)
                }
            },
            //获得所有菜单，按树形结构显示
            initAllMenus() {
                this.getRequest('/system/config/permission/menusAll').then(resp => {
                    if (resp) {
                        this.allMenus = resp
                    }
                })
            },
            //获得所有角色
            initRoles() {
                this.getRequest('/system/config/permission/allRoles').then(resp => {
                    if (resp) {
                        this.roles = resp;
                    }
                })
            },
            //按角色获取菜单
            initSelectedMenus(rid){
                this.getRequest('/system/config/permission/menusByrole/'+rid).then(resp=>{
                    if(resp){
                        this.selectedMenus=resp;
                    }
                })
            }

        }
    }
</script>

<style>
    .permissManaTool {
        display: flex;
        justify-content: flex-start;
    }

    .permissManaTool .el-input {
        width: 300px;
        margin-right: 6px;
    }

    .permissManaMain {
        margin-top: 10px;
    }

</style>
