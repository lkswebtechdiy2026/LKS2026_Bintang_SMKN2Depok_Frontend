import type { User } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>()
  const user = ref<User | null>()
})
