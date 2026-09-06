import { use } from 'react'
import UserCard from './UsersCard';

function Users({ usersDataPromise }) {

    const users = use(usersDataPromise);
    console.log(users);

    return (
        <div>
            <h2>Users: {users.length}</h2>
            {
                users.map(user => <UserCard user={user}></UserCard>)
            }
        </div>
    )
}

export default Users;


/**
 * 1. Suspense fallback
 * 2. Create a promise function to laod data
 * 3. Send the promise to the component to load data
 *
*/







/**
 * 1. Data source || json
 * JSON.stringify()
 * JSON.parse()
 *
 *
 * .json()
 *
 *
 *
*/

// // callback
// fetch('https://jsonplaceholder.typicode.com/users')
// .then (res => res.json)
// .then (data => {console.log(data)})

// // async await
// async function loadData () {
//     const res = await fetch ('https://jsonplaceholder.typicode.com/users')
//     const data = await res.json();
//     return data;
// }

// const loadDat2 = async () => {
//     const res = await fetch ('https://jsonplaceholder.typicode.com/users')
//     const data = await res.json()
//     return data;
// }