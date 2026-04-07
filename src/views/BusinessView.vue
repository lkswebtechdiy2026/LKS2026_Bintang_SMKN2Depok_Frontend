<template>
  <div>
    <pre>{{ user }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '@/composables/useUser'
import { onMounted } from 'vue'

const { user, fetchUser } = useUser()
onMounted(fetchUser)
</script>

<style lang="css" scoped></style>
