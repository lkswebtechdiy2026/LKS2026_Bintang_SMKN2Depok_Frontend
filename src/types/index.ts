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

export interface Business {
  id: string
  nama_usaha: string
  nib: string
  npwp: string
  omzet_bulanan: number
  jumlah_karyawan: number
  lama_usaha_tahun: number
  user?: User
  status: string
  rejected_reason: string
  verified_by: string
}
