<template>
    <div class="login-page">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="login-ruleForm">
            <img src="../images/logo.png" alt="" class="logo">
            <!-- 用户名吗 -->
            <el-form-item prop="username">
                <el-input type="text" class="btn btn_uname" placeholder="请输入您的用户名" v-model="loginForm.username" autocomplete="off">
                </el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
                <el-input type="password" class="btn btn_upwd" placeholder="请输入您的密码" v-model="loginForm.password" autocomplete="off">
                </el-input>
            </el-form-item>
            <!-- 忘记密码 -->
            <router-link to="/forget-password" class="forgetPassword">忘记密码</router-link>
            <!-- 提交按钮 -->
            <el-form-item>
                <el-button class="submit" @click="submitForm('loginForm')">立即登录</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: 'login',
        data () {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if(!/^(\w){6,20}$/.test(value)){
                    callback(new Error('请输入6-20个字母、数字、下划线 '));
                } else {
                    callback();
                }
            };
            var validateUname = (rule,value,callback) =>{
                if(!value){
                    callback(new Error('请输入用户名'));
                }else if(!/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/.test(value)){
                    callback(new Error('请输入5-20个以字母开头、可带数字、“_”、“.”的字串'))
                }else{
                    callback();
                }
            };


            return {
                loginForm: {
                    username:'',
                    password: ''
                },
                rules: {
                    username: [
                        { validator: validateUname, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                }
            }
        },

        mounted(){ 
        },

        methods: {
            /**
             * @description: 表单提交
             * @param {formName}  :表单提交数据
             */ 
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    // console.log( valid );
                    if (valid) {
                        const { username, password } = this.loginForm;

                        this.$axios.post('/backstage/user/login',{
                            username,
                            password
                        }).then(res=>{

                            // console.log( "成功回调：>>>>" ,res);
                            // console.log( succ );
                            if(res.code=='200'){
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });

                                // 将用户信息放在seesionStorage
                                sessionStorage.setItem('userInfo', JSON.stringify(res.data));

                                // 路由跳转
                                this.$router.replace('/home');
                                
                            }else{
                                this.$message.error(res.msg);
                            }
                            // console.log
                        }).catch(err=>{
                            // console.log( "失败回调：>>>>", err );
                            this.$message.error(err);
                        })


                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .login-page{
        position: absolute;
        top: 0;
        left: 0;
        width:100%;
        height: 100%;
        background: url(../images/login.jpg) no-repeat center;
        .login-ruleForm{
            margin-left: -270px;
            margin-top: -285px;
            padding: 40px 60px;
            position: absolute;
            top:50%;
            left: 50%;
            width: 500px;
            height: 530px;
            border-radius: 20px;
            user-select: none;
            background: rgba(255, 255, 255, .3);
            .logo{
                margin-bottom: 20px;
            }
            .forgetPassword{
                margin-left: 440px;
                margin-bottom: 20px;
                margin-top: -14px;
                color: #fc5600;
                font-size: 12px;
                text-align: right;
                text-decoration: none;
            }
        }
    }
    
</style>
<style lang="less">
    .login-page{
        .el-form-item{
            margin-bottom: 30px;
        }
        .btn{
            .el-input__inner{
                background: rgba(0, 0, 0, .5);
                height: 40px;
                border:none;
                padding-left: 40px;
                border-radius: 14px;
                color:#fff;
            }
        }
        .btn_uname{
            .el-input__inner{
                background: rgba(0, 0, 0, .5) url(../images/uname.png) no-repeat 10px center;
                background-size: 4%;
            }
        }
        .btn_upwd{
            .el-input__inner{
                background: rgba(0, 0, 0, .5) url(../images/upwd.png) no-repeat 10px center;
                background-size: 4%;
                // margin-top: 10px;
            }
        }
        .submit{
            background: #fc5600;
            border:0;
            color: #fff;
            font-size: 20px;
            height: 40px;
            line-height: 40px;
            width: 100%;
            border-radius: 14px;
            padding: 0;
            margin-top: 30px;
            &:hover{
                background: #a93c04;
                border:0;
                color: #fff;
                outline: none;
                transition: all .5s linear;
            }
        }
    }
</style>
