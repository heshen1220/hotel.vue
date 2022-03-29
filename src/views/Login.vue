<template>
  <div class="wrapper">
    <div style="margin: 200px auto; background-color: #fff; width: 350px; padding: 20px; border-radius: 10px">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>登录</b></div>
      <el-form :model="user" :rules="rules" ref="userForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入手机号码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
        </el-form-item>
          <el-form-item style="margin: 10px 0;text-align: right">
        <el-button type="primary" size="small" autocomplete="off" @click="login">登录</el-button>
        <el-button type="warning" size="small" autocomplete="off">注册</el-button>
      </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      user:{},
      rules:{
        username:[
          { required:true,message: "请输入手机账号",trigger:"blur"},
          { min:11,max:11,message: "长度为11个字符",trigger:"blur"}
        ],
        password:[
          { required:true,message: "请输入密码",trigger:"blur"},
          { min:6,max:18,message: "请输入正确格式的密码",trigger:"blur"}
        ],
      }
    }
  },
  methods:{
    login(){
      this.$refs['userForm'].validate((valid)=>{
        if (valid){
          let check = new FormData();
          check.append("phone", this.user.username);
          check.append("password", this.user.password);
          this.request.post("/check", check).then(res => {
            if (res.code=="200"){
              localStorage.setItem("user",JSON.stringify(res.result))//存储信息
              this.$message.success("登录成功！")
              this.$router.push("/")
            }else {
              this.$message.error("用户名或密码错误")
            }
          })
        }else {
          return false;
        }
      });

    }
  }
}
</script>

<style>
  .wrapper {
    height :100vh;
    background-image: linear-gradient(to bottom right,#FC4668,#3F5EFB);
    overflow: hidden;
  }
</style>