<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <UPageCard class="w-full max-w-md mt-16">
      <UAuthForm
        title="Register"
        description="Silahkan register untuk memulai"
        :schema="schema"
        :fields="fields"
        @submit="onSubmit"
        :loading="isLoading"
      />
    </UPageCard>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api/axios'
import router from '@/router'
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import { ref } from 'vue'
import * as z from 'zod'

const toast = useToast()
const isLoading = ref(false)

const fields: AuthFormField[] = [
  {
    name: 'name',
    type: 'string',
    label: 'Nama',
    placeholder: 'Masukan nama anda...',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Masukan email anda...',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Masukan password anda...',
    required: true,
  },
  {
    name: 'password_confirmation',
    type: 'password',
    label: 'Ulangi Password',
    placeholder: 'Ulangi password anda...',
    required: true,
  },
]

const schema = z.object({
  name: z.string('Nama tidak valid!'),
  email: z.email('Email tidak valid!'),
  password: z.string('Password tidak valid!').min(6, 'Minimal 6 karakter'),
  password_confirmation: z.string('Password tidak valid!'),
})

type Schema = z.output<typeof schema>

const onSubmit = async (payload: FormSubmitEvent<Schema>) => {
  isLoading.value = true

  try {
    const res = await api.post('/auth/register', payload.data)
    const token = res.data.data.token
    const role = res.data.data.user?.role

    localStorage.setItem('token', token)
    localStorage.setItem('role', role)

    router.push('/dashboard/new-business')
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
</script>

<style scoped></style>
