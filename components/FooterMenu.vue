<template>
	<nav class="app-footer-menu-wrapper">
		<ul class="app-footer-menu app-reset-list">
			<li class="app-footer-menu-item" v-for="(item, index) in items" :key="index">
				<NuxtLink :to="item.url">{{ item.label }}</NuxtLink>
			</li>
		</ul>
	</nav>
</template>

<script setup lang="ts">
	import { defineProps, PropType } from 'vue';
	import { FooterMenuItemType } from '@/types'

	const props = defineProps({
		items: {
			type: Object as PropType<Array<FooterMenuItemType>>,
			required: true
		}
	});
</script>

<style scoped>
	.app-footer-menu-item a {
		text-decoration: underline;
		color: var(--text-secondary);
	}

	.app-footer-menu {
		display: flex;
		flex-wrap: wrap;
	}

	.app-footer-menu-item:not(:last-child) {
		margin-right: 30px;
	}

	@media (max-width: 600px) {
		.app-footer-menu {
			justify-content: center;
		}

		.app-footer-menu-item:not(:last-child) {
			margin-right: 15px;
		}
	}
</style>