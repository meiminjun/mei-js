/**
 * 返回时间区间
 * @param  {[type]} d      []
 * @param  {[type]} f      [description]
 * @param  {[type]} date   [截止时间，默认]
 * @param  {[type]} format [返回的时间格式，默认yyyyMMdd]
 * @return {[type]}        [description]
 */
export function recentDate (d, f, date, format) {
  var curDate = ''
  if (typeof d === 'undefined') {
    return
  }
  curDate = typeof date !== 'undefined' ? this.formatDate(date, format || 'yyyyMMdd') : this.getSystemTime(format || 'yyyyMMdd')
  var startDate = this.formatDate(this.diffDateAdd(curDate, -d, f || 'd'), format || 'yyyyMMdd')

  return {
    startDate: startDate,
    endDate: curDate
  }
}

// 获取系统时间
// getSystemTime()  2017-12-27 17:52:53
// getSystemTime('yyyy-MM-dd') 2017-12-27
//
export function getSystemTime (format) {
  var date = new Date()
  return this.formatDate(date, format)
}

export function formatDate (date, format) {
  var arr = []
  if (!date || date === '0') {
    return ''
  }
  if (!format) {
    format = 'yyyy-MM-dd hh:mm:ss'
  }
  if (typeof date === 'string') {
    if (date.length === 8) {
      arr = [date.substr(0, 4), date.substr(4, 2), date.substr(6, 2)]
    } else if (date.length === 14) {
      arr = [date.substr(0, 4), date.substr(4, 2), date.substr(6, 2), date.substr(8, 2), date.substr(10, 2), date.substr(12, 2)]
    } else {
      arr = date.split(/[^0-9]+/)
    }
    format = format.replace(/([a-z])\1+/ig, function (all, $1) {
      var result = {
        y: ~~arr[0],
        M: ~~arr[1],
        d: ~~arr[2],
        h: ~~arr[3],
        m: ~~arr[4],
        s: ~~arr[5]
      }[$1]
      if (result !== undefined && result < 10) {
        result = '0' + result
      }
      return result || ''
    })
    return format
  }
  format = format.replace(/([a-z])\1+/ig, function (all) {
    var first = all.charAt(0)
    if ('y M d h m s'.indexOf(first) >= 0) {
      if (first === 'y') {
        return all.length > 2 ? date.getFullYear() : (date.getFullYear() + '').substr(2)
      }
      var result = {
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds()
      }[first]
      result !== undefined && result < 10 && (result = '0' + result)
      return result
    } else {
      return all
    }
  })
  return format
}

export function formatTime (date) {
  var arr = []
  if (typeof date === 'string') {
    if (date.length === 8) {
      arr = [date.substr(0, 4), date.substr(4, 2), date.substr(6, 2)]
    } else if (date.length === 14) {
      arr = [date.substr(0, 4), date.substr(4, 2), date.substr(6, 2), date.substr(8, 2), date.substr(10, 2), date.substr(12, 2)]
    } else {
      arr = date.split(/[^0-9]+/)
    }
    date = new Date(arr[0], arr[1] - 1, arr[2], arr[3] || 0, arr[4] || 0, arr[5] || 0)
  }
  return date
}

/**
 * 时间推移的功能,
 * parm:
 *  t1 当前时间   形式为  这些方式  '2012.3.4 23:22:33' '2012.3.4' new Date()
 *  num 推移的次数
 *  unit  单位   只能为('y'或者'm'或者'd')
 *  return: 返回推移后的时间对象
 */
export function diffDateAdd (t1, num, unit) {
  if (!t1 || typeof num === 'undefined' || !unit) {
    return ''
  }
  t1 = this.formatTime(t1)
  var units = {
    y: 1000 * 60 * 60 * 24 * 365,
    m: 1000 * 60 * 60 * 24 * 30,
    d: 1000 * 60 * 60 * 24
  }[unit]
  return new Date(t1.getTime() + num * units)
}

export function forEach (array, action) {
  for (var i = 0; i < array.length; i++) {
    action(array[i])
  }
}

export default {
  recentDate,
  getSystemTime,
  formatDate,
  formatTime,
  diffDateAdd
}
