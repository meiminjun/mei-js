// 构造函数继承 TODO:后面与对象继承融合
export function extend (Child, Parent) {
  var F = function () {}
  F.prototype = Parent.prototype
  Child.prototype = new F()
  Child.prototype.constructor = Child
  Child.uber = Parent.prototype
}

// 参考：https://github.com/mqyqingfeng/Blog/issues/22
// 防抖: 频繁发生的情况下，只有足够时间，才执行一次，例如：坐公交，只要有人刷卡，车子就不会运行
// debounce(getUserAction, 500);  // 500ms 内只执行一次
export function debounce (func, wait, immediate) {
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

// module.export = {
//   extend: extend,
//   debounce: debounce
// }
