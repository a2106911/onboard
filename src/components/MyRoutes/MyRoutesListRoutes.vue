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
		<a-table :columns="columns" :data-source="data" :pagination="true" :customRow="customRow">

			<!-- <template slot="author" slot-scope="author">
				<div class="table-avatar-info">
					<a-avatar shape="square" :src="author.avatar" />
					<div class="avatar-info">
						<h6>{{ author.name }}</h6>
						<p>{{ author.email }}</p>
					</div>
				</div>
			</template> -->

			<!-- <template slot="func" slot-scope="func">
				<div class="author-info">
					<h6 class="m-0">{{ func.job }}</h6>
					<p class="m-0 font-regular text-muted">{{ func.department }}</p>
				</div>
			</template> -->

			<!-- <template slot="status" slot-scope="status">
				<a-tag class="tag-status" :class="status ? 'ant-tag-primary' : 'ant-tag-muted'">
					{{ status ? "ONLINE" : "OFFLINE" }}
				</a-tag>
			</template> -->

			<!-- <template slot="editBtn" slot-scope="row">
				<a-button type="link" :data-id="row.key" class="btn-edit">
					Edit
				</a-button>
			</template> -->

		</a-table>
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
		routeClick(e) {
			console.log(e);
		},
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