<template>
	<div class="app-contact-form-wrapper">
		<div class="app-contact-form-desc">
			<p>Get in touch with our support team if you need help.</p>
		</div>

		<form class="app-contact-form" ref="form" @submit="submit($event)">
			<div class="app-form-field-wrapper" :class="{'app-form-field-error' : fieldError.field === 'email'}" @change="change('email')">
				<input type="text" name="email" placeholder="Email">
			</div>

			<div class="app-form-field-wrapper" :class="{'app-form-field-error' : fieldError.field === 'message'}" @change="change('message')">
				<textarea rows="4" name="message" placeholder="Your Message"></textarea>
			</div>

			<div class="app-form-error-message-wrapper" v-if="fieldError.message">
				<p>{{ fieldError.message }}</p>
			</div>

			<div class="app-form-field-wrapper app-form-field-submit-wrapper">
				<button class="app-form-field-submit app-primary-button" type="submit">
					<transition name="fade">
						<img class="app-form-loader" src="@/assets/img/icon-loader.svg" v-if="request">
					</transition>
					<transition name="fade">
						<span v-if="!request">Send</span>
					</transition>
				</button>
			</div>
		</form>

		<div class="app-contact-popup-privacy-wrapper">
			<p>By clicking 'Send' I agree with <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink></p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, defineEmits } from 'vue';
	import { contactFormValidator } from '@/utils/contactFormValidator';
	import { postRequest } from '@/utils/postRequest';

	const emit = defineEmits(['formSubmitted']);

	const form = ref<HTMLFormElement | null>(null);
	const request = ref<boolean>(false);
	const fieldErrorDefault = {field: '', message: ''};
	const fieldError = ref<{field: string, message: string}>(fieldErrorDefault);
	const errorsMessages: Record<string, string> = {
		email: 'Error in the Email field',
		message: 'Error in the Message field',
		serverError: 'Error during request'
	}

	const change = (key: string) => {
		if ( !fieldError.value.field || fieldError.value.field === key ) {
			fieldError.value = {...fieldErrorDefault};
		}
	}
	
	const submit = async (e: Event) => {
		e.preventDefault();

		if ( request.value ) {
			return;
		}
		
		request.value = true;
		
		const data = form.value ? new FormData(form.value) : new FormData();
		const validatorResults = contactFormValidator(data);

		if ( validatorResults.error && errorsMessages[validatorResults.field] ) {
			fieldError.value = {
				field: validatorResults.field,
				message: errorsMessages[validatorResults.field]
			}

			request.value = false;

			return;
		}

		try {
			const response = await postRequest('contact-tickets', data);
			if ( !response.error ) {
				form.value?.reset();
				emit('formSubmitted', response.message);
			} else {
				fieldError.value.message = response.message;
			}
		} catch (error) {
			fieldError.value.message = errorsMessages['serverError'];
		} finally {
			request.value = false;
		}
	}
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

	.app-form-field-submit {
		width: 100%;
		padding: 15px 20px;
	}

	.app-contact-popup-privacy-wrapper,
	.app-contact-popup-privacy-wrapper a {
		font-size: 12px;
		text-align: center;
		color: var(--text-secondary);
	}

	.app-contact-popup-privacy-wrapper a {
		text-decoration: underline;
	}

	.app-form-error-message-wrapper {
		font-size: 14px;
		color: var(--accent2);
		margin-bottom: 20px;
	}

	.app-form-field-wrapper {
		margin-bottom: 15px;
	}

	.app-form-field-submit {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 50px;
		padding: 15px 20px;
	}

	.app-form-loader {
		width: 25px;
		height: 25px;
	}

	.app-form-field-error input,
	.app-form-field-error textarea {
		border-color: var(--accent2);
	}

	.app-contact-form-desc {
		margin-bottom: 15px;
	}

	.app-contact-form-desc,
	.app-contact-form-desc a {
		color: var(--text-secondary);
	}

	.app-contact-form-desc a {
		text-decoration: underline;
	}
</style>