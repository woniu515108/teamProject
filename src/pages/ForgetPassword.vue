<template>
    <el-row class="forget-password-component">
        <el-row class="h-header"><img class="header_logo" src="../images/logo.png"><h2>找回密码</h2></el-row>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="forgetPassword">
            <el-form-item label="电子邮箱" prop="email">
                <el-input type="email" v-model="ruleForm.email" autocomplete="off" placeholder="请输入您的电子邮箱"></el-input>
            </el-form-item>
            <el-form-item label="邮箱验证码" prop="verifycode" class="codeParent">
                <el-input v-model="ruleForm.verifycode" placeholder="请输入验证码" class="identifyinput"></el-input>
                <div class="sendCode">发送验证码</div>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入您的新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入您的新密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
  export default {
    data() {
        // 邮箱验证
        var checkEmail = (rule, value, callback) => {
            const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if (!value) {
                return callback(new Error('邮箱不能为空'))
            }
            setTimeout(() => {
                if (mailReg.test(value)) {
                callback()
                } else {
                callback(new Error('请输入正确的邮箱格式'))
                }
            }, 100)
        };
        //输入邮箱验证码
        var verifycode = (rule, value, callback)=>{
            const codeReg =/^\d{4}|\d{6}$/g;
            if(!value){
                return callback( new Error ('验证码不能为空'))
            }
            if(codeReg.test(value)){
                callback()
            }else{
                callback(new Error('请输入正确的验证码格式'))
            }
        }
        // 输入新密码 
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        };
        // 再次校验新密码
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur',required: true }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur',required: true }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur', required: true }
          ],
          verifycode: [
            { validator: verifycode, trigger: 'blur', required: true }
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
      }
    }
  }
</script>
<style scoped lang="less">
    .forget-password-component{
        width: 50%;
        background: #E9EEF3;
        margin:100px auto;
        padding: 10px 20px;
        .h-header{
            display: flex;
            justify-content: flex-start;
            img{
                width: 30%;
            }
            h2{
                font-weight: normal;
                font-size: 22px;
                margin-left: 10%;
            }
        }
        .codeParent{
            .el-form-item__content{
                display: flex;
                .sendCode{
                    width: 50%;
                    text-align: left;
                    margin-left: 10px;
                    color: #409EFF;
                    cursor: pointer;
                }
            }
            .identifyinput{
                width: 50%;
            }
        }
    }
</style>