import React from 'react';

/**
 * GET:
 * POST:
 * UPDATE: put patch
 * DELETE: 
*/

const postsPromise = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    return res.json();
}


const postsPromise2 = async () => {
    try {
        const res = await fetch('https://jsffonplaceholder.typicode.com/posts')
        return res.json();
    } catch (error) {
        throw new Error('Failed to Fetch Posts');
    }
}

const postsPromise3 = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    
    if (!res.ok) {
        throw new Error('Failed to Fetch Posts');
    }
    return res.json();
}

const PostsPage = async () => {

    // const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    // const posts = await res.json();

    const posts = await postsPromise();
    console.log(posts)


    return (
        <div>
            <h2>Hello Posts: {posts.length}</h2>
        </div>
    );
};

export default PostsPage;