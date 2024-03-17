<script setup>
import { watch, defineProps, ref, reactive, defineEmits } from "vue";
//компоненты
import IndicatorBoard from "../IndicatorBoard/IndicatorBoard.vue";

const props = defineProps({
   elevatorState: {
      type: Object,
      required: true,
   },
   floorCount: {
      type: Number,
      required: true,
   },
   index: {
      type: Number,
      required: true,
   },
});
const { elevatorState, floorCount, index } = props;

const emit = defineEmits(["handleElevatorStateChanged"]);

// создаю копию, дабы не мутировать напрямую
const state = reactive(elevatorState);
// для табла информации
const direction = ref("");

const moveElevator = () => {
   if (state.moving) return;

   state.moving = true;
   const moveDirection = Math.sign(state.targetFloor - state.currentFloor);
   direction.value = moveDirection === 1 ? "Вверх" : "Вниз";

   // интервал для движения этаж в сек
   const elevatorInterval = setInterval(() => {
      state.currentFloor += moveDirection;
      emit("handleElevatorStateChanged", [index, state]);

      const reachedTargetFloor = state.currentFloor === state.targetFloor;
      if (reachedTargetFloor) {
         clearInterval(elevatorInterval);
         // имитация отдыха
         setTimeout(() => {
            state.moving = false;
            emit("handleElevatorStateChanged", [index, state]);
         }, 3000);
      }
   }, 1000);
};

watch(
   () => elevatorState.targetFloor,
   (newTargetFloor) => {
      state.targetFloor = newTargetFloor;
      moveElevator();
   }
);
</script>

<template>
   <li class="cabine">
      <div
         :style="{
            height: 100 / floorCount + 'vh',
            bottom: (100 / floorCount) * (state.currentFloor - 1) + 'vh',
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
