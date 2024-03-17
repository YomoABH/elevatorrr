function prepareDataForStorage(elevatorShafts, globalQueue) {
   const elevatorShaftsData = elevatorShafts.map((lift) => ({
      currentFloor: lift.currentFloor,
      targetFloor: lift.targetFloor,
      moving: false,
   }));

   return {
      elevatorShafts: elevatorShaftsData,
      globalQueue: globalQueue.value.slice(),
   };
}

export function loadStateFromLocalStorage() {
   const elevatorShaftsData = JSON.parse(
      localStorage.getItem("elevatorShafts")
   );
   const globalQueueData = JSON.parse(localStorage.getItem("globalQueue"));
   return { elevatorShaftsData, globalQueueData };
}

export function saveStateToLocalStorage(elevatorShafts, globalQueue) {
   const data = prepareDataForStorage(elevatorShafts, globalQueue);
   localStorage.setItem("elevatorShafts", JSON.stringify(data.elevatorShafts));
   localStorage.setItem("globalQueue", JSON.stringify(data.globalQueue));
}
