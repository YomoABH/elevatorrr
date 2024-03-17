<script setup>
import CallButton from "../CallButton/CallButton.vue";
import ElevatorCabin from "../ElevatorCabin/ElevatorCabin.vue";
</script>

<template>
   <div class="elevator-shaft">
      <ul class="cabin-list">
         <ElevatorCabin
            v-for="(elevator, index) in elevatorShafts"
            :key="index"
         />
      </ul>
      <ul class="button-list">
         <CallButton v-for="floor in configuration.floors" :key="floor" />
      </ul>
   </div>
</template>

<style scoped></style>
