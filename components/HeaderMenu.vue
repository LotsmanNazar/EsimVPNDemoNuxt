<template>
	<nav class="app-header-menu-wrapper">
		<ul class="app-header-menu app-reset-list">
			<li class="app-header-menu-item" v-for="(item, index) in items" :key="index">
				<NuxtLink :to="item.url">
					<span class="app-header-menu-item-icon" v-if="item.icon">
						<img :src="getImageURL(item.icon)">
					</span>
					<span class="app-header-menu-item-label">{{ item.label }}</span>
				</NuxtLink>
			</li>

			<li class="app-header-menu-item">
				<button class="app-header-action app-primary-button" type="button" @click="action">
					<span>Get started</span>
				</button>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
	import { defineProps, PropType } from 'vue';
	import { usePopupsStore } from '@/stores/popups.store';
	import { HeaderMenuItemType } from '@/types';
	// Some kind of resource manager is needed
	import iconQuestion from '@/assets/img/icon-question.svg';

	const props = defineProps({
		items: {
			type: Object as PropType<Array<HeaderMenuItemType>>,
			required: true
		}
	});

	const popupStore = usePopupsStore();
	// Some kind of resource manager is needed
	const imgs: Record<string, string> = {
		'icon-question': iconQuestion
	}

	const getImageURL = (key: string): string => {
		return imgs[key] ?? '';
	}

	const action = () => {
		popupStore.open('contact');
	}
</script>

<style scoped>
	.app-header-menu-item,
	.app-header-menu-item a {
		text-decoration: none;
		color: var(--text-color);
	}

	.app-header-menu-item > * {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.app-header-menu-item span {
		display: inline-block;
	}

	.app-header-menu-item-icon {
		margin-right: 5px;
	}

	.app-header-menu {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.app-header-menu-item {
		margin-right: 30px;
	}

	.app-header-menu-item:last-child {
		margin-right: 0;
	}

	.app-header-action {
		padding: 12px 25px;
	}

	@media (max-width: 600px) {
		.app-header-menu-item {
			font-size: 14px;
			margin-right: 15px;
		}

		.app-header-action {
			font-size: 14px;
			font-weight: normal;
			padding: 5px 10px;
		}
	}
</style>