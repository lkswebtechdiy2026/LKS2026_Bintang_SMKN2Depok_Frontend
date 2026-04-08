<template>
  <div class="">
    <UCard class="">
      <h4 class="font-semibold text-lg">Reviewer Approval</h4>
      <UTable :columns="column" :data="business" :loading="isLoading" />
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/api/axios'
import type { ApiResponse, Business } from '@/types'
import type { TableColumn } from '@nuxt/ui'
import { h, onMounted, ref, resolveComponent } from 'vue'

const isLoading = ref(false)
const business = ref<Business[]>()
const toast = useToast()
const role = localStorage.getItem('role')
console.log(role)
const UBadge = resolveComponent('UBadge')

const column: TableColumn<Business>[] = [
  {
    accessorKey: 'nama_usaha',
    header: 'Nama Usaha',
  },
  {
    accessorKey: 'npwp',
    header: 'NPWP',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        submitted: 'info' as const,
        verified: 'success' as const,
        rejected: 'error' as const,
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status'),
      )
    },
  },
  {
    accessorKey: 'omzet_bulanan',
    header: 'Omzet Bulanan',
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('omzet_bulanan'))
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(amount)
    },
  },
]
const fetchBusiness = async () => {
  isLoading.value = true

  try {
    const res = await api.get<ApiResponse<Business>>('/business-verifications')
    business.value = Array.isArray(res) ? [res.data.data] : res.data.data
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

onMounted(fetchBusiness)
</script>

<style lang="css" scoped></style>
