<template>
	<div>
		<Tabs value="name1" :animated="false">
			<TabPane :label="label" name="name1">
				<List>
					<ListItem v-for="items in lists" :key="items.id">
						<ListItemMeta :title="items.title" :description="items.changeDesc" />
						<div class="labels">
							<router-link :to="{path:'/checkContent',query:{id:items.id}}" target="_blank">
								查看
							</router-link>
						</div>
						<template slot="action">
							<li>
								<a @click="changeState(items.id,'PASS','')">通过</a>
							</li>
							<li>
								<a @click="repulse(items.id)">退回</a>
							</li>
						</template>
					</ListItem>
				</List>
			</TabPane>
			<TabPane v-if="isAdmin" label="题目审核" name="name2">

				<Collapse v-for="item in waitingCheckQuestions.data" :key="item.id">
					<Panel :name="item.id">
						{{item.title}}
						<Button style="float: right;" shape="circle" @click="passQ(item.id)">通过</Button>
						<div slot="content">
							<MarkdownPreview theme="oneDark" :initialValue="item.content" copyCode copyBtnText="复制代码" />
						</div>
					</Panel>
				</Collapse>
				<Page :page-size="Number(waitingCheckQuestions.pageSize)" v-if="Number(waitingCheckQuestions.total)> Number(waitingCheckQuestions.pageSize)"
				 @on-change="changeWaitingCheckQ" class="Page" :total="Number(waitingCheckQuestions.total)" show-elevator />
			</TabPane>
		</Tabs>
		<Modal v-model="isLook" title="退回理由" @on-ok="ok">
			<textarea v-model="reason" placeholder="退回理由" rows="3" style="width: 100%;"></textarea>
		</Modal>
	</div>
</template>

<script>
	import {
		MarkdownPreview
	} from 'vue-meditor'
	import {
		Modal
	} from 'view-design';
	import {
		checkOps,
		listWaitingCheckQ
	} from "@/api/index";
	export default {
		name: "questions",
		components: {
			MarkdownPreview
		},
		data() {
			return {
				repulseId: '',
				reason: '',
				lists: '',
				waitingCheckQuestions: [],
				isAdmin: false,
				isLook: false,
				label: (h) => {
					return h('div', [
						h('span', '答案审核')
					])
				}
			}
		},
		created() {
			this.getCheckRecord('').then((res) => {
				if (res.code == 200) {
					this.lists = res.result
					this.label = (h) => {
						return h('div', [
							h('span', '答案审核'),
							h('Badge', {
								props: {
									count: res.result == null || res.result == undefined ? 0 : res.result.length
								}
							})
						])
					}
				}
			});
			listWaitingCheckQ({
				current: 1,
				size: 10
			}).then((res) => {
				if (res.code != 405) {
					this.isAdmin = true;
				}
				if (res.code == 200){
					this.waitingCheckQuestions = res.result;
				}
			});
		},
		methods: {
			//打回
			repulse(id) {
				this.isLook = true;
				this.repulseId = id;
			},
			//改变状态
			changeState(id, state, reason) {
				checkOps(id, {
					"checkStateEnum": state,
					"reason": reason
				}).then((res) => {
					if (res.code == 200) {
						//message提示
						this.$Message.info("操作成功")
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			//确认打回
			ok() {
				this.$options.methods.changeState(this.repulseId, 'NOT_PASS', this.reason);
			},
			changeWaitingCheckQ(pageNumber) {
				listWaitingCheckQ({
					current: pageNumber
				}).then((res) => {
					if (res.code == 200) {
						this.waitingCheckQuestions = res.result;
					}
				});
			},
			passQ(id) {
				passQuestion(id).then((res) => {
					if (res.code == 200) {
						waitingCheckQuestions = res.result;
					}
				});
			}
		}
	}
</script>

<style scoped>

</style>
