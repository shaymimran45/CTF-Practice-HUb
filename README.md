# CTF Practice Hub

A comprehensive CTF (Capture The Flag) practice platform built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Dynamic Challenges**: All challenges are dynamically loaded from Supabase
- **Multiple Categories**: Web, Crypto, Reversing, Forensics, Pwn, and Misc
- **Progress Tracking**: Track your progress across all categories
- **Leaderboard**: Compete with other players on the global leaderboard
- **Responsive Design**: Works on all device sizes
- **Supabase Integration**: Fully integrated with Supabase for real-time data
- **Admin Dashboard**: Easy challenge management and upload

## Supabase Integration

This platform leverages Supabase for:

1. **Database Management**: All challenges, categories, and user progress are stored in Supabase
2. **Authentication**: Secure user authentication with email/password or social login
3. **Real-time Updates**: Leaderboard and challenge updates happen in real-time
4. **File Storage**: Challenge files and attachments are stored in Supabase storage
5. **Admin Tools**: Comprehensive admin dashboard for challenge management

### Supabase Schema

The application uses the following tables:

- `categories`: Stores information about CTF challenge categories
- `problems`: Stores individual CTF challenges with hints, files, and flags
- `users`: Stores user information
- `submissions`: Tracks user submissions for problems
- `user_progress`: Tracks user progress through problems

### Environment Variables

Create a `.env` file with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Initialize Supabase database using `SUPABASE_INIT.sql`
5. Run the development server: `npm run dev`

## Database Setup

To initialize your Supabase database:

1. Create a new Supabase project
2. Go to the SQL editor in your Supabase dashboard
3. Copy and paste the contents of `SUPABASE_INIT.sql`
4. Run the script to create all tables and sample data

## Admin Features

The platform includes a comprehensive admin dashboard at `/admin` where administrators can:

- Upload new challenges with titles, descriptions, hints, and files
- Set difficulty levels and point values
- Manage flags in the required WOW{} format
- View and manage all challenges

## Technologies Used

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Supabase** for backend services
- **React** for UI components

## Deployment

The application can be deployed to Vercel with a single click, or deployed to any hosting provider that supports Next.js.

## Flag Format

All flags follow the format: `WOW{flag_content}`

This format is enforced throughout the application for consistency and security.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.