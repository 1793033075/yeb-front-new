<template>
    <div>
        <div>
            <el-input
                    size="small"
                    class="addPosInput"
                    placeholder="添加职位"
                    suffix-icon="el-icon-plus"
                    @keydown.enter.native="addPositions"
                    v-model="pos.name">
            </el-input>
            <el-button size="small" icon="el-icon-plus" type="success" @click="addPositions">添加</el-button>
        </div>
        <div class="posManaMain">
            <el-table
                    size="small"
                    :data="positions"
                    stripe
                    border
                    @selection-change="handleSelectionChange"
                    style="width: 70%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职位"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="enable"
                        label="是否有效"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="showEditView(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button size="small" style="margin-top: 80px" type="danger" :disabled="this.multipleSelection.length===0" @click="deleteByBatch">批量删除</el-button>
            <el-dialog
                    title="编辑职位"
                    :visible.sync="dialogVisible"
                    width="30%">
                <div>
                    <el-tag>职位名称</el-tag>
                    <el-input v-model="updatePos.name" size="small" class="updatePosInput"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="doUpdate">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PosMana",
        data() {
            return {
                pos: {
                    name: ''
                },
                updatePos: {
                    name: ''
                },
                positions: [],
                dialogVisible: false,
                multipleSelection:[],
            }
        },
        mounted() {
            this.initPositions();
        },
        methods: {
            initPositions() {
                this.getRequest('/system/config/pos/').then(resp => {
                    if (resp) {
                        this.positions = resp
                    }
                })
            },
            deleteByBatch(){
                this.$confirm('此操作将永久删除[' + this.multipleSelection.length + ']条信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids='?';
                    this.multipleSelection.forEach(item=>{
                        ids+='ids='+item.id+'&';
                    });
                    this.deleteRequest('/system/config/pos/'+ids ).then(resp => {
                        if (resp) {
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addPositions() {
                if (this.pos.name) {
                    this.postRequest('/system/config/pos/add', this.pos).then(resp => {
                        if (resp) {
                            this.initPositions();
                            this.pos = '';
                        }
                    })
                } else {
                    this.$message.error("信息不能为空");
                }
            },
            showEditView(index, data) {
                Object.assign(this.updatePos,data);
                //this.updatePos = data;
                this.updatePos.createDate='';
                this.dialogVisible = true;
            },
            handleDelete(index, data) {
                this.$confirm('此操作将永久删除[' + data.name + ']信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/system/config/pos/' + data.id).then(resp => {
                        if (resp) {
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            doUpdate() {
                this.putRequest('/system/config/pos/update', this.updatePos).then(resp => {
                    if (resp) {
                        this.initPositions();
                        this.dialogVisible = false;
                    }
                })
            },
            handleSelectionChange(val){
                this.multipleSelection=val;
            },
        },
    }
</script>

<style>
    .addPosInput {
        width: 300px;
        margin-right: 8px;
    }

    .posManaMain {
        margin-top: 10px;
    }

    .updatePosInput {
        width: 200px;
        margin-left: 10px;
    }

</style>
