<template>
    <el-row class="add-product-component">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="add-ruleForm">
            <el-form-item label="一级分类" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择分类">
                <el-option label="服装配饰" value="fuzhuang"></el-option>
                <el-option label="家居用品" value="jiaju"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" prop="region_sec">
                <el-select v-model="ruleForm.region_sec" placeholder="请选择分类">
                <el-option label="服装配饰" value="fuzhuang"></el-option>
                <el-option label="家居用品" value="jiaju"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品副标题" prop="subname">
                <el-input v-model="ruleForm.subname"></el-input>
            </el-form-item>
            <el-form-item label="价格（元）" prop="price">
                <el-input-number v-model="price" controls-position="right" @change="handleChangePrice" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item label="库存（件）" prop="num">
                <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item label="是否在售" prop="delivery">
                <el-switch v-model="sale" active-text="是" inactive-text="否"></el-switch>
            </el-form-item>
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
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
  export default {
    data() {
      return {
        num: 1,
        price:1,
        sale:true,
        dynamicTags: ['包邮', '卖家赠送运费险'],
        inputVisible: false,
        inputValue: '',
        ruleForm: {
          name: '',
          region: '',
          region_sec:'',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          subname: [
            { required: true, message: '请输入商品副标题', trigger: 'blur' },
            { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择一级分类', trigger: 'change' }
          ],
          region_sec: [
            { required: true, message: '请选择二级分类', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写商品描述', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
      handleChange(){

      },
      handleChangePrice(){

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
        }
    }
</style>