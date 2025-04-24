<template>
	<NuxtLayout>
		<h1>{{ error.statusCode }}</h1>
    	<p>{{ error.message }}</p>
	</NuxtLayout>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';

	const props = defineProps({
		error: {
		type: Object,
			required: true
		}
	});
</script>