<script setup>
import { defineProps } from "vue";

const props = defineProps({
   targetFloor: {
      type: Number,
      required: true,
   },
   diraction: {
      type: String,
      required: true,
   },
});
</script>

<template>
   <div class="indicator">
      {{ `${diraction} на ${targetFloor}-й этаж` }}
   </div>
</template>

<style scoped>
.indicator {
   color: #fff;
   text-align: center;
   font-size: 1.4rem;
   font-weight: 600;
}
</style>
