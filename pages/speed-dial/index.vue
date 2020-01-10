<template>
    <div class="speed-dial-root" @mouseleave="handleLeaveBtn">
        <!-- Block-Element--Modifier-->
        <el-button
            circle
            type="primary"
            icon="el-icon-plus"
            class="speed-dial__btn"
            @mouseenter.native="handleFocusBtn">
        </el-button>

        <div class="speed-dial__panel" :class="{'speed-dial__panel--close': !isDialShow}">
            <div class="speed-dial__panel-body">
                <div class="panel-body__label">
                    新增tag
                </div>
                <el-button
                    circle
                    class="speed-dial__btn"
                    icon="el-icon-plus"
                    @click="handleAddTag">
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import AddTag from '../add-tag/index'

    export default {
        name: 'speed-dial',
        directives: {},
        components: {},
        mixins: [],
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
            handleAddTag() {
                this.$dialog.config({
                    props: {
                        width: '500px',
                        title: '新增tag',
                    },
                }).show(AddTag)
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
    }

    .speed-dial-root > .el-button {
        width: 56px;
        height: 56px;

        &:hover {
            transform: rotate(45deg);
            background-color: rgb(17, 82, 147);
        }
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

        .speed-dial__panel-body {
            opacity: 0;
            transform: scale(0);
        }
    }

    .speed-dial__panel-body {
        display: flex;
        align-items: center;
        margin: 8px;
        transition-delay: 150ms;
        transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 0.8s;
    }

    .panel-body__label {
        white-space: nowrap;
        color: rgba(0, 0, 0, 0.54);
        padding: 4px 16px;
        font-size: 16px;
        position: absolute;
        right: 100%;
        box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
    }

    .speed-dial__panel-body > .el-button {
        width: 40px;
        height: 40px;
        color: rgba(0, 0, 0, 0.54);
        opacity: 1;
        background-color: #fff;
    }
</style>
