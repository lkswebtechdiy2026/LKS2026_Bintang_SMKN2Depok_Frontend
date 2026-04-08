<template>
  <div>
    <h3 class="font-bold text-lg">Selamat datang, {{ user?.name }}!</h3>
    <div class="grid">
      <UCard>
        <p class="">Business Verification</p>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api/axios'
import type { User } from '@/types'
import { onMounted, ref } from 'vue'

const user = ref<User | null>()

const fetchUser = async () => {
  const res = await api.get('/auth/me')

  user.value = res.data.data
}

onMounted(fetchUser)
</script>

<style scoped></style>
