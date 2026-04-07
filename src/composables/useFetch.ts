import { ref } from 'vue'

export const useFetch = <T>(endpoint: string) => {
  const data = ref<T>
  const isLoading = ref(false)
  const error = ref<string | null>()
}
