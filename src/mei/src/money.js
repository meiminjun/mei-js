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
function formatNumber (number, decimals, decPoint, thousandsSep, roundtag) {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    roundtag = roundtag || 'floor'; // "ceil","floor","round"
    var n = !isFinite(+number) ? 0 : +number; // 要处理的数值
    var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals); // 保留多少位
    var dec = (typeof decPoint === 'undefined') ? '.' : decPoint; // 小数点符号
    var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep; // 千分位符号
    var s = '';
    var toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
    };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (sep !== '') {
        var re = /(-?\d+)(\d{3})/;
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, '$1' + sep + '$2');
        }
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

module.exports = {
    formatNumber: formatNumber
}
