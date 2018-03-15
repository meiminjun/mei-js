import VueRouter from 'vue-router';
import plugRedPacket from './plugRedPacket.vue';

const router = new VueRouter({
    routes: [
        {path: '/', component: plugRedPacket}, // 产品列表
        {path: '*', redirect: '/'}
    ]
});

router.afterEach(router => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
});

export default router;
