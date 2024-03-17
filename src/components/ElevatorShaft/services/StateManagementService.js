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

export function loadStateFromLocalStorage(shaftCount) {
   const elevatorShaftsData = loadItemFromLocalStorage("elevatorShafts");
   const globalQueueData = loadItemFromLocalStorage("globalQueue");

   if (!isValidData(elevatorShaftsData, globalQueueData, shaftCount)) {
      clearLocalStorage();
      return { elevatorShaftsData: null, globalQueueData: null };
   }

   return { elevatorShaftsData, globalQueueData };
}

function loadItemFromLocalStorage(key) {
   const rawData = localStorage.getItem(key);
   return rawData ? JSON.parse(rawData) : null;
}

function isValidData(elevatorShaftsData, globalQueueData, shaftCount) {
   return (
      Array.isArray(elevatorShaftsData) &&
      elevatorShaftsData.length === shaftCount &&
      Array.isArray(globalQueueData)
   );
}

function clearLocalStorage() {
   localStorage.removeItem("elevatorShafts");
   localStorage.removeItem("globalQueue");
}

export function saveStateToLocalStorage(elevatorShafts, globalQueue) {
   const data = prepareDataForStorage(elevatorShafts, globalQueue);
   localStorage.setItem("elevatorShafts", JSON.stringify(data.elevatorShafts));
   localStorage.setItem("globalQueue", JSON.stringify(data.globalQueue));
}
