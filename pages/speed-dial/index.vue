<template>
    <div class="speed-dial-root">
        <!-- Block-Element--Modifier-->
        <el-button
            circle
            type="primary"
            icon="el-icon-plus"
            @mouseenter.native="handleFocusBtn"
            @mouseleave.native="handleLeaveBtn">
        </el-button>

        <div class="speed-dial__panel">
            <el-button
                circle
                icon="el-icon-plus">
            </el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'speed-dial',
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
        computed: {
            /* Notice: 写下computed数据的描述 */
        },
        filters: {},
        methods: {
            /* Notice: 复杂的方法，写下说明 */
            handleFocusBtn() {
                console.log('rengar log', 111)
            },
            handleLeaveBtn() {
                console.log('rengar log', 222)
            },
        },
        watch: {
            /* Notice: 写下说明 */
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        activated() {
        },
        deactivated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        errorCaptured() {
        },
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    .speed-dial-root {
        display: flex;
        flex-direction: column-reverse;
        position: fixed;
        right: 50px;
        bottom: 100px;
    }

    .speed-dial-root > .el-button {
        transform: none;
        transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        width: 56px;
        height: 56px;
        padding: 0;
        font-size: 24px;
        box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
    }

    .speed-dial-root > .el-button:hover {
        transform: rotate(45deg);
        background-color: rgb(17, 82, 147);
    }

    .speed-dial__panel {
        margin-bottom: -32px;
        flex-direction: column-reverse;
        padding-bottom: 48px;
        transition: top 0s linear 0.2s;
        pointer-events: none;
        display: flex;
        align-items: center;
    }

    .speed-dial__panel .el-button {
        width: 40px;
        height: 40px;
    }
</style>
