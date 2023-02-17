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
		<button @click="back">◀</button>
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
				myRoutes: [
					{
						id:0,
						date:"02/02/2023",
						plate:"1234abcd",
						progress:"34%",
						origin:"Mollet del Vallès",
						destination:"Màcon",
						length:690
					},
					{
						id:1,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:2,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:3,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:40,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:107,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:233,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:26,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:20,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:440,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:140,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:1060,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:262,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:2440,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:134,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:21240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:5,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:87,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:88,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:89,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:144,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:223,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:234,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:345,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:543,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:66,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:240,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:76,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:54,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
					{
						id:434,
						date:"03/02/2023",
						plate:"1234abcd",
						progress:90,
						origin:"Barcelona",
						destination:"Sant Quirze del Vallès",
						length:30
					},
				],
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
						dataIndex: 'vechiclePlate',
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
				console.log(this.selectedRoute);
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
					"accessToken":localStorage.getItem("accessToken")
				}
			}).then((response)=> {
				if (response.data !== null) {
					if (response.data != "0" && response.data != false) {
						console.log("get-routes response",response);
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