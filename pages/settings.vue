<script setup lang="ts">
import useGeneralStore from '~/stores/general'

const generalStore = useGeneralStore()
const getCurrentDate = (): string => {
	const now = new Date()
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		fractionalSecondDigits: 3
	}
	return now.toLocaleString('ru-RU', options).replace(',', '')
}

const listCurrencyOptions: string[] = [
	'BTCUSDT',
	'BNBBTC',
	'ETHBTC'
]

const isOpenSelect = ref<boolean>(false)

const selectedCurrency = computed(() => {
	return generalStore.selectedCurrency
})

const logsCurrency = computed(() => {
	return generalStore.logsCurrency
})

const isLoading = computed(() => {
	return generalStore.isLoading
})

const selectCurrency = (currency: string): void => {
	if (selectedCurrency.value === currency || isLoading.value) {
		isOpenSelect.value = false
		return
	}

	generalStore.selectCurrency(currency)
	generalStore.updLogsCurrency({ currency, date: getCurrentDate() })
	isOpenSelect.value = false
	// generalStore.updateCurrency()
}

const clearLogs = (): void => {
	generalStore.clearLogs()
}
</script>

<template>
	<div>
		<div>settings</div>
		<USelectMenu
			v-model:open="isOpenSelect"
			v-model="selectedCurrency"
			:options="listCurrencyOptions"
			@update:model-value="selectCurrency"
		/>

		<UButton
			v-if="logsCurrency.length"
			color="white"
			label="Clear logs"
			class="mt-4"
			@click="clearLogs"
		/>

		<LazyCurrencyLogs
			v-if="logsCurrency.length"
			:logs-currency="logsCurrency"
		/>
	</div>
</template>
