<template>
	<nav class="app-breadcrumbs-wrapper">
		<div class="app-container">
			<div class="app-row">
				<div class="app-col">
					<ul class="app-breadcrumbs app-reset-list">
						<li class="app-breadcrumbs-item" v-for="(item, index) in items" :key="index">
							<NuxtLink :to="item.url" v-if="item.url">{{ item.label }}</NuxtLink>
							<span class="app-breadcrumbs-item-divider" v-if="item.url">/</span>
							<span v-if="!item.url">{{ item.label }}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
	import { defineProps, PropType } from 'vue';
	import { BreadcrumbsItemType } from '@/types';

	const props = defineProps({
		items: {
			type: Object as PropType<Array<BreadcrumbsItemType>>,
			required: true
		}
	});
</script>

<style scoped>
	.app-breadcrumbs-wrapper {
		padding: 20px 0;
	}

	.app-breadcrumbs-item a {
		color: var(--text-color);
	}

	.app-breadcrumbs-item span {
		color: var(--text-secondary);
	}

	.app-breadcrumbs {
		display: flex;
		flex-wrap: wrap;
	}

	.app-breadcrumbs-item-divider {
		margin: 0 15px;
	}
</style>