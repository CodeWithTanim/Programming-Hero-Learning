import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from 'resend';

const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URI);
const db = client.db('better-auth-conceptual-11');
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        },
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            void resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: user.email,
                subject: 'Verify Email Address',
                html: `<p>
  Click the link to verify your email:
  <a href="${url}">Verify Email</a>
</p>`
            }).then(({ data, error }) => {
                if (error) {
                    console.error("RESEND ERROR:", error);
                } else {
                    console.log("RESEND SUCCESS:", data);
                }
            }).catch((error) => {
                console.error("EMAIL FAILED:", error);
            });
        },
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 60 * 3 // 3 minutes
    },

    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
});