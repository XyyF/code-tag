<template>
    <div class="add-tag-root">
        <!-- Block-Element--Modifier-->
        <el-form
            ref="tagForm"
            labelWidth="70px"
            :model="tagInfo"
            :rules="rules">
            <el-form-item label="词汇:" prop="code">
                <el-input v-model="tagInfo.code"></el-input>
            </el-form-item>
            <el-form-item label="含义:" prop="name">
                <el-input v-model="tagInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="描述:" prop="description">
                <el-input v-model="tagInfo.description"></el-input>
            </el-form-item>
        </el-form>

        <footer>
            <el-button @click="$dialog.close()">
                取消
            </el-button>
            <el-button
                type="primary"
                :loading="isLoading"
                @click="handleClickSave">
                保存
            </el-button>
        </footer>
    </div>
</template>

<script>
    import * as tagApi from '~/api/tag'
    import {isValidateName} from '~/utils/regexp-validator'

    export default {
        name: 'add-tag',
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {
                tagInfo: {
                    name: '',
                    code: '',
                    description: '',
                },
                rules: {
                    name: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, value, callback) => {
                                if (!value) return callback('请输入词汇含义')
                                if (!isValidateName(value)) return callback('不可输入空格及特殊字符')
                                return callback()
                            },
                        },
                    ],
                    code: [
                        {
                            required: true,
                            trigger: 'blur',
                            validator: (rule, value, callback) => {
                                if (!value) return callback('请输入词汇')
                                if (!isValidateName(value)) return callback('不可输入空格及特殊字符')
                                return callback()
                            },
                        }
                    ],
                },
                isLoading: false,
            }
        },
        methods: {
            /* Notice: 复杂的方法，写下说明 */
            async handleClickSave() {
                await this.$refs.tagForm.validate()
                this.isLoading = true;
                try {
                    await tagApi.addTag({
                        code: this.tagInfo.code,
                        name: this.tagInfo.name,
                        description: this.tagInfo.description,
                    });
                    this.isLoading = false;
                    this.$dialog.close({done: true});
                } catch (e) {
                    this.isLoading = false;
                    throw e
                }
            },
        },
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    footer {
        display: flex;
        justify-content: center;
        margin-top: 30px;

        .el-button {
            width: 96px;
            border-radius: 0;
        }

        .el-button + .el-button {
            margin-left: 15px;
        }
    }
</style>
