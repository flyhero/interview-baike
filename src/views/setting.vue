<template>
    <div class="setting">
        <headerTop></headerTop>
        <div class="content">
            <Menu class="nav" v-show="mode2" mode="vertical" :theme="theme1" :active-name="active">
                <MenuItem name="basics" to="/setting">
                    <Icon type="ios-paper"/>
                    基础信息
                </MenuItem>
                <MenuItem v-if="isVolunteer" name="articles" to="/articles">
                    <Icon type="ios-bookmarks-outline"/>
                    题目管理
                </MenuItem>
				<MenuItem name="scoreRecords" to="/scoreRecords">
				    <Icon type="md-medal"/>
				    分值记录
				</MenuItem>
                <MenuItem name="volunteers" to="/volunteers">
                    <Icon type="ios-contacts" />
                    志愿者
                </MenuItem>
            </Menu>
            <Menu class="nav" :active-name="active" v-show="!mode2" mode="horizontal" :theme="theme1" >
                <MenuItem name="basics" to="/setting">
                    基础信息
                </MenuItem>
                <MenuItem v-if="isVolunteer" name="articles" to="/articles">
                    题目管理
                </MenuItem>
				<MenuItem name="scoreRecords" to="/scoreRecords">
				    分值记录
				</MenuItem>
                <MenuItem name="volunteers" to="/volunteers">
				    志愿者
				</MenuItem>
            </Menu>
            <div class="item">
                <router-view/>
                <!--<basics "></basics>-->
            </div>
        </div>

    </div>
</template>

<script>
    import headerTop from "../components/common/headerTop";
    import search from "./../components/common/search";

    export default {
        name: "setting",
        components: {search, headerTop},
        data() {
            return {
                theme1: 'light',
                mode2: 'vertical',
                active:"setting",
				isVolunteer: false
            }
        },
        created() {
            if(!this.getStore("userId")){
                this.$router.push({path:'/'});
                this.$Message.error('你还未登录请登录！');
            }
            this.active = this.$route.name;
			
			this.myVolunteersLabels().then((res) => {
				if (res.code == 200) {
					const arr = res.result;
					this.isVolunteer = arr != [] && arr.length != 0
				}
			});
        },
        methods: {

            resize() {
                var _this = this;
                if ($(window).width() <= 480) {
                    this.mode2 = ''
                }
                $(window).resize(function () {
                    if ($(window).width() <= 480 && _this.mode2 == 'vertical') {
                        _this.mode2 = ''
                    }
                    if ($(window).width() > 480 && _this.mode2 == '') {
                        _this.mode2 = 'vertical'
                    }
                });
            }

        },
        mounted() {
            this.resize()
        }
    }
</script>

<style lang="less">
    .setting {
        width: 100%;
        .header {
            width: 100%;
            background: #333;
            .label {
                & > span {
                    color: white;
                }

            }

        }
        .content {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            margin-top: 30px;
            .nav {
                display: inline-block;
            }
            .item {
                width: 60%;
                display: inline-block;
                vertical-align: top;
                margin:0 30px;
                box-sizing: border-box;
            }
        }
        .router {
            display: block;
        }

    }

    @media all and  (max-width: 870px) and (min-width: 481px) {
        .data {
            & > div {
                display: block !important;
                border: none !important;
            }
        }

        .nav {
            width: auto !important;
        }
    }

    @media all and (max-width: 480px) {
        .nav {
            width: 100% !important;
        }

        .ivu-menu-item, .ivu-menu-submenu {
            padding: 0 5px !important;
        }

        .data {
            & > div {
                display: block !important;
                border: none !important;
            }
        }
    }

</style>
