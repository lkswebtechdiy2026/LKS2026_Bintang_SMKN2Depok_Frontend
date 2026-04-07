<template>
  <UHeader class="primary" mode="slideover">
    <template #title><RouterLink to="/">LKS-WEB-TECH</RouterLink></template>
    <template #right> <UNavigationMenu :items="navItems" class="hidden lg:flex" /></template>
    <template #body>
      <UNavigationMenu :items="navItems" class="block lg:hidden" orientation="vertical" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { ref } from 'vue'

const navItems = ref<NavigationMenuItem[]>([
  {
    label: 'Beranda',
    to: '/',
  },
  {
    label: 'Tentang Kami',
    to: '/tentang-kami',
  },
])
</script>

<style scoped></style>
