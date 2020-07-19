<template>
    <div class="login_container">
        I am your Login page
        <div class="login_box">
            <!--头像-->
            <div class="avatar_box">
                <img src="../assets/shu.jpg" alt="" />
            </div>
            <!--表单-->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form" >
                <!--UserName-->
                <el-form-item label="" prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!--PassWord-->
                <el-form-item label="" prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock"
                              type="password"></el-input>
                </el-form-item>
                <!--Button-->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>export default {
        data() {
        return {
            //login From data
            loginForm: {
                username: 'admin',
                password: '123456',
            },
            //This is the input rule for the form
            loginFormRules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' },]
        }
        }
        },
        methods: {
            //Reset Login Form
            resetLoginForm() {
               // console.log(this)
                this.$refs.loginFormRef.resetFields();

            },
            login() {
                this.$refs.loginFormRef.validate(valid => {
                    if (!valid) return;
                });
                const result = this.$http.post('login', this.loginForm).then(res => {
                    if (res.data.meta.status !== 200) return this.$Message.error('登陆失败！');
                    this.$Message.success('登陆成功！');
                    //console.log(res.data.data.token);
                    window.sessionStorage.setItem('token', res.data.data.token);
                    this.$router.push('/student/home')
                    });
                
                //axios.post('http://timemeetyou.com:8889/api/private/v1/', this.loginForm).then(result => {console.log(result)})
               
               
            }
        }
}</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .login_container{
        background-color: #2b4b6b;
        height: 100%;
    }
    .login_box {
        width: 450px;
        height: 300px;
        background-color:#fff;
        border-radius:3px;
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
    }
    .avatar_box {
        height: 130px;
        width: 130px;
        border: 3px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color:#fff;
        img{
               width:100%;
               height:100%;
               border-radius:50%;
               background-color: #eee;

           }  
    }
    .btns{
        display:flex;
        justify-content:flex-end;
    }
    .login_form{
        position:absolute;
        bottom:0;
        width:100%;
        padding:0 20px;
        box-sizing:border-box;
    }
</style>
