import { RouteLocationNormalized } from 'vue-router';

export function getCurrentPath(route?: RouteLocationNormalized): string {
	const requestRoute = route ? route : useRoute();
	const requestPath = requestRoute.name?.toString() ?? 'index';

	return requestPath;
}