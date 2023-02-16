<template>

    <!-- Your Transactions Card -->
    <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ paddingTop: 0, paddingBottom: '16px' }">
        <template #title>
            <h6 class="font-semibold m-0">Map Route</h6>
        </template>
        <GoogleMap api-key="AIzaSyD8SCbN9ajO1phNjE3rAMkwcY-psqVEVIM" style="width: 100%; height: 500px" :center="center"
            :zoom="8" class="mapCenter">
            <Marker :options="{ position: center }" />
        </GoogleMap>
    </a-card>
    <!-- / Your Transactions Card -->

</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";

export default ({    
    name: "mapComponent",
    components: { GoogleMap, Marker },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
        }
    },
    setup() {
    const center = { lat: 40.689247, lng: -74.044502 };

    return { center };
    }
})

</script>