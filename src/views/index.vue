<template>
	<div class="index">
		<div class="header">
			<headerTop></headerTop>
		</div>
		<Row>
			<Col style="height: 1px" :xs="0" :md="6">
			</Col>
			<Col :xs="24" :md="12">
			<div class="searchBox">
				<img alt="Vue logo" src="./../../static/imgs/logo_index_zh_CN.png" />
				<search></search>
				<div style="text-align: center;">
					<p>本站共收录了<span>{{count}}</span>道题目</p>
					<!-- <div > -->
					<a @click="submitQuestion()">贡献题目</a>
					<!-- </div> -->
				</div>

			</div>
			</Col>
			<Col style="height: 1px" :xs="0" :md="6">
			</Col>
		</Row>
	</div>
</template>

<script>
	// @ is an alias to /src
	import search from "./../components/common/search";
	import headerTop from './../components/common/headerTop'
	import {
		githubOauth
	} from "@/api/index"
	export default {
		name: "index",
		components: {
			search,
			headerTop,
		},
		data() {
			return {
				val: "",
				count: 0,
				join: true
			};
		},
		created() {
			this.countQuestionNum('').then((res) => {
				if (res.code == 200) {
					this.count = res.result
				}
			});
			const code = this.$route.query.code;
			if (code != undefined && code != "") {
				githubOauth({
					code: code
				}).then((res) => {
					if (res.code == 200) {
						this.session(res.result.token, res.result.userId);
					}
				});
			}
		},
		methods: {
			openLand() {
				$(".landing").slideDown("fast");
			},
			submitQuestion() {
				const user = this.getStore("userId");
				if (user == null || user == undefined) {
					this.$Message['info']({
						background: true,
						content: '请先登录！'
					})
					this.openLand();
				} else {
					this.$router.push('/markdown');
				}

			}

		},

	};
</script>

<style lang="less">
	.index {
		.header {
			width: 100%;
			background: #f4f4f4;
		}

		.searchBox {
			width: 90%;
			margin: 0 auto;

			&>img {
				width: 75%;
				display: block;
				margin: 0 auto;
				// margin-bottom: 25px;
			}

			&>div {
				&>p {
					margin-top: 20px;
					color: #9b9b9b;
					font-size: 16px;
					font-weight: 400;

					&>span {
						color: #177cb0;
						margin: 0 10px;
					}
				}
			}

		}
	}
</style>
