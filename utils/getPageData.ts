import { RouteLocationNormalized } from 'vue-router';
import { DefaultPageDataType } from '@/types';

export async function getPageData(route?: RouteLocationNormalized): Promise<DefaultPageDataType> {
	const config = useRuntimeConfig();
	const apiUrl = config.public.API_PAGES_DATA_URL;
	const requestPath = getCurrentPath(route);
	const response = await fetch(apiUrl + requestPath);

	if ( !response.ok ) {
		throw new Error('Fetch Error');
	}

	const data: DefaultPageDataType = await response.json();

	return data;
};