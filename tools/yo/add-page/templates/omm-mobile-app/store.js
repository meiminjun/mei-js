import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
const debug = process.env.NODE_ENV !== 'production';

// -------------------------编码开始-----------------------------
import {request} from '../../api/service';
import common from '../../store/common';
import payment from '../../store/modules/payment'; // 没有接入收银台可删除引用
// import api from '../../api/urls.js';
// import * as layer from '../../util/layer';

const state = {
    trackName: '<%=pageTitle%>' // 埋点名称
};

// getters
const getters = {};
// mutations
const mutations = {
    GET_INDEX_DATA (state, payload) {

    }
};
const actions = {
    // 测试
    GET_INDEX_DATA ({commit, state}, params = {}) {
        return request({
            // url: api.queryGoldPhysicalList,
            url: 'https://easy-mock.com/mock/59af67fde0dc6633419e52cd/bron/ibank/cust/goldPhysical/product/queryGoldPhysicalList.do',
            qs: params
        })
        .then(res => {
            commit('GET_INDEX_DATA', res); // 保存请求参数
            return Promise.resolve(res);
        })
        .catch(err => {
            return Promise.reject(err);
        });
    }
};

// -------------------------编码结束-----------------------------
let store = new Vuex.Store({
    modules: {
        common,
        payment,
        <%=moduleName%>: {
            state,
            getters,
            actions,
            mutations
        }
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
window.__store = store;
export default store;
