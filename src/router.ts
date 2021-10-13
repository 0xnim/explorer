import { createRouter, createWebHashHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
const Router = createRouter({
	history: createWebHashHistory(),
	routes
})
function hasQueryParams(route: any) {
	return !!Object.keys(route.query).length
} 
Router.beforeEach((to, from, next: any) => {
	if(!hasQueryParams(to) && hasQueryParams(from)) {
		next({ ...to, query: from.query })
	} else {
		next()
	}
})
export default Router