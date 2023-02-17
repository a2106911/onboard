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
	<!-- <div id="app"> -->
	<!-- <router-view /> -->
	<!-- <component :is="layout">
		</component> -->
	<!-- </div> -->
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
			// console.log("app", result)
			if(result == "false") {
				//In case the login failed, we'll show the user a notification:
				this.loginFailedWarning();
			}
			else if (result.token !== null) {
				localStorage.setItem("accessToken", result.token);
				this.signed = true;
				sessionStorage.setItem("logged", "true");
				this.$router.push("/my-routes");
			}

			// if (result) {
			// 	this.signed = true;
			// }
			// else {
			// 	this.signed = false;
			// }
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
			return DashboardVue
			//return "layout-" + ( this.$route.meta.layout || "default" ).toLowerCase() ;
		}
	},
	created() {
		axios({
			method:"PUT",
			url:"http://localhost/api/get-random-token",
			//url:"http://onboard.daw.institutmontilivi.cat/api/get-random-token",
			data: {
				"password-get-token":"a827167be35df9c9dd25ab637741e769"
			}
		}).then((response)=> {
			// console.log(response);
			localStorage.setItem("temporaryToken", response.data);
		})
		// JSON.stringify('"password-get-token":"a827167be35df9c9dd25ab637741e769"'
		// axios.post("http://onboard.daw.institutmontilivi.cat/api/get-random-token",
		// 	{ JSON.parse('"password-get-token":"a827167be35df9c9dd25ab637741e769"') }
		// )
		// var tokenPassword = { "password-get-token" : "a827167be35df9c9dd25ab637741e769" };

		if (sessionStorage.getItem("logged") !== null) {
			// console.log(2);
			// console.log(sessionStorage.getItem("logged"))
			if (sessionStorage.getItem("logged") == "true") {
				// console.log("in")
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
		$route(from,to) {
			console.log("from", from);
			console.log("to", to);

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