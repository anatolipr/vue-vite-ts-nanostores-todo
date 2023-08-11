<script setup lang="ts">
import {w} from './re.ts'
import {inject, Ref} from "vue";

defineProps<{
  buttonText: number
}>()

const message :Ref<string> | undefined = inject<Ref<string>>('message')

function click() {
  w.value ++;
  if (message) {
    message.value = "xxx";
  }
}



</script>

<template>
  <div style="border: 2px solid green">
    <button @click="click">{{buttonText}}</button>
  </div>

</template>

<style scoped>

</style>
