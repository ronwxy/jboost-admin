/**
 * 判断字符串是否符合手机号码格式
 * @param {String|Number} phone 手机号码
 * @return Boolean
 */
function isPhone(phone) {
    return /^(1[3-9][0-9])\d{8}$/.test(phone);
}
/**
 * 判断是否是数字
 * @param {String|Number} number 手机号码
 * @return Boolean
 */
function isNumber(number) {
    return /^\d+$/.test(number);
}

/**
 * 计算3点一面的面积
 * @param x
 * @param y
 * @param x0
 * @param y0
 * @param x2
 * @param y2
 * @returns {number}
 */
function calculateArea (x, y, x0, y0, x2, y2) {
    //求平行四边形的面积 AB = A(xy)  B(X0y0)  AD = A(xy) D(x2y2)
    //距离AB
    let AB = Math.sqrt(Math.pow((x0 - x), 2) + Math.pow((y0 - y), 2));

    //距离AD
    let AD = Math.sqrt(Math.pow((x2 - x), 2) + Math.pow((y2 - y), 2));

    //距离BD
    let BD = Math.sqrt(Math.pow((x2 - x0), 2) + Math.pow((y2 - y0), 2));

    let S = 0.25 * Math.sqrt((AB + AD + BD) * (AB + AD - BD) * (AB + BD - AD) * (AD + BD - AB)) * 2;

    return S;
}

/**
 * 判断点是否在三角形内 已知三个点的 坐标 A(x1,y1) B(x2,y2) C(x3,y3) 求 Q(x0,y0) 是否在三角形内
 * @param x0
 * @param y0
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @param x3
 * @param y3
 * @returns {boolean}
 */
function isTriangleis (x0, y0, x1, y1, x2, y2, x3, y3) {
    var divisor = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3);
    var a = ((y2 - y3) * (x0 - x3) + (x3 - x2) * (y0 - y3)) / divisor;
    var b = ((y3 - y1) * (x0 - x3) + (x1 - x3) * (y0 - y3)) / divisor;
    var c = 1 - a - b;
    return a >= 0 && a <= 1 && b >= 0 && b <= 1 && c >= 0 && c <= 1;
}


export default {
    isPhone, isNumber , calculateArea , isTriangleis
};