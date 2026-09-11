const user = {
    name: 'abcdg',
    age: 25,
    city: 'Dhaka',
}

// const name = user.name
// const age = user.age
// const city = user.city

const name = 'Hello'

const {name:newName, age, city} = user

const arr = [10, 20, 30]

// const first = arr[0]
// const second = arr[1]

const [first, second] = arr

console.log(first, second);

/**
 * const [user, setUser] = useState()
 * 
*/