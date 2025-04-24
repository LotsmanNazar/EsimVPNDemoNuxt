import { RouteLocationNormalized } from 'vue-router';
import { getCurrentPath } from '@/utils/getCurrentPath';

export function getPageTitle(defaultTitle?: string, route?: RouteLocationNormalized): string {
	const currentPath = getCurrentPath(route);
	const currentTitle = defaultTitle !== undefined && currentPath === 'index' ? defaultTitle : currentPath;
	const words = currentTitle.replace(/^\/|\/$/g, '').split('-');
	const newWords = words.map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});

	const title = newWords.join(' ');

  	return title;
}