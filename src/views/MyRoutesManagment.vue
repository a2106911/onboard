<template>
	<!-- <Table dataSource={myRoutes} /> -->
	<ManagmentListRoutes
		v-if="selectedRoute === null"
		:data="myRoutes"
		:columns="columns"
		@selectedRoute="getSelectedRoute"
	></ManagmentListRoutes>
	<!-- :selectedRoute="selectedRoute" -->

	<span v-else>
		<button @click="back">◀</button>
		<ManagmentOneRoute
			:route="selectedRoute"
		></ManagmentOneRoute>
	</span>
	
</template>

<script>
	import ManagmentListRoutes from '@/components/MyRoutesManagment/ManagmentListRoutes.vue' ;
	import ManagmentOneRoute from '@/components/MyRoutesManagment/ManagmentOneRoute.vue' ;

	export default ({
		name: "MyRoutes",
		components: {
			ManagmentListRoutes,
			ManagmentOneRoute
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
                        driver:"Manuel Fanta",
                        origin:"Mollet del Vallès",
                        destination:"Màcon",
                        length:690
                    },
                    {
                        id:0,
                        date:"02/02/2023",
                        plate:"1234abcd",
                        progress:"34%",
                        driver:"Manuel Fanta",
                        origin:"Mollet del Vallès",
                        destination:"Màcon",
                        length:690
                    },
                    {
                        id:0,
                        date:"02/02/2023",
                        plate:"1234abcd",
                        progress:"34%",
                        driver:"Manuel Fanta",
                        origin:"Mollet del Vallès",
                        destination:"Màcon",
                        length:690
                    },
                    {
                        id:0,
                        date:"02/02/2023",
                        plate:"1234abcd",
                        progress:"34%",
                        driver:"Manuel Fanta",
                        origin:"Mollet del Vallès",
                        destination:"Màcon",
                        length:690
                    },
                    {
                        id:0,
                        date:"02/02/2023",
                        plate:"1234abcd",
                        progress:"34%",
                        driver:"Manuel Fanta",
                        origin:"Mollet del Vallès",
                        destination:"Màcon",
                        length:690
                    },
                    {
                        id:0,
                        date:"02/02/2023",
                        plate:"1234abcd",
                        progress:"34%",
                        driver:"Manuel Fanta",
                        origin:"Mollet del Vallès",
                        destination:"Màcon",
                        length:690
                    },
                    {
                        id:0,
                        date:"02/02/2023",
                        plate:"1234abcd",
                        progress:"34%",
                        driver:"Manuel Fanta",
                        origin:"Mollet del Vallès",
                        destination:"Màcon",
                        length:690
                    },
                    {
                        id:0,
                        date:"02/02/2023",
                        plate:"1234abcd",
                        progress:"34%",
                        driver:"Manuel Fanta",
                        origin:"Mollet del Vallès",
                        destination:"Màcon",
                        length:690
                    },
                    {
                        id:0,
                        date:"02/02/2023",
                        plate:"1234abcd",
                        progress:"34%",
                        driver:"Manuel Fanta",
                        origin:"Mollet del Vallès",
                        destination:"Màcon",
                        length:690
                    },
                    {
                        id:0,
                        date:"02/02/2023",
                        plate:"1234abcd",
                        progress:"34%",
                        driver:"Manuel Fanta",
                        origin:"Mollet del Vallès",
                        destination:"Màcon",
                        length:690
                    },
                    {
                        id:0,
                        date:"02/02/2023",
                        plate:"1234abcd",
                        progress:"34%",
                        driver:"Manuel Fanta",
                        origin:"Mollet del Vallès",
                        destination:"Màcon",
                        length:690
                    },
                    {
                        id:0,
                        date:"02/02/2023",
                        plate:"1234abcd",
                        progress:"34%",
                        driver:"Manuel Fanta",
                        origin:"Mollet del Vallès",
                        destination:"Màcon",
                        length:690
                    },
                    
				],
				columns: [
					{
						title: 'ID',
						dataIndex: 'id',
						scopedSlots: { customRender: 'id' },
						// width: 300,
					},
					{
						title: 'date',
						dataIndex: 'date',
						// class: 'font-semibold text-muted',
					},
					{
						title: 'plate',
						dataIndex: 'plate',
					},
					{
						title: 'progress',
						dataIndex: 'progress',
					},
                    {
						title: 'driver',
						dataIndex: 'driver',
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
						title: 'length',
						dataIndex: 'length',
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
			}
		}
	})

</script>

<style lang="scss">
</style>