import { authClient } from "./auth-client";

export const getTokenFromClient = async () => {
    const { data } = await authClient.token()
    const token = data?.token;
    console.log("Client Token:", token)

    return token;
};