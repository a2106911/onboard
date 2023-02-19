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
			@discardChanges="discardChanges"
			@updateValues="processUpdateValues"
		></OneUser>
	</span>
	
</template>

<script>
	import ListUsers from '@/components/Users/ListUsers.vue' ;
	import OneUser from '@/components/Users/OneUser.vue' ;
	import axios from 'axios';

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
					// {
					// 	id:0,
					// 	dni:"4143215S",
					// 	name:"Miquel",
					// 	surname:"Angelo%",
					// 	phone:"640 213 156",
					// 	email:"miqueldiangilo@gmail.com",
					// 	socSecNum:690,
					// 	role:"admin"
					// },
					// {
					// 	id:0,
					// 	dni:"4143215S",
					// 	name:"Miquel",
					// 	surname:"Angelo%",
					// 	phone:"640 213 156",
					// 	email:"miqueldiangilo@gmail.com",
					// 	socSecNum:690,
					// 	role:"admin"
					// },
					// {
					// 	id:0,
					// 	dni:"4143215S",
					// 	name:"Miquel",
					// 	surname:"Angelo%",
					// 	phone:"640 213 156",
					// 	email:"miqueldiangilo@gmail.com",
					// 	socSecNum:690,
					// 	role:"admin"
					// },
					// {
					// 	id:0,
					// 	dni:"4143215S",
					// 	name:"Miquel",
					// 	surname:"Angelo%",
					// 	phone:"640 213 156",
					// 	email:"miqueldiangilo@gmail.com",
					// 	socSecNum:690,
					// 	role:"admin"
					// },
					// {
					// 	id:0,
					// 	dni:"4143215S",
					// 	name:"Miquel",
					// 	surname:"Angelo%",
					// 	phone:"640 213 156",
					// 	email:"miqueldiangilo@gmail.com",
					// 	socSecNum:690,
					// 	role:"admin"
					// },
					// {
					// 	id:0,
					// 	dni:"4143215S",
					// 	name:"Miquel",
					// 	surname:"Angelo%",
					// 	phone:"640 213 156",
					// 	email:"miqueldiangilo@gmail.com",
					// 	socSecNum:690,
					// 	role:"admin"
					// },
					// {
					// 	id:0,
					// 	dni:"4143215S",
					// 	name:"Miquel",
					// 	surname:"Angelo%",
					// 	phone:"640 213 156",
					// 	email:"miqueldiangilo@gmail.com",
					// 	socSecNum:690,
					// 	role:"admin"
					// },
					// {
					// 	id:0,
					// 	dni:"4143215S",
					// 	name:"Miquel",
					// 	surname:"Angelo%",
					// 	phone:"640 213 156",
					// 	email:"miqueldiangilo@gmail.com",
					// 	socSecNum:690,
					// 	role:"admin"
					// },
					// {
					// 	id:0,
					// 	dni:"4143215S",
					// 	name:"Miquel",
					// 	surname:"Angelo%",
					// 	phone:"640 213 156",
					// 	email:"miqueldiangilo@gmail.com",
					// 	socSecNum:690,
					// 	role:"admin"
					// }
				],
				originalColumns: [
					{
						title: 'ID',
						dataIndex: 'userId',
						scopedSlots: { customRender: 'id' },
						// width: 300,
						hidden: false
					},
					{
						title: 'dni',
						dataIndex: 'nationalId',
						// class: 'font-semibold text-muted',
						hidden: false
					},
					{
						title: 'name',
						dataIndex: 'name',
						hidden: false
					},
					{
						title: 'surnames',
						dataIndex: 'surnames',
						hidden: false
					},
					{
						title: 'email',
						dataIndex: 'email',
						hidden: false
					},
					{
						title: 'socSecNum',
						dataIndex: 'socSecNum',
						hidden: false
					},
					{
						title: 'role',
						dataIndex: 'role',
						hidden: false
					},
					{
						title: 'Activity status',
						dataIndex: 'isActive',
						hidden: false
					}
				],
				columns: [
					{
						title: 'ID',
						dataIndex: 'userId',
						scopedSlots: { customRender: 'id' },
						// width: 300,
						hidden: false
					},
					{
						title: 'dni',
						dataIndex: 'nationalId',
						// class: 'font-semibold text-muted',
						hidden: false
					},
					{
						title: 'name',
						dataIndex: 'name',
						hidden: false
					},
					{
						title: 'surnames',
						dataIndex: 'surnames',
						hidden: false
					},
					{
						title: 'email',
						dataIndex: 'email',
						hidden: false
					},
					{
						title: 'socSecNum',
						dataIndex: 'socSecNum',
						hidden: false
					},
					{
						title: 'role',
						dataIndex: 'role',
						hidden: false
					},
					{
						title: 'Activity status',
						dataIndex: 'isActive',
						hidden: false
					}
				]
			}
		},
		methods: {
			//this method is used to receive the selected route data via emit from the ListRoutes component.
			getSelectedUser(user) {
				this.selectedUser = user;
			},
			discardChanges() {
				this.selectedUser = null;
				this.getAllUsers();
			},
			//This method will trigger when we receive an emit from the OneUser component notifying that an update has been applied.
			//It will enable us to refresh the data in real time.
			processUpdateValues() {
				this.getAllUsers();
			},
			//this method is a workaround to get back to the MyRoutes list by setting the selectedRoute value to null.
			back() {
				this.selectedUser = null;
			},
			warning(message, description="") {
				this.$notification["warning"]({
					message: message,
					description:
					description,
				});
			},
			//This method is triggered every time the window's size is changed.
			//Its function is to hide or show items according to the screen inner width. If it's a phone view, fewer items will be shown.
			checkForWindowResize() {
				//The data will be stored on the originalColumns array. And every time we apply a filter, we'll set the visibility state of each item on the originalColumns array, and filter the columns array so that no data is ever lost.
				if (window.innerWidth < 991) { //smartphone view:
					this.originalColumns.filter(column => {
						if(["nationalId","socSecNum","isActive","name","surnames"].includes(column.dataIndex)) {
							column.hidden = true;
						}
						else { //userId, email, role
							column.hidden = false;
						}
					})
				}
				else { //desktop view: (no columns hidden)
					this.originalColumns.filter(column => {column.hidden = false});
				}
				// console.log("columns", this.columns);
				this.columns = this.originalColumns.filter(column => !column.hidden);
			},
			getAllUsers() {
				axios({
					method:"PUT",
					// url:"http://onboard.daw.institutmontilivi.cat/api/get-all-users",
					url:"http://localhost/api/get-all-users",
					// url:"192.1681.67:8080/api/get-routes",
					data: {
						"accessToken":localStorage.getItem("accessToken")
					}
				}).then((response)=> {
					// console.log("response.data", response.data);
					if (response.data !== null) {
						if (response.data != "0" && response.data != false) {
							console.log("users response",response);
							this.users = response.data;
						}
						else if (response.data == "0") {
							this.warning("No users found");
						}
						else if (response.data == false) {
							this.warning("No permissions!");
						}
						else {
							this.warning("No permissions!");
						}
					}
				})
			}
		},
		created () {
			//First we'll fill the users' array.
			this.getAllUsers();

			//This event listener will trigger every time the client's window is resized.
			window.addEventListener('resize', this.checkForWindowResize);

			//Initial screen width check to see if we need to hide table elements or not:
			this.checkForWindowResize();
		}
	})

</script>

<style lang="scss">
</style>