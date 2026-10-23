import React from 'react';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import UserCard from '@/components/UserCard';

const UsersPage = async () => {
    const res = await fetch('http://localhost:5000/users')
    const users = await res.json();

    return (
        <div>
            <h2>Users: {users.length}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    users.map(user => <UserCard user={user} key={user._id} />)
                }
            </div>
        </div>
    );
};

export default UsersPage;