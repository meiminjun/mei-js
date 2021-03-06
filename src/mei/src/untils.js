// 构造函数继承 TODO:后面与对象继承融合
function extend (Child, Parent) {
  var F = function () {}
  F.prototype = Parent.prototype
  Child.prototype = new F()
  Child.prototype.constructor = Child
  Child.uber = Parent.prototype
}

// 参考：https://github.com/mqyqingfeng/Blog/issues/22
// 防抖: 频繁发生的情况下，只有足够时间，才执行一次，例如：坐公交，只要有人刷卡，车子就不会运行
// debounce(getUserAction, 500);  // 500ms 内只执行一次
function debounce (func, wait, immediate) {
  var timeout, result
  return function () {
    var context = this
    var args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
    return result
  }
}

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
  extend,
  debounce,
  uniqueArrayObj,
  unique
}
