<script setup>
import { defineProps } from "vue";
// компоненты
import IndicatorBoard from "../IndicatorBoard/IndicatorBoard.vue";

const props = defineProps({
   floorCount: {
      type: Number,
      required: true,
   },
});
</script>

<template>
   <li class="cabine">
      <div
         :style="{
            height: 100 / floorCount + 'vh',
         }"
      >
         <IndicatorBoard />
      </div>
   </li>
</template>

<style scoped>
.cabine {
   height: 100vh;
   width: 15rem;
   background-color: #fff;

   position: relative;
}
.cabine div {
   width: 90%;
   position: absolute;
   left: 50%;

   transform: translate(-50%, 0);
   background-color: #000000;
   transition: bottom 0.1s linear;
}
</style>
