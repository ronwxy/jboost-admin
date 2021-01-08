 /**
 * 数字补零
 * @param {number} number 数字
 * @return {string|number}
 */
function zeroize(number) {
    if (number !== undefined) {
        return number < 10 && number >= 0 ? '0' + number : number;
    }
    return undefined;
}



/**
 * 取范围内的数字
 * @param {number} number 数字
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @return {number}
 */
function range(number, min = Number.MIN_VALUE + 1, max = Number.MAX_VALUE - 1) {
    if (number < min) {
        return min;
    } else if (number > max) {
        return max
    }
    return number;
}

/**
 * 精确小数点后面3位
 * @param num
 * @returns {number}
 */
function getNum3 (num) {
    return Math.round(num * 100 * 10) / 1000;
}

/**
 * 精确小数点后面4位
 * @param num
 * @returns {number}
 */
function getNum4 (num) {
    return Math.round(num * 100 * 100) / 10000;
}

/**
 * 产生随机数函数
 * @param n
 * @returns {string}
 * @constructor
 */
function rndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
    return rnd;
}

export default {
    zeroize,
    range,
    getNum3,
    getNum4,
    rndNum
};