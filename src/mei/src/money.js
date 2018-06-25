/*
* 功能齐全的金额转换
* 参数说明：
* number：要格式化的数字,可以为字符串和数字类型
* decimals：保留几位小数
* decPoint：小数点符号,默认为"."
* thousandsSep：千分位符号,默认为",",参数为""时没有符号
* roundtag:舍入参数，默认 "floor向下取(截取),ceil向上取","round" 四舍五入
* example:
* console.log(formatNumber(234.334, 2, ".", "")) // 234.33
* console.log(formatNumber(0.232373, 4, ".", "")) // 0.2323
* console.log(formatNumber(2, 2, ",", ","))//"2,00"
* console.log(formatNumber(3.7, 2, ".", ","))//"3.70"
* console.log(formatNumber(3, 0, ",", ",")) //"3"
* console.log(formatNumber(9.0312, 2, ".", ","))//"9.03"
* console.log(formatNumber(9.00, 2, ".", ","))//"9.00"
* console.log(formatNumber(39.715001, 2, ".", ",", "floor")) //"39.71"
* console.log(formatNumber(9.7, 2, ".", ","))//"9.70"
* console.log(formatNumber(39.7, 2, ".", ","))//"39.70"
* console.log(formatNumber(9.70001, 2, ".", ","))//"9.70"
* console.log(formatNumber(39.70001, 2, ".", ","))//"39.70"
* console.log(formatNumber(9996.03, 2, ".", ","))//"9,996.03"
* console.log(formatNumber(1.7973, 3, ".", ",", "ceil"))//"1.798"
* console.log(formatNumber(393434.715961, 4, '.', '')) // 393434.7159
* console.log(formatNumber(393434.715861, 4, '.', '', 'round')) // 393434.7159
* console.log(formatNumber(393434.715661, 4, '.', ',', 'round')) // 393,434.7157
* */
export function formatNumber (number, decimals, decPoint, thousandsSep, roundtag) {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  roundtag = roundtag || 'floor' // "ceil","floor","round"
  var n = !isFinite(+number) ? 0 : +number // 要处理的数值
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals) // 保留多少位
  var dec = (typeof decPoint === 'undefined') ? '.' : decPoint // 小数点符号
  var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep // 千分位符号
  var s = ''
  var toFixedFix = function (n, prec) {
    var k = Math.pow(10, prec)
    return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  if (sep !== '') {
    var re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2')
    }
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

/**
 * 数字转人民币金额
 * @param  {[type]} money [description]
 * @return {[type]}       [description]
 */
export function changeNumMoneyToChinese (money) {
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖') // 汉字的数字
  var cnIntRadice = new Array('', '拾', '佰', '仟') // 基本单位
  var cnIntUnits = new Array('', '万', '亿', '兆') // 对应整数部分扩展单位
  var cnDecUnits = new Array('角', '分', '毫', '厘') // 对应小数部分单位
  var cnInteger = '整' // 整数金额时后面跟的字符
  var cnIntLast = '元' // 整型完以后的单位
  var maxNum = 999999999999999.9999 // 最大处理的数字
  var IntegerNum // 金额整数部分
  var DecimalNum // 金额小数部分
  var ChineseStr = '' // 输出的中文金额字符串
  var parts // 分离金额后用的数组，预定义
  if (money == '') {
    return ''
  }
  money = parseFloat(money)
  if (money >= maxNum) {
    alert('超出最大处理数字')
    return ''
  }
  if (money == 0) {
    ChineseStr = cnNums[0] + cnIntLast + cnInteger
    return ChineseStr
  }
  money = money.toString() // 转换为字符串
  if (money.indexOf('.') == -1) {
    IntegerNum = money
    DecimalNum = ''
  } else {
    parts = money.split('.')
    IntegerNum = parts[0]
    DecimalNum = parts[1].substr(0, 4)
  }
  if (parseInt(IntegerNum, 10) > 0) { // 获取整型部分转换
    var zeroCount = 0
    var IntLen = IntegerNum.length
    for (var i = 0; i < IntLen; i++) {
      var n = IntegerNum.substr(i, 1)
      var p = IntLen - i - 1
      var q = p / 4
      var m = p % 4
      if (n == '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0]
        }
        zeroCount = 0 // 归零
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m == 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q]
      }
    }
    ChineseStr += cnIntLast
　　// 整型部分处理完毕
  }
  if (DecimalNum != '') { // 小数部分
    var decLen = DecimalNum.length
    for (var i = 0; i < decLen; i++) {
      var n = DecimalNum.substr(i, 1)
      if (n != '0') {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (ChineseStr == '') {
    ChineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (DecimalNum == '') {
    ChineseStr += cnInteger
  }
  return ChineseStr
}

export default {
  formatNumber,
  changeNumMoneyToChinese
}
