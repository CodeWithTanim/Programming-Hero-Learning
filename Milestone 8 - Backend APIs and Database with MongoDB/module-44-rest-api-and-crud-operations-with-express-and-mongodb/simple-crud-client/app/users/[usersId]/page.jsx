import React from 'react';

const UsersDetailsPage = async ({ params }) => {
    const { usersId } = await params;
    const res = await fetch (`http://localhost:5000/users/${usersId}`)
    const user = await res.json();

    return (
        <div>
            <h2>User Details: {usersId}</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UsersDetailsPage;