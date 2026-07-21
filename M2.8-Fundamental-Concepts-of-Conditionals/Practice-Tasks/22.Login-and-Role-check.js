const userName = "admin";
const userPass = '1234';
const role = 'admin';

if (userName === "admin" && userPass === "1234"){
    console.log(role === "admin" ? "Welcome Admin" : "Welcome User");
} else {
    console.log("Login Failed");
}