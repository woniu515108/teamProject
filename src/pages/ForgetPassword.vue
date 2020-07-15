<template>
    <el-row class="forget-password-component">
        <div class="findupwd">
            <img src="/public/images/1593537163521.jpg" alt="">
            <el-row class="h-header"><img class="header_logo" src="../images/logo_forget.png"><h2>找回密码</h2></el-row>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="forgetPassword">
                <el-form-item label="电子邮箱" prop="email">
                    <el-input type="email" v-model="ruleForm.email" autocomplete="off" placeholder="请输入您的电子邮箱"></el-input>
                </el-form-item>
                <el-form-item label="邮箱验证码" prop="verifycode" class="codeParent">
                    <el-input v-model="ruleForm.verifycode" placeholder="请输入验证码" class="identifyinput"></el-input>
                    <div class="right">
                        <el-button @click="getyzcode(ruleForm)" :disabled="attcode" v-if="showbtn" class="sendCode">获取验证码</el-button>
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
        </div>
    </el-row>
</template>

<script>
  export default {
    name:'forgetPassword',
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
            attcode: true,          //点击获取验证码按钮判断
            showbtn: true,          // 展示获取验证码或倒计时按钮判断
            code_ts: '获取验证码',  //倒计时提示文字
            sec: 60 ,               // 倒计时秒数
            ruleForm: {
                email:'',
                verifycode: '',
                pass: '',
                checkPass: ''
            },

            IDcode: "", // 邮箱校验码

            rules: {
                email: [
                    { validator: checkEmail, trigger: 'blur', required: true }
                ],
                verifycode: [
                    { validator: verifycode, trigger: 'blur', required: true }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur',required: true }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur',required: true }
                ],
            }
        };
    },
    mounted(){
    //   console.log('................................');
    //   console.log(this.attcode)
    },

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 请求找回密码接口

                    console.log( "通过校验：==>",  this.ruleForm);
                    let { email, verifycode, pass} = this.ruleForm;
                    let IDcode = this.IDcode;

                    

                    this.$axios.post('/backstage/user/recoverPwd', {
                        emailAddress: email,
                        IDcode: IDcode,
                        code: verifycode,
                        newPwd: pass
                    })
                    .then(res=>{
                        console.log( "重置密码===>", res );
                        if( res.code == '200' ){
                            this.$message({
                                showClose: true,
                                message: '修改成功！',
                                type: 'success'
                            });

                            // 路由跳转至登录页
                            this.$router.replace('/');
                        }else{
                            this.$message({
                                showClose: true,
                                message: `${err}`,
                                type: 'error'
                            });
                        }
                        // var succ=res.data;
                        // console.log(succ);
                        // if(succ.code==200){
                        //     console.log('成功修改密码');
                        //     // 将用户信息放在seesionStorage
                        //     sessionStorage.setItem('passwordInfo', JSON.stringify(succ.data));

                        //     // 路由跳转至登录页
                        //     this.$router.replace('/');
                        // }else{
                        //     console.log(succ.msg)
                        // }
                    })
                    .catch(err=>{
                        console.log('重置失败',err)
                    })
                }
            });
        },

        // 发送验证码倒计时
        getyzcode () {
            console.log(this.ruleForm.email)

            // 请求验证码接口
            const {email}=this.ruleForm;

            console.log( "email:===", email );

            this.$axios.get('/common/email/getCodeForEdit',{
                params:{
                    emailAddress: email
                }
            })
            .then(res=>{

                console.log("获取邮箱验证码回调==>", res);
                if(res.code==200){
                    this.$message({
                        showClose: true,
                        message: '邮件发送成功,请注意查收！',
                        type: 'success'
                    });

                    this.IDcode = res.data.IDCode;
                }else{
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    })
                }
            }).catch(err=>{
                console.log( "失败回调：>>>>", err );
                this.$message.error(err);
            });

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
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: url(../images/zc_bg.jpg) no-repeat;
        background-size: 100% 100%;
        overflow: auto;
        .findupwd{
            width: 500px;
            height: 530px;
            background: rgba(255,255,255,.2);
            padding: 30px 60px 50px 40px;
            position: absolute;
            left: 50%;
            top:50%;
            margin-left: -270px;
            margin-top: -285px;
            .h-header{
                position: relative;
                img{
                    width: 80%;
                    // position: absolute;
                    // top:-100px;
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
    }
</style>
<style lang="less">
.forget-password-component{
    .el-form-item__label{
                text-align: left;
                color: #fff;
            }
    .codeParent{
        .el-form-item__content{
            display: flex;
            .tsbtn,.sendCode{
                text-align: right;
                margin-left: 10px;
                background: #409EFF;
                border:none;
                color: #fff;
            }
        }
        .identifyinput{
            width: 78%;
        }
    }
}
</style>