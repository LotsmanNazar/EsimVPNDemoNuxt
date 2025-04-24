import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { getPageTitle } from '@/utils/getPageTitle';
import { getPageData } from '@/utils/getPageData';
import { DefaultPageContentDataType, DefaultPageDataType } from '@/types';

export async function useDefaultPageDataFetch(): Promise<DefaultPageContentDataType> {
	const defaultTitle = 'Home';
	const router = useRouter();

	const pageContentData = reactive<DefaultPageContentDataType>({
		loading: false,
		title: getPageTitle(defaultTitle),
		pageContentData: {
			pageData: {
				breadcrumbs: [],
				content: null,
				navigation: {
					footerMenu: [],
					headerMenu: [],
				}
			}
		}
	});

	const updatePageData = (data: DefaultPageDataType) => {
		pageContentData.pageContentData.pageData.navigation.footerMenu = data.pageData.navigation.footerMenu;
		pageContentData.pageContentData.pageData.navigation.headerMenu = data.pageData.navigation.headerMenu;
		pageContentData.pageContentData.pageData.breadcrumbs = data.pageData.breadcrumbs;
		pageContentData.pageContentData.pageData.content = data.pageData.content;
	}

	const fetchCurrentPageData = async () => {
		const requestPath = getCurrentPath();
		const { data, error } = await useAsyncData(requestPath, async () => {
			return getPageData();
		}, {server: true, lazy: true});

		if ( error.value ) {
			// Error handler here
		}
		
		const pageData = data.value;
		
		if ( pageData ) {
			updatePageData(pageData);
		}
	}

	// First fetch page data
	await fetchCurrentPageData();

	// Fetch page data
	router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
		pageContentData.loading = true;

		try {
			const data = await getPageData(to);
			if ( data ) {
				pageContentData.title = getPageTitle(defaultTitle, to);
				updatePageData(data);
				next();
			}
		} catch (error) {
			// Error handler here
		} finally {
			pageContentData.loading = false;
		}
	});

	return pageContentData;
}