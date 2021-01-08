export default {
    data() {
        return {}
    },
    methods: {
        getRequiredRole: function (message = "请输入", trigger = ['blur'], validator) {
            return {required: true, message: message, trigger: trigger, validator};
        },
        getCheckPhoneRoles: function () {
            return [
                {required: true, message: '请输入手机号', trigger: 'blur'},
                {message: '请输入正确的手机号', trigger: 'blur', validator: this._checkPhone,},
            ]
        },
        _checkPhone: function (rule, value, callback) {
            if (/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(value)) {
                callback();
            } else {
                callback(new Error('请输入正确的手机号'));
            }
        },
        getCheckIdRoles: function () {
            return [
                {required: true, message: '请输入身份证', trigger: 'blur'},
                {min: 15, max: 18, message: '长度在 15 到 18 个字符', trigger: 'blur'},
                {message: '请输入正确的身份证', trigger: 'blur', validator: this._checkId,},
            ]
        },
        _checkId: function (rule, value, callback) {
            if (/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
                callback();
            } else {
                callback(new Error('请输入正确的身份证'));
            }
        },
        getRangeValueRoles: function () {
            return [
                {required: true, message: '请输入数值范围1', trigger: 'blur'},
                { message: '请输入数值范围1', trigger: 'blur', validator: this._rangeValue,},
            ]
        },
        _rangeValue: function (rule, value, callback) {
            console.log(this.min || this.max);
            if (this.min||this.max) {
                callback();
            } else {
                callback(new Error('请输入数值范围2'));
            }
        },
    }
}
