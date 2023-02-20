<template>
	<!-- <Table dataSource={myRoutes} /> -->
	<ListRoutes
		v-if="selectedRoute === null"
		:data="myRoutes"
		:columns="columns"
		@selectedRoute="getSelectedRoute"
	></ListRoutes>
	<!-- :selectedRoute="selectedRoute" -->

	<span v-else>
		<a-button type="default" :size="small" shape="square" @click="back">
			◀			
		</a-button>
		<OneRoute
			:route="selectedRoute"
		></OneRoute>
	</span>
	
</template>

<script>
	import ListRoutes from '@/components/MyRoutes/MyRoutesListRoutes.vue' ;
	import OneRoute from '@/components/MyRoutes/MyRoutesOneRoute.vue' ;
	import axios from "axios";

	export default ({
		name: "MyRoutes",
		components: {
			ListRoutes,
			OneRoute
		},
		data() {
			return {
				selectedRoute: null,
				myRoutes: [	],
				columns: [
					{
						title: 'route ID',
						dataIndex: 'routeId',
						scopedSlots: { customRender: 'id' },
						// width: 300,
					},
					{
						title: 'date',
						dataIndex: 'date',
						// class: 'font-semibold text-muted',
					},
					{
						title: 'vehicle plate',
						dataIndex: 'vehiclePlate',
					},
					{
						title: 'progress',
						dataIndex: 'progress',
					},
					{
						title: 'origin',
						dataIndex: 'origin',
					},
					{
						title: 'destination',
						dataIndex: 'destination',
					},
					{
						title: 'Total Km',
						dataIndex: 'totalKm',
					},
				]
			}
		},
		methods: {
			//this method is used to receive the selected route data via emit from the ListRoutes component.
			getSelectedRoute(route) {
				this.selectedRoute = route;
				// console.log(this.selectedRoute);
			},
			//this method is a workaround to get back to the MyRoutes list by setting the selectedRoute value to null.
			back() {
				this.selectedRoute = null;
			},
			noRoutesWarning() {
			this.$notification["warning"]({
				message: "No routes found",
				description:
				"You don't have any routes.",
			});
		}
		},
		created () {
			axios({
				method:"PUT",
				// url:"http://onboard.daw.institutmontilivi.cat/api/get-routes",
				url:"http://localhost/api/get-routes",
				data: {
					"accessToken":localStorage.getItem("accessToken"),

				}
			}).then((response)=> {
				if (response.data !== null) {
					if (response.data != "0" && response.data != false) {
						// console.log("get-routes response",response);
						this.myRoutes = response.data;
					}
					else if (response.data == "0") {
						this.noRoutesWarning();
					}
				}
			})
		}
	})

</script>

<style lang="scss">
</style>