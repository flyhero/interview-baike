<template>
	<div>
		<Tabs value="name1" :animated="false">
			<TabPane label="志愿标签" name="name1">
				<Button type="dashed" @click="handleAdd">加入志愿</Button>
				<Tooltip max-width="200" content="成为志愿者为大家贡献一份力量,同时你也能获得声望!">
					<Icon style="margin-left: 5px; text-align: center; vertical-align: middle;" type="ios-information-circle-outline"
					 size="24" />
				</Tooltip>

				<Modal v-model="modal1" title="选择标签" @on-ok="ok">
					<Tag v-for="item in labels" :key="item.id" :name="item.id" size="large" checkable color="primary" @on-change="labChecked"
					 :checked="item.checked">{{ item.name}} +{{item.count}}
					</Tag>
				</Modal>
				<List>
					<ListItem v-for="items in myLabels" :key="items.id">
						<ListItemMeta :title="items.labelName" />
						<template slot="action">
							<li>
								<a @click="exitLabel(items.labelId)">退出</a>
							</li>
						</template>
					</ListItem>
				</List>
			</TabPane>
		</Tabs>
	</div>
</template>

<script>
	import {
		Message
	} from 'view-design';

	import {
		getVolunteersLabels
	} from "@/api/index";

	export default {
		name: "volunteers",
		data() {
			return {
				isLook: false,
				labels: [],
				myLabels: '',
				modal1: false,
				labelVal: '',
				storageLabels: [],
			}
		},
		created() {
			this.Labels();
			this.getMyLabels()
		},
		methods: {
			exitLabel(id) {
				this.$Modal.confirm({
					title: '是否放弃加入志愿者',
					content: '<p>亲，你准备放弃加入志愿者么？</p>',
					onOk: () => {
						this.removeVolunteersLabels({
							labelId: id
						}).then((res) => {
							if (res.code == 200) {
								Message.success("退出成功");
								window.location.reload()
							}
						});
						
					}
				});

			},
			//获取标签
			Labels() {
				getVolunteersLabels().then((res) => {
					var data = res.result;
					this.$nextTick(() => {
						data.forEach((v) => {
							v.checked = false
						});
						this.labels = data
					})
				});

			},
			//获取我的志愿者标签
			getMyLabels() {
				this.myVolunteersLabels().then((res) => {
					if (res.code == 200) {
						this.myLabels = res.result;
					}
				});
			},

			//打开添加标签
			handleAdd() {
				this.modal1 = true;
			},
			//标签初始化选择
			initCheck(name) {
				this.labels.forEach((v) => {
					if (v.id == name) {
						v.checked = !v.checked
					}
				});
			},
			//确认标签选择
			ok() {
				if (this.storageLabels == undefined || this.storageLabels.length <= 0) {
					Message.warning("最少选择一个");
					return;
				}
				this.joinVolunteers(this.storageLabels).then((res) => {
					if (res.code == 200) {
						Message.success("加入成功");
						this.$router.go(0);
					}
				});
			},
			//选择标签
			labChecked(checked, name) {
				console.info(name)
				if (checked) {
					this.initCheck(name);
				} else {
					this.initCheck(name);
					this.storageLabels.forEach((v, index) => {
						if (v.id == name) {
							this.storageLabels.splice(index, 1);
						}
					})
					return;
				}
				this.labels.forEach((v) => {
					var vi = v;
					if (vi.id == name) {
						this.storageLabels.push(vi)
					}

				})
			},
		}

	}
</script>

<style scoped>

</style>
