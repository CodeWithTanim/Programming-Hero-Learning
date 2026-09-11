// Promise

const promise = new Promise((resolved, reject) => {
    const sucess = true
    if (sucess) {
        resolved('I have data!')
    } else {
        reject("some Error")
    }
})

promise.then((data) => {
    console.log(data);
})
    .catch(err => {
        console.log(err);
    })


async function getData() {
    // const data = await promise
    // return data
    try {
        const data = await promise
        return data
    } catch (error) {
        return error
    }
}

