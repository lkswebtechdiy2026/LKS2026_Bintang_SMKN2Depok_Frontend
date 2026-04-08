<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { api } from '@/api/axios'
import router from '@/router'

const schema = z.object({
  nama_usaha: z.string('Nama Usaha tidak valid!'),
  nib: z.string('NIB tidak valid').min(8, 'Minimal 8 karakter'),
  npwp: z.string('NPWP tidak valid!').min(8, 'Minimal 8 karakter'),
  omzet_bulanan: z.number('Omzet Bulanan tidak valid!'),
  jumlah_karyawan: z.number('Jumlah Karyawan tidak valid!'),
  lama_usaha_tahun: z.number('Lama Usaha tidak valid!'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  nama_usaha: '',
  nib: '',
  npwp: '',
  omzet_bulanan: 0,
  jumlah_karyawan: 0,
  lama_usaha_tahun: 0,
})

const toast = useToast()
const isLoading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  try {
    const res = await api.post('/business-verifications', event.data)
    const businessId = res.data.data.id

    localStorage.setItem('businessId', businessId)
    toast.add({
      title: 'Berhasil membuat verifikasi bisnis!',
      description: 'Form verifikasi bisnis berhasil dibuat',
      color: 'success',
    })

    router.push(`/dashboard/business${businessId}`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.add({ title: 'Terjadi kesalahan!', description: err.response.data.message })
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  if (localStorage.getItem('businessId')) {
    router.push('/dashboard/business')
  }
})
</script>

<template>
  <UCard class="flex justify-center items-center w-full">
    <h1 class="font-semibold font-sans text-xl pb-4 pt-8">Form Pengajuan Usaha</h1>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 grid grid-cols-2 gap-4"
      @submit="onSubmit"
    >
      <UFormField label="Nama Usaha" name="nama_usaha">
        <UInput v-model="state.nama_usaha" />
      </UFormField>

      <UFormField label="NIB" name="nib">
        <UInput v-model="state.nib" />
      </UFormField>
      <UFormField label="NPWP" name="npwp">
        <UInput v-model="state.npwp" />
      </UFormField>
      <UFormField label="Omzet Bulanan" name="omzet_bulanan">
        <UInput v-model="state.omzet_bulanan" type="number" />
      </UFormField>
      <UFormField label="Jumlah Karyawan" name="jumlah_karyawan">
        <UInput v-model="state.jumlah_karyawan" type="number" />
      </UFormField>
      <UFormField label="Lama Berdiri" name="lama_usaha_tahun">
        <UInput v-model="state.lama_usaha_tahun" type="number" />
      </UFormField>

      <UButton type="submit" :disabled="isLoading" class="max-w-16"> Submit </UButton>
    </UForm>
  </UCard>
</template>
