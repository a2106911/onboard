<!-- 
	This is the main page of the application, the layout component is used here,
	and the router-view is passed to it.
	Layout component is dynamically declared based on the layout for each route,
	specified in routes list router/index.js .
 -->

<template>
	<dashboard-vue v-if="signed"></dashboard-vue>
	<signIn 
		v-if="!signed" 
		class="absolutePositioning"
		@loginRequest="processLoginRequest"
		>
	</signIn>
	
</template>

<script>
import DashboardVue from "./layouts/Dashboard.vue";
import SignIn from "./views/Sign-In.vue";
import axios from "axios";


export default ({
	components: {
		DashboardVue,
		SignIn
	},
	data() {
		return {
			loginRequest:null,
			signed: true
		}
	},
	methods: {
		processLoginRequest(result) {
			if(result == "false") {
				//In case the login failed, we'll show the user a notification:
				this.loginFailedWarning();
			}
			else if (result.token !== null) {
				localStorage.setItem("accessToken", result.token);
				this.signed = true;
				sessionStorage.setItem("logged", "true");
				if (result.role == "driver")
				{
					this.$router.push("/my-routes");
				}
				else if (result.role == "manager")
				{
					this.$router.push("/routes-management");
				}
				else if (result.role == "admin")
				{
					this.$router.push("/administration");
				}
			}
		},
		loginFailedWarning() {
			this.$notification["warning"]({
				message: 'Login error',
				description:
				"Your credentials do not match any user in our database. Please, try again.",
			});
		}
	},
	computed: {
		// Sets components name based on current route's specified layout, defaults to
		// <layout-default></layout-default> component.
		layout() {
			return DashboardVue;
		}
	},
	created() {
		axios({
			method:"PUT",
			// url:"http://localhost/api/get-random-token",
			url:"http://onboard.daw.institutmontilivi.cat/api/get-random-token",
			data: {
				"password-get-token":"a827167be35df9c9dd25ab637741e769"
			}
		}).then((response)=> {
			localStorage.setItem("temporaryToken", response.data);
		})

		if (sessionStorage.getItem("logged") !== null) {
			if (sessionStorage.getItem("logged") == "true") {
				this.signed = true;
				sessionStorage.setItem("logged", "true");
			}
			else this.signed = false;
		}
		else {
			sessionStorage.setItem("logged", "false");
			this.signed = false;
		}
	},
	watch: {
		// eslint-disable-next-line no-unused-vars
		$route(from) {
			if(from.fullPath == "/logout") {
				this.signed = false;
				this.$router.push("/sign-in");
			}
		}
	}
})

</script>

<style lang="scss">
body,
html {
	position: relative;
	height: 100%;
	margin: 0px;
}

.absolutePositioning {
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>