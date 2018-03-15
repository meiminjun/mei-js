import "babel-polyfill"
var Shop = require('./src/shop.js')
var Store = require('./src/store.js')
var date = require('./src/date.js')
var money = require('./src/money.js')
var untils = require('./src/untils.js')

console.log(date.getSystemTime('yyyy-MM-dd'))

module.exports = {
    date: date,
    money: money,
    shop: Shop,
    store: Store,
    untils: untils
}
