<template>
    <div class="speed-dial-action-root">
        <!-- Block-Element--Modifier-->
        <span class="panel-body__label">
            {{ action.title }}
        </span>
        <el-button
            circle
            class="speed-dial__btn"
            :icon="action.icon"
            @click="action.onClick">
        </el-button>
    </div>
</template>

<script>
    export default {
        name: 'speed-dial-action',
        props: {
            action: {
                type: Object,
                default: () => ({}),
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

    .speed-dial-action-root {
        position: relative;
        display: flex;
        align-items: center;
        transition-delay: 150ms;
        transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 0.8s;
    }

    .panel-body__label {
        white-space: nowrap;
        color: rgba(255, 255, 255, 0.7);
        padding: 4px 16px;
        font-size: 14px;
        position: absolute;
        right: 100%;
        box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        transition-delay: 0ms;
        background-color: #424242;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 0.00938em;
        margin-right: 8px;
    }

    .speed-dial-action-root > .el-button {
        width: 40px;
        height: 40px;
        color: rgba(0, 0, 0, 0.54);
        opacity: 1;
        background-color: #fff;
    }
</style>
