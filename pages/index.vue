<template>
	<div class="app-main-page-content-main-wrapper">
		<div class="app-main-page-content-wrapper">
			<div class="app-main-page-content-left">
				<div class="app-product-image-wrapper" v-if="!adaptiveLayout">
					<img class="app-product-image" src="@/assets/img/vpn-image.jpg" alt="VPN Image">
				</div>
			</div>

			<div class="app-main-page-content-right">
				<div class="app-product-description-wrapper">
					<div class="app-product-image-wrapper" v-if="adaptiveLayout">
						<img class="app-product-image" src="@/assets/img/vpn-image.jpg" alt="VPN Image">
					</div>
					<div class="app-product-description">
						<div class="app-page-title-wrapper">
							<img src="@/assets//img/icon-europe.svg">
							<h1 class="app-page-title">eSIM Europe + VPN</h1>
						</div>

						<div class="app-features-tabs-wrapper">
							<TabsContent :content="featuredTabs"/>
						</div>
					</div>
				</div>

				<div class="app-packages-list-main-wrapper">
					<PackageList :items="packagesItems"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, onUnmounted, ref } from 'vue';
	import TabsContent from '@/components/TabsContent.vue';
	import PackageList from '@/components/PackageList.vue';
	import { TabsContentType, PackageListItemType, HomePageDataType } from '@/types';

	const content = inject<Ref>('content');
	const featuredTabs: Ref<TabsContentType> = ref(content?.value?.featuredTabs ?? {});
	const packagesItems: Ref<Record<string, PackageListItemType>> = ref(content?.value?.packagesItems ?? {});
	const adaptiveLayout = ref<boolean>(false);

	const switchAdaptiveLayout = () => {
		adaptiveLayout.value = window.innerWidth <= 800 ? true : false;
	}

	onMounted(() => {
		switchAdaptiveLayout();
		window.addEventListener('resize', switchAdaptiveLayout);
	});

	onUnmounted(() => {
		window.removeEventListener('resize', switchAdaptiveLayout);
	});
</script>

<style>
	#app {
		min-height: 100vh;
	}

	.app-main-page-content-wrapper {
		display: flex;
		flex-wrap: wrap;
	}

	.app-main-page-content-left {
		width: 43%;
		padding-right: 100px;
	}

	.app-main-page-content-right {
		width: 57%;
	}

	.app-product-image {
		width: 100%;
	}

	.app-page-title-wrapper {
		display: flex;
		align-items: center;
		margin-bottom: 25px;;
	}

	.app-page-title-wrapper img,
	.app-page-title-wrapper svg {
		margin-right: 15px;
	}

	.app-features-tabs-wrapper {
		margin-bottom: 25px;
	}

	.app-main-page-content-right > *:last-child {
		margin-bottom: 70px;
	}

	@media (max-width: 992px) {
		.app-main-page-content-left {
			padding-right: 50px;
		}
	}

	@media (max-width: 800px) {
		.app-main-page-content-left {
			width: 100%;
			padding-right: 0;
		}

		.app-main-page-content-right {
			width: 100%;
		}

		.app-product-description-wrapper {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 30px;
		}

		.app-product-image-wrapper {
			width: 35%;
			padding-right: 30px;
		}

		.app-product-description {
			width: 65%;
		}
	}

	@media (max-width: 600px) {
		.app-product-image-wrapper {
			width: 100%;
			padding-right: 0;
			margin-bottom: 30px;
		}

		.app-product-description {
			width: 100%;
		}
	}
</style>
