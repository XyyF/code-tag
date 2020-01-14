<template>
    <div class="popover-card-root">
        <!-- Block-Element--Modifier-->
        <div>搜索</div>
        <div>编辑</div>
        <div>删除</div>
    </div>
</template>

<script>
    export default {
        name: 'popover-card',
        directives: {},
        components: {},
        mixins: [],
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {}
        },
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
        },
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    .popover-card-root div {
        cursor: pointer;
        min-height: 1em;
        outline: 0;
        border: 0;
        text-transform: none;
        text-shadow: none;
        font-weight: 700;
        line-height: 1em;
        font-style: normal;
        text-align: center;
        text-decoration: none;
        user-select: none;
        color: rgba(0, 0, 0, .6);
        padding: .58928571em 1.125em;

        &:hover {
            color: rgba(0, 0, 0, .8);
        }
    }

    .popover-card-root div + div {
        border-top: 1px solid rgba(34, 36, 38, .15);
    }
</style>
