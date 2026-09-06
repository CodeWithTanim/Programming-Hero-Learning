const college = {
    name : 'vnc',
    address : 'baily road',
    events : ['21 Feb', 'Independence Day', "Victory Day"],
    students : 800,
    people: {
        count: 200,
        principal: {
            name : 'Subra Maam',
            yearOfExperience : 25,
            dergree : 'English'
        }
    }
}

console.log(college.students);
console.log(college.people);
console.log(college.people.principal);

console.log(college['people']['principal'].name)

college.events[2] = 'Eid ul Adha'
console.log(college.events);

