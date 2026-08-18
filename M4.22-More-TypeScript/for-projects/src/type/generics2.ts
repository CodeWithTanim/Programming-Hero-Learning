// function useState (initialValue) {
//     let value = initialValue;
//     function setValue(newValue) {
//         value = newValue;
//     }
//     return [value, setValue];
// };

// const [counter, setCounter] = useState(0);
// console.log(counter);


// ---------------------------------------------
function useState<T> (initialValue: T) {
    let value = initialValue;
    function setValue(newValue: T) {
        value = newValue;
    };
    return [value, setValue];
};


useState<string>('0');
useState<number>(0);
useState<boolean>(false);




interface User {
    email: string,
    isLogggedIn: boolean
};

useState<User>({email: '', isLogggedIn: false});
useState<User | null>(null);

