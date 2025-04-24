<template>
	<transition name="fade">
		<div class="app-popup-wrapper" v-if="popupsStore.isActive(props.popupName)" @click="popupsStore.close(props.popupName)">
			<div class="app-popup" @click.stop>
				<div class="app-popup-content-wrapper">
					<div class="app-popup-close-wrapper">
						<button type="button" class="app-popup-close" @click="popupsStore.close(props.popupName)">
							<img src="@/assets/img/icon-close.svg">
						</button>
					</div>
					<div class="app-popup-content">
						<slot></slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits, watch } from 'vue';
	import { usePopupsStore } from '@/stores/popups.store';

	const props = defineProps({
		popupName: {
			type: String,
			required: true
		}
	});

	const emit = defineEmits(['popupClosed']);
	const popupsStore = usePopupsStore();

	watch(
		() => {
			return popupsStore.popups[props.popupName].open;
		},

		() => {
			if ( !popupsStore.popups[props.popupName].open ) {
				emit('popupClosed');
			}
		}
	);
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.app-popup-wrapper {
		background-color: var(--black-transparent-1);
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		padding: 50px 20px;
	}

	.app-popup {
		background-color: var(--layout-color);
		position: relative;
		width: 500px;
		padding: 30px;
		margin: auto;
		border: 1px solid var(--white-transparent-1);
		border-radius: 15px;
	}

	.app-popup-close {
		background-color: transparent;
		padding: 0 10px;
		border: none;
		box-shadow: none;
		cursor: pointer;
	}

	.app-popup-close svg {
		display: block;
		width: 25px;
		height: 25px;
	}

	.app-popup-close-wrapper {
		position: absolute;
		right: 20px;
		top: 32px;
	}

	@media (max-width: 500px) {
		.app-popup-close-wrapper {
			top: 22px;
			right: 10px;
		}
	}
</style>