<template>
    <a-row type="flex" :gutter="24">

        <!-- Billing Information Column -->
        <a-col :span="24" :md="10" class="mb-24">

            <!-- Billing Information Card -->
            <CreateRoute></CreateRoute>
            <!-- / Billing Information Card -->

        </a-col>
        <!-- Billing Information Column -->

        <!-- Your Transactions Column -->
        <a-col :span="24" :md="14" class="mb-24">

            <!-- Your Transactions Card -->
            <MapRoute @selectedPonits="getSelectedPonits"></MapRoute>
            <!-- / Your Transactions Card -->

        </a-col>
        <!-- / Your Transactions Column -->

    </a-row>

</template>

<script>
import CreateRoute from "../components/MyRoutesManagment/CreateRoute.vue"
import MapRoute from "../components/Map/MapRoute.vue"


export default ({
    components: {
        CreateRoute,
        MapRoute,
    },
    data() {
        return {
            selectedPonits : null
        }
    },
    // methods : {
    //     getSelectedPonits(data){

    //     }
    // }
})
</script>

<style lang="scss">

</style>