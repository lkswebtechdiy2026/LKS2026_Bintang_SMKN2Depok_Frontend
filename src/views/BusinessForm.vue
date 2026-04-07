<script setup lang="ts">
import { reactive } from 'vue'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

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

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Nama Usaha" name="nama_usaha">
      <UInput v-model="state.nama_usaha" />
    </UFormField>

    <UFormField label="NIB" name="nib">
      <UInput v-model="state.nib" />
    </UFormField>
    <UFormField label="NPWP" name="npwp">
      <UInput v-model="state.nib" />
    </UFormField>
    <UFormField label="Omzet Bulanan" name="omzet_bulanan">
      <UInput v-model="state.omzet_bulanan" />
    </UFormField>
    <UFormField label="Jumlah Karyawan" name="jumlah_karyawan">
      <UInput v-model="state.jumlah_karyawan" />
    </UFormField>
    <UFormField label="Lama Berdiri" name="lama_usaha_tahun">
      <UInput v-model="state.lama_usaha_tahun" />
    </UFormField>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>
