<template>
	<div class="markdown">
		<headerTop></headerTop>
		<setEditor ref="data" @titleData="getTitle"></setEditor>
		<div class="mar">
			<div class="but">
				<Tooltip content="上传生成图片链接" placement="right">
					<Button class="Button" type="text" size="small" @click="modal1 = true">
						<Icon size="18" type="md-images" />
					</Button>
				</Tooltip>
				<Button class="Button" type="text" size="small" @click="publish">
					<Icon type="md-share-alt" />
					<span v-if="!supplementId">提交题目</span>
					<span v-else>提交答案</span>
				</Button>
			</div>
			<Modal v-model="modal1" title="插入图片链接生成" @on-ok="ok">
				<Upload action="/">
					<Button icon="ios-cloud-upload-outline">选择图片</Button>
				</Upload>
			</Modal>
			<MarkdownPro class="MarkdownPro" :toolbars="save" autoSave @on-save="handleOnSave" :bordered='bordered' :height="height"
			 v-model="content" />
		</div>
	</div>
</template>

<script>
	import {
		MarkdownPro
	} from 'vue-meditor'
	import headerTop from "../components/common/headerTop";
	import setEditor from '../views/setEditor'
	import {
		addAnswer
	} from "@/api/index";
	export default {
		name: "markdown",
		components: {
			MarkdownPro,
			headerTop,
			setEditor
		},
		data() {
			return {
				content: '',
				height: '',
				bordered: false,
				save: {
					save: true,
				},
				modal1: false,
				val: '',
				title: '',
				supplementId: ''
			}
		},
		created() {
			if (!this.getStore("userId")) {
				this.$router.push({
					path: '/'
				});
				this.$Message.error('你还未登录请登录！');
			}
			this.supplementId = this.$route.query.supplement;
			this.content = this.$route.query.content
		},
		methods: {
			handleOnSave({
				value,
				theme
			}) {
				console.log(value, theme);
			},
			ok() {
				this.$Message.info('Clicked ok');
			},
			publish() {
				this.$refs.data.to();
				var data = {
						title: this.title.title,
						labels: this.title.labels,
						description: this.title.description,
						content: this.content
					},
					supplement = {
						questionId: this.supplementId,
						content: this.content,
						changeDesc: this.description
					};
				this.val = !this.supplementId ? data : supplement;
				!this.supplementId ? this.submitAddQuestion(this.val) : submitAddAnswer(this.val);

			},
			submitAddQuestion(data) {
				this.addQuestion(data).then((res) => {
					if (res.code == 200) {
						this.$Message.success(res.msg);
						this.$router.push({
							path: '/'
						});
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			submitAddAnswer(data) {
				this.addAnswer(data).then((res) => {
					if (res.code == 200) {
						this.$Message.success(res.msg);
						this.$router.push({
							path: '/'
						});
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			isMobile() {
				if (navigator.userAgent.match(/Android/i) ||
					navigator.userAgent.match(/webOS/i) ||
					navigator.userAgent.match(/iPhone/i) ||
					navigator.userAgent.match(/iPad/i) ||
					navigator.userAgent.match(/iPod/i) ||
					navigator.userAgent.match(/BlackBerry/i) ||
					navigator.userAgent.match(/Windows Phone/i)
				) return true;
				return false;
			},
			getTitle(data) {
				this.title = data;
				// this.content = this.$refs.data.supplementVal.content;
			}

		},
		mounted() {
			// this.content = this.$refs.data.supplementVal.content;
			if (this.isMobile()) {
				this.save = {
					save: true,
					h1: false,
					h3: false,
					strong: false,
					italic: false,
					overline: false,
					quote: false,
					ul: false,
					ol: false,
					checked: false,
					notChecked: false,
					split: false,
					theme: false,
					exportmd: false,
					importmd: false,
					table: false,
					hr: false,
					fullscreen: false
				};
				$('.but').css({
					'right': '30px'
				});
				$('.codemirror').css({
					'overflow': 'initial'
				})
			};
		},
		beforeMount() {
			var height = document.documentElement.clientHeight || document.body.clientHeight;
			this.height = height - 66;
		}
	}
</script>

<style lang="less">
	.mar {
		max-width: 1200px;
		margin: 0 auto;
		position: relative;

		.but {
			position: absolute;
			right: 50px;
			top: 0;
			z-index: 999999;
			border: none;
			padding: 8px 0;

			.Button {
				box-shadow: none;
			}
		}
	}

	/*.edit{*/
	/*display: none !important;*/
	/*}*/
	@media all and (min-width: 481px) {
		.but {
			right: 5px;
		}
	}
</style>
