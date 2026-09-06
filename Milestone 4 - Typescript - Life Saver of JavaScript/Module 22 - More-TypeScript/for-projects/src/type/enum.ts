enum Day {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Firday,
    Saturday,
    Sunday
};


let offDay = Day.Sunday;
console.log(Day.Tuesday);


if (offDay === Day.Sunday || offDay === Day.Firday) {

}


enum Roles {
    Admin = 'Admin',
    Moderator = 'Moderator',
    Guest = 'Guest',
};

console.log(Roles.Admin);

const nandu = {
    name: 'chandu',
    role: Roles.Moderator
}

console.log(nandu);

enum Priority {
    Low,
    Moderator,
    Medium,
    High,
    Urgent
};

