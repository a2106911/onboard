<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ padding: 0, }">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Routes</h5>
				</a-col>
				<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
					<a-radio-group v-model="routesHeaderBtns" size="small">
						<!-- <a-radio-button value="all">ALL</a-radio-button>
						<a-radio-button value="online">ONLINE</a-radio-button> -->
					</a-radio-group>
				</a-col>
			</a-row>
		</template>
		<a-table :columns="columns" :data-source="data" :pagination="true" :customRow="customRow"></a-table>
	</a-card>

</template>

<script>

export default ({
	props: [
		"data","columns"
	],
	data() {
		return {
			// Active button for the "Authors" table's card header radio button group.
			routesHeaderBtns: 'all',
		}
	},
	methods: {
		
		//This method enables the a-table component to detect which row has been clicked.
		customRow(record) {
			return {
				//Upon clicking a row in the a-table, an emit will be sent back to the MyRoutes component with the route details.
				onClick: () => {
					this.$emit("selectedRoute", record);
				}
			}
		}
	}
})

</script>

<style>
	.ant-pagination {
		display:block;
		position:relative;
		text-align:center;
	}
	a-table {
		height:80%;
	}
</style>