<template>
    <div style="margin-top: 10px">
        <div style="display: flex; justify-content: space-between">
            <div>
                <el-input style="width: 300px;margin-right: 10px" prefix-icon="el-icon-search"
                          v-model="empName" @keydown.enter.native="initEmps" placeholder="请输入员工名进行搜索..."
                          clearable @clear="initEmps"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="initEmps">搜索</el-button>
                <el-button type="primary">
                    <i class="fa fa-angle-double-down" aria-hidden="true"/>
                    高级搜索
                </el-button>
            </div>
            <div>
                <el-button type="success">
                    <i class="fa fa-level-up" aria-hidden="true"></i>
                    导入数据
                </el-button>
                <el-button type="success">
                    <i class="fa fa-level-down" aria-hidden="true"></i>
                    导出数据
                </el-button>
                <el-button type="primary" icon="el-icon-plus" @click="showEmpView">添加员工</el-button>
            </div>
        </div>
        <div>
            <el-table
                    :data="emps"
                    stripe
                    border
                    height="70vh"
                    v-loading="loading"
                    element-loading-text="加载中"
                    element-loading-spinner="el-icon-loading"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        align="left"
                        fixed
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="workID"
                        label="工号"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        label="出生日期"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="idCard"
                        label="身份证号"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="wedlock"
                        label="婚姻状况"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="nation.name"
                        label="民族"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="nativePlace"
                        label="籍贯"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="politicsStatus.name"
                        label="政治面貌"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="电子邮箱"
                        align="left"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话号码"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="联系地址"
                        align="left"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="department.name"
                        label="所属部门"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="joblevel.name"
                        label="职称"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="position.name"
                        label="职位"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="engageForm"
                        label="聘用形式"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="tiptopDegree"
                        label="最高学历"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="school"
                        label="毕业院校"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="specialty"
                        label="专业"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="workState"
                        label="在职状态"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="beginDate"
                        label="入职日期"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="conversionTime"
                        label="转正日期"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="beginContract"
                        label="合同起始日期"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="endContract"
                        label="合同截止日期"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="contractTerm"
                        label="合同期限"
                        align="left"
                        width="100">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.contractTerm}}</el-tag>
                        年
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        fixed="right"
                        width="200">
                    <template slot-scope="scope">
                        <el-button @click="showEditEmpView(scope.row)" style="padding: 5px" size="mini" type="primary">
                            编辑
                        </el-button>
                        <el-button style="padding: 5px" size="mini" type="primary">查看高级资料</el-button>
                        <el-button @click="delEmp(scope.row)" style="padding: 5px" size="mini" type="danger">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total=total>
                </el-pagination>
            </div>
        </div>
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="80%">
            <hr style="color: lightgray;">
            <div>
                <el-form ref="empForm" :model="emp" :rules="rules">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名:" prop="name">
                                <el-input v-model="emp.name" placeholder="请输入姓名" prefix-icon="el-icon-edit" size="mini"
                                          style="width: 150px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="性别:" prop="gender">
                                <el-radio-group v-model="emp.gender">
                                    <el-radio-button label="男">男</el-radio-button>
                                    <el-radio-button label="女">女</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="出生日期:">
                                <el-date-picker
                                        v-model="emp.birthday"
                                        type="date"
                                        size="mini"
                                        style="width: 150px"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="政治面貌:">
                                <el-select v-model="emp.politicId" size="mini" style="width: 200px" placeholder="请选择">
                                    <el-option
                                            v-for="item in politicsstatusDict"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="民族:">
                                <el-select v-model="emp.nationId" size="mini" style="width: 150px" placeholder="请选择">
                                    <el-option
                                            v-for="item in nationsDict"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="籍贯:" prop="nativePlace">
                                <el-input v-model="emp.nativePlace" placeholder="请输入籍贯" prefix-icon="el-icon-edit"
                                          size="mini" style="width: 150px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="电子邮箱:" prop="email">
                                <el-input v-model="emp.email" placeholder="请输入电子邮箱" prefix-icon="el-icon-message"
                                          size="mini" style="width: 150px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系地址:" prop="address">
                                <el-input v-model="emp.address" placeholder="请输入联系地址" prefix-icon="el-icon-edit"
                                          size="mini" style="width: 200px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="职位:" prop="posId">
                                <el-select v-model="emp.posId" size="mini" style="width: 150px" placeholder="请选择">
                                    <el-option
                                            v-for="item in positionsDict"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="职称:" prop="jobLevelId">
                                <el-select v-model="emp.jobLevelId" size="mini" style="width: 150px" placeholder="请选择">
                                    <el-option
                                            v-for="item in jobLevelDict"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="所属部门:" prop="departmentId">
                                <el-popover
                                        placement="bottom"
                                        title="请选择部门"
                                        width="250"
                                        trigger="manual"
                                        v-model="visible">
                                    <el-tree
                                            default-expand-all
                                            :data="allDeps"
                                            :props="defaultProps"
                                            @node-click="handleNodeClick"></el-tree>
                                    <div slot="reference"
                                         style="width: 150px; height: 24px;border-radius:5px;display: inline-flex;border: 1px solid;color: #dedede;cursor: pointer;align-items: center;font-size: 10px; padding-left: 8px;box-sizing: border-box"
                                         @click="showDepView">{{inputdepName}}
                                    </div>
                                </el-popover>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="电话号码:" prop="phone">
                                <el-input v-model="emp.phone" placeholder="请输入电话号码" prefix-icon="el-icon-phone"
                                          size="mini" style="width: 150px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="工号:" prop="workID">
                                <el-input v-model="emp.workID" placeholder="请输入工号" prefix-icon="el-icon-edit"
                                          size="mini" style="width: 150px" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="学历:" prop="tiptopDegree">
                                <el-select v-model="emp.tiptopDegree" size="mini" style="width: 150px"
                                           placeholder="请选择">
                                    <el-option
                                            v-for="item in tiptopdigreesDict"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="毕业院校:" prop="school">
                                <el-input v-model="emp.school" placeholder="请输入学校" prefix-icon="el-icon-edit"
                                          size="mini" style="width: 150px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="专业名称:" prop="specialty">
                                <el-input v-model="emp.specialty" placeholder="请输入专业名称" prefix-icon="el-icon-edit"
                                          size="mini" style="width: 150px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="入职日期">
                                <el-date-picker
                                        v-model="emp.beginDate"
                                        type="date"
                                        size="mini"
                                        style="width: 150px"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="转正日期">
                                <el-date-picker
                                        v-model="emp.conversionTime"
                                        type="date"
                                        size="mini"
                                        style="width: 150px"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同起始日期" prop="beginContract">
                                <el-date-picker
                                        v-model="emp.beginContract"
                                        type="date"
                                        size="mini"
                                        style="width: 150px"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择合同起始日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同截止日期" prop="endContract">
                                <el-date-picker
                                        v-model="emp.endContract"
                                        type="date"
                                        size="mini"
                                        style="width: 150px"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择合同截止日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span=8>
                            <el-form-item label="身份证号码:" prop="idCard">
                                <el-input v-model="emp.idCard" placeholder="请输入身份证号码" prefix-icon="el-icon-edit"
                                          size="mini" style="width: 150px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span=8>
                            <el-form-item label="聘用形式:" prop="engageForm">
                                <el-radio-group v-model="emp.engageForm">
                                    <el-radio-button label="劳务合同">劳务合同</el-radio-button>
                                    <el-radio-button label="劳动合同">劳动合同</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span=8>
                            <el-form-item label="婚姻状况:" prop="wedlock">
                                <el-radio-group v-model="emp.wedlock" style="margin-top: 10px">
                                    <el-radio label="已婚">已婚</el-radio>
                                    <el-radio label="未婚">未婚</el-radio>
                                    <el-radio label="离异">离异</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrEditEmp">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    export default {
        name: "Empbasic",
        data() {
            return {
                title: '',
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                inputdepName: '',
                allDeps: [],
                emps: [],
                nationsDict: [],
                jobLevelDict: [],
                politicsstatusDict: [],
                positionsDict: [],
                tiptopdigreesDict: ['博士', '硕士', '本科', '大专', '高中', '初中', '小学', '其他'],
                loading: false,
                visible: false,
                dialogVisible: false,
                emp: {
                    id: null,
                    name: '',
                    gender: '',
                    birthday: '',
                    idCard: '',
                    wedlock: '',
                    nationId: null,
                    nativePlace: '',
                    politicId: null,
                    email: '',
                    phone: '',
                    address: '',
                    departmentId: null,
                    jobLevelId: null,
                    posId: null,
                    engageForm: '',
                    tiptopDegree: '',
                    specialty: '',
                    school: '',
                    beginDate: '',
                    workState: '在职',
                    workID: '',
                    contractTerm: null,
                    conversionTime: '',
                    notWorkDate: null,
                    beginContract: '',
                    endContract: '',
                    workAge: null,
                    salaryId: null
                },
                rules: {
                    name: [{required: true, message: '请输入员工姓名', tragger: 'blur'}],
                    gender: [{required: true, message: '请选择性别', tragger: 'blur'}],
                    birthday: [{required: true, message: '请输入出生日期', tragger: 'blur'}],
                    idCard: [{
                        required: true,
                        message: '请输入身份证号',
                        tragger: 'blur'
                    }, {
                        pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                        message: '身份证号码不正确',
                        tragger: 'blur'
                    }],
                    wedlock: [{required: true, message: '请输入婚姻状况', tragger: 'blur'}],
                    nationId: [{required: true, message: '请输入民族', tragger: 'blur'}],
                    nativePlace: [{required: true, message: '请输入籍贯', tragger: 'blur'}],
                    politicId: [{required: true, message: '请输入政治面貌', tragger: 'blur'}],
                    email: [{required: true, message: '请输入邮箱地址', tragger: 'blur'}, {
                        type: 'email',
                        message: '邮箱格式不正确',
                        tragger: 'blur'
                    }],
                    phone: [{required: true, message: '请输入员工电话', tragger: 'blur'}],
                    address: [{required: true, message: '请输入联系地址', tragger: 'blur'}],
                    departmentId: [{required: true, message: '请输入部门名称', tragger: 'blur'}],
                    jobLevelId: [{required: true, message: '请输入职称', tragger: 'blur'}],
                    posId: [{required: true, message: '请输入职位', tragger: 'blur'}],
                    engageForm: [{required: true, message: '请输入毕业院校', tragger: 'blur'}],
                    tiptopDegree: [{required: true, message: '请输入最高学历', tragger: 'blur'}],
                    specialty: [{required: true, message: '请输入专业名称', tragger: 'blur'}],
                    school: [{required: true, message: '请输入毕业院校', tragger: 'blur'}],
                    beginDate: [{required: true, message: '请输入入职日期', tragger: 'blur'}],
                    workState: [{required: true, message: '请输入工作状态', tragger: 'blur'}],
                    workID: [{required: true, message: '请输入工号', tragger: 'blur'}],
                    contractTerm: [{required: true, message: '请输入合同期限', tragger: 'blur'}],
                    conversionTime: [{required: true, message: '请输入转正日期', tragger: 'blur'}],
                    notWorkDate: [{required: true, message: '请输入离职日期', tragger: 'blur'}],
                    beginContract: [{required: true, message: '请输入合同起始日期', tragger: 'blur'}],
                    endContract: [{required: true, message: '请输入合同终止日期', tragger: 'blur'}],
                    workAge: [{required: true, message: '请输入工龄', tragger: 'blur'}],
                },
                empName: '',
                currentPage: 1,
                total: 0,
                size: 10,

            }
        },
        mounted() {
            this.initEmps();
            this.initData()
        },
        methods: {
            addOrEditEmp() {
                this.$refs.empForm.validate((valid) => {
                    if (valid) {
                        this.postRequest('/employee/basic/', this.emp).then(resp => {
                            if (resp) {
                                this.dialogVisible = false;
                                this.initEmps()
                            }
                        })
                    }
                })
            },
            delEmp(data) {
                this.$confirm('此操作将永久删除员工[' + data.name + '],是否继续？', '提示', {
                    confirmButtonClass: '确定',
                    cancelButtonClass: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/employee/basic/' + data.id).then(resp => {
                        if (resp) {
                            this.initEmps();
                        }
                    })
                })
            },
            handleNodeClick(data) {
                this.emp.departmentId = data.id;
                this.inputdepName = data.name;
                this.visible = !this.visible;
            },
            showDepView() {
                this.visible = !this.visible;
            },
            getWorkId() {
                this.getRequest('/employee/basic/maxWorkID').then(resp => {
                    this.emp.workID = resp.obj
                })
            },
            initPositions() {
                this.getRequest('/employee/basic/positions').then(resp => {
                    this.positionsDict = resp
                })
            },
            initData() {
                if (!window.sessionStorage.getItem('deps')) {
                    this.getRequest('/employee/basic/departments').then(resp => {
                        this.allDeps = resp;
                        window.sessionStorage.setItem('alldeps', JSON.stringify(resp))
                    })
                } else {
                    this.allDeps = JSON.parse(window.sessionStorage.getItem('alldeps'))
                }
                if (!window.sessionStorage.getItem('nations')) {
                    this.getRequest('/employee/basic/nations').then(resp => {
                        if (resp) {
                            this.nationsDict = resp;
                            window.sessionStorage.setItem('nations', JSON.stringify(resp))
                        }
                    })
                } else {
                    this.nationsDict = JSON.parse(window.sessionStorage.getItem('nations'))
                }
                if (!window.sessionStorage.getItem('joblevels')) {
                    this.getRequest('/employee/basic/jobLevels').then(resp => {
                        if (resp) {
                            this.jobLevelDict = resp;
                            window.sessionStorage.setItem('joblevels', JSON.stringify(resp))
                        }
                    })
                } else {
                    this.jobLevelDict = JSON.parse(window.sessionStorage.getItem('joblevels'))
                }
                if (!window.sessionStorage.getItem('politicStatus')) {
                    this.getRequest('/employee/basic/politicStatus').then(resp => {
                        if (resp) {
                            this.politicsstatusDict = resp;
                            window.sessionStorage.setItem('politicStatus', JSON.stringify(resp))
                        }
                    })
                } else {
                    this.politicsstatusDict = JSON.parse(window.sessionStorage.getItem('politicStatus'))
                }
            },
            initEmps() {
                this.loading = true;
                this.getRequest('/employee/basic/?currentPage=' + this.currentPage + '&size=' + this.size + '&name=' + this.empName).then(resp => {
                    if (resp) {
                        this.emps = resp.data;
                        this.total = resp.total;
                        this.loading = false
                    }
                })
            },
            showEditEmpView(data) {
                this.title = '编辑员工信息';
                this.emp = data;
                console.log(this.emp);
                this.inputdepName = data.department.name;
                this.initPositions();
                this.dialogVisible = true
            },
            //弹出添加员工框
            showEmpView() {
                this.title = '添加员工';
                this.inputdepName = '';
                this.emp = {
                    id: null,
                    name: '',
                    gender: '',
                    birthday: '',
                    idCard: '',
                    wedlock: '',
                    nationId: null,
                    nativePlace: '',
                    politicId: null,
                    email: '',
                    phone: '',
                    address: '',
                    departmentId: null,
                    jobLevelId: null,
                    posId: null,
                    engageForm: '',
                    tiptopDegree: '',
                    specialty: '',
                    school: '',
                    beginDate: '',
                    workState: '在职',
                    workID: '',
                    contractTerm: null,
                    conversionTime: '',
                    notWorkDate: null,
                    beginContract: '',
                    endContract: '',
                    workAge: null,
                    salaryId: null
                };
                this.getWorkId();
                this.initPositions();
                this.dialogVisible = true
            },
            // 分页相关
            handleSizeChange(val) {
                this.size = val;
                this.initEmps()
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                this.initEmps();
            }
        }
    }
</script>

<style scoped>

</style>
