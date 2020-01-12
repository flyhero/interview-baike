<template>
    <div class="MarkdownPreview">
        <headerTop></headerTop>
        <div class="content">
            <Row type="flex" justify="space-between">
                <Col span="16">
                    <h1 class="title" style="color: #262626;font-weight: 600;">{{val.title}}</h1>
					<div class="postinfo">
						<p><span>阅读数:{{val.viewNum}}</span><span>|</span><span>点赞数:{{val.likeNum}}</span><span>|</span><span>创建于:{{val.createTime}}</span></p>
					</div>
                    <MarkdownPreview  v-if="val.description == null" theme="oneDark" :initialValue="val.content" copyCode copyBtnText="复制代码"/>
                    <MarkdownPreview  v-else theme="oneDark" :initialValue="val.description + '<br><br>  ---下面答案--- <br>\n' +val.content" copyCode copyBtnText="复制代码"/>
					<br>
					<div class="rate">
                        <div>
                           <Button v-if="val.liked == true"  type="error"  shape="circle" icon="md-thumbs-up">已赞</Button>
						   <Button v-else  shape="circle" icon="md-thumbs-up" @click="like()">有用</Button>
                        </div>
						<div @click="submitAnswer(val.id,val.content)">
						    <a>提交更好的答案</a>
						</div>
                    </div>
                </Col>
                <Col span="7">
                    <div class="card">
                        <Card >
                            <p slot="title">贡献者</p>
                            <Tooltip class="avatar" v-for="(item,index) in val.contributor" :content="item.nickName" placement="top-start">
                                <Avatar size="large" class="hImg" :src="item.avatar" />
                            </Tooltip>
                        </Card>
						<br>
						<Card >
						    <p slot="title">修改统计</p>
						    <p>
								共修改了{{val.modifyNum}}次，最后修改于{{val.updateTime}}
							</p>
						</Card>
                    </div>
                </Col>
            </Row>
        </div>

    </div>
</template>

<script>
    import headerTop from './../components/common/headerTop';
    import {MarkdownPreview} from 'vue-meditor';
	import {likeQuestion} from "@/api/index";
	
    export default {
        name: "listsDetails",
        components: {
            MarkdownPreview,headerTop
        },
        data() {
            return {
                val: ''
            }
        },
        created() {
            this.getDetails(this.$route.query.id, '').then((res) => {
                if (res.code == 200) {
                    this.val = res.result
                }

            });
            this.$router.afterEach((to, from, next) => {
                window.scrollTo(0, 0);
            });
        },
        methods: {
			openLand() {
			    $(".landing").slideDown("fast");
			},
			submitAnswer(id,content) {
				const user = this.getStore("userId");
			    if (user == null || user == undefined) {
			        this.$Message['info']({
			            background: true,
			            content: '请先登录！'
			        })
					this.openLand();
			    }else{
					this.$router.push({path:'/markdown',query:{supplement:id,content:content}});
				}
			    
			},
			like(){
				likeQuestion(this.$route.query.id).then((res) => {
					if (res.code == 200) {
					    this.$Message.info("点赞成功");
					}
				});
			}
		},

    }
</script>

<style scoped lang="less">
    .MarkdownPreview{

        margin: 0 auto;
        .content{
            max-width: 1200px;
            margin: 0 auto;
        }
    }
    .card{
        padding: 30px 0;
    }
    .title{
        font-weight: normal;
		padding-left: 12px;
        margin: 15px 0;
    }
	.postinfo{
		padding-left: 12px;
		&>p{
			&>span{
				margin-right:5px;
			}
		}
	}
    .rate{
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>div{
            &>span{
                display: inline-block;
                margin:0 5px;
                cursor: pointer;
                &:hover{
                    color: #409eff;
                }
            }

        }
    }
    .avatar{
        display: inline-block;s
        width: 20%;
        .hImg{
            display: block;
            margin: 0 auto;
        }
    }

</style>
