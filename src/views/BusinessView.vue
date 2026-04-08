<template>
  <div class="grid grid-cols-2 gap-4">
    <UCard>
      <h3 class="font-semibold font-sans text-2xl pb-4">Status Bisnis</h3>
      <UBadge color="primary" class="text-sm mb-4">{{ business?.status }}</UBadge>
      <p v-if="business?.status === 'verified'">
        Telah disetujui Verifier, dapat Mengajukan pinjaman
      </p>
      <p v-if="business?.status === 'rejected'">Tidak disetujui Verifier</p>
      <p v-if="business?.status === 'submitted'" class="pt-4">Menunggu verifikasi usaha...</p>
    </UCard>
    <UCard>
      <h3 class="font-semibold font-sans text-2xl">Informasi Verifikasi Bisnis</h3>
      <p class="font-medium pt-4">Nama Usaha: {{ business?.nama_usaha }}</p>
      <p>Nomor Induk Berusaha: {{ business?.nib }}</p>
      <p>Nomor Pokok Wajib Pajak: {{ business?.npwp }}</p>
      <p>Omzet Bulanna: {{ formatRupiah(Number(business?.omzet_bulanan)) }}</p>
      <p>Jumlah Karyawan: {{ business?.jumlah_karyawan }}</p>
      <p>Lama Berdiri: {{ business?.lama_usaha_tahun }} tahun</p>
    </UCard>
    <UCard v-show="role !== 'applicant'" class="col-span-3">
      <h3 class="font-semibold font-sans text-2xl">Verifikasi Usaha</h3>
    </UCard>
    <UCard v-show="business?.status === 'verified'" class="col-span-3">
      <h3 class="font-semibold font-sans text-2xl grid-cols-subgrid">Financing Application</h3>
      <UButton class="font-medium mt-4" @click="router.push('/dashboard/new-financing')"
        >Ajukan Pinjaman</UButton
      >

      <p class="pt-4">Tidak ada pinjaman aktif</p>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api/axios'
import router from '@/router'
import type { ApiResponse, Business } from '@/types'
import { formatRupiah } from '@/utils'
import { onMounted, ref } from 'vue'

const isLoading = ref(false)
const business = ref<Business>()
const toast = useToast()
const role = localStorage.getItem('role')

const fetchBusiness = async () => {
  isLoading.value = true
  const businessId = localStorage.getItem('businessId')

  try {
    const res = await api.get<ApiResponse<Business>>(`/business-verifications/${businessId}`)
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

onMounted(() => {
  fetchBusiness()
  if (role !== 'applicant') {
    router.push('/dashboard/business-verification')
  }
})
</script>

<style lang="css" scoped></style>
