import UserCard from "./UserCard"

interface UserType {
    name: string,
    isLoggedIn: boolean,
}

const users: UserType[] = [
    {name: 'Omar Sunny', isLoggedIn: true},
    {name: 'Bappa Raz', isLoggedIn: true},
    {name: 'Salman Shah', isLoggedIn: false},
    {name: 'Shakib Khan', isLoggedIn: true},
    {name: 'Razzak', isLoggedIn: false},
]


export default function Users() {
    return (
        <div>
            {
                users.map(user => <UserCard name = {user.name}></UserCard>)
            }
        </div>
    )
}




// export default function Users() {
//     return (
//         <div>
//             {
//                 users.map(user => <li>{user.name}</li>)
//             }
//         </div>
//     )
// }