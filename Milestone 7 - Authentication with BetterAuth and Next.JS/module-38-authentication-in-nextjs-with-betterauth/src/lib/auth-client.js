import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000"
})


export const { signIn, signUp, signOut, useSession } = authClient


/**
 * sign up: register: create accont: first time user
 * sign in: log in: already have an account: repeadetd user
 * sign out: log out
 * 
*/