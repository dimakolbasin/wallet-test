<script setup lang="ts">

const linkList = [
  {
    name: 'Orders',
    url: '/'
  },
  {
    name: 'Settings',
    url: '/settings'
  }
]

</script>

<template>
  <header class="flex justify-between items-center sticky py-8 top-0 bg-light-primary z-10 w-full">
    <NuxtLink
      no-prefetch
      to="/"
    >
      <SvgoBit class="w-12 h-12" />
    </NuxtLink>

    <div class="flex gap-x-4 items-center">
      <NuxtLink
        v-for="link in linkList"
        :key="link.url"
        no-prefetch
        active-class="text-primary"
        :to="link.url"
      >{{link.name}}</NuxtLink>
    </div>
  </header>
</template>
