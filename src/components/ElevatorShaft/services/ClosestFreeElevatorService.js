export function findClosestFreeLiftIndex(targetFloor, elevatorShafts) {
   let minDistance = Infinity;
   let closestLiftIndex = -1;
   for (let i = 0; i < elevatorShafts.length; i++) {
      const lift = elevatorShafts[i];
      if (!lift.moving) {
         const distance = Math.abs(lift.currentFloor - targetFloor);
         if (distance < minDistance) {
            minDistance = distance;
            closestLiftIndex = i;
         }
      }
   }
   return closestLiftIndex;
}
