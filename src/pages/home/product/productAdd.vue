<template>
    <el-row class="add-product-component">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="add-ruleForm">
            <!-- 一、 一级分类 -->
            <el-form-item label="一级分类" prop="firstClassId">
                <el-select 
                    @change="firstClassChange"
                    v-model="ruleForm.firstClassId" 
                    placeholder="请选择分类">
                    <el-option 
                        v-for="(item,idx) in fistClassArr"  
                        :key="idx"
                        :label="item.typeName"
                        :value="item.fid">
                    </el-option> 
                </el-select>
            </el-form-item>

            <!-- 二、 二级分类 -->
            <el-form-item label="二级分类" prop="secondClassId">
                <el-select v-model="ruleForm.secondClassId" placeholder="请选择分类">
                    <el-option 
                        v-for="(item,idx) in secondClassArr"  
                        :key="idx"
                        :label="item.typeName"
                        :value="item.sid">
                    </el-option> 
                </el-select>
            </el-form-item>

            <!-- 三、商品名称 -->
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <!-- 四、商品副标题 -->
            <el-form-item label="商品副标题" prop="subtitle">
                <el-input v-model="ruleForm.subtitle"></el-input>
            </el-form-item>

            <!-- 五、价格 -->
            <el-form-item label="价格（元）" prop="price">
                <el-input-number 
                    v-model="ruleForm.price" 
                    controls-position="right" 
                    :min="1" 
                    :max="10">
                </el-input-number>
            </el-form-item>

            <!-- 五、库存 -->
            <el-form-item label="库存" prop="stock">
                <el-input-number 
                    v-model="ruleForm.stock" 
                    controls-position="right" 
                    :min="1" 
                    :max="10">
                </el-input-number>
            </el-form-item>

            <!-- 六、是否上架 -->
            <el-form-item label="是否上架" prop="isOnline">
                <el-switch v-model="ruleForm.isOnline"></el-switch>
            </el-form-item>


            <!-- 七、商品缩略图-begin -->
            <el-form-item label="商品缩略图" prop="smallPic">

                <el-upload
                    name="singlePic" 
                    action="#" 
                    list-type="picture-card"
                    :limit="1"
                    :on-exceed="smallPicExceedTip"
                    :on-change="smallPicUploadChange"
                    :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <!-- 7.1、上传的图片 -->
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
                        <!-- 7.2、操作 -->
                        <span class="el-upload-list__item-actions">
                            <!-- 7.2.1、概览 -->
                            <span class="el-upload-list__item-preview" @click="previewSmallPic(file)">
                                <i class="el-icon-zoom-in"></i>
                            </span>

                            <!-- 7.2.2、下载 -->
                            <!-- <span v-if="!disabled" class="el-upload-list__item-delete" @click="dwonLoadSmallPic(file)">
                                <i class="el-icon-download"></i>
                            </span> -->

                            <!-- 7.2.3、 删除 -->
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="deleteSmallPic(file)">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>

                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="ruleForm.smallPic" alt="">
                </el-dialog>
            </el-form-item>
            <!-- 商品缩略图-end -->


            <!-- 商品展示图-begin -->
            <el-form-item label="商品展示图" prop="CommodityShow">
              <el-upload 
                class="upload-demo" 
                drag 
                multiple
                :limit="4" 
                :before-remove="beforeRemove" 
                action="#" >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">请上传至少1张，最多4张图片</div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <!-- 商品展示图-end -->

            <!-- 商品详情图-begin -->
            <el-form-item label="商品详情图" prop="CommodityDetail">
              <el-upload class="upload-demo" drag :limit="12" :before-remove="beforeRemove" action="https://jsonplaceholder.typicode.com/posts/" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">请上传至少1张，最多12张图片</div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <!-- 商品详情图-end -->

            <el-form-item label="活动标签" >
                <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                    {{tag}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                    @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
            </el-form-item>

            <el-form-item label="商品描述" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button class="backToPro" @click="goReturn()">返回</el-button>
            </el-form-item>
            
        </el-form>
    </el-row>
</template>

<script>
  export default {
      name: 'productAdd',
        data() {
            return {
                fistClassArr: [],   // 一级分类 
                secondClassArr: [], // 二级分类

                ruleForm: {         // 表单数据
                    firstClassId: null,     // 选定的一级分类
                    secondClassId: null,    // 选定的二级分类  
                    name: '',               // 商品名称
                    subtitle: '',           // 商品副标题
                    price: 1,               // 价格
                    stock: 1,               // 库存
                    isOnline: true,         // 是否上架
                    smallPic: [],           // 缩略图

                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    desc: ''
                },

                




                // 缩略图
                // dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                
                
                
                dynamicTags: ['包邮', '卖家赠送运费险'],
                inputVisible: false,
                inputValue: '',
                
                rules: {
                    // 一级分类校验
                    firstClassId: [         
                        { required: true, message: '请选择一级分类', trigger: 'change' }
                    ],

                    // 二级分类校验
                    secondClassId: [
                        { required: true, message: '请选择二级分类', trigger: 'change' }
                    ],

                    // 商品名称校验
                    name: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],

                    // 商品副标题校验
                    subtitle: [
                        { required: true, message: '请输入商品副标题', trigger: 'blur' },
                        { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                    ],

                    // 商品价格校验
                    price: [
                        { required: true, message: '请输入商品价格', trigger: 'blur' },
                        { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    
                    desc: [
                        { required: true, message: '请填写商品描述', trigger: 'blur' }
                    ],
                    smallPic:[
                        {required: true}
                    ],
                    CommodityShow:[
                        {required: true}
                    ],
                    CommodityDetail:[
                        {required: true}
                    ],
                }
            };
        },

        created(){

            // 调用一级分类初始数据加载函数
            this.getFirstClassData();

        },

        mounted(){
            

        },

        methods: {
            /**
             * @description: 获取一级商品分类
             * @Date Changed: 2020-07-05
             */            
            getFirstClassData(){
                this.$axios.get('/backstage/product/getFirstClass') 
                    .then(res=>{
                        // console.log( "一级分类响应", res );

                        if( res.code == '200' ){
                            
                            // 获取一级分类初始数据
                            this.fistClassArr = res.data.list || [];

                            // 给定一级分类默认数据
                            this.ruleForm.firstClassId = res.data.list[0].fid;

                            // 调用获取二级分类初始数据函数
                            this.getSecondClass(this.ruleForm.firstClassId);

                        }else{

                            this.$message({
                                showClose: true,
                                message: `${res.message}`,
                                type: 'error'
                            });

                        }



                    })  
            },


            /**
             * @description: 获取二级商品分类
             * @param {string} fid          // 一级分类id
             * @param {string} typeName     // 一级分类名称
             * @Date Changed: 2020-07-05
             */ 
            getSecondClass(fid){
                this.$axios.get('/backstage/product/getSecondClass',{
                    params:{
                        fid
                    }
                }).then(res=>{
                    // console.log( "二级响应回调====>",res );
                    if( res.code == '200' ){
                        
                        // 获取二级分类初始数据
                        this.secondClassArr = res.data.list;

                        // 给定二级分类默认数据
                        this.ruleForm.secondClassId = res.data.list[0].sid;
                        
                    }else{
                        this.$message({
                            showClose: true,
                            message: `${res.message}`,
                            type: 'error'
                        });
                    }

                })
            },


            /**
             * @description: 一级联动二级分类
             * @param {string} fid   一级分类id
             * @Date Changed: 2020-07-05
             */        
            firstClassChange(fid){
                // console.log( "分类一改变,,,,",fid );
                this.getSecondClass(fid);

            },  
            
           
            
            /**
             * @description: 缩略图状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
             * @param {json}    file
             * @param {arr}     fileList
             * @Date Changed: 2020-07-06
             */
            smallPicUploadChange(file, fileList){
                // console.log(file,fileList,'测试上传');
                
                let formData = new FormData();

                formData.append("singlePic", file.raw);
                this.$axios.post("/common/upload/singlePic", formData)
                    .then(
                        res => {
                            console.log(res);
                            if( res.code == "200" ){
                                this.$message({
                                    showClose: true,
                                    message: '缩略图上传成功！',
                                    type: 'success'
                                });
                                
                                this.ruleForm.smallPic[0] = res.data.imgUrl;  
                                
                                // console.log( this.ruleForm );
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: `${res.msg}`,
                                    type: 'error'
                                });
                            }
                        }

                    )


                
            },


            /**
             * @description: 缩略图——图片预览
             * @param {json}  file
             * @Date Changed: 2020-07-05
             */
            previewSmallPic(file) {
                console.log( "previewSmallPic ===>", file );
                this.ruleForm.smallPic = file.url;
                this.dialogVisible = true;
            },

            /**
             * @description: 缩略图——图片移除
             * @param {json}  file
             * @Date Changed: 2020-07-05
             */
            deleteSmallPic(file) {
                // console.log("缩略图——图片移除===>",file);
                // console.log("====>", this.ruleForm);

                this.$message({
                    showClose: true,
                    message: '删除功能暂未开放',
                    type: 'error'
                });



            },

            /**
             * @description: 缩略图——图片超出个数限制时的钩子
             * @param {json}  file
             * @Date Changed: 2020-07-05 
             */
            smallPicExceedTip(files,fileList){
                this.$message({
                    showClose: true,
                    message: '缩略图最多上传一张！',
                    type: 'warning'
                });
            },



            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            /**
             * @description: 返回按钮点击事件
             * @Date Changed: 2020-07-05
             */  
            goReturn(){
                this.$router.go(-1);
            }
          
        }
  }
</script>

<style scoped lang="less">
    .add-product-component{
        margin:0 auto;
        background: #fff;
        padding:20px;
        .add-ruleForm{
            width: 700px;
            .el-select{
                width: 100%;
            }
            .el-textarea__inner{
                min-height: 110px;
            }
            .el-switch{
                display: flex;
                height: 40px;
            }
            .el-input-number{
                display: block;
            }
            .el-button-group{
                display: flex;

            }
            .el-tag {
                margin-left: 10px;
            }
            .button-new-tag {
                margin-left: 10px;
                height: 32px;
                line-height: 30px;
                padding-top: 0;
                padding-bottom: 0;
            }
            .input-new-tag {
                width: 90px;
                margin-left: 10px;
                vertical-align: bottom;
            }
            .backToPro{
              a{
                text-decoration: none;
                color: #409EFF;
              }
            }
            .el-upload__tip{
              line-height: 20px;
              text-align: left;
              margin-top: 0;
              color: #999;
            }
        }
    }
</style>