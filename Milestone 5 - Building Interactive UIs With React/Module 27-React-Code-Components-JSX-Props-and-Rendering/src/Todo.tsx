// function Todo (props) {
//     console.log(props)
//     return <li>Do this work: {props.task}</li>
// }


// function Todo ({task, time}) {
//     return <li>Do this work: {task} at: {time}</li>
// }

interface TodoType {
    task: string,
    time?: string,
}

// function Todo (props:TodoType) {
//     return <li>Work: {props.task} at: {props.time}</li>
// }

// function Todo ({task, time}: TodoType) {
//     return <li>Task: {task} at: {time}</li>
// }

function Todo({ task, time }: {
    task: string,
    time?: string,
}) {
    return <li>Task: {task} at: {time}</li>
}

export default Todo;


const { task, time } = { task: 'take a shower', time: '10:00' }