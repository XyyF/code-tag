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
        render() {
            const children = this.$slots['default'].map((component, index) => {
                // 设置阶梯延时
                component.data.style = {
                    transitionDelay: `${60 * (this.$slots.default.length - index)}ms`,
                }
                return component
            })

            return <div class="speed-dial-root" onMouseleave={this.handleLeaveBtn}>
                <el-button
                    circle
                    type="primary"
                    icon="el-icon-setting"
                    class="speed-dial__btn"
                    nativeOnMouseenter={this.handleFocusBtn}>
                </el-button>

                <div class={{'speed-dial__panel--close': !this.isDialShow, 'speed-dial__panel': true}}>
                    {children}
                </div>
            </div>
        },
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    @import "./style";

    .speed-dial-root {
        display: flex;
        flex-direction: column-reverse;
        position: fixed;
        right: 50px;
        bottom: 100px;

        & > .el-button {
            width: 56px;
            height: 56px;
        }

        & > .el-button:hover {
            transform: rotate(45deg);
            background-color: rgb(17, 82, 147);
        }
    }

    .speed-dial__panel {
        margin-bottom: -32px;
        flex-direction: column;
        padding-bottom: 48px;
        display: flex;
        align-items: center;
    }

    .speed-dial__panel.speed-dial__panel--close {
        pointer-events: none;
        transition: top 0s linear 0.2s;
    }
</style>
