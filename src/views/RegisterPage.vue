<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <UPageCard class="w-full max-w-md mt-16">
      <UAuthForm title="Login" description="Silahkan login untuk melanjutkan" :fields="fields" />
    </UPageCard>
  </div>
</template>

<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'
import * as z from 'zod'

const toast = useToast()

const fields: AuthFormField[] = [
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
]

const schema = z.object({
  email: z.email('Email tidak valid!'),
  password: z.string('Password tidak valid!').min(6, 'Minimal 6 karakter'),
})

type Schema
</script>

<style scoped></style>
