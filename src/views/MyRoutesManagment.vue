<template><!-- <Table dataSource={myRoutes} /> -->
	<ManagmentListRoutes v-if="selectedRoute === null" :data="myRoutes" :columns="columns"
		@selectedRoute="getSelectedRoute"></ManagmentListRoutes>
	<!-- :selectedRoute="selectedRoute" -->

	<span v-else>
		<button @click="back">◀</button>
		<ManagmentOneRoute 
			:route="selectedRoute" 
			@discardChanges="discardChanges">
		</ManagmentOneRoute>
	</span>
</template>

<script>
import ManagmentListRoutes from '@/components/MyRoutesManagment/ManagmentListRoutes.vue';
import ManagmentOneRoute from '@/components/MyRoutesManagment/ManagmentOneRoute.vue';
import axios from "axios";

export default ({
	name: "MyRoutes",
	components: {
		ManagmentListRoutes,
		ManagmentOneRoute
	},
	data() {
		return {
			selectedRoute: null,
			myRoutes: [],
			originalColumns: [
				{
					title: 'ID',
					dataIndex: 'routeId',
					scopedSlots: { customRender: 'id' },
					// width: 300,
					hidden: false
				},
				{
					title: 'Date',
					dataIndex: 'date',
					// class: 'font-semibold text-muted',
					hidden: false
				},
				{
					title: 'Plate',
					dataIndex: 'vehiclePlate',
					hidden: false
				},
				{
					title: 'Progress',
					dataIndex: 'progress',
					hidden: false
				},
				{
					title: 'Driver name',
					dataIndex: 'driverName',
					hidden: false
				},
				{
					title: 'Driver surname',
					dataIndex: 'driverSurname',
					hidden: false
				},
				{
					title: 'Origin',
					dataIndex: 'origin',
					hidden: false
				},
				{
					title: 'Destination',
					dataIndex: 'destination',
					hidden: false
				},
				{
					title: 'Total Km',
					dataIndex: 'totalKm',
					hidden: false
				},
			],
			columns: [
				{
					title: 'ID',
					dataIndex: 'routeId',
					scopedSlots: { customRender: 'id' },
					// width: 300,
					hidden: false
				},
				{
					title: 'Date',
					dataIndex: 'date',
					// class: 'font-semibold text-muted',
					hidden: false
				},
				{
					title: 'Plate',
					dataIndex: 'vehiclePlate',
					hidden: false
				},
				{
					title: 'Progress',
					dataIndex: 'progress',
					hidden: false
				},
				{
					title: 'Driver name',
					dataIndex: 'driverName',
					hidden: false
				},
				{
					title: 'Driver surname',
					dataIndex: 'driverSurname',
					hidden: false
				},
				{
					title: 'Origin',
					dataIndex: 'origin',
					hidden: false
				},
				{
					title: 'Destination',
					dataIndex: 'destination',
					hidden: false
				},
				{
					title: 'Total Km',
					dataIndex: 'totalKm',
					hidden: false
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
		discardChanges() {
			console.log("pulame")
			this.selectedRoute = null;
			this.getAllRoutes();
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
		},
		// This method is triggered every time the window's size is changed.
		// Its function is to hide or show items according to the screen inner width. If it's a phone view, fewer items will be shown.
		checkForWindowResize() {
			//The data will be stored on the originalColumns array. And every time we apply a filter, we'll set the visibility state of each item on the originalColumns array, and filter the columns array so that no data is ever lost.
			if (window.innerWidth < 991) { //smartphone view:
				this.originalColumns.filter(column => {
					if (["routeId", "progress", "origin", "destination", "totalKm"].includes(column.dataIndex)) {
						column.hidden = true;
					}
					else { //userId, email, role
						column.hidden = false;
					}
				})
			}
			else { //desktop view: (no columns hidden)
				this.originalColumns.filter(column => { column.hidden = false });
			}
			// console.log("columns", this.columns);
			this.columns = this.originalColumns.filter(column => !column.hidden);
		},
		getAllRoutes() {
			axios({
				method: "PUT",
				// url:"http://onboard.daw.institutmontilivi.cat/api/get-routes",
				url: "http://localhost/api/get-routes",
				data: {
					"accessToken": localStorage.getItem("accessToken")
				}
			}).then((response) => {
				if (response.data !== null) {
					if (response.data != "0" && response.data != false) {
						console.log("get-routes response", response);
						this.myRoutes = response.data;
					}
					else if (response.data == "0") {
						this.noRoutesWarning();
					}
				}
			})
		}
	},
	created() {
		axios({
			method: "PUT",
			// url:"http://onboard.daw.institutmontilivi.cat/api/get-routes",
			url: "http://localhost/api/get-routes",
			data: {
				"accessToken": localStorage.getItem("accessToken")
			}
		}).then((response) => {
			if (response.data !== null) {
				if (response.data != "0" && response.data != false) {
					console.log("get-routes response", response);
					this.myRoutes = response.data;
				}
				else if (response.data == "0") {
					this.noRoutesWarning();
				}
			}
		})
		//This event listener will trigger every time the client's window is resized.
		window.addEventListener('resize', this.checkForWindowResize);

		//Initial screen width check to see if we need to hide table elements or not:
		this.checkForWindowResize();
	}

})

</script>

<style lang="scss"></style>