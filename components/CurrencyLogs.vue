<script setup lang="ts">
import type { CurrencyLog } from '~/stores/general/interfaces'

const props = defineProps<{
	logsCurrency: CurrencyLog[]
}>()

const logBlock = ref<HTMLElement | null>(null)

watch(() => props.logsCurrency, () => {
	logBlock?.value?.scrollTo(0, 0)
}, { deep: true })
</script>

<template>
	<div
		ref="logBlock"
		class="mt-8 h-32 overflow-y-auto border border-gray-200 rounded-md scrollbar-thin"
	>
		<transition-group
			tag="div"
			appear
		>
			<div
				v-for="item in logsCurrency"
				:key="item.date + item.currency"
			>
				{{ item.date }} - {{ item.currency }}
			</div>
		</transition-group>
	</div>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.v-move {
  transition: transform 0.5s ease;
}
</style>
