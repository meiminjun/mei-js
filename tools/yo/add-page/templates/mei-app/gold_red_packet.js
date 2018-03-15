import {request} from '../../api/service';
// import api from '../../api/urls.js';
// const Toastr = require('../../components/toast').default();
// import * as layer from '../../util/layer';

const state = {
    trackName: '黄金红包' // 埋点名称
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

export default {
    state,
    getters,
    actions,
    mutations
};
