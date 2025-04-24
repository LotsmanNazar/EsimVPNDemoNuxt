<template>
	<div class="app-tabs-content-wrapper">
		<div class="app-tabs-content">
			<div class="app-tabs-items">
				<button
					type="button" 
					class="app-tabs-item"
					:class="{'app-tabs-tab-active': key === active}"
					v-for="(item, key) in content"
					:key="key"
					@click="tabsSwitcher(key)"
				>
					{{ item.tabLabel }}
				</button>
			</div>

			<div class="app-tabs-content-items">
				<div class="app-tabs-content-item-wrapper" v-for="(item, key) in content" :key="key">
					<transition name="fade">
						<div class="app-tabs-content-item" v-html="item.tabContent" v-if="key === active"></div>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, PropType, ref } from 'vue';
	import { TabsContentType } from '@/types';

	const props = defineProps({
		content: {
			type: Object as PropType<TabsContentType>,
			required: true
		}
	});
	
	const active = ref<string>(Object.keys(props.content)[0] ?? '');

	const tabsSwitcher = (key: string) => {
		active.value = key;
	};
</script>

<style scoped>
	.fade-enter-active {
		transition: opacity 1s ease;
	}

	.fade-leave-active {
		display: none;
		opacity: 0;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.app-tabs-content-item {
		color: var(--text-secondary);
	}

	.app-tabs-item {
		padding: 8px 15px;
		margin-right: 10px;
		margin-bottom: 10px;
		border: 1px solid var(--white-transparent-1);
		border-radius: 30px;
		transition: 0.3s;
	}

	.app-tabs-item:last-child {
		margin-right: 0;
	}

	.app-tabs-items {
		margin-bottom: -10px;
	}

	.app-tabs-tab-active {
		color: var(--text-secondary2);
		background-color: var(--text-color);
	}

	.app-tabs-content-item {
		margin-top: 25px;
	}
</style>