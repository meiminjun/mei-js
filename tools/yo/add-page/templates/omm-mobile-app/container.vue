<template>
    <div>
        <router-view></router-view>
        <Loading :show="common.loading"></Loading>
    </div>
</template>
<script>
import Loading from '../../components/Loading.vue';
import { mapState } from 'vuex';
export default {
    data () {
        return {
        };
    },
    components: {
        Loading
    },
    computed: {
        ...mapState([
            'common'
        ])
    },
    created () {
    },
    mounted () {
    },
    methods: {
    }
};
</script>
<style>
</style>
