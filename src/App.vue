<script setup>
import ElevatorShaft from "./components/ElevatorShaft/ElevatorShaft.vue";

// единственное что, после изменения конфига нужно чистить localStorage
const configuration = {
   floors: 5,
   shaftCount: 5,
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
