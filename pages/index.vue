<script setup lang="ts">

import useGeneralStore from '~/stores/general'

const generalStore = useGeneralStore()
const isOpenSelect = ref(false)
const listLimits = ['100', '500', '1000']

const selectedLimit = computed(() => {
  return generalStore.selectedLimit
})

const selectedCurrency = computed(() => {
  return generalStore.selectedCurrency
})

const isLoading = computed(() => {
  return generalStore.isLoading
})

const asks = computed(() => {
  return generalStore.ordersBook[selectedCurrency.value]?.asks || []
})

const bids = computed(() => {
  return generalStore.ordersBook[selectedCurrency.value]?.bids || []
})

const selectLimit = (value: string): void => {
  if (selectedLimit.value === value || isLoading.value) {
    isOpenSelect.value = false
    return
  }

  generalStore.selectLimit(value)
  isOpenSelect.value = false
  generalStore.updateCurrency()
}


const startCurrencyCheck = async (): Promise<void> => {
  try {
    await generalStore.updateCurrency()
    generalStore.streamData()
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  startCurrencyCheck()
})

onBeforeUnmount(() => {
  generalStore.closeStream()
})

</script>

<template>
  <div>
    <div class="mb-4">
      <div>Buy: {{ selectedCurrency }}</div>
    </div>
    <USelectMenu
      v-model:open="isOpenSelect"
      v-model="selectedLimit"
      :options="listLimits"
      @update:model-value="selectLimit"
    />

    <div
      v-if="asks.length || bids.length"
      class="flex flex-col justify-between mt-4 gap-4 md:flex-row"
    >
      <LazyOrderBook
        v-if="asks.length"
        :data="asks"
        title="Asks"
      />

      <LazyOrderBook
        v-if="bids.length"
        :data="bids"
        title="Bids"
      />

    </div>
  </div>
</template>
