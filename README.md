# Auth V5 Starter Kit 🐉

## Overview
This Auth V5 Toolkit Starter Kit provides a comprehensive authentication solution for web applications using Next.js 14 with server actions and Next-auth v5 (Auth.js). It includes various features to handle authentication, authorization, and user management seamlessly.

## Key Features

### Authentication Providers
- 🔐 **Credentials Provider**: Allows users to sign in using email and password credentials.
- 🌐 **OAuth Provider**: Enables social login with popular platforms like Google and GitHub.

### Security Features
- 🔒 **Forgot Password Functionality**: Users can reset their password via email.
- ✉️ **Email Verification**: Verify email addresses during registration or when changing email.
- 📱 **Two-Factor Verification (2FA)**: Adds an extra layer of security for user accounts.
- 👥 **User Roles**: Supports two user roles, Admin and User, with different permissions.

### Components
- 🔓 **Login Component**: Provides a flexible login interface that can be displayed as a redirect or modal.
- 📝 **Register Component**: Allows users to create a new account.
- 🤔 **Forgot Password Component**: Handles password recovery process.
- ✅ **Verification Component**: Manages email verification process.
- 🚧 **Settings Page**: Users can change their email and password securely.

### Authorization
- 🛡️ **Role Gate**: Restricts access to certain routes or actions based on user roles.
- 🔐 **Protect API Routes**: Only allows admins to access specific API routes.
- 🔐 **Protect Server Actions**: Admins can perform certain actions on the server.

### Database and ORM
- 🗃️ **Prisma ORM**: Utilizes Prisma ORM for database interactions.
- 🐘 **PostgreSQL**: Uses PostgreSQL as the underlying database.

### Additional Services
- ✉️ **Resend Mail Provider**: Allows users to request for email verification mail to be resent.

This Auth V5 Toolkit Starter Kit provides a solid foundation for implementing authentication and user management features in your Next.js applications. Feel free to extend and customize it further to suit your project's needs.
## Additional Notes
- Ensure proper configuration of OAuth providers (Google, GitHub) for social login to work correctly.
- Customize email templates and verification logic according to your application requirements.
- Implement additional security measures as needed based on your application's specific use cases.

This Auth V5 Toolkit Starter Kit provides a solid foundation for implementing authentication and user management features in your Next.js applications. Feel free to extend and customize it further to suit your project's needs.


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
