<template>
	<div class="left ">
		<div class="demo-avatar">
			<a v-if="!account" href="javascript:;" @click="openLand">登陆/注册</a>
			<Dropdown v-else>
				<Badge v-if="noticeCount != 0" :count="noticeCount">
					<Avatar class="Avatar" :icon="avatar == '' ? 'ios-person' : ''" :src="avatar" />
				</Badge>
				<Avatar v-else class="Avatar" :icon="avatar == '' ? 'ios-person' : ''" :src="avatar" />
				<DropdownMenu slot="list">
					<DropdownItem>
						<router-link class="ItemL" to="/setting">个人中心</router-link>
					</DropdownItem>
					<DropdownItem><span class="ItemL" @click="signOut">退出</span></DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<!--            <router-link v-show="edit" v-if="account" to="/markdown" class="edit">
                <img class="iconB" src="./../../../static/imgs/b2.png" alt="">
                <span>提交题目</span>
            </router-link>
            <div v-show="edit" v-else @click="toEdit('info')" class="edit">
                <img class="iconB" src="./../../../static/imgs/b2.png" alt="">
                <span>提交题目</span>
            </div> -->
		</div>
	</div>
</template>

<script>
	import Bus from './../../../static/js/bus'

	export default {
		name: "headerL",
		data() {
			return {
				account: '',
				avatar: '',
				edit: '',
				noticeCount: 0
			}
		},
		created() {
			this.getUserInfoData();
			if (this.$route.path == '/markdown') {
				this.edit = false
			} else {
				this.edit = true
			}

			this.getCheckRecord('').then((res) => {
					if (res.code == 200) {
						if (res.result != null){
							this.noticeCount = res.result.length;
						}
						
					}
			})

	},
	methods: {
			openLand() {
				$(".landing").slideDown("fast");
			},
			getUserInfoData() {
				var id = this.getStore("userId");
				if (id) {
					this.userInfo(id).then((res) => {
						this.account = res.result.account;
						this.avatar = res.result.avatar
					})
				}
			},
			signOut() {
				this.removeStore("accessToken");
				this.removeStore("userId");
				this.account = '';
				this.avatar = '';
				this.$route.path != '/' ? this.$router.push({
					path: '/'
				}) : '';
			},
			toEdit(type) {
				if (!this.account) {
					this.$Message[type]({
						background: true,
						content: '你还没有登录请登录后在编辑文章！'
					})
				}
				this.openLand()
			}
		},
		mounted() {
			var _this = this;
			Bus.$on('succ', function(val) {
				if (val) {
					var id = this.getStore("userId");
					this.userInfo(id).then((res) => {
						_this.account = res.result.account;
						_this.avatar = res.result.avatar;


					})

				}

			})

		}
	}
</script>

<style scoped lang="less">
	.demo-avatar {
		&>a {
			font-size: 16px;
			color: black;
			cursor: pointer;
		}

		.edit {
			display: inline-block;
			vertical-align: middle;
			border-radius: 8px;
			padding: 3px 5px;
			background: #f5f2f0;
			padding-right: 20px;
			text-align: center;
			margin-left: 15px;
			cursor: pointer;

			&>img {

				width: 35px;
				vertical-align: middle;
			}

			&>span {
				font-size: 16px;
				color: black;
			}
		}

		.ivu-dropdown-menu {
			text-align: start;
		}
	}

	.left {
		text-align: end;
	}

	.ItemL {
		width: 100%;
		display: block;
		padding: 7px 16px;
	}

	.ivu-dropdown-item {
		padding: 0;
	}
</style>
