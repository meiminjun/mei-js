import VueRouter from 'vue-router';
import index from './index.vue';

const router = new VueRouter({
    routes: [
        {path: '/', component: index}, // 首页
        {path: '*', redirect: '/'}
    ]
});

router.afterEach(router => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
});

export default router;
