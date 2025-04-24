<template>
	<div class="app-package-item-wrapper" :class="classes">
		<div class="app-package-item" @click="itemSelect">
			<div class="app-package-item-info app-package-item-info-esim">
				<span class="app-package-item-info-main">{{ info1 }}</span>
				<span class="app-package-item-info-secondary">{{ itemData.info1Desc }}</span>
			</div>

			<div class="app-package-item-info app-package-item-info-vpn">
				<span class="app-package-item-info-main">
					<span class="app-package-item-info-infinity" v-if="!itemData.info2">∞</span>
					{{ info2 }}
				</span>
				<span class="app-package-item-info-secondary">{{ itemData.info2Desc }}</span>
			</div>

			<div class="app-package-item-info app-package-item-info-sale">
				<span class="app-package-item-info-main" v-if="itemData.sale">
					<span class="app-package-item-sale-coupon">{{ itemData.sale }}</span>
				</span>
			</div>

			<div class="app-package-item-info app-package-item-price">
				<span class="app-package-item-info-main">
					<span class="app-package-item-price">{{ price }}</span>
				</span>
				<span class="app-package-item-info-secondary" v-if="itemData.sale">
					<span class="app-package-item-sale-price">{{ itemData.price }}</span>
				</span>
			</div>

			<div class="app-package-item-info app-package-item-select">
				<label class="app-custom-radio-wrapper">
					<input type="radio" name="package" :value="itemData.value" :checked="itemData.selected" >
					<span class="app-custom-radio-check"></span>
					<span class="app-custom-radio-option"></span>
				</label>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits, PropType, ref, Prop, computed, } from 'vue';
	import { PackageListItemType } from '@/types';

	const props = defineProps({
		itemData: {
			type: Object as PropType<PackageListItemType>,
			required: true
		}
	});

	const info1 = computed(() => {
		return props.itemData.info1 + ' ' + props.itemData.info1Unit;
	});

	const info2 = computed(() => {
		return props.itemData.info2 + ' ' + props.itemData.info2Unit;
	});

	const price = computed(() => {
		return props.itemData.sale ? props.itemData.salePrice : props.itemData.price;
	});

	const classes = computed(() => {
		return {
			'app-package-item-selected': props.itemData.selected,
			'app-package-item-sale': props.itemData.sale
		}
	})

	const emit = defineEmits(['itemSelect']);
	const itemSelect = () => {
		emit('itemSelect');
	}
</script>

<style scoped>
	.app-package-item {
		display: flex;
		align-items: center;
	}

	.app-package-item-select {
		width: 20px;
	}

	.app-package-item-info:not(:last-child) {
		padding-right: 20px;
	}

	.app-package-item-info > span {
		display: flex;
		align-items: center;
	}

	.app-package-item-info-main {
		font-size: 20px;
		font-weight: bold;
	}

	.app-package-item-info-infinity {
		font-size: 170%;
		line-height: 0;
	}

	.app-package-item-info-secondary {
		font-size: 14px;
		color: var(--text-secondary);
	}

	.app-package-item {
		position: relative;
		padding: 10px 20px;
		border: 2px solid var(--white-transparent-1);
		border-radius: 12px;
		transition: 0.5s;
		cursor: pointer;
	}

	.app-package-item-selected .app-package-item {
		border-color: var(--primary-color);
	}

	.app-package-item-price,
	.app-package-item-sale-price {
		white-space: nowrap;
	}

	.app-package-item-sale-price {
		text-decoration: line-through;
	}

	.app-package-item-price > span {
		justify-content: flex-end;
	}
	
	.app-package-item-info-esim,
	.app-package-item-info-vpn,
	.app-package-item-info-sale {
		width: 33.3333%;
	}

	.app-package-item-sale .app-package-item-price {
		color: var(--accent);
	}

	.app-package-item-wrapper:not(:last-child) {
		margin-bottom: 7px;
	}

	.app-package-item-sale-coupon {
		font-size: 12px;
		line-height: 1;
		background: linear-gradient(270deg, #B947FF 0%, #8A73FF 100%);
		padding: 4px 8px;
		mask: 
			radial-gradient( circle at top 50% left -1px,    transparent 4px, black 4px), 
			radial-gradient( circle at top 50% right -1px, transparent 4px, black 4px),
			linear-gradient(black,black);
		-webkit-mask: 
			radial-gradient( circle at top 50% left -1px,    transparent 4px, black 4px), 
			radial-gradient( circle at top 50% right -1px, transparent 4px, black 4px),
			linear-gradient(black,black);
		-webkit-mask-composite: destination-in;
		mask-composite: exclude;
	}

	@media (max-width: 500px) {
		.app-package-item-info-sale {
			position: absolute;
			top: -5px;
			right: -13px;
			width: auto;
		}

		.app-package-item-info-esim,
		.app-package-item-info-vpn {
			width: 50%;
		}

		.app-package-item-info-main {
			font-size: 14px;
		}

		.app-package-item-info-secondary {
			font-size: 10px;
		}

		.app-package-item {
			padding: 10px 15px;
		}

		.app-package-item-sale-coupon {
			font-size: 8px;
			padding: 4px 6px;
		}

		.app-package-item-select {
			width: 14px;
		}
	}
</style>