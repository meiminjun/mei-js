// import "babel-polyfill"
import * as url from './src/url.js';
import * as date from './src/date.js';
import * as untils from './src/untils.js';
import * as money from './src/money.js';
import * as store from './src/store.js';

console.log(date.getSystemTime('yyyy-MM-dd'))

export default {
    date,
    money,
    untils,
    url,
    store
}
