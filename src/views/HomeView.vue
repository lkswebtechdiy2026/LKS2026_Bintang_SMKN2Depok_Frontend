<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import { ref } from 'vue'

const links = ref<ButtonProps[]>([
  {
    label: 'Mulai Pinjaman',
    to: '/register',
    icon: 'i-lucide-arrow-right',
  },
  {
    label: 'Tentang Kami',
    to: '/tentang-kami',
    color: 'neutral',
    variant: 'subtle',
  },
])
</script>

<template>
  <main>
    <UPageHero
      title="Digital Pembiayaan UMKM"
      description="Sejahterakan UMKM dengan program pembiayaan Digital Pembiayaan UMKM Nasional"
      :links="links"
    />
  </main>
</template>
