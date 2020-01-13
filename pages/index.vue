<template>
    <div class="container">
        <header>
            <img src="../assets/images/logo.png" />
        </header>
        <el-input
            v-model="matchText"
            maxlength="40"
            class="container__input"
            @change="handleChgMatchText">
            <i slot="suffix" class="el-icon-search"></i>
        </el-input>

        <div v-show="!isLoading" class="container__tags">
            <tag-item
                v-for="tag in tags"
                :key="tag.tagId"
                :tag="tag">
            </tag-item>
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
    import SpeedDial from '../components/speed-dial/index'
    import SpeedDialAction from '../components/speed-dial/speed-dial-action'

    export default {
        components: {
            TagItem,
            SpeedDial,
            SpeedDialAction,
        },
        data() {
            return {
                matchText: '',
                tags: [],
                isLoading: false,
            }
        },
        computed: {
            actions() {
                return [
                    {
                        title: '新增tag',
                        icon: 'el-icon-folder-add',
                        onClick: this.handleAddTag.bind(this),
                    },
                ]
            },
        },
        methods: {
            handleChgMatchText() {
                this.requestTags()
            },
            async requestTags() {
                this.isLoading = true;
                try {
                    this.tags = await tagApi.getTagListByPage({
                        index: 0, limit: 10, matchText: this.matchText,
                    });
                    this.isLoading = false
                } catch (e) {
                    this.isLoading = false;
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
        },
        created() {
            this.requestTags()
        },
    }
</script>

<style lang="scss">
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
        margin: 0 auto;
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
</style>
