import React, { Suspense } from 'react';
import Users from '../components/Users';

const usersPromise = async () => {
    const data = await fetch('http://localhost:5000/users')
    return data.json();
}

const UsersPage = async () => {

    return (
        <div>
            <h2>Users data coming soon:</h2>
            <Suspense fallback={<h2>Loading...</h2>}>
                <Users usersPromise={usersPromise} />
            </Suspense>
        </div>
    );
};

export default UsersPage;