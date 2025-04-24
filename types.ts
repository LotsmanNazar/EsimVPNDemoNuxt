export type TabsContentType = Record<string, {
	tabLabel: string;
	tabContent: string;
}>;

export type PackageListItemType = {
	info1: string;
	info1Unit: string;
	info1Desc: string;
	info2: string;
	info2Unit: string;
	info2Desc: string;
	sale: string;
	price: string;
	salePrice: string;
	value: string;
	selected: boolean;
}

export type PopupsStateType = {
	active: string | null;
	popups: Record<string, {open: boolean}>;
}

export type FormValidatorResultType = {
	field: string;
	error: boolean;
}

export type FooterMenuItemType = {
	url: string;
	label: string;
}

export type HeaderMenuItemType = {
	url: string;
	label: string;
	icon: string;
}

export type BreadcrumbsItemType = {
	label: string,
	url: string
}

export type DefaultPageDataType = {
	pageData: {
		breadcrumbs: Array<BreadcrumbsItemType>;
		content: any;
		navigation: {
			footerMenu: Array<FooterMenuItemType>;
			headerMenu: Array<HeaderMenuItemType>;
		};
	};
}

export type DefaultPageContentDataType = {
	pageContentData: DefaultPageDataType,
	loading: boolean;
	title: string;
}

export type HomePageDataType = {
	packagesItems: Record<string, PackageListItemType>;
	featuredTabs: TabsContentType;
}

export type PostRequestResponseType = {
	error: boolean;
	message: string;
}