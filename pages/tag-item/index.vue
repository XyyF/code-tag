<template>
    <div class="tag-item-root">
        <!-- Block-Element--Modifier-->
        {{ tag.tagCode }}
    </div>
</template>

<script>
    export default {
        name: 'tags',
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
            tag: {
                props: Object,
                default: () => ({}),
            },
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
        user-select: none;
    }
</style>
