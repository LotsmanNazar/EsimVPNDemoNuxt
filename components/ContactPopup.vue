<template>
	<PopupWindow :popupName="popupName" v-on:popup-closed="popupClosed">
		<div class="app-contact-popup-content">
			<h3 class="app-contact-popup-title">Contact support</h3>

			<transition name="app-content-fade">
				<div class="app-contact-form-main-wrapper" v-if="!formSubmittedStatus">
					<ContactForm v-on:form-submitted="formSubmitted"/>
				</div>
			</transition>

			<transition name="app-content-fade">
				<div class="app-contact-popup-success" v-if="formSubmittedStatus">
					<div class="app-contact-popup-success-icon">
						<img src="@/assets/img/icon-check2.svg">
					</div>

					<div class="app-contact-popup-success-content">
						<p>{{ successMessage }}</p>
					</div>

					<div class="app-contact-popup-success-action">
						<button class="app-button" type="button" @click="close">Close</button>
					</div>
				</div>
			</transition>
		</div>
	</PopupWindow>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import PopupWindow from '@/components/PopupWindow.vue';
	import ContactForm from '@/components/ContactForm.vue';
	import { usePopupsStore } from '@/stores/popups.store';

	const popupName = 'contact';
	const popupsStore = usePopupsStore();
	const formSubmittedStatus = ref<boolean>(false);
	const successMessage = ref<string>('');

	const popupClosed = () => {
		formSubmittedStatus.value = false;
	}

	const formSubmitted = (message: string) => {
		formSubmittedStatus.value = true;
		successMessage.value = message;
	}

	const close = () => {
		popupsStore.close(popupName);
	}
</script>

<style scoped>
	.app-content-fade-enter-active {
		transition: opacity 1s ease;
	}

	.app-content-fade-leave-active {
		display: none;
		opacity: 0;
	}

	.app-content-fade-enter-from,
	.app-content-fade-leave-to {
		opacity: 0;
	}

	.app-contact-popup-title {
		font-size: 32px;
		margin-top: -10px;
		margin-bottom: 45px;
	}

	.app-contact-popup-success-icon {
		background-color: var(--primary-color);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 96px;
		height: 96px;
		margin: 0 auto 15px auto;
		border-radius: 100%;
	}

	.app-contact-popup-success-content {
		color: var(--text-secondary);
	}

	.app-contact-popup-success {
		text-align: center;
	}

	.app-contact-popup-success-content {
		margin-bottom: 15px;
	}

	.app-contact-popup-success-action .app-button {
		width: 100%;
	}

	@media (max-width: 500px) {
		.app-contact-popup-title {
			font-size: 20px;
			margin-bottom: 30px;
		}

		.app-popup {
			padding: 30px 20px;
		}

		.app-contact-popup-success-icon {
			width: 80px;
			height: 80px;
		}
	}
</style>