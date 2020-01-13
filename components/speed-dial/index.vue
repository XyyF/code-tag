<template>
    <div class="speed-dial-root" @mouseleave="handleLeaveBtn">
        <!-- Block-Element--Modifier-->
        <el-button
            circle
            type="primary"
            icon="el-icon-setting"
            class="speed-dial__btn"
            @mouseenter.native="handleFocusBtn">
        </el-button>

        <div class="speed-dial__panel" :class="{'speed-dial__panel--close': !isDialShow}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'speed-dial',
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {
                isDialShow: false,
            }
        },
        methods: {
            /* Notice: 复杂的方法，写下说明 */
            handleFocusBtn() {
                this.isDialShow = true
            },
            handleLeaveBtn() {
                this.isDialShow = false
            },
        },
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    .speed-dial__btn {
        padding: 0;
        font-size: 24px;
        box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
        transform: none;
        transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .speed-dial-root {
        display: flex;
        flex-direction: column-reverse;
        position: fixed;
        right: 50px;
        bottom: 100px;

        &:hover > .el-button {
            transform: rotate(45deg);
            background-color: rgb(17, 82, 147);
        }
    }

    .speed-dial-root > .el-button {
        width: 56px;
        height: 56px;
    }

    .speed-dial__panel {
        margin-bottom: -32px;
        flex-direction: column-reverse;
        padding-bottom: 48px;
        display: flex;
        align-items: center;
    }

    .speed-dial__panel.speed-dial__panel--close {
        pointer-events: none;
        transition: top 0s linear 0.2s;

        /deep/ .speed-dial-action-root {
            opacity: 0;
            transform: scale(0);
        }
    }
</style>
