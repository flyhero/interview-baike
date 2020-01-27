<template>
    <div>
        <Tabs value="name1" :animated="false">
            <TabPane label="声望值"  name="name1">
                <List>
                    <ListItem class="ListItem" v-for="(item,index) in fameRecords.data" :key="index">
                        <span>{{item.createTime.split(' ')[0]}} <br>{{item.createTime.split(' ')[1]}} </span>
                        <div>
                            <h2>恭喜获得{{item.val}}点声望</h2>
                            <p>{{item.reason}}</p>
                        </div>
                    </ListItem>
                </List>
                <Page  v-if="Number(fameRecords.total)>Number(fameRecords.pageSize)" class="Page" @on-change="changeFamePage" :total="Number(fameRecords.total)"  :page-size="Number(fameRecords.pageSize)"  show-elevator />
            </TabPane>
            <!-- <TabPane label="币值"  name="name2">
                 <List>
                     <ListItem class="ListItem" v-for="(item,index) in coinRecords.data" :key="index">
                         <span>{{item.createTime.split(' ')[0]}} <br>{{item.createTime.split(' ')[1]}} </span>
                         <div>
                             <h2>恭喜获得{{item.val}}币</h2>
                             <p>{{item.reason}}</p>
                         </div>
                     </ListItem>
                 </List>
                 <Page  :page-size="Number(coinRecords.pageSize)"  v-if="Number(coinRecords.total)> Number(coinRecords.pageSize)"  @on-change="changeCoinPage" class="Page" :total="Number(coinRecords.total)" show-elevator />
             </TabPane> -->
        </Tabs>
    </div>
</template>

<script>
	import {MarkdownPreview} from 'vue-meditor'
    export default {
        name: "scoreRecords",
		components: {
		    MarkdownPreview
		},
        data(){
            return{
				lists:'',
                fameRecords:'',
				coinRecords:''
            }
        },
		created() {
			this.getFame().then((res) => {
				if (res.code == 200) {
				    this.fameRecords = res.result
				}

			})

			this.getCoin().then((res) => {
				if (res.code == 200) {
				    this.coinRecords = res.result
				}

			})
		},
        methods:{
			changeFamePage(pageNumber){
				this.getFame({current:pageNumber}).then((res) => {
					if (res.code == 200) {
					    this.fameRecords = res.result
					}
				
				})
			},
			changeCoinPage(pageNumber){
				this.getCoin({current:pageNumber}).then((res) => {
					if (res.code == 200) {
					    this.coinRecords = res.result
					}
				
				})
			}
        }
    }
</script>

<style scoped lang="less">
    .ListItem{
        display: flex;
        justify-content: space-between;
        align-items: center;

        &>div{
            width: 80%;
            &>h2{
                font-weight: 500;
                margin-bottom: 4px;
                color: #04c518;
                font-size: 14px;
                line-height: 22px;
            }
            &>p{
                color: rgba(0,0,0,.45);
                font-size: 14px;
                line-height: 22px;
            }
        }
    }
    .Page{
        margin-top: 20px;
    }

</style>
