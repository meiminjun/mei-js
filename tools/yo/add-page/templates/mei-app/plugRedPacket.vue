<template>
    <div>
        <HD :config="headConfig" ref='head'>
            <a href="javascript:void(0);" class="header-text-link" @click="headConfig.rightButtonCallback()"></a>
        </HD>
    </div>
</template>

<script>
    // import * as acc from '../../util/acc';
    // import * as ald from '../../util/ald';
    // import Share from '../../assets/lib/shareInit';
    // import api from '../../api/urls.js';
    import { trackEvent } from '../../util/sdc';
    import { mapState } from 'vuex';
    import HD from '../../components/PageHead.vue';
    export default {
        name: 'gold-plug-red-packet',
        data () {
            return {
                headConfig: {
                    title: '黄金红包',
                    leftButtonVisible: true,
                    backgroundColor: '#f37937',
                    color: '#ffffff',
                    rightButtonVisible: true,
                    rightButtonText: '我的订单',
                    rightButtonTextColor: '#ffffff',
                    rightButtonCallback: function () {

                    },
                    leftButtonTextColor: '#ffffff',
                    leftButtonIcon: 'assets/images/icons/icon-arrow-l-white.png',
                    leftButtonCallback: () => {

                    }
                }
            };
        },
        components: {
            HD
        },
        computed: {
            ...mapState({

            })
        },
        created () {
            trackEvent({
                name: this.$store.state.goldredpacket.trackName,
                label: '黄金板块-黄金红包-发红包'
            });
        },
        mounted () {
        },
        methods: {
        },
        watch: {
        },
        // beforeRouteLeave (to, from, next) {
        // },
        destroyed () {
        }
    };
</script>
<style scoped>
.modalopen {
    position: fixed;
    width: 100%;
}
</style>
