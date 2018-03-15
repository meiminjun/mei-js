import '../../util/common';
import Vue from 'vue';
import app from './container.vue';
import '../../../rebuid/css/theme/default/red_packet.css';
// import '../../../rebuid/dist/css/orange/red_packet.css'; // TODO:后面更换成这个
import * as filters from './filters';
import store from './store';
import router from './router';
import scroller from '../../components/Scroller';
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
Vue.use(scroller);
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(app)
});
