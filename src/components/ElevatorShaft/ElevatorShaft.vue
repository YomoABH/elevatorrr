<script setup>
import { reactive, ref, defineProps, watch } from "vue";
//компоненты
import CallButton from "../CallButton/CallButton.vue";
import ElevatorCabin from "../ElevatorCabin/ElevatorCabin.vue";
// сервисы
import { findClosestFreeLiftIndex } from "./services/ClosestFreeElevatorService.js";
import {
   saveStateToLocalStorage,
   loadStateFromLocalStorage,
} from "./services/StateManagementService.js";

const props = defineProps({
   configuration: {
      type: Object,
      required: true,
   },
});

const { elevatorShaftsData, globalQueueData } = loadStateFromLocalStorage();

const elevatorShafts = reactive(
   elevatorShaftsData ||
      Array.from({ length: props.configuration.shaftCount }, () => ({
         currentFloor: 1,
         targetFloor: 1,
         moving: false,
      }))
);
const globalQueue = ref(globalQueueData || []);

const handleElevatorCall = (floor) => {
   const closestLiftIndex = findClosestFreeLiftIndex(floor, elevatorShafts);
   if (closestLiftIndex !== -1) {
      sendElevatorToFloor(floor, closestLiftIndex);
   } else {
      globalQueue.value.push(floor);
   }
};

const handleGlobalQueue = () => {
   if (globalQueue.value.length > 0) {
      const nextFloor = globalQueue.value.shift();
      handleElevatorCall(nextFloor);
   }
};

const sendElevatorToFloor = (floor, liftIndex) => {
   elevatorShafts[liftIndex].targetFloor = floor;
};

elevatorShafts.forEach((lift) => {
   watch(
      () => lift.moving,
      (newState) => {
         if (!newState && globalQueue.value.length > 0) {
            handleGlobalQueue();
         }
      }
   );
});

watch(
   [elevatorShafts, globalQueue],
   () => {
      saveStateToLocalStorage(elevatorShafts, globalQueue);
   },
   { deep: true }
);
</script>

<template>
   <div class="elevator-shaft">
      <ul class="cabin-list">
         <ElevatorCabin
            v-for="(elevator, index) in elevatorShafts"
            :key="index"
            :elevatorState="elevator"
            :index="index"
            :floorCount="configuration.floors"
         />
      </ul>
      <ul class="button-list">
         <CallButton
            v-for="floor in configuration.floors"
            :key="floor"
            :floor="floor"
            :elevatorShafts="elevatorShafts"
            :globalQueue="globalQueue"
            @callElevator="handleElevatorCall"
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
