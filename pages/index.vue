<template>
    <div class="container">
        <header>
            <img src="../assets/images/logo.png"/>
        </header>
        <el-input
            v-model="matchText"
            maxlength="40"
            class="container__input"
            @change="handleChgMatchText">
            <i slot="suffix" class="el-icon-search"></i>
        </el-input>

        <div v-show="!isLoading" class="container__tags">
            <div v-for="aggreation in tagAggreations" class="tags-aggreation">
                <template v-for="(tag, index) in aggreation.tags">
                    <el-popover
                        :key="tag.tagId"
                        placement="top"
                        width="150"
                        :closeDelay="0"
                        popperClass="tag-popover-root"
                        trigger="click">
                        <popover-card
                            :key="tag.tagId"
                            :tag="tag"
                            @update:matchText="val => handleChgMatchText(val)">
                        </popover-card>
                        <transition
                            appear
                            slot="reference"
                            name="el-zoom-in-center">
                            <tag-item
                                :key="tag.tagId"
                                :tag="tag"
                                :style="{'transition-delay': `${60 * index}ms`}">
                            </tag-item>
                        </transition>
                    </el-popover>
                </template>

                <hr/>
            </div>
        </div>

        <speed-dial>
            <speed-dial-action
                v-for="action in actions"
                :key="action.title"
                :action="action">
            </speed-dial-action>
        </speed-dial>
    </div>
</template>

<script>
    import * as tagApi from '~/api/tag'

    import AddTag from './add-tag/index'
    import TagItem from './tag-item/index'
    import PopoverCard from './popover-card/index'
    import SpeedDial from '../components/speed-dial/index'
    import SpeedDialAction from '../components/speed-dial/speed-dial-action'

    export default {
        components: {
            TagItem,
            SpeedDial,
            PopoverCard,
            SpeedDialAction,
        },
        data() {
            return {
                matchText: '',
                // 标签搜索集合
                tagAggreations: [],
                isLoading: false,
            }
        },
        computed: {
            actions() {
                return [
                    {
                        title: '登录',
                        icon: 'el-icon-user',
                        onClick: this.handleAddTag.bind(this),
                    },
                    {
                        title: '新增tag',
                        icon: 'el-icon-folder-add',
                        onClick: this.handleAddTag.bind(this),
                    },
                ]
            },
        },
        methods: {
            // 输入值确认修改
            handleChgMatchText(val) {
                // 同步输入值
                this.matchText = val
                // 请求相关数据
                this.requestTags()
                // 设置hash值
                this.setRouteHash()
            },
            async requestTags() {
                if (!this.matchText) return
                this.isLoading = true
                try {
                    const result = await tagApi.getTagListByPage({
                        index: 0, limit: 10, matchText: this.matchText,
                    });
                    if (result.length <= 0) {
                        this.isLoading = false
                        return
                    }
                    this.tagAggreations.push({
                        timeStamp: Date.now(),
                        tags: result,
                    })
                    this.isLoading = false
                } catch (e) {
                    this.isLoading = false
                    throw e
                }
            },
            handleAddTag() {
                this.$dialog.config({
                    props: {
                        width: '500px',
                        title: '新增tag',
                    },
                }).show(AddTag).onClose((data) => {
                    if (!data) return
                    this.requestTags()
                })
            },
            // 设置hash值
            setRouteHash() {
                if (!this.matchText) return
                window.location.href = `/#${this.matchText}`
            },
            // 初始化搜索值
            initMatchText() {
                if (!this.$route.hash) return
                this.matchText = decodeURIComponent(this.$route.hash.replace(/^#/, ''))
            },
        },
        mounted() {
            // 同步输入框的值
            this.initMatchText()
            // 请求数据
            this.requestTags()
        },
    }
</script>

<style lang="scss">
    .tag-popover-root {
        padding: 0;
    }
</style>
<style lang="scss" scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    header {
        width: 400px;
        height: 200px;
        margin-top: 90px;
        margin-bottom: 16px;
        pointer-events: none;
    }

    .container__input {
        width: 60%;
        margin: 6px auto;
        font-size: 22px;
    }

    .el-icon-search {
        width: 60px;
        font-size: 1em;
    }

    .container__input /deep/ .el-input__suffix-inner {
        margin-top: 12px;
        display: inline-block;
        cursor: pointer;
    }

    .container .container__input /deep/ input {
        height: 58px;
        border-radius: 80px;
        padding: 0 60px 0 40px;
    }

    .container__tags {
        width: 100%;
        display: flex;
        flex-direction: column-reverse;
    }

    .tags-aggreation hr {
        width: 70%;
        border-color: rgba(0, 0, 0, .16);
        margin-top: 6px;
    }

    .tags-aggreation:first-child hr {
        display: none;
    }
</style>
