<template>
	<div class="app-chat-button-wrapper" :class="classes">
		<button class="app-chat-button" type="button" @click="openPopup">
			<img src="@/assets/img/icon-chat.svg" alt="Chat Icon">
		</button>
	</div>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';
	import { usePopupsStore } from '@/stores/popups.store';

	const props = defineProps({
		available: {
			type: Boolean,
			required: true
		}
	});

	const popupsStore = usePopupsStore();

	const classes = {
		'app-chat-button-status-available': props.available,
		'app-chat-button-status-unavailable': !props.available
	}

	const openPopup = () => {
		popupsStore.open('contact');
	}
</script>

<style scoped>
	.app-chat-button {
		background-color: var(--text-color);
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 30px;
		right: 30px;
		width: 64px;
		height: 64px;
		border-radius: 100%;
	}

	.app-chat-button:before {
		content: '';
		position: absolute;
		top: 1px;
		right: 7px;
		width: 0.5rem;
		height: 0.5rem;
		border: 2px solid #0a0718;
		border-radius: 100%;
	}

	.app-chat-button-status-unavailable .app-chat-button:before {
		background-color: var(--accent2);
	}

	.app-chat-button-status-available .app-chat-button:before {
		background-color: var(--primary-color);
	}
</style>