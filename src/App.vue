<!-- 
	This is the main page of the application, the layout component is used here,
	and the router-view is passed to it.
	Layout component is dynamically declared based on the layout for each route,
	specified in routes list router/index.js .
 -->

<template>
	<dashboard-vue v-if="signed"></dashboard-vue>
	<signIn v-if="!signed" class="absolutePositioning"></signIn>
	<!-- <div id="app"> -->
	<!-- <router-view /> -->
	<!-- <component :is="layout">
		</component> -->
	<!-- </div> -->
</template>

<script>
import DashboardVue from "./layouts/Dashboard.vue";
import SignIn from "./views/Sign-In.vue";


export default ({
	components: {
		DashboardVue,
		SignIn
	},
	data() {
		return {
			signed: true
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