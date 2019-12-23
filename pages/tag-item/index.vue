<template>
    <div class="tag-item-root">
        <!-- Block-Element--Modifier-->
        {{ tag.tagCode }}
    </div>
</template>

<script>
    export default {
        name: 'tags',
        directives: {},
        components: {},
        mixins: [],
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {}
        },
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
            tag: {
                props: Object,
                default: () => ({}),
            },
        },
        computed: {
            /* Notice: 写下computed数据的描述 */
        },
        filters: {},
        methods: {
            /* Notice: 复杂的方法，写下说明 */
        },
        watch: {
            /* Notice: 写下说明 */
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        activated() {
        },
        deactivated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        errorCaptured() {
        },
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    .tag-item-root {
        margin: 6px;
        padding: 7px;
        line-height: 1em;
        text-align: center;
        border-radius: 8000px;
        cursor: pointer;
        font-size: 14px;
        display: inline-block;
        vertical-align: baseline;
        font-weight: 700;
        /*样式*/
        background-color: #fbbd08 !important;
        border-color: #fbbd08 !important;
        color: #fff !important;
    }
</style>
