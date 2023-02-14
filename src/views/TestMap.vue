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
import RouteInformation from "../components/MyRoutes/RouteInformation"
import MapRoute from "../components/Map/MapRoute.vue"

// "Your Transactions" list data.
const transactionsData = [
	{
		period: "NEWEST",
	},
	{
		title: "Netflix",
		datetime: "27 March 2021, at 12:30 PM",
		amount: "2,500",
		type: -1,// 0 is for pending, 1 is for deposit, -1 is for withdrawal.
		status: 'danger',
	},
	{
		title: "Apple",
		datetime: "27 March 2021, at 04:30 AM",
		amount: "2,000",
		type: 1,
		status: 'success',
	},
	{
		period: "YESTERDAY",
	},
	{
		title: "Stripe",
		datetime: "26 March 2021, at 12:30 AM",
		amount: "750",
		type: 1,
		status: 'success',
	},
	{
		title: "HubSpot",
		datetime: "26 March 2021, at 11:30 AM",
		amount: "1,050",
		type: 1,
		status: 'success',
	},
	{
		title: "Creative Tim",
		datetime: "26 March 2021, at 07:30 AM",
		amount: "2,400",
		type: 1,
		status: 'success',
	},
	{
		title: "Webflow",
		datetime: "26 March 2021, at 04:00 AM",
		amount: "Pending",
		type: 0,
		status: 'warning',
	},
];

export default ({
	components: {
		RouteInformation,
		MapRoute,
	},
	data() {
		return {
			// Associating "Your Transactions" list data with its corresponding property.
			transactionsData,
		}
	},
})
</script>

<style lang="scss">

</style>