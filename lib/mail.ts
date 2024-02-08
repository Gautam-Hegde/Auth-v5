import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorMail = async (email: string, token: string) => {
   await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Two Factor Authentication',
        html: `<p>Your two factor authentication code is: ${token}</p>`
   })
}

export const sendPasswordResetMail = async (email: string, token: string) => {
    
        const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
    
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Password Reset',
            html: `<p>You can reset your password by clicking on the following link: <a href="${resetLink}"> here</a>.</p>` 
        })
}


export const sendVerificationMail = async (email: string, token: string) => {

    const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Please verify your email',
        html: `<p>Please verify your email by clicking on the following link:
        <a href="${confirmationLink}"> here</a>.</p>`
    })

}