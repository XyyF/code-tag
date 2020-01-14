<script>
    export default {
        name: 'speed-dial-action',
        props: {
            action: {
                type: Object,
                default: () => ({}),
            },
        },
        computed: {
            isDialShow() {
                return this.$parent.isDialShow
            },
        },
        render() {
            return (
                <div class={{'speed-dial-action-root': true, 'speed-dial-action--close': !this.isDialShow}}>
                    <span class="dial-action__label">
                        {this.action.title}
                    </span>
                    <el-button
                        circle
                        class="speed-dial__btn"
                        icon={this.action.icon}
                        onClick="action.onClick">
                    </el-button>
                </div>
            )
        },
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    @import "./style";

    .speed-dial-action-root {
        width: 56px;
        height: 56px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        opacity: 1;
    }

    .speed-dial-action-root .dial-action__label {
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
        opacity: 1;
        transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .speed-dial-action--close {
        opacity: 0;
        transform: scale(0);
    }

    .speed-dial-action--close .dial-action__label {
        opacity: 0;
        transform: scale(0.5);
    }

    .speed-dial-action-root > .el-button {
        width: 40px;
        height: 40px;

        &:hover {
            background-color: rgba(216, 216, 216, 0.15);
        }
    }
</style>
