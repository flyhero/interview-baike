<template>
  <div class="land">
    <div>
      <div class="landBox" v-show="landing">
        <p>用户名密码登录</p>
        <span>{{ msg }}</span>
        <div class="account">
          <AutoComplete
                  id="accountR"
                  v-model="land.account"
                  @on-search="handleInput"
                  placeholder="输入账号邮箱">
            <Option v-for="item in data2" :value="item" :key="item">{{ item }}</Option>
          </AutoComplete>
        </div>
        <Input id="password" v-model="land.password" type="password" password placeholder="输入密码" />
        <button @click="submit">登录</button>
		<div style="display: flex;">
		     <div style="margin: 0px auto;"><a :src="github" style="font-size: 24px;"><Icon type="logo-github" size="24px"/></a></div>
		</div>
        <div>
          <a href="javascript:;" @click="ChangeRegister">立即注册</a>
        </div>
      </div>
      <register @registerShow="getRegister" v-show="register"></register>
      <img @click="closeLand" src="./../../../static/imgs/close.png" alt="" />
    </div>
  </div>
</template>

<script>
 import Bus from './../../../static/js/bus'
import register from "./../../components/landing/register";
export default {
  name: "landing",
  components: { register },
  data() {
    return {
      land: {
        account: "",
        password: ""
      },
      msg: "",
	  github: "",
      landing: true,
      register: false,
      data2:[]
    };
  },
  methods: {
      handleInput (value) {
          this.data2 = !value || value.indexOf('@') >= 0 ? [] : [
              value + '@qq.com',
              value + '@sina.com',
			  value + '@gmail.com',
			  value + '@outlook.com',
              value + '@163.com',
			  value + '@126.com',
          ];
      },
    getRegister(val) {
      this.register = val;
      this.landing = !val;
    },
    //忘记密码
    ChangeRegister() {
      this.landing = false;
      this.register = true;
    },
    //关闭窗口
    closeLand() {
      $(".land").slideUp("fast");
      this.landing = true;
      this.register = false;
    },
      //存储
      session(token, userId) {
          this.removeStore("accessToken");
          this.removeStore("userId");
          this. setStore("accessToken",token);
          this. setStore("userId", userId)

      },
    //提交登陆
    submit() {
      $(".land input").removeClass("active");
        this.msg = "";
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!reg.test(this.land.account)) {
        this.msg = "账号不是一个邮箱地址";
        $("#account input").addClass("active");
        $("#account input").focus();
        return;
      }
      if (this.land.password == "" || this.land.password.length < 6) {
        this.msg = "密码不规范";
        $("#password input").addClass("active");
        $("#password input").focus();
        return;
      }
      this.login(this.land).then((res)=>{
          if(res.code==200){
              this.session(res.result.token, res.result.userId);
              this.$Message.success(res.msg);
              this.closeLand();
              this.succ = true;
              Bus.$emit('succ', this.succ);

          }else{
              this.$Message.error(res.msg);
          }
      });
    }
  }
};
</script>

<style lang="less">
.land {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    .landBox {
      width: 290px;
      height: 305px;
      padding: 30px;
      box-sizing: border-box;
      & > p {
        text-align: center;
        font-size: 20px;
      }
      & > span {
        color: #fc4343;
        min-height: 14px;
        font-size: 12px;
        margin-bottom: 2px;
        margin-top: 5px;
        display: block;
      }
      input {
        width: 100%;
        height: 35px;
        margin-bottom: 15px;
       border-radius: 0;
      }
      .active {
        border-color: #d00000;
      }
      & > button {
        width: 100%;
        height: 40px;
        background: #33a9fa;
        outline: none;
        border: none;
        font-size: 16px;
        font-weight: 800;
        cursor: pointer;
        color: #fff;
        border-radius: 3px;
        margin-bottom: 15px;
      }
      & > div {
        display: flex;
        justify-content: space-between;
        & > a {
          font-size: 12px;
          color: #33a9fa;
          text-decoration: none;
          &:hover {
            color: rgba(51, 169, 250, 0.55);
          }
        }
      }
    }
    & > img {
      position: absolute;
      top: 20px;
      right: 15px;
      width: 15px;
      cursor: pointer;
    }
  }
}
</style>
