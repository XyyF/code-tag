<template>
    <div class="container">
        <el-input
            v-model="matchText"
            class="container__input"
            @change="handleChgMatchText">
        </el-input>
    </div>
</template>

<script>
    import Logo from '~/components/Logo.vue'

    export default {
        components: {
            Logo
        },
        data() {
            return {
                matchText: '',
                tags: [],
            }
        },
        methods: {
            handleChgMatchText() {
                this.requestTags()
            },
            async requestTags() {
                try {
                    const result = await this.$axios.$get('/api/tag/list/paged', {
                        params: {
                            index: 0, limit: 10, matchText: '',
                        },
                    })
                    this.tags = result.tags || []
                } catch (e) {
                    throw e
                }
            },
        },
        mounted() {
            this.requestTags()
        },
    }
</script>

<style lang="scss">
    .container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .container__input {
        width: 60%;
        margin: 0 auto;
    }

    .container .container__input /deep/ input {
        height: 58px;
        border-radius: 80px;
        padding: 0 60px 0 40px;
    }
</style>
