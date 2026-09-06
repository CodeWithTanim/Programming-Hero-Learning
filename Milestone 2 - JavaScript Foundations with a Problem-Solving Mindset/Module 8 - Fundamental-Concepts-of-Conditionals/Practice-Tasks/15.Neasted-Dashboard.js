const isLoggedIn = true;
const isAdmin = false;

if (isLoggedIn) {
    if (isAdmin) {
        console.log("Admin Dashboard");
    } else {
        console.log("User Dashboard");
    }
} else {
    console.log("Please Login");
}