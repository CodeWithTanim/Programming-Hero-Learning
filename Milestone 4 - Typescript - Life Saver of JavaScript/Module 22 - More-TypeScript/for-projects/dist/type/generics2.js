"use strict";
// function useState (initialValue) {
//     let value = initialValue;
//     function setValue(newValue) {
//         value = newValue;
//     }
//     return [value, setValue];
// };
Object.defineProperty(exports, "__esModule", { value: true });
// const [counter, setCounter] = useState(0);
// console.log(counter);
// ---------------------------------------------
function useState(initialValue) {
    let value = initialValue;
    function setValue(newValue) {
        value = newValue;
    }
    ;
    return [value, setValue];
}
;
useState('0');
useState(0);
useState(false);
;
useState({ email: '', isLogggedIn: false });
useState(null);
//# sourceMappingURL=generics2.js.map