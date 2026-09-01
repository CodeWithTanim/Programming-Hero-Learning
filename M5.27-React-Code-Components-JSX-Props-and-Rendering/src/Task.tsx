interface TaskPropType {
    name: string,
    isDone: boolean
}

export default function Task ({name, isDone}: TaskPropType) {

    let list ;
    if (isDone) {
        list = <li>Done: {name}</li>
    } else {
        list = <li>Not Done: {name}</li>
    }

    return list;

}










// export default function Task ({name, isDone}: TaskPropType) {


//     // return isDone === true ? <li>Comleted: {name}</li> : <li>Pending: {name}</li>

//     // return isDone === true && <li>Comleted: {name}</li>
//     // return isDone === false && <li>Hurry Up: {name}</li>
//     return isDone === false || <li>Done Up: {name}</li>


// }







// export default function Task ({name, isDone}: TaskPropType) {


//     // condition ? true : 
//     // const time = 5 > 10 ? 100: 20;

//     return isDone === true ? <li>Comleted: {name}</li> : <li>Pending: {name}</li>

//     // if (isDone === true) {
//     //     return <li>Compeleted: {name}</li>
//     // } else {
//     //     return <li>Pending: {name}</li>
//     // }

// }






// export default function Task ({name, isDone}: TaskPropType) {


//     if (isDone === true) {
//         return <li>Compeleted: {name}</li>
//     } else {
//         return <li>Pending: {name}</li>
//     }

// }






// export default function Task ({name, isDone}: TaskPropType) {


//     if (isDone === true) {
//         return <li>Compeleted: {name}</li>
//     }

//     return <li>Pending: {name}</li>
// }


