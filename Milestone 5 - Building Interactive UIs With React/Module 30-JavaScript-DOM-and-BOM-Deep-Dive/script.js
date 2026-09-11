// const bd = document.getElementById('bd');
// console.log(bd);

// const allTag = document.getElementsByTagName('h2');
// console.log(allTag);

// const ph = document.getElementsByClassName('ph')
// console.log(ph);

// Query Selector
const bd = document.querySelector('#bd')
console.log(bd);

const allh2tags = document.querySelectorAll('h2')
console.log(allh2tags);

const ph = document.querySelector('.ph')
console.log(ph);

// Modify Content or Text Content
console.log(bd.textContent);
console.log(bd.innerHTML);
console.log(bd.innerText);

// bd.textContent = 'Hi Bangladesh'
// bd.innerHTML = '<h1>Hello Dhaka</h1>'
// bd.innerText = 'Hello, Bangladesh'

// Modify Attributes
// console.log(img.getAttribute("src"));
// img.setAttribute("src", 'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=')
// img.removeAttribute('src')
// console.log(img.hasAttribute('alt'));

img.src = 'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE='
img.alt = 'This is a eye image'

// Modify Style
img.style.height = '220px'
img.style.width = '350px'

img.classList.add('box')
img.classList.remove('box')
img.classList.toggle('box')
// img.classList.toggle('box')

// Event Listener
const clickbtn = document.getElementById('click-btn')
console.log(clickbtn);

// document.addEventListener(eventTime, fn)
clickbtn.addEventListener('click', () => {
    // console.log('Button Click');
    // alert('Button Clicked')
    img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgI3fF6_ebdidZr1lnTEvKusZLVuw2ZKsrhm_Xtxn6ZdQlOo9PBRq1v2VW&s=10'

})

const myInp = document.getElementById('my-input')

myInp.addEventListener("keypress", (event) => {
    console.log('Input Trigered');
    // console.log(myInp.value);
    console.log(event.target);
    event.target.style.color = 'red'

    // Local Storage Save
    const inputValue = event.target.value
    localStorage.setItem('inputValue', inputValue)
    document.getElementById('message').innerText = `Input Value: ${inputValue}`

})


// console.log(window);

// window.console.log('Hello')

// window.alert('Hi')

// console.log(location);
// console.log(location.href);

const reload = document.querySelector('#reload')
reload.addEventListener("click", () => {
    console.log('reload');
    location.reload();
    // location.replace('Hello.com')

})

// Browser Storage
// localStorage.setItem('location', 'Dhaka')
// localStorage.setItem('age', '23')
// sessionStorage.setItem('street', 514)

const getLocationData = localStorage.getItem("location")
const getAgeData = localStorage.getItem('age')
const getStreetData = sessionStorage.getItem('street');

// console.log(getLocationData);
// console.log(getAgeData);



const mylocation = document.getElementById('location')
const age = document.getElementById('age')
mylocation.innerText = `Location: ${getLocationData}`
age.innerText = `Age: ${getAgeData}`

const inputValue = localStorage.getItem('inputValue')
document.getElementById('message').innerText = `Input Value: ${inputValue}`

const street = document.getElementById('street')
street.innerText = (`Street: ${getStreetData}`)

localStorage.removeItem('age')

// Promise & Fetch API
const promise = new Promise((resolve, reject) => {
    let sucess = true;
    if (sucess) {
        resolve('Promise roesolved Successfully')
    } else {
        reject('Promise Rejected')
    }
})

// console.log(promise);
// promise.then(result => {
//     console.log(result);
// }).catch(err => {
//     console.log(err);
// })

const fetchUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            const usersContainer = document.getElementById("Users");

            data.forEach((user) => {
                const userCard = document.createElement("div");

                userCard.className =
                    "bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition";

                userCard.innerHTML = `
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                ${user.name.charAt(0)}
              </div>

              <div>
                <h2 class="text-xl font-bold text-gray-800">
                  ${user.name}
                </h2>

                <p class="text-gray-500">
                  @${user.username}
                </p>
              </div>
            </div>

            <div class="space-y-2 text-gray-600">
              <p>
                <span class="font-semibold">Email:</span>
                ${user.email}
              </p>

              <p>
                <span class="font-semibold">Phone:</span>
                ${user.phone}
              </p>

              <p>
                <span class="font-semibold">Website:</span>
                ${user.website}
              </p>

              <div class="pt-3 border-t border-gray-200">
                <p class="font-semibold text-gray-800 mb-1">
                  Address
                </p>

                <p>${user.address.street}, ${user.address.suite}</p>
                <p>${user.address.city}, ${user.address.zipcode}</p>
              </div>
            </div>
          `;

                usersContainer.appendChild(userCard);
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

fetchUsers();