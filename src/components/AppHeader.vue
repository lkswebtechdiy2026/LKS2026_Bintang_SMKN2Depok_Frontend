<template>
  <UHeader class="primary" mode="slideover">
    <template #title><RouterLink to="/" class="text-primary">LKS-WEB-TECH</RouterLink></template>
    <template #right>
      <UNavigationMenu :items="navItems" class="hidden lg:flex" />
      <RouterLink
        to="/register"
        v-show="!isAuth"
        class="border px-3 py-2 rounded-lg hover:bg-primary hover:text-slate-200 transition hidden lg:flex"
        >Daftar Sekarang</RouterLink
      >
      <RouterLink
        to="/dashboard"
        v-show="isAuth"
        class="border px-3 py-2 rounded-lg hover:bg-primary hover:text-slate-200 transition hidden lg:flex"
        >Dashboard</RouterLink
      >
      <UColorModeButton />
    </template>
    <template #body>
      <UNavigationMenu :items="navItems" class="block lg:hidden" orientation="vertical" />
      <div class="flex flex-col">
        <RouterLink to="/register" v-show="!isAuth" class="hidden lg:flex"
          >Daftar Sekarang</RouterLink
        >
        <RouterLink to="/dashboard" v-show="isAuth" class="hidden lg:flex">Dashboard</RouterLink>
      </div>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { ref } from 'vue'

const isAuth = localStorage.getItem('token')

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
