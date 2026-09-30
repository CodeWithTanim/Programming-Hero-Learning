import React, { Suspense } from 'react';
import ResetPasswordFormPage from './reset-password-form';

const ResetPasswordPage = () => {
    return (
        <div>
            <h2>Reset Password</h2>
            <Suspense fallback='loading'>
                <ResetPasswordFormPage />
            </Suspense>
        </div>
    );
};

export default ResetPasswordPage;