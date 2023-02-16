<template>
	<!-- <Table dataSource={users} /> -->
	<ListUsers
		v-if="selectedUser === null"
		:data="users"
		:columns="columns"
		@selectedUser="getSelectedUser"
	></ListUsers>
	<!-- :selectedUser="selectedRoute" -->

	<span v-else>
		<button @click="back">◀</button>
		<OneUser
			:user="selectedUser"
		></OneUser>
	</span>
	
</template>

<script>
	import ListUsers from '@/components/Users/ListUsers.vue' ;
	import OneUser from '@/components/Users/OneUser.vue' ;

	export default ({
		name: "Users",
		components: {
			ListUsers,
			OneUser
		},
		data() {
			return {
				selectedUser: null,
				users: [
					{
						id:0,
						dni:"4143215S",
						name:"Miquel",
						surname:"Angelo%",
						phone:"640 213 156",
						email:"miqueldiangilo@gmail.com",
						socSecNum:690,
						role:"admin"
					},
					{
						id:0,
						dni:"4143215S",
						name:"Miquel",
						surname:"Angelo%",
						phone:"640 213 156",
						email:"miqueldiangilo@gmail.com",
						socSecNum:690,
						role:"admin"
					},
					{
						id:0,
						dni:"4143215S",
						name:"Miquel",
						surname:"Angelo%",
						phone:"640 213 156",
						email:"miqueldiangilo@gmail.com",
						socSecNum:690,
						role:"admin"
					},
					{
						id:0,
						dni:"4143215S",
						name:"Miquel",
						surname:"Angelo%",
						phone:"640 213 156",
						email:"miqueldiangilo@gmail.com",
						socSecNum:690,
						role:"admin"
					},
					{
						id:0,
						dni:"4143215S",
						name:"Miquel",
						surname:"Angelo%",
						phone:"640 213 156",
						email:"miqueldiangilo@gmail.com",
						socSecNum:690,
						role:"admin"
					},
					{
						id:0,
						dni:"4143215S",
						name:"Miquel",
						surname:"Angelo%",
						phone:"640 213 156",
						email:"miqueldiangilo@gmail.com",
						socSecNum:690,
						role:"admin"
					},
					{
						id:0,
						dni:"4143215S",
						name:"Miquel",
						surname:"Angelo%",
						phone:"640 213 156",
						email:"miqueldiangilo@gmail.com",
						socSecNum:690,
						role:"admin"
					},
					{
						id:0,
						dni:"4143215S",
						name:"Miquel",
						surname:"Angelo%",
						phone:"640 213 156",
						email:"miqueldiangilo@gmail.com",
						socSecNum:690,
						role:"admin"
					},
					{
						id:0,
						dni:"4143215S",
						name:"Miquel",
						surname:"Angelo%",
						phone:"640 213 156",
						email:"miqueldiangilo@gmail.com",
						socSecNum:690,
						role:"admin"
					}
				],
				columns: [
					{
						title: 'ID',
						dataIndex: 'id',
						scopedSlots: { customRender: 'id' },
						// width: 300,
					},
					{
						title: 'dni',
						dataIndex: 'dni',
						// class: 'font-semibold text-muted',
					},
					{
						title: 'name',
						dataIndex: 'name',
					},
					{
						title: 'surname',
						dataIndex: 'surname',
					},
					{
						title: 'phone',
						dataIndex: 'phone',
					},
					{
						title: 'email',
						dataIndex: 'email',
					},
					{
						title: 'socSecNum',
						dataIndex: 'socSecNum',
					},
					{
						title: 'role',
						dataIndex: 'role',
					}
				]
			}
		},
		methods: {
			//this method is used to receive the selected route data via emit from the ListRoutes component.
			getSelectedUser(user) {
				this.selectedUser = user;
				console.log(this.selectedUser);
			},
			//this method is a workaround to get back to the MyRoutes list by setting the selectedRoute value to null.
			back() {
				this.selectedUser = null;
			}
		}
	})

</script>

<style lang="scss">
</style>