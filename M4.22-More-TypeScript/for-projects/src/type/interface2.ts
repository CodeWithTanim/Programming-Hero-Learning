type userRole = 'Admin' | 'User' | 'Moderator' | 'Guest';

interface User {
    name: string;
    // age: number;
    role: userRole;
    email: string;
};

interface Admin extends User {
    permissions: string[];
}

// interface Admin extends User {
//     moderatedSections: string[];
// };

const bigBoos: Admin = {
    name: 'Big Boss',
    role: "Admin",
    email: 'bigboss@examle.com',
    permissions: ["manage_users", "edit_content"]
};


type book = {
    title: string;
    author: string;
    publishYear: number;
};

// type book = {
//     location: string;
// };



interface Gift {
    name: string;
};

interface Gift {
    price: number;
};

const bDayGift: Gift = {
    name: 'Teddy Bear',
    price: 29.99,
}

