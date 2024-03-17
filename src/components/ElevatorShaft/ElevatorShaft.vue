<script setup>
import { defineProps, reactive } from "vue";
// компоненты
import CallButton from "../CallButton/CallButton.vue";
import ElevatorCabin from "../ElevatorCabin/ElevatorCabin.vue";

const props = defineProps({
   configuration: {
      type: Object,
      required: true,
   },
});

// состояние лифтов
const elevatorShafts = reactive(
   Array.from({ length: props.configuration.shaftCount }, () => ({
      currentFloor: 1,
      targetFloor: 1,
      moving: false,
   }))
);
</script>

<template>
   <div class="elevator-shaft">
      <ul class="cabin-list">
         <ElevatorCabin
            v-for="(elevator, index) in elevatorShafts"
            :key="index"
            :floorCount="configuration.floors"
         />
      </ul>
      <ul class="button-list">
         <CallButton
            v-for="floor in configuration.floors"
            :key="floor"
            :floor="floor"
         />
      </ul>
   </div>
</template>

<style scoped>
.elevator-shaft {
   position: absolute;
   left: 0;
   top: 0;
   display: flex;
   gap: 1rem;
   height: 100vh;
   padding: 0 2rem;
   background-color: #fac0b2;
}

.cabin-list {
   display: flex;
   gap: 1rem;
}

.button-list {
   display: flex;
   flex-direction: column-reverse;
   justify-content: space-around;
}
</style>
