<script setup>
import ElevatorShaft from "./components/ElevatorShaft/ElevatorShaft.vue";

const configuration = {
   floors: 7,
   shaftCount: 3,
};
</script>

<template>
   <div class="app"></div>
   <ElevatorShaft :configuration="configuration" />
</template>

<style>
@import "./assets/reset.css";
@import "./assets/base.css";

.app {
   width: 100vw;
   height: 100vh;
   background-color: #ffd2c7;
}
</style>
