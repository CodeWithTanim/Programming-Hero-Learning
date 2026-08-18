"use strict";
// Write a generic function getLastElement<T> that returns the last element of an array. Test with number[] and string[].
Object.defineProperty(exports, "__esModule", { value: true });
function getLastElement(arr) {
    return arr[arr.length - 1];
}
;
console.log(getLastElement([10, 20, 30]));
console.log(getLastElement(["a", "b", "c"]));
//# sourceMappingURL=Task-5.js.map