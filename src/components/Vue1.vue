<script setup lang="ts">
import {w} from './re.ts'

import { inject } from 'vue'

const message = inject('message')

</script>

<template>
  <div style="border: 2px solid green">
  test {{w}}
<hr>
  injected - {{message}}
  </div>
</template>

<style scoped>

</style>
