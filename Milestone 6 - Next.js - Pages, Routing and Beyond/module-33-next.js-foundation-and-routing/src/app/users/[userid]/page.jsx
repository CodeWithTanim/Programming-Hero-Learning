import React from 'react';

const UserDetailsPage = async ({ params }) => {

    const { userid } = await params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userid}`)
    const user = await res.json();

    console.log(user)

    return (
        <div>
            <h2>Users Details Page</h2>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.website}</p>
        </div>
    );
};

export default UserDetailsPage;