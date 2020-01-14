<template>
	<div class="lists">
		<div class="header">
			<div>
				<Row>
					<Col :xs="0" :md="12">
					<Row>
						<Col :xs="3" :md="2">
						<a href="/" class="logo">
							<img src="./../../static/imgs/logo_search_page.png" alt="" />
						</a>
						</Col>
						<Col :xs="21" :md="22">
						<div class="search">
							<search ref="searchChild"></search>
						</div>
						</Col>
					</Row>
					</Col>
					<Col :xs="24" :md="12">
					<headerL></headerL>
					</Col>
				</Row>
			</div>
		</div>
		<div class="content">
			<Row type="flex" justify="space-between">
				<Col span="16">
				<List item-layout="vertical" v-if="lists.data">
					<ListItem v-for="items in lists.data" :key="items.id">
						<router-link target="_blank" :to="{name:'listsDetails',query:{id:items.id}}">
							<ListItemMeta :avatar="items.avatar" :title="items.title" :description="items.summary" />
						</router-link>
						<div class="labels">
							<Tag v-for="item in items.labels" color="primary">{{item.name}}</Tag>
						</div>
						<template slot="action">
							<li>
								<Icon type="ios-eye-outline" />
								{{items.viewNum}}
							</li>
							<li>
								<Icon type="ios-thumbs-up-outline" />
								{{items.likeNum}}
							</li>
						</template>
						<template slot="extra">

						</template>
					</ListItem>
					<!-- <Page v-if="lists.total>10" class="page" :total="lists.total" /> -->
					<Page  :page-size="Number(lists.pageSize)"  v-if="Number(lists.total)> Number(lists.pageSize)"  @on-change="changeSearchPage" class="page" :total="Number(lists.total)" show-elevator />
					
				</List>
				<div v-else class="null">
					<Icon size="50" color="#e5e5e5" type="ios-folder-open" />
					<p>暂无该类型题目</p>
					<div @click="toEdit('info')" class="edit">
						<img class="iconB" src="./../../static/imgs/b2.png" alt="">
						<span>贡献题目</span>
					</div>
				</div>

				</Col>
				<Col span="7">
				<div class="card">
					<Card>
						<p slot="title">
							<Icon type="ios-flame-outline"></Icon>
							热门题目
						</p>
						<!-- 				        <a href="#" slot="extra" @click.prevent="changeLimit">
					            <Icon type="ios-loop-strong"></Icon>
					            Change
					        </a> -->
						<ul>
							<li v-for="item in hotList" style="list-style: none;margin-bottom: 5px;">
								<a :href="'#lists/details?id='+item.id" target="_blank">{{ item.title }}</a>
								<span style="float: right;">
									<Icon type="ios-eye"></Icon>
									{{ item.rate }}
								</span>
							</li>
						</ul>
					</Card>
					<br>
					<Card>
						<p slot="title">
							<Icon type="ios-flame-outline"></Icon>
							贡献排行榜
						</p>
						<List>
							<ListItem v-for="(item,index) in rankList">
								<ListItemMeta :avatar="item.avatar" :title="item.nickName" :description="item.fameVal"/>
							</ListItem>
						</List>
					</Card>
					<br>
					<Card>
						<p slot="title">
							<Icon type="ios-bug-outline"></Icon>
							反馈
						</p>

						<img width="208" height="208" src="./../../static/imgs/feedback.png" />
					</Card>
				</div>
				</Col>
			</Row>

		</div>
	</div>
</template>

<script>
	import headerL from "../components/landing/headerL";
	import search from "../components/common/search";
	import Bus from "./../../static/js/bus";
	import {
		listQuestionWeekPopular,
		userRank
	} from "@/api/index";
	export default {
		name: "lists",
		components: {
			headerL,
			search
		},
		data() {
			return {
				lists: [],
				hotList: [],
				rankList: []
			};
		},
		created() {
			listQuestionWeekPopular().then((res) => {
				if (res.code == 200) {
					this.hotList = res.result
				}
			});
			userRank().then((res) => {
				if (res.code == 200) {
					this.rankList = res.result
				}
			});
		},
		methods: {
			toEdit(type) {
				if (!this.getStore("userId")) {
					this.$Message[type]({
						background: true,
						content: '你还没有登录请登录后在编辑文章！'
					});
					$(".landing").slideDown("fast");
				} else {
					this.$router.push({
						path: '/markdown'
					})
				}

			},
			changeSearchPage(pageNumber){
				this.search({data:this.$refs.searchChild.val,current:pageNumber}).then((res) => {
					if (res.code == 200) {
					    this.lists = res.result
					}
				})
			}
		},
		mounted() {
			var _this = this;
			Bus.$on("newList", function(val) {
				_this.lists = val;
			});
		}
	};
</script>

<style scoped lang="less">
	.content {
		max-width: 1200px;
		margin: 0 auto;
		margin-top: 20px;

		.page {
			margin-top: 30px;
			text-align: center;
		}
	}

	.header {
		padding: 10px 0;
		border-bottom: 1px solid #d8d8d8;

		&>div {
			max-width: 1200px;
			margin: 0 auto;
		}
	}

	.logo {
		vertical-align: middle;
		margin-right: 15px;

		&>img {
			width: 40px;
		}
	}

	.seach {
		width: 90%;
		display: inline-block;
		vertical-align: middle;
	}

	.null {
		margin: 100px 0;
		text-align: center;

		&>p {
			font-size: 20px;
			color: #999999;
			margin-top: 5px;
		}

		.edit {
			display: block;
			width: 120px;
			border-radius: 20px;
			padding: 5px 2px;
			background: #333333;
			padding-right: 10px;
			text-align: center;
			margin: 25px auto;
			cursor: pointer;
			color: white;

			&>img {

				width: 20px;
				vertical-align: middle;
			}

			&>span {
				font-size: 16px;
				color: white;
				vertical-align: middle;
			}
		}
	}
</style>
