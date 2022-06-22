<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="部门管理" name="DepMana"> </el-tab-pane>
            <el-tab-pane label="职位管理" name="PosMana">职位管理</el-tab-pane>
            <el-tab-pane label="职称管理" name="JoblevelMana">职称管理</el-tab-pane>
            <el-tab-pane label="奖惩规则" name="Ecmana">奖惩规则</el-tab-pane>
            <el-tab-pane label="权限组" name="PermissMan">权限组</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import DepMana from '../../components/sys/basic/depMana'
    import Ecmana from '../../components/sys/basic/Ecmana'
    import JoblevelMana from '../../components/sys/basic/JoblevelMana'
    import PosMana from '../../components/sys/basic/PosMana'
    import PermissMan from '../../components/sys/basic/PermissMan'


    export default {
        name: "SysBasic",
        data(){
            return{
                activeName:'DepMana'
            }
        },
        components:{
            'DepMana':DepMana,
            'Ecmana':Ecmana,
            'JoblevelMana':JoblevelMana,
            'PosMana':PosMana,
            'PermissMan':PermissMan,

        }
    }
</script>

<style scoped>

</style>
