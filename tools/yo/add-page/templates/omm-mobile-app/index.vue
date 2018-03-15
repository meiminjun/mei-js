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
        data () {
            return {
                headConfig: {
                    title: '<%=pageTitle%>',
                    leftButtonVisible: true,
                    backgroundColor: '#f37937',
                    color: '#ffffff',
                    rightButtonVisible: true,
                    rightButtonText: '',
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
                name: this.$store.state.<%=moduleName%>.trackName,
                label: ''
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

</style>
