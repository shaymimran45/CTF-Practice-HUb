# Supabase Setup Guide for CTF Practice Hub

This guide will help you set up your Supabase project for the CTF Practice Hub platform.

## Prerequisites

1. A Supabase account (free tier is sufficient)
2. A new Supabase project created

## Database Setup

### 1. Run the Complete Setup Script

1. Go to your Supabase project dashboard
2. Navigate to the SQL editor
3. Copy the entire contents of `SUPABASE_COMPLETE_SETUP.sql`
4. Paste it into the SQL editor and run it
5. This will create all tables, insert sample data, and set up security policies

### 2. Verify Tables Creation

After running the script, you should see the following tables in your database:
- `categories` - Challenge categories with descriptions and colors
- `problems` - Individual challenges with descriptions, hints, and files
- `users` - User accounts and profiles
- `submissions` - Flag submission attempts
- `user_progress` - User progress tracking

## Authentication Setup

### 1. Enable Email Authentication

1. Go to your Supabase project dashboard
2. Navigate to "Authentication" → "Providers"
3. Enable "Email" provider
4. Configure as needed for your use case

### 2. Set Up Admin User

To create an admin user:

1. Go to "Authentication" → "Users"
2. Click "Add user" to create a new user
3. After creating the user, click on the user to view details
4. In the user details, find the "User Metadata" section
5. Add the following JSON to the metadata:
   ```json
   {
     "role": "admin"
   }
   ```

## Environment Variables

Set these environment variables in your deployment platform (Render, Vercel, etc.):

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=10000
```

You can find these values in your Supabase project dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`: Project Settings → API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Project Settings → API → anon public key

## Security Considerations

1. Row Level Security (RLS) is enabled for all tables
2. Admin access is controlled through user metadata
3. Users can only view and modify their own data
4. Never share your Supabase service key publicly

## Testing the Setup

1. After deployment, visit your application
2. Try to register a new user account
3. Log in and browse the challenges
4. Test admin access by logging in with your admin account and visiting `/admin`

## Troubleshooting

### Common Issues

1. **Cannot access admin dashboard**: Make sure your user has `{"role": "admin"}` in their metadata
2. **No challenges showing**: Verify the SQL script ran successfully and tables contain data
3. **Authentication errors**: Check that your environment variables are set correctly

### Checking RLS Policies

If you're having permission issues:

1. Go to Table Editor in Supabase
2. Select a table (e.g., problems)
3. Click on "Policies" tab
4. Verify that the policies exist and are correctly configured

## Updating the Schema

If you need to make changes to the schema:

1. Make changes to `SUPABASE_COMPLETE_SETUP.sql`
2. Run the updated script in your Supabase SQL editor
3. Be careful with destructive changes to existing data