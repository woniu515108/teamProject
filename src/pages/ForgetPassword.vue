<template>
    <el-row class="forget-password-component">

        <img src="/public/images/1593537163521.jpg" alt="">

        <el-row class="h-header"><img class="header_logo" src="../images/logo.png"><h2>找回密码</h2></el-row>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="forgetPassword">
            <el-form-item label="电子邮箱" prop="email">
                <el-input type="email" v-model="ruleForm.email" autocomplete="off" placeholder="请输入您的电子邮箱"></el-input>
            </el-form-item>
            <el-form-item label="邮箱验证码" prop="verifycode" class="codeParent">
                <el-input v-model="ruleForm.verifycode" placeholder="请输入验证码" class="identifyinput"></el-input>
                <!-- <div class="sendCode">发送验证码</div> -->
                <div class="right">
                    <el-button @click="getyzcode(ruleForm)" :disabled="attcode" v-if="showbtn">获取验证码</el-button>
                    <el-button class="tsbtn" :disabled="true" v-else>{{code_ts}}</el-button>
                </div>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入您的新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入您的新密码"></el-input>
            </el-form-item>
            <el-row>
                <el-button class="backToLogin"><router-link to="/">返回登录</router-link></el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </el-row>
        </el-form>
    </el-row>
</template>

<script>
  export default {
    data() {
        // 邮箱验证
        var checkEmail = (rule, value, callback) => {
            const mailReg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
            if (!value) {
                return callback(new Error('邮箱不能为空'))
            }
            // setTimeout(() => {
                if (mailReg.test(value)) {
                callback();
                this.attcode = false
                } else {
                callback(new Error('请输入正确的邮箱格式'))
                }
            // }, 100)
        };
        
        //输入邮箱验证码
        var verifycode = (rule, value, callback)=>{
            const codeReg =/^\d{4}$/g;
            if(!value){
                return callback( new Error ('验证码不能为空'))
            }else if(codeReg.test(value)){
                callback()
            }else{
                callback(new Error('请输入正确的验证码格式'))
            }
        }

        // 输入新密码
        var validatePass = (rule,value,callback)=>{
          var passReg=/^[a-zA-Z\d]{6,10}$/;
          if(!value){
            return callback(new Error('请输入密码'));
          }else if(passReg.test(value)){
            callback()
          }else{
            callback(new Error('请输入6~10位大写字母、小写字母、数字，不能带特殊字符'))
          }
        }

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
        email:'',
        attcode: true,  //点击获取验证码按钮判断
        showbtn: true, // 展示获取验证码或倒计时按钮判断
        code_ts: '获取验证码', //倒计时提示文字
        sec: 60 ,             // 倒计时秒数
        bodyBgImage: 'url(' + require('../images/password_bg.jpg') + ')',
        ruleForm: {
          email:'',
          emailAddress:'',
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
    mounted(){
      this.setBodyBackGround()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 请求找回密码接口
            let url='/backstage/user/login';        // ----------------------------------这里差一个提交的接口
            let ruleForm=ruleForm;
            this.$axios.post(url,ruleForm)
            .then(res=>{
              var succ=res.data;
              console.log(succ);
              if(succ.code==200){
                console.log('成功修改密码');
                // 将用户信息放在seesionStorage
                sessionStorage.setItem('passwordInfo', JSON.stringify(succ.data));

                // 路由跳转至登录页
                this.$router.replace('/');
              }else{
                console.log(succ.msg)
              }
            }).catch(err=>{
              console.log('重置失败',err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      

      // 设置背景图片
      setBodyBackGround () {
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundRepeat = 'no-repeat'
        document.body.style.overflow = 'hidden'
        document.body.style.backgroundImage = this.bodyBgImage
      },
      // 发送验证码倒计时
      getyzcode () {
        console.log(this.ruleForm.email)
        // 请求验证码接口
        const {email}=this.ruleForm;
        this.$axios({
          methods:'get',
          url:'/common/email/getCode',
          params:{
            emailAddress:this.ruleForm.email
          }
        })
        .then(res=>{
          let succ=res.data;
          console.log( succ );
          if(succ.code==200){
            console.log('发送成功')
          }else{
            console.log('邮箱有误')
          }
        }).catch(err=>{
            console.log( "失败回调：>>>>", err );
            this.$message.error(err);
        })
        // 发送验证码有效期倒计时
        var timer = setInterval(() => {
            this.sec = this.sec-1
            this.code_ts = this.sec + 'S后重试'
            this.showbtn = false
            if (this.sec === 0) {
                clearInterval(timer)
                this.sec = 60
                this.code_ts = this.sec + 'S后重试'
                this.showbtn = true
            }
        }, 1000)
      }
    }
  }
</script>
<style scoped lang="less">
    .forget-password-component{
        width: 30%;
        background: rgba(255,255,255,.4);
        margin:100px auto;
        padding: 10px 60px 30px 40px;
        .el-form-item__label{
          text-align: left;
        }
        .h-header{
            img{
                width: 50%;
            }
            h2{
                font-weight: normal;
                font-size: 22px;
                margin-left: 10%;
                color: #fff;
            }
        }
        .backToLogin{
          a{
            text-decoration: none;
            color: #409EFF;
          }
        }
        
    }
</style>
<style lang="less">
.forget-password-component{
    .codeParent{
        .el-form-item__content{
            display: flex;
            .sendCode{
                width: 22%;
                text-align: right;
                margin-left: 10px;
                color: #409EFF;
                cursor: pointer;
            }
        }
        .identifyinput{
            width: 78%;
        }
    }
}
</style>