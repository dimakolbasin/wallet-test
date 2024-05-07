<script setup lang="ts">
defineProps<{
	data: [price: string, amount: string][]
	title: string
}>()

const selectItem = (price: string, amount: string): void => {
	alert(`You selected ${price} at ${amount}`)
}
</script>

<template>
	<div
		class="border p-4 bg-gray-100 rounded-lg w-full md:max-w-80"
	>
		<h1 class="text-center text-xl">
			{{ title }}
		</h1>
		<div class="flex justify-between px-3 py-2 border-b">
			<span class="font-medium">Price</span>
			<span class="text-gray-600">Amount</span>
		</div>
		<div class="h-64 overflow-y-auto scrollbar-thin">
			<ul class="w-full">
				<li
					v-for="[price, amount] in data"
					:key="price + amount"
					class="flex justify-between hover:bg-gray-200 px-3 py-2 cursor-pointer gap-x-6"
					@click="selectItem(price, amount)"
				>
					<span>{{ price }}</span>
					<span class="text-gray-600">{{ amount }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
