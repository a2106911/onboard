<template>
	<a-row type="flex" :gutter="24">

		<!-- Billing Information Column -->
		<a-col :span="24" :md="10" class="mb-24">

			<!-- Billing Information Card -->
			<RouteInformation></RouteInformation>
			<!-- / Billing Information Card -->

		</a-col>
		<!-- Billing Information Column -->

		<!-- Your Transactions Column -->
		<a-col :span="24" :md="14" class="mb-24">

			<!-- Your Transactions Card -->
			<MapRoute :data="transactionsData"></MapRoute>
			<!-- / Your Transactions Card -->

		</a-col>
		<!-- / Your Transactions Column -->

	</a-row>

</template>

<script>
import RouteInformation from "@/components/MyRoutes/RouteInformation"
import MapRoute from "@/components/Map/MapRoute.vue"

export default ({
	components: {
		RouteInformation,
		MapRoute,
	},
	data() {
		return {

		}
	},
})
</script>

<style lang="scss">

</style>