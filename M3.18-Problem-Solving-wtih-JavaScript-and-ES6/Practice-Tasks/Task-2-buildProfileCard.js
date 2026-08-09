function buildProfileCard (user) {
    const {name, title, company} = user;

    return `${name}
${title} at ${company}.`
};

let user = {
    name: "Arif",
    title: "Developer",
    company: "Programming Hero",
};

console.log(buildProfileCard(user));