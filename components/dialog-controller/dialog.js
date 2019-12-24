/**
 * Created by gukong on 2019/1/11.
 */
import Loading from './loading'

const DialogOptions = {
    components: {
        Loading,
    },
    data: function () {
        return {
            dialogVisible: false, // create-contract 是否可见
            /**
             * [title]
             * [{
             *	sceneId: 0,
             *	component: null, // create-contract 内容区域组件
             *	componentOptions: null, // 内容区域组件 的 options，详情：https://cn.vuejs.org/v2/guide/render-function.html#深入-data-对象
             *	dialogOptions: { // el-create-contract 组件的选项，详情：http://element-cn.eleme.io/#/zh-CN/component/dialog#attributes
             *		title: '',
             *  },
             * }]
             */
            configs: [],
        }
    },
    props: {
        // 注册全局 create-contract 的时候，传入的配置项
        pluginOptions: {
            default: () => ({
                width: '30%',
            }),
        },
    },
    computed: {
        // 当前的config
        currentConfig() {
            if (this.configs.length === 0) return null;
            return this.configs[this.configs.length - 1]
        },
    },
    methods: {
        // reset重置
        _reset() {
            this.configs = []
        },
        // 弹窗关闭回调
        handleVisibleChanged(val) {
            this.dialogVisible = val
        },
        // 设置弹窗的options
        setDialogOptions(sceneId, options) {
            const config = this.getConfig(sceneId)
            config.dialogOptions = options
        },
        // 获取对应的弹窗配置
        getConfig(sceneId) {
            let config = this.configs.find(item => item.sceneId === sceneId);
            // 没有旧的配置项，返回一个新的（拥有特定的sceneId)
            // 给定默认值，才能做到数据相应
            if (!config) {
                config = {
                    sceneId,
                    dialogOptions: null,
                    component: null,
                    componentOptions: null,
                };
                this.configs.push(config)
            }
            return config
        },
        setComponent(sceneId, component, options) {
            const config = this.getConfig(sceneId);
            if (typeof component === 'function') {
                config.component = 'my-component';
                config.componentOptions = options
            }
            else {
                config.component = component;
                config.componentOptions = options
            }
        },
    },
    render(h) {
        const {
            pluginOptions,
            currentConfig,
            dialogVisible,
            handleVisibleChanged,
        } = this;

        if (!currentConfig) return null;
        /**
         * 处理 create-contract options
         */
        const dialogOptions = {...currentConfig.dialogOptions};
        // 合并 on
        dialogOptions.on = Object.assign(
            {'update:visible': handleVisibleChanged},
            dialogOptions.on,
        )
        // 合并dialog props
        dialogOptions.props = Object.assign(
            {},
            pluginOptions,
            {
                visible: dialogVisible,
                title: currentConfig.component.title,
            },
            dialogOptions.props,
        );

        // 合并component props
        const componentOptions = {...{...currentConfig.componentOptions}};
        componentOptions.props = Object.assign(
            {sceneId: currentConfig.sceneId},
            componentOptions.props,
        );

        return h(
            'el-dialog',
            {...dialogOptions},
            [
                h(
                    currentConfig.component,
                    componentOptions,
                ),
            ],
        )
    },
    watch: {
        dialogVisible(val) {
            if (val) return;
            this._reset()
        },
    },
};

export default class Dialog {
    constructor(Vue, options, instanceOptions) {
        // 使用 get/set 方法识别 this.$create-contract 的调用
        // 设置一个sceneId，后续方法调用携带sceneId，归为同一场景
        // 连续弹框时有用
        this.sceneId = 0;
        this.Vue = Vue;
        this.pluginOptions = options;
        this.dialogRoot = this.initDialog(instanceOptions)
    }

    /**
     * 嵌套弹框的场景
     * @return {Dialog}
     */
    new() {
        return new Dialog(this.Vue, this.pluginOptions)
    }

    /**
     * 显示弹框，与 push 一样的作用
     * @param component 内容组件
     * @param options 内容组件的选项 options
     * @param sceneId {int?} 场景id，用于区分连续弹框时场景划分
     * @returns {Dialog}
     */
    show(component, options, sceneId) {
        return this.push(component, options, sceneId)
    }

    /**
     * 显示弹框
     * 多次调用 push，会依次压入弹框内容组件，仅显示最后一个组件
     * @param component
     * @param options
     * @param sceneId {int?} 场景id，用于区分连续弹框时场景划分
     * @returns {Dialog}
     */
    push(component, options, sceneId) {
        this.Vue.component(
            'my-component',
            () => ({
                // 需要加载的组件 (应该是一个 `Promise` 对象)
                component: component(),
                // 异步组件加载时使用的组件
                loading: Loading,
                // 加载失败时使用的组件
                error: null,
                // 展示加载时组件的延时时间。默认值是 200 (毫秒)
                delay: 0,
                // 如果提供了超时时间且组件加载也超时了，
                // 则使用加载失败时使用的组件。默认值是：`Infinity`
                timeout: 3000,
            }),
        );
        // 将sceneId注入到对应的组件中
        const extraOptions = Object.assign({}, options);
        if (!extraOptions.props) extraOptions.props = {};
        Object.assign(extraOptions.props, {sceneId: this.sceneId});
        this.dialogRoot.setComponent(sceneId || this.sceneId, component, extraOptions);
        this.dialogRoot.dialogVisible = true;
        return this
    }

    /**
     * 设置 el-create-contract 的选项
     * @param config
     * @param sceneId {int?} 场景id，用于区分连续弹框时场景划分
     * @return {Dialog}
     */
    config(config, sceneId) {
        const parsedSceneId = sceneId || this.sceneId;
        const {setDialogOptions} = this.dialogRoot;

        setDialogOptions(parsedSceneId, config);
        return this
    }

    initDialog(instanceOptions) {
        // 创建实例，并挂载到一个元素上。
        const DialogRoot = this.Vue.extend(DialogOptions);
        const root = new DialogRoot({
            ...instanceOptions,
            propsData: {
                pluginOptions: this.pluginOptions,
            },
        }).$mount();
        document.querySelector('body').appendChild(root.$el);

        return root
    }
}
