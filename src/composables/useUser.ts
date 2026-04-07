import { api } from '@/api/axios'
import type { User } from '@/types'
import { ref } from 'vue'

export const useUser = () => {
  const user = ref<User | null>()

  const fetchUser = async () => {
    const res = await api.get('/auth/me')

    user.value = res.data.data
  }

  return { user, fetchUser }
}
