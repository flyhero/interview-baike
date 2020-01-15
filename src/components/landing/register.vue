<template>
    <div class="register">
        <p>用户注册</p>
        <span>{{ msg }}</span>
        <div class="accountR">
            <AutoComplete
                    id="accountR"
                    v-model="register.account"
                    @on-search="handleInput"
                    placeholder="输入注册邮箱">
                <Option v-for="item in data2" :value="item" :key="item">{{ item }}</Option>
            </AutoComplete>
        </div>
        <Input id="nickName" v-model="register.nickName" placeholder="昵称"  />
        <Input id="password2" v-model="password2" type="password" password placeholder="输入密码" />
        <Input id="passwordR" v-model="register.password" type="password" password placeholder="确认输入密码" />
        <button @click="submitRegister">立即注册并登录</button>
		<div style="display: flex;">
		     <div style="margin: 0px auto;"><a :src="github" style="font-size: 24px;"><Icon type="logo-github" size="24px"/></a></div>
		</div>
        <div>
            <a href="javascript:;" @click="changeLand">已有账号立即登录</a>
        </div>

        <Modal v-model="modal2" width="360" :mask-closable="false">
            <p slot="header" style="color:#19be6b;text-align:center">
                <Icon type="ios-contacts" size="20"/>
                <span>是否加入志愿者</span>
            </p>
            <div style="text-align:center">
                <p>如java志愿者可以，收到其他人java相关的题目，回答可以快速增长声望，不清楚的也可以移交给其他人</p>
                <p>那么你是否要加入?</p>
            </div>
            <div slot="footer">
                <Button type="success" size="large" long :loading="modal_loading" @click="del">加入</Button>
            </div>
        </Modal>
        <setVolunteers  :join = 'join' ></setVolunteers>
    </div>
</template>

<script>
    import Bus from './../../../static/js/bus'
    import setVolunteers from './../../components/volunteers/setVolunteers'

    export default {
        name: "register",
        components:{ setVolunteers },
        data() {
            return {
                register: {
                    account: "",
                    password: "",
                    nickName: ""
                },
                password2: "",
                msg: "",
                show: true,
                succ: '',
                data2: [],
                modal2: false,
                modal_loading: false,
                join:false
            };
        },
        methods: {
            del () {
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.modal2 = false;
                    this.join = true
                    // this.$router.push({path:'/volunteers'});
                }, 1000);
            },
            handleInput (value) {
                this.data2 = !value || value.indexOf('@') >= 0 ? [] : [
                    value + '@qq.com',
                    value + '@sina.com',
                    value + '@163.com'
                ];
            },
            //去登录
            changeLand() {
                this.$emit("registerShow", !this.show);
            },
            //提交注册
            submitRegister() {
                var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                $(".register input").removeClass("active");
                this.msg = "";
                if (!reg.test(this.register.account)) {
                    this.msg = "账号不是一个邮箱地址";
                    $("#accountR input").addClass("active");
                    $("#accountR input").focus();
                    return;
                }
                if (this.register.nickName == "") {
                    this.msg = "昵称不能为空";
                    $("#nickName input").addClass("active");
                    $("#nickName input").focus();
                    return;
                }
                if (this.password2 == "" || this.password2.length < 6) {
                    this.msg = "密码不规范";
                    $("#password2 input").addClass("active");
                    $("#password2 input").focus();
                    return;
                }
                if (this.register.password != this.password2) {
                    this.msg = "两次密码输入不一致";
                    $("#passwordR input").addClass("active");
                    $("#passwordR input").focus();
                    return;
                }
                this.regist(this.register).then((res) => {
                    if (res.code == 200) {
                        this.$Message.success(res.msg);
                        this.session(res.result.token, res.result.userId);
                        this.reset();
                        this.modal2 = true
                    } else {
                        this.$Message.error(res.msg);
                    }
                })

            },
            //存储
            session(token, userId) {
                this.removeStore("accessToken");
                this.removeStore("userId");
                this. setStore("accessToken",token);
                this. setStore("userId", userId)

            },
            reset() {
                $(".landing").slideUp("fast");
                this.register = {
                    account: "",
                    password: "",
                    nickName: ""
                };
                this.password2 = '';
                this.changeLand();
                this.succ = true;
                Bus.$emit('succ', this.succ);


            }
        }
    };
</script>

<style  lang="less">
    .register {
        width: 350px;
        height: 400px;
        background: white;
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
         input{
            width: 100%;
            height: 35px;
            margin-bottom: 15px;
             border-radius: 0;
        }
        .active{
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
        & > img {
            position: absolute;
            top: 20px;
            right: 15px;
            width: 15px;
            cursor: pointer;
            z-index: -1;
        }
    }
</style>
