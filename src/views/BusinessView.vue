<template>
  <div class="">
    <UCard v-if="role !== 'verifier'">
      <h3 class="font-semibold font-sans text-2xl">Informasi Verifikasi Bisnis</h3>
    </UCard>
    <UCard class="" v-else>
      <h4>Reviewer Approval</h4>
      <UTable :data="business" />
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api/axios'
import type { ApiResponse, Business } from '@/types'
import { onMounted, ref } from 'vue'

const isLoading = ref(false)
const business = ref<Business | null>()
const toast = useToast()
const role = localStorage.getItem('role')
console.log(role)
const fetchBusiness = async () => {
  isLoading.value = true

  try {
    const res = await api.get<ApiResponse<Business>>('/business-verifications')
    business.value = res.data.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.add({
      title: 'Terjadi kesalahan',
      description: err.response.data.message,
      color: 'error',
    })
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchBusiness)
</script>

<style lang="css" scoped></style>
