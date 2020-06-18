<template>
    <div class="product-list-component">
        <template>
            <el-table
                :data="tableData"
                style="width: 100%;text-align:cenrter"
                :default-sort = "{prop: 'date', order: 'descending'}">
                <el-table-column
                    prop="pid"
                    label="货品编码"
                    sortable
                    width='100px'>
                </el-table-column>
                <el-table-column
                    prop="pro_name"
                    label="商品名称">
                </el-table-column>
                <el-table-column
                    prop="brand"
                    label="品牌"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="价格"
                    sortable
                    width='100px'>
                </el-table-column>
                <el-table-column
                    prop="isOnSale"
                    label="是否在售"
                    sortable
                    width='100px'>
                </el-table-column>
                <el-table-column
                    prop="stock"
                    label="库存"
                    sortable
                    width='100px'>
                </el-table-column>
                <el-table-column 
                    prop="operation"
                    label="操作">
                     <template slot-scope="scope">
                        <el-button @click="editProduct(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteProduct(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
export default {
    name: 'productList',
    data() {
      return {
        tableData: [
            {
                pid: '001',
                pro_name: '大话西游2短袖T恤-巅峰对决',
                brand:'安踏',
                price:'69.99',
                isOnSale:'是',
                stock:'10000'
            },
            {
                pid: '003',
                pro_name: '大话西游2短袖T恤-巅峰对决',
                brand:'耐克',
                price:'69.99',
                isOnSale:'否',
                stock:'100800'
            }, 
            {
                pid: '002',
                pro_name: '大话西游2短袖T恤-巅峰对决',
                brand:'安踏',
                price:'69.99',
                isOnSale:'是',
                stock:'9000'
            }, 
            {
                pid: '008',
                pro_name: '大话西游2短袖T恤-巅峰对决',
                brand:'耐克',
                price:'69.99',
                isOnSale:'否',
                stock:'100'
            }
        ]
      }
    },
    methods: {
        /**
         * 功能： 商品编辑
         * */ 
        editProduct( productInfo ){
            console.log("编辑：>>>>", productInfo);

            const h = this.$createElement;
            this.$msgbox(
                {
                    title: '商品编辑',
                    message: h('p', null, 
                        [
                            h('p', { style: 'color: red', dataId:"001" }, '宝贝'),
                            h('i', { style: 'color: teal' }, 'VNode')
                        ]
                    ),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {

                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 3000);

                        } else {
                            
                            done();

                        }
                    }
            })
            .then(action => {
                this.$message({
                    type: 'info',
                    message: 'action: ' + action
                });
            });
        },    

        /**
         * 功能：商品删除
         * */
        deleteProduct( productInfo ){
            console.log( "商品删除：", productInfo );
            console.log( this.tableData );
            

            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
                let productList = this.tableData.filter(item=>item.pid!=productInfo.pid);

                this.tableData = productList;

                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}

</script>

<style scoped lang="less">
    .mt20{
        margin-top:20px;
    }
</style>
