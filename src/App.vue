<script setup lang="ts">
import Vue1 from "./components/Vue1.vue";
import Vue2 from "./components/Vue2.vue";
import {provide, ref} from "vue";

let value :string = 'xcxx';
provide('message', ref(value))

</script>

<template>
<Vue1/>
<Vue2 :button-text="123" />
</template>
