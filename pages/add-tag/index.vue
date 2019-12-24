<template>
    <div class="add-tag-root">
        <!-- Block-Element--Modifier-->
        <el-form
            ref="tagForm"
            labelWidth="70px"
            :model="tagInfo"
            :rules="rules">
            <el-form-item label="单词:" prop="code">
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
                        {required: true, message: '请输入单词含义', trigger: 'blur'},
                    ],
                    code: [
                        {required: true, message: '请选择单词', trigger: 'change'}
                    ],
                },
                isLoading: false,
            }
        },
        methods: {
            /* Notice: 复杂的方法，写下说明 */
            async handleClickSave() {
                this.isLoading = true;
                try {
                    await tagApi.addTag({
                        code: this.tagInfo.code,
                        name: this.tagInfo.name,
                        description: this.tagInfo.description,
                    });
                    this.isLoading = false;
                    this.$dialog.close();
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
        height: 36px;

        .el-button {
            width: 96px;
            border-radius: 0;
        }

        .el-button + .el-button {
            margin-left: 15px;
        }
    }
</style>
