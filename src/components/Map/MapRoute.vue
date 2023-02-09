<template>

	<!-- Authors Table Card 
		<a-card :bordered="false" class="dashboard-bar-line header-solid">
		<template #title>
			<h6>Sales Overview</h6>			
			<p>than last year <span class="text-success">+20%</span></p>	
		</template>
		<template #extra>
			<a-badge color="primary" class="badge-dot-primary" text="Traffic" />
			<a-badge color="primary" class="badge-dot-secondary" text="Sales" />
		</template>
		<chart-line :height="310" :data="lineChartData"></chart-line>
	</a-card> -->
	<p>Hola</p>

</template>

<script>

	export default ({
		name:"MapRoute",
		// props: {
		// 	data: {
		// 		type: Array,
		// 		default: () => [],
		// 	},
		// 	columns: {
		// 		type: Array,
		// 		default: () => [],
		// 	},
		// },
		data() {
			return {
				// Active button for the "Authors" table's card header radio button group.
				// routesHeaderBtns: 'all',
			}
		},
		mounted () {
			console.log("mapRoute");
		}
	})

</script>