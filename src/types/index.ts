export interface ApiResponse<T> {
  status: boolean
  message?: string
  data?: T
}

export interface User {
  id: string
  name: string
  email: string
  role: string
}
