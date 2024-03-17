<script setup>
import { defineProps, defineEmits, computed, toRefs } from "vue";

const props = defineProps({
   floor: {
      type: Number,
      required: true,
   },
   elevatorShafts: {
      type: Object,
      required: true,
   },
   globalQueue: {
      type: Array,
      required: true,
   },
});
const { floor, elevatorShafts, globalQueue } = props;

const emit = defineEmits(["callElevator"]);

const isTarget = computed(() => {
   return elevatorShafts.some(
      (lift) =>
         lift.targetFloor === floor && lift.targetFloor !== lift.currentFloor
   );
});

const isInQueue = computed(() => {
   return globalQueue.includes(floor);
});

const isCorrectFloor = computed(() => {
   return elevatorShafts.every(
      (lift) =>
         lift.currentFloor !== lift.targetFloor ||
         lift.currentFloor !== props.floor
   );
});

const handleCallElevatorButtonClick = () => {
   if (!isInQueue.value && !isTarget.value && isCorrectFloor.value) {
      emit("callElevator", floor);
   }
};
</script>
<template>
   <li>
      <button
         class="call-button"
         :class="{ target: isTarget, inQueue: isInQueue }"
         @click="handleCallElevatorButtonClick"
      >
         {{ floor }}
      </button>
   </li>
</template>

<style>
.call-button {
   background-color: #ffffff;
}

.target {
   background-color: #f9d001;
}
.inQueue {
   background-color: #f9d001;
}
</style>
