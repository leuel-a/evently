# Evently

A simple platform where event organizers can create and post their events, allowing attendees to browse and explore various events. The application includes a login system with Google Authentication and traditional email/password login for easy access.

## Tech Stack

- **Next.js** - React-based framework for building the application.
- **NextAuth.js** - Authentication using Google OAuth and credentials (email/password).
- **Prisma** - ORM for handling database interactions.
- **PostgreSQL** - Database for storing event and user information.
- **Vercel** - Platform for hosting and deployment.
- **Git** - Version control for tracking changes and collaboration.

## Getting Started

To run locally, follow these steps:

1. Clone this this repository
2. Change directory
    `cd evently`
4. **Set up environment variables**:

   Create a `.env` file in the root directory with the following variables:
   ```bash
   # PostgreSQL
   POSTGRES_URL="your_postgres_url"
   POSTGRES_PRISMA_URL="your_prisma_postgres_url"
   POSTGRES_URL_NO_SSL="your_postgres_url_no_ssl"
   POSTGRES_URL_NON_POOLING="your_postgres_non_pooling_url"
   POSTGRES_USER="your_postgres_user"
   POSTGRES_HOST="your_postgres_host"
   POSTGRES_PASSWORD="your_postgres_password"
   POSTGRES_DATABASE="your_postgres_database"

   # bcrypt
   SALT_ROUNDS=your_salt_rounds_value

   # NextAuth
   AUTH_TRUST_HOST=true
   AUTH_SECRET="your_auth_secret"
   AUTH_GOOGLE_ID="your_google_client_id"
   AUTH_GOOGLE_SECRET="your_google_client_secret"
   ```
   **NOTE**: This project uses vercel as the database provider. If you opt to use another, just follow the documentation on [Prisma Link](https://prisma.io)
5. Run the project

   ```
   pnpm run dev
   ```

