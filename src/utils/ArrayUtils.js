/**
 * 删除数组空值
 * @param {Array} array 数组
 * @return {Array}
 */
function clear(array) {
    for (let i = 0, len = array.length; i < len; i++) {
        if (!array[i] || array[i] === '' || array[i] === undefined) {
            array.splice(i, 1);
            len--;
            i--;
        }
    }
    return array;
}

/**
 * 判断数组是否相等
 * @param {Array} arr1 数组
 * @param {Array} arr2 数组
 * @return {Boolean}
 */
function equals(arr1, arr2) {
    let isEqual = true;
    for (let j = 0; j < arr1.length; j++) {
        if (arr1[j] !== arr2[j]) {
            isEqual = false;
            break;
        }
    }
    return isEqual;
}

/**
 * 删除数组指定元素
 * @param {Array} array 数组
 * @param {Number} item 元素
 * @return {Array}
 */
function remove(item, array) {
    let index = array.indexOf(item);
    if (index >= 0) {
        array.splice(index, 1);
    }
    return array;
}

/**
 * 删除数组指定所引
 * @param {Array} array 数组
 * @param {Number} index 索引
 * @return {Array}
 */
function removeAt(array, index) {
    array.splice(index, 1);
    return array;
}


/**
 * 判断是否在数组内
 * @param {Object} item 元素
 * @param {Array} array 数组
 * @return {Number}
 */
function inArray(item, array) {
    console.log(item);
    console.log(array);
    console.log(array.indexOf(item) >= 0);
    return array.indexOf(item) >= 0;
}

function inPointArray(item,array) {
    let bool = false;
    
    array.forEach(res => {
       if(res.pointX === item.pointX && res.pointY === item.pointY){
           bool = true;
       }
    });
    
    return bool;
}


export default {
    clear, equals, remove, removeAt, inArray,inPointArray
}
;