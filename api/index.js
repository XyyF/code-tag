/**
 * 封装Axios
 * 处理请求、响应错误信息
 */
import {Message} from 'element-ui' //引用饿了么UI消息组件
import axios from 'axios' //引用axios

const httpRequestor = {
    // 默认的异常处理方法，会传入完整的data对象，可以在这里弹提示框
    defaultErrorHandler: null,
    baseURL: '/api/',
    // 跨域请求时把cookie带过去
    withCredentials: false,
    paramsInterceptor: null,
}

// 后端默认超时时间必须比这里短
const DEFAULT_TIME_OUT = 35000

// create an axios instance
const axiosInstance = axios.create({
    baseURL: '', // 所有异步请求都加上/api
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})
// response interceptor
axiosInstance.interceptors.response.use(
    response => {
        return response.data //res is my own data
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

/**
 * 通用的发包和回包处理逻辑
 * @param config
 * @return {Promise} 返回一个promise对象
 */
async function commonAjax(config) {
    try {
        // 处理 baseURL
        config.baseURL = httpRequestor.baseURL;

        // 加入时间戳
        config.url = addVersionToUrl(config.url);

        // 避免循环调用
        const func = config.errorHandler
        if (func) {
            config.errorHandler = (error) => {
                func(error, config)
            }
        }

        return axiosInstance(config)
    } catch (err) {
        throw err
    }
}

/**
 * 在url后面加个随机参数，以防浏览器缓存请求
 * @param {string} url
 * @return {string}
 */
function addVersionToUrl(url) {
    return url.includes('?') ? `${url}&_=${Date.now()}` : `${url}?_=${Date.now()}`
}

/**
 * 通过get发送并接收json格式的数据.并统一处理常见的错误
 * @param {string} url
 * @param {object?} params={}
 * @param {boolean?} throwError 是否不使用默认的异常处理方法，而把异常抛出来
 * @param {int?} timeout 超时时间，默认10秒
 * @return {Promise} 返回一个promise对象
 */
httpRequestor.get = function get(url, params = {}, throwError, timeout) {
    return commonAjax({
        method: 'GET',
        url,
        params,
        errorHandler: (!throwError && httpRequestor.defaultErrorHandler) || null,
        timeout: timeout || DEFAULT_TIME_OUT,
        withCredentials: httpRequestor.withCredentials,
    })
}

/**
 * 通过post发送数据，使后端直接收到json格式的数据。并统一处理常见的错误
 * @param {string} url
 * @param {object?} data={}
 * @param {object?} params={}
 * @param {boolean?} throwError 是否不使用默认的异常处理方法，而把异常抛出来
 * @param {int?} timeout 超时时间，默认10秒
 * @return {Promise} 返回一个promise对象
 */
httpRequestor.post = function postJson(url, data = {}, params = {}, throwError, timeout, disableQueue = false) {
    return commonAjax({
        method: 'POST',
        url,
        params,
        data: JSON.stringify(data),
        errorHandler: (!throwError && httpRequestor.defaultErrorHandler) || null,
        timeout: timeout || DEFAULT_TIME_OUT,
        withCredentials: httpRequestor.withCredentials,
        headers: {'Content-Type': 'application/json'},
        disableQueue,
    })
}

export default httpRequestor //导出封装后的httpRequestor
