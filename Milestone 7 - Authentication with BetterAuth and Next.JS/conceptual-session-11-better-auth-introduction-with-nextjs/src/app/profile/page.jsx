"use client";

import { useSession } from "../../lib/auth-client";

const ProfilePage = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return <p>Loading profile...</p>;
    }

    if (!session) {
        return <p>Please login first.</p>;
    }

    const user = session.user;

    return (
        <div>
            <h2>Profile Page</h2>
            <p>Your profile information will be displayed here.</p>

            <p>Your Name: {user.name}</p>
            <p>Your Email: {user.email}</p>
        </div>
    );
};

export default ProfilePage;