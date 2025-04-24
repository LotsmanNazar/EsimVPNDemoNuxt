<template>
	<footer class="app-footer">
		<div class="app-container">
			<div class="app-row">
				<div class="app-col">
					<div class="app-footer-content">
						<div class="app-footer-copyright">
							<p>© 2024 Esimvpn, All Rights Reserved.</p>
						</div>
						<div class="app-footer-menu-main-wrapper">
							<FooterMenu :items="items"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
	import { defineProps, PropType } from 'vue';
	import FooterMenu from '@/components/FooterMenu.vue';
	import { FooterMenuItemType } from '@/types';

	const props = defineProps({
		items: {
			type: Object as PropType<Array<FooterMenuItemType>>,
			required: true
		}
	});
</script>

<style scoped>
	.app-footer {
		padding: 20px 0;
		border-top: 1px solid var(--white-transparent-1);
	}

	.app-footer-content {
		color: var(--text-secondary);
	}
	
	.app-footer-content a {
		text-decoration: underline;
		color: var(--text-secondary);
	}

	.app-footer-content {
		display: flex;
		justify-content: center;
	}

	.app-footer-copyright {
		margin-right: 30px;
	}

	@media (max-width: 600px) {
		.app-footer-copyright {
			width: 100%;
			margin-right: 0;
		}

		.app-footer-menu-main-wrapper {
			width: 100%;
			margin-bottom: 15px;
		}

		.app-footer-content {
			text-align: center;
			flex-wrap: wrap;
			flex-direction: column-reverse;
		}
	}
</style>