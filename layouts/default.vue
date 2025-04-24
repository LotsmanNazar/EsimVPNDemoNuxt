<template>
	<div class="app-page-loader" v-if="pageData.loading"></div>

	<div class="app-header-main-wrapper">
		<PageHeader :items="pageData.pageContentData.pageData.navigation.headerMenu"/>
	</div>

	<div class="app-breadcrumbs-main-wrapper">
		<BreadCrumbs :items="pageData.pageContentData.pageData.breadcrumbs"/>
	</div>

	<div class="app-page-content-main-wrapper">
		<div class="app-container">
			<div class="app-row">
				<div class="app-col">
					<slot/>
				</div>
			</div>
		</div>
	</div>

	<div class="app-footer-main-wrapper">
		<PageFooter :items="pageData.pageContentData.pageData.navigation.footerMenu"/>
	</div>

	<ChatButton :available="false"/>
	<ContactPopup/>
</template>

<script setup lang="ts">
	import PageHeader from '@/components/PageHeader.vue';
	import PageFooter from '@/components/PageFooter.vue';
	import BreadCrumbs from '@/components/BreadCrumbs.vue';
	import ChatButton from '@/components/ChatButton.vue';
	import ContactPopup from '@/components/ContactPopup.vue';
	import { useDefaultPageDataFetch } from '@/composables/useDefaultPageDataFetch';
	import { usePopupsStore } from '@/stores/popups.store';
	
	const popupsStore = usePopupsStore();
	const router = useRouter();
	const pageData = await useDefaultPageDataFetch();
	const pageContent = ref();

	watchEffect(
		() => {
			pageContent.value = pageData.pageContentData.pageData.content;
		}
	);

	provide('content', pageContent);


	const closePopups = (e: KeyboardEvent) => {
		if ( e.key== 'Escape' ) {
			popupsStore.closeAll();
		}
	}

	// Close all popups
	router.afterEach((to, from) => {
		popupsStore.$reset();
	});

	// Disallow owerflow if popup open
	watch(
		() => {
			return popupsStore.active;
		},

		() => {
			document.body.classList.toggle('app-overflow-hidden', popupsStore.active ? true : false);
		}
	);

	onMounted(() => {
		document.addEventListener('keyup', closePopups);
	});

	onUnmounted(() => {
		document.removeEventListener('keyup', closePopups);
	});

	useHead({
		title: () => {
			return 'Esim VPN | ' + pageData.title;
		}
	});
</script>

<style scoped>
	@keyframes linewidthReverse {
		0% {
			transform: translateX(-100%);
		}

		50% {
			transform: translateX(100%);
		}

		100% {
			transform: translateX(-100%);
		}
	}

	.app-page-loader {
		background-color: var(--primary-color);
		position: fixed;
		top: 0;
		left: 0;
		height: 10px;
		width: 100%;
		transition: 1s;
		animation: linewidthReverse 5s linear infinite alternate;
	}
</style>