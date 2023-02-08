<template>
	<p>My Routes works!</p>
	<!-- <Table dataSource={myRoutes} /> -->
	<ListRoutes
		:data="myRoutes"
		:columns="columns"
	></ListRoutes>
</template>

<script>
	import ListRoutes from '@/components/Lists/ListRoutes.vue' ;

	export default ({
		name: "MyRoutes",
		components: {
			ListRoutes
		},
		data() {
			return {
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
	})

</script>

<style lang="scss">
</style>