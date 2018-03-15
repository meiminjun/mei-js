import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import common from '../../store/common';
import payment from '../../store/modules/payment';
import goldredpacket from './gold_red_packet';
const debug = process.env.NODE_ENV !== 'production';
let store = new Vuex.Store({
    modules: {
        common,
        goldredpacket,
        payment
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
window.__store = store;
export default store;
