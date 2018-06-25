// 数组去重
// 第一版
function unique(array, isSorted) {
    var res = [];
    var seen = [];

    for (var i = 0, len = array.length; i < len; i++) {
        var value = array[i];
        if (isSorted) {
            if (!i || seen !== value) {
                res.push(value)
            }
            seen = value;
        }
        else if (res.indexOf(value) === -1) {
            res.push(value);
        }
    }
    return res;
}

// 数组对象去重
// var arr = [{id:1,name:'深圳分行'},{id:4,name:'广州分行'},{id:3,name:'宁波分行'},{id:1,name:'深圳分行'},{id:1,name:'深圳分行'},{id:18,name:'九江分行'},{id:40,name:'黑龙江分行'}]
// uniqueArrayObj(arr, 'id'); (5) [{…}, {…}, {…}, {…}, {…}]
function uniqueArrayObj (array, key) {
    var arr = [];
    var r = [];
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (r.indexOf(item[key]) !== -1) {
           continue;
        }
        r.push(item[key]);
        arr.push(item);
    }
    return arr;
}

export default {
  uniqueArrayObj,
  unique
}
