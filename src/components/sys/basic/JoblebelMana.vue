<template>
    <div>
        <div>
            <el-input size="small" v-model="jl.name" aria-placeholder="添加职称等级" prefix-icon="el-icon-plus" style="width: 300px"></el-input>
            <el-select size="small" v-model="jl.titleLevel" placeholder="请选择" style="margin-left: 15px" >
                <el-option
                        v-for="item in titleLevels"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">

                </el-option>

            </el-select>
            <el-button size="small" style="margin-left: 15px" type="primary" icon="el-icon-plus" @click="addJobLevel">添加</el-button>
        </div>
        <div style="margin-top: 10px">
            <el-table
                    :data="jls"
                    border
                    stripe
                    size="small"
                    style="width: 70%">
                <el-table-column
                        prop="id"
                        label="编号"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职称名"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="titleLevel"
                        label="职级"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="enabled"
                        label="是否启用"
                        width="110">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.enabled" size="small" type="success">已启用</el-tag>
                        <el-tag v-else size="small" type="danger">未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button size="small">编辑</el-button>
                        <el-button size="small" type="danger" @click="delJobLevel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "JoblebelMana",
        data(){
            return{
                jl:{
                    name:'',
                    titleLevel:''
                },
                titleLevels:[
                    {
                        value:'正高级',
                    }, {
                        value:'副高级',
                    }, {
                        value:'中级',
                    }, {
                        value: '初级',
                    }, {
                        value: '员级'
                    },
                ],
                jls:[],
            }
        },
        mounted() {
            this.getJlsInfo()
        },
        methods:{
            delJobLevel(data){
                this.$confirm('此操作将永久删除[' + data.name + ']信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/system/config/joblevel/' + data.id).then(resp => {
                        if (resp) {
                            this.getJlsInfo();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addJobLevel() {
                if(this.jl.name&&this.jl.titleLevel){
                    this.postRequest('/system/config/joblevel/add', this.jl).then(resp => {
                        if (resp) {
                            this.getJlsInfo();
                            this.jl = '';
                        }
                    })
                } else{
                    this.$message.error("信息不能为空");
                }
            },
            getJlsInfo(){
                this.getRequest('/system/config/joblevel/').then(resp=>{
                    if(resp){
                        this.jls=resp
                    }
                })
        }
        }
    }
</script>

<style scoped>

</style>
