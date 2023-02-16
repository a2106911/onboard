<template>

    <p>{{ JSON.stringify(route) }}</p>
    <a-row type="flex" :gutter="24">
        <!-- Billing Information Column -->
        <a-col :span="24" :md="10" class="mb-24">

            <!-- Billing Information Card -->
            <EditRoute></EditRoute>
            <!-- / Billing Information Card -->
        </a-col>
        <!-- Your Transactions Column -->
        <a-col :span="24" :md="12" class="mb-24">

            <!-- Your Transactions Card -->
            <MapRoute @selectedPonits="getSelectedPonits"></MapRoute>
            <!-- / Your Transactions Card -->

        </a-col>
        <!-- / Your Transactions Column -->
    </a-row>
</template>

<script>

import EditRoute from "@/components/MyRoutesManagment/EditRoute.vue"
import MapRoute from "@/components/Map/MapRoute.vue"


export default ({
    components: {
        EditRoute,
        MapRoute,
    },
    data() {
        return {
            selectedPonits: null
        }
    },
    // methods : {
    //     getSelectedPonits(data){

    //     }
    // }
})
</script>