import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from "resend";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("better-auth-db");
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url, token }, request) => {
            void resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: user.email,
                subject: "Reset your password",
                html: `
        <h2>Password Reset Request</h2>
        <p>Hello ${user.name},</p>
        <p>We received a request to reset your password.</p>
        <p>Click the button below to reset your password:</p>

        <a href="${url}" 
           style="
               display: inline-block;
               padding: 12px 24px;
               background-color: #0070f3;
               color: #ffffff;
               text-decoration: none;
               border-radius: 8px;
               font-weight: bold;
           ">
            Reset Password
        </a>

        <p>This link will expire soon.</p>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>

        <br />
        <p>Best regards,<br />Acme Team</p>
    `,
            });
        },
    },
    emailVerification: {
        sendVerificationEmail: ({ user, url }) => {
            void resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: user.email,
                subject: "Verify YOur Email Address",
                html: `
    <h2>Verify Your Email Address</h2>
    <p>Thanks for signing up with Acme!</p>
    <p>Please click the button below to verify your email address.</p>

    <a href="${url}" 
       style="
           display: inline-block;
           padding: 12px 24px;
           background-color: #0070f3;
           color: white;
           text-decoration: none;
           border-radius: 8px;
           font-weight: bold;
       ">
       Verify Email
    </a>

    <p>This link will expire in 1 hour.</p>
`,
            });
        },
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 3600, // 1 hour
    },
    socialProviders: {
        google: {
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET,
        },
        github: {
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET,
        },
        discord: {
            clientId: process.env.BETTER_AUTH_DISCORD_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_DISCORD_SECRET,
        },
    },

    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client,
    }),
});
