<template>
	<div class="app-packages-list-wrapper">
		<div class="app-packages-items">
			<PackageItem v-for="(item, key) in packagesItems" :key="key" @item-select="itemSelect(key)" :itemData="item"/>
		</div>

		<div class="app-package-list-action-wrapper">
			<button class="app-package-list-action app-primary-button" type="button" @click="action">Buy now</button>
		</div>

		<div class="app-package-list-payment-info-wrapper">
			<div class="app-package-list-payment-info">
				<img src="@/assets/img/icon-check.svg" alt="Check Icon">
				<p>Secure payment guaranteed.</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, PropType, reactive, ref } from 'vue';
	import PackageItem from '@/components/PackageItem.vue';
	import { usePopupsStore } from '@/stores/popups.store';
	import { PackageListItemType } from '@/types';

	const props = defineProps({
		items: {
			type: Object as PropType<Record<string, PackageListItemType>>,
			required: true
		}
	});

	const popupStore = usePopupsStore();
	const packagesItems = reactive<Record<string, PackageListItemType>>(props.items);
	let selectedItem = '';

	const itemSelect = (key: string) => {
		if ( selectedItem ) {
			packagesItems[selectedItem].selected = false;
		}

		packagesItems[key].selected = true;
		selectedItem = key;
	}

	const action = () => {
		popupStore.open('contact');
	}
</script>

<style scoped>
	.app-package-list-action {
		width: 100%;
	}

	.app-packages-items {
		margin-bottom: 30px;
	}

	.app-package-list-payment-info {
		color: var(--text-secondary);
		display: flex;
		justify-content: center;
		margin-top: 15px;
	}

	.app-package-list-payment-info img,
	.app-package-list-payment-info svg {
		margin-right: 10px;
	}
</style>