export default {
    deleteInvalidProperties,
}

/**
 * delete 对象中非法的字段
 * @param obj 待检查对象
 * @param strict {boolean} 严格模式下，'' 、 [] 、{} 也会被删掉
 */
function deleteInvalidProperties(obj, strict = true) {
    if (!obj) return obj
    const copyObj = glodash.cloneDeep(obj)
    Object.entries(obj)
        .forEach(([key, value]) => {
            if (value && typeof value === 'object') {
                copyObj[key] = deleteInvalidProperties(value, strict)
                value = copyObj[key]
            }
            if (Array.isArray(value)) {
                copyObj[key] = deleteArrayItems(value)
                value = copyObj[key]
            }
            if (
                !isValueVaildFilter(strict, value)
            ) {
                delete copyObj[key]
            }
        })

    return copyObj
}

// 删除不存在的键值对
function deleteArrayItems(array) {
    const copyArr = glodash.cloneDeep(array)
    const length = copyArr.length
    for (let i = length - 1; i >= 0; i--) {
        const item = copyArr[i]
        const newItem = deleteInvalidProperties(item)
        if (
            glodash.isEqual(newItem, {}) || // 空对象
            typeof newItem === 'undefined' || // undefined
            glodash.isNull(newItem) || // null
            newItem === '' || // 空字符串
            (Array.isArray(newItem) && newItem.length === 0) // 空数组
        ) {
            copyArr.splice(i, 1)
        }
    }
    return copyArr
}

/*
* 删除非法字符串
* @param obj 待检查对象
* @param strict 严格模式
* */
function isValueVaildFilter(strict = true, value) {
    if (
        (strict && glodash.isEqual(value, {})) || // 空对象
        typeof value === 'undefined' || // undefined
        glodash.isNull(value) || // null
        (strict && value === '') || // 空字符串
        (strict && Array.isArray(value) && value.length === 0) // 空数组
    ) {
        return false
    }
    return true
}
