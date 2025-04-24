<template>
	<div class="app-page-content" v-html="content"></div>
</template>

<script setup lang="ts">
	const content = inject<string>('content');
</script>