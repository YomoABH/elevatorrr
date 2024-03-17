<script setup>
import { defineProps } from "vue";

const props = defineProps({
   floor: {
      type: Number,
      required: true,
   },
});
</script>
<template>
   <li>
      <button>{{ floor }}</button>
   </li>
</template>

<style>
.call-button {
   background-color: #ffffff;
}
</style>
