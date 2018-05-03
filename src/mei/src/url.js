function toQueryPair(key, value) {
  if (typeof value === 'undefined') {
    return key;
  }
  return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}

// 对象转换成url查询
export function toQueryString(obj) {
  var ret = []
  for (var key in obj) {
    key = encodeURIComponent(key)
    var values = obj[key]
    if (values && values.constructor === Array) { // 数组
      var queryValues = []
      for (var i = 0, len = values.length, value; i < len; i++) {
        value = values[i]
        queryValues.push(toQueryPair(key, value))
      }
      ret = ret.concat(queryValues)
    } else { // 字符串
      ret.push(toQueryPair(key, values))
    }
  }
  return ret.join('&')
}

/**
 * 优先获取#号之后的参数,#“之后”没有参数则获取#之前参数
 * 1、http://localhost:8088/aum/m/gold_generation.html#/detail?prdCode=123 // {prdCode:123}
 * 2、http://localhost:8088/aum/m/gold_generation.html?prdCode=123 // {prdCode:123}
 * 3、http://localhost:8088/aum/m/gold_generation.html?test=2323#/detail // {test:2323}
 * 4、http://localhost:8088/aum/m/gold_generation.html?test=2323#/detail?prdCode=123 // {prdCode:123}
 * @param URL 默认获取当前url
 * @return {obj}
*/
export function query(url) {
  let item;
  let str = '';
  let obj = {};
  let href = typeof url === 'undefined' ? window.location.href : url;
  if (href === '' || href.lastIndexOf('?') < 0) {
    return obj;
  }
  let lastSearchIdx = href.lastIndexOf('?');
  let hashIdx = href.lastIndexOf('#');
  if (typeof url === 'undefined') {
    // 为了区分 hash值在问号前面 还是问号后面  如果location.search 为空时  代表着hash值在问号前面
    let search = location.search;
    let hash = location.hash;
    if (search && search.lastIndexOf('?') !== -1) {
      href = search;
    }
    if (hash !== '' && hash.lastIndexOf('?') !== -1) { // 如果hash中有问号，则取hash中的
      href = hash;
    }
    str = href.substring(href.lastIndexOf('?') + 1);
  } else {
    let hashStr = href.substring(hashIdx + 1);
    if (hashStr.lastIndexOf('?') !== -1) {
      str = hashStr.substring(hashStr.lastIndexOf('?') + 1);
    } else {
      str = href.substring(lastSearchIdx + 1, hashIdx);
    }
  }
  if (str === '') {
    return obj;
  }
  let arr = str.split('&');
  arr.forEach(function (v) {
    item = v.split('=');
    // 处理参数值中还有=号问题
    obj[item[0]] = v.substring(v.indexOf('=') + 1);
  });
  return obj;
};

/**
 * 优先获取#号之前的参数,#之前没有参数则获取#之后参数
 * 1、http://localhost:8088/aum/m/gold_generation.html#/detail?prdCode=123 // {prdCode:123}
 * 2、http://localhost:8088/aum/m/gold_generation.html?prdCode=123 // {prdCode:123}
 * 3、http://localhost:8088/aum/m/gold_generation.html?test=2323#/detail // {test:2323}
 * 4、http://localhost:8088/aum/m/gold_generation.html?test=2323#/detail?prdCode=123 // {test:2323}
 * @param  {[type]} url 默认获取当前url
 * @return {[type]}     [description]
 */
export function beforeQuery(url) {
  let item;
  let str = '';
  let obj = {};
  let href = typeof url === 'undefined' ? window.location.href : url;
  if (href === '' || href.indexOf('?') < 0) {
    return obj;
  }
  if (typeof url === 'undefined') {
    // 为了区分 hash值在问号前面 还是问号后面  如果location.search 为空时  代表着hash值在问号前面
    let search = location.search;
    let hash = location.hash;
    if (hash !== '' && hash.lastIndexOf('?') !== -1) { // 如果hash中有问号，则取hash中的
      href = hash;
    }
    if (search && search.indexOf('?') !== -1) {
      href = search;
    }
    str = href.substring(href.lastIndexOf('?') + 1);
  } else {
    let hashIdx = href.lastIndexOf('#');
    let hashStr = href.substring(hashIdx + 1);
    let beforeSearchIdx = href.indexOf('?');
    let lastSearchIdx = href.lastIndexOf('?');
    if (hashStr.lastIndexOf('?') !== -1) { // 1
      str = hashStr.substring(hashStr.lastIndexOf('?') + 1);
    } else { // 2
      str = href.substring(beforeSearchIdx + 1, hashIdx)
    }
    if (beforeSearchIdx < lastSearchIdx) { // 3
      str = href.substring(beforeSearchIdx + 1, hashIdx);
    }
  }
  if (str === '') {
    return obj;
  }
  let arr = str.split('&');
  arr.forEach(function (v) {
    item = v.split('=');
    // 处理参数值中还有=号问题
    obj[item[0]] = v.substring(v.indexOf('=') + 1);
  });
  return obj;
};
