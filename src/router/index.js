import { createRouter, createWebHashHistory } from 'vue-router'
// import { dashBoard } from "@/layouts/Dashboard.vue"
// Vue.use(VueRouter)

const routes = [
	{
	  path: '/',
	  name: 'DASHBOARD',
	//  component: () => import("../layouts/Dashboard.vue")
	},
	// {
	//   path: '/dashboardRTL',
	//   name: 'dashBoardRTL',
	//   component: () => import("../layouts/DashboardRTL.vue")
	// },
	{
	  path: '/default',
	  name: 'default',
	  component: () => import("../layouts/Default.vue")
	},
	// {
	// 	path: '/sign-in',
	// 	name: 'signin',
	// 	component: () => import('../views/Sign-In.vue'),
	// },
	{
		path: '/my-routes',
		name: 'MY ROUTES',
		// layout: dashBoard,
		component: () => import('../views/MyRoutes.vue'),
	},
	{
		// will match everything
		path: "/:pathMatch(.*)*",
		component: () => import('../views/404.vue'),
	},
	{
		path: '/tables',
		name: 'Tables',
		layout: "dashboard",
		component: () => import('../views/Tables.vue'),
	},

	//Alberto
	{
		path: '/test-map',
		name: 'Test Map',
		layout: "dashboard",
		component: () => import('../views/TestMap.vue'),
	},
	{
		path: '/contact-with-us',
		name: 'CONTACT WITH US',
		layout: "dashboard",
		component: () => import('../views/ContactWithUs.vue'),
	},
	{
		path: '/administation',
		name: 'Administration',
		layout: "dashboard",
		component: () => import('../views/Administration.vue'),
	},
	{
		path: '/routes-managment',
		name: 'Routes Managment',
		layout: "dashboard",
		component: () => import('../views/RoutesManagment.vue'),
	}
	,
	{
		path: '/my-routes-manager',
		name: 'My Routes',
		layout: "dashboard",
		component: () => import('../views/MyRoutesManagment.vue'),
	}
	
]
// const routes = [
// 	// {
// 	// 	// will match everything
// 	// 	path: '*',
// 	// 	component: () => import('../views/404.vue'),
// 	// },
// 	// {
// 	// 	path: '/',
// 	// 	name: 'Home',
// 	// 	redirect: '/dashboard',
// 	// 	component: () => import("../layouts/DashboardRTL.vue"),
// 	// },
// 	{
// 		path: '/',
// 		name: 'DashboardRTL',
// 		redirect: '/dashboard',
// //		component: () => import("../layouts/DashboardRTL.vue"),
// 		component: dashBoard,
// 	},
// 	{
// 		path: '/dashboard',
// 		name: 'Dashboard',
// 		layout: "dashboard",
// 		// route level code-splitting
// 		// this generates a separate chunk (about.[hash].js) for this route
// 		// which is lazy-loaded when the route is visited.
// 		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
// 	},
// 	{
// 		path: '/layout',
// 		name: 'Layout',
// 		layout: "dashboard",
// 		component: () => import('../views/Layout.vue'),
// 	},
// 	{
// 		path: '/tables',
// 		name: 'Tables',
// 		layout: "dashboard",
// 		component: () => import('../views/Tables.vue'),
// 	},
	// {
	// 	path: '/billing',
	// 	name: 'Billing',
	// 	layout: "dashboard",
	// 	component: () => import('../views/Billing.vue'),
	// },
// 	{
// 		path: '/rtl',
// 		name: 'RTL',
// 		layout: "dashboard-rtl",
// 		meta: {
// 			layoutClass: 'dashboard-rtl',
// 		},
// 		component: () => import('../views/RTL.vue'),
// 	},
// 	{
// 		path: '/Profile',
// 		name: 'Profile',
// 		layout: "dashboard",
// 		meta: {
// 			layoutClass: 'layout-profile',
// 		},
// 		component: () => import('../views/Profile.vue'),
// 	},
// 	{
// 		path: '/sign-in',
// 		name: 'Sign-In',
// 		component: () => import('../views/Sign-In.vue'),
// 	},
// 	{
// 		path: '/sign-up',
// 		name: 'Sign-Up',
// 		meta: {
// 			layoutClass: 'layout-sign-up',
// 		},
// 		component: () => import('../views/Sign-Up.vue'),
// 	},
// ]

// Adding layout property from each route to the meta
// object so it can be accessed later.
// function addLayoutToRoute( route, parentLayout = "default" )
// {
// 	route.meta = route.meta || {} ;
// 	route.meta.layout = route.layout || parentLayout ;
	
// 	if( route.children )
// 	{
// 		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
// 	}
// 	return route ;
// }

// routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;


const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
  })

export default router

// const router = new VueRouter({
// 	mode: 'hash',
// 	base: process.env.BASE_URL,
// 	routes,
// 	scrollBehavior (to) { //, from, savedPosition
// 		if ( to.hash ) {
// 			return {
// 				selector: to.hash,
// 				behavior: 'smooth',
// 			}
// 		}
// 		return {
// 			x: 0,
// 			y: 0,
// 			behavior: 'smooth',
// 		}
// 	}
// })

// export default router
