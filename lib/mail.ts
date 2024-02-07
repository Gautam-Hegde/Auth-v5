import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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