<script setup lang="ts">
import {w} from './re.ts'
import { useStore } from '@nanostores/vue'

import { admins } from "../store/admins.ts";


import { inject } from 'vue'
import {User} from "../store/users.ts";

const message = inject('message')

let ads :User[] = useStore(admins);

</script>

<template>
  <div style="border: 2px solid green">
  test {{w}}
<hr>
  injected - {{message}}
  </div>

  <div style="background-color: aquamarine">
    <div v-for="admin in ads">
      {{admin.username}}
    </div>
  </div>
</template>

<style scoped>

</style>
