<template>
    <div class="user-list-component">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="uid"
                label="序号"
                align="center">
            </el-table-column>
            <el-table-column
                prop="Avatar"
                label="头像"
                width="180"
                align="center">
                <template slot-scope="scope">
                    <img  :src="scope.row.Avatar" alt="" style="width: 30px;height: 30px">
                </template>
            </el-table-column>
            <el-table-column
                prop="nickName"
                label="昵称"
                align="center">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别"
                align="center">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                align="center">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="电话"
                align="center">
            </el-table-column>
            <el-table-column
                prop="cTime"
                label="创建时间"
                align="center">
            </el-table-column>
            <el-table-column
                prop="uTime"
                label="更新时间"
                align="center">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'ClientList',
    data () {
        return {
            tableData: []
        }
    },

    mounted(){
        // 获取列表数据
        this.getTableList()

    },

    methods: {
        /**
         * @description: 获取管理员列表数据
         * @Date Changed: 2020-07-03
         */
        getTableList(){

            this.$axios.get('/backstage/user/getUserList')
                .then(res=>{
                    if( res.code == '200' ){
                        this.tableData = res.data.list.map(item=>{
                            return {
                                uid : item.uid,
                                Avatar: item.Avatar,
                                nickName: item.nickName,
                                email: item.email,
                                phone: item.phone ? item.phone : "-",
                                sex: !item.sex ? "女" : "男",
                                cTime: item.cTime ? item.cTime : "-",
                                uTime: item.uTime ? item.uTime : "-" 
                            }
                        });
                    }else{
                        this.$message.error(res.msg);
                    }
                })
                .catch(err=>{
                    console.log( err );
                })

        }

    }
}
</script>

<style scoped lang="less">

</style>
