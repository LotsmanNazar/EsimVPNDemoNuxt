<template>
	<header class="app-header">
		<div class="app-container">
			<div class="app-row">
				<div class="app-col">
					<div class="app-header-content">
						<div class="app-header-logo-wrapper">
							<NuxtLink to="/">
								<img class="app-header-logo" src="@/assets/img/logo.png" alt="Logo">
							</NuxtLink>
						</div>
						<div class="app-header-menu-main-wrapper">
							<HeaderMenu :items="items"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
	import { defineProps, PropType } from 'vue';
	import HeaderMenu from '@/components/HeaderMenu.vue';
	import { HeaderMenuItemType } from '@/types'

	const props = defineProps({
		items: {
			type: Object as PropType<Array<HeaderMenuItemType>>,
			required: true
		}
	});
</script>

<style scoped>
	.app-header {
		padding: 15px 0;
		border-bottom: 1px solid var(--white-transparent-1);
	}
	
	.app-header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.app-header-logo {
		width: 100%;
	}

	.app-header-logo-wrapper {
		width: 140px;
	}

	.app-header-menu-main-wrapper {
		padding-left: 50px;
	}

	@media (max-width: 600px) {
		.app-header-menu-main-wrapper {
			padding-left: 20px;
		}
	}

	@media (max-width: 360px) {
		.app-header-logo-wrapper {
			max-width: 100px;
		}
	}
</style>