const name = /^[^`~!@#\$%\^\&\*\(\)\+<>\?"\{\},\.\\\/;；'\[\]\s]*$/

const regValidator = {
    isValidateName(val) {
        return name.test(val)
    },
}

module.exports = regValidator
