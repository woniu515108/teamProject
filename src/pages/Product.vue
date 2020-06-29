<template>
    <div class="product-list-component">
        <template>
            <el-table
                stripe
                :data="productList"
                style="width: 100%;text-align:cenrter"
                :default-sort = "{prop: 'date', order: 'descending'}">
                <el-table-column
                    prop="sNum"
                    label="序号"
                    sortable
                    width='100px'>
                </el-table-column>
                <el-table-column
                    prop="smallPic"
                    label="图片路径"
                    sortable
                    width="180">
                    <!--插入图片链接的代码-->
                    <template slot-scope="scope">
                    <img  :src="scope.row.smallPic" alt="" style="width: 50px;height: 50px">
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="商品名称">
                </el-table-column>
                <el-table-column
                    prop="subtitle"
                    label="副标题">
                </el-table-column>
                <el-table-column
                    prop="firstClassName"
                    label="一级分类">
                </el-table-column>
                <el-table-column
                    prop="secondClassName"
                    label="二级分类">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="价格"
                    sortable
                    width='100px'>
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="商品描述">
                </el-table-column>
                <el-table-column
                    prop="isOnline"
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
                        <el-button @click="editProduct(scope.row.pid)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteProduct(scope.row.pid)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageCount"
                :page-size="currentPageCount"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'productList',
    data() {
        return {
            total: 10,
            currentPageCount: 5,
            currentPage: 1,
            pageCount: [5, 10, 20, 50],
            productList: [],      // 商品列表

        }
    },

    mounted(){
        // 获取商品列表数据
        this.getProductList(this.currentPage,this.currentPageCount);

    },

    methods: {
        /**
         * @description: 获取商品列表
         */        
        getProductList(currentPage, pageSize){
            
            this.$axios.get("/backstage/product/getList",{
                params:{
                    currentPage: currentPage,
                    pageSize: pageSize
                }
            })
            .then(res=> {

               
                const resData = res.data;
                if( resData.code == 200 ){

                    // 重构返回的商品列表的数据
                    this.productList = resData.data.list.map((item,idx)=>{
                        return {
                            pid: item.pid,
                            sNum: idx+1,
                            name: item.name,
                            firstClassName: item.fistTypeName,
                            secondClassName: item.secondTypeName,
                            smallPic: JSON.parse(item.smallPic)[0],
                            subtitle: item.subtitle,
                            description: item.description,
                            price: `￥${item.price}`,
                            isOnline: item.isOnline ? "已上架" : "已下架",
                            stock: item.stock
                        }
                    });

                    // 重新赋值页码
                    this.currentPage = parseInt(resData.data.currentPage) || this.currentPage;
                    this.currentPageCount = parseInt(resData.data.pageSize) || this.currentPageCount;

                }else{
                    console.log( "xxxxxxx" );
                }

            })
            .catch(err=> {

                console.log(err);
            })


        },

        /**
         * @description: 改变当前商品显示条数
         */   
        handleSizeChange(val) {

            this.getProductList( this.currentPage , val );

        },

        /**
         * @description: 
         */   
        handleCurrentChange(val) {
            this.getProductList( val , this.currentPageCount );
        },

        /**
            * @description: 删除商品
            * @param {string}  pid 商品id 
        */  
        deleteProduct(pid){
            this.$axios.get('/backstage/product/delete',{
                params:{
                    pid:pid
                }
            })
            .then(res=>{
                if(res.data.code==200){

                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });

                    this.getProductList(this.currentPage,this.currentPageCount);
                }else{
                    this.$message.error(res.data.msg);
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }  
   
    }
}

</script>

<style scoped lang="less">
    .mt20{
        margin-top:20px;
    }
</style>
