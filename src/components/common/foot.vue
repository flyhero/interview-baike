<template>
    <div class="footer">
<!--        <div>
            <div>
                <a href="" >联系电话：***********</a>
                <a href="">加入我们：********</a>
                <a href="" >联系电话：***********</a>
            </div>
            <div>
                <a href="" v-for="item in 2">关于我们关于我们关于我们关于我们</a>
            </div>
            <div>
                <a href="" v-for="item in 3">关于我们</a>
            </div>
            <div>
                <a href="" v-for="item in 4">关于我们关于我们关</a>
            </div>
            <div>
                <a href="" >联系电话：***********</a>
                <a href="">加入我们：********</a>
            </div>
        </div> -->
        <p> 沪ICP备******* 啦啦啦啦啦 </p>
    </div>
</template>

<script>
    export default {
        name: "foot"
    }
</script>

<style scoped lang="less">
    .footer{
        width: 100%;
        color: #9d9d9d;
        background: #fbfbfb;
        border-top: 1px solid #E3E9ED;
        min-width: 1000px;
        margin: 48px 0 0 0;
        &>div{
            max-width: 1200px;
            margin: 0 auto;
            padding-top: 1.4286em;
            padding-bottom: 1.4286em;
            display: flex;
            justify-content: space-between;
            &>div{
                &>a{
                    text-decoration: none;
                    line-height: 30px;
                    font-size: 14px;
                    color: #9d9d9d;
                    display: block;
                    &:hover{
                        color: #40485B;
                    }
                }
            }
        }
        &>p{
            background-color: #000;
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 12px;
            text-decoration: none;
            color: #999;
            text-align: center;
        }
    }


</style>
