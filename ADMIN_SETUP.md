# Admin User Setup Guide

This guide explains how to set up an admin user for the CTF Practice Hub platform.

## Setting Up an Admin User

To create an admin user, you need to add the admin role to a user's metadata in Supabase.

### Method 1: Using Supabase Dashboard

1. Log in to your Supabase project dashboard
2. Navigate to "Authentication" → "Users"
3. Find the user you want to make an admin
4. Click on the user to view details
5. In the user details, find the "User Metadata" section
6. Add the following JSON to the metadata:
   ```json
   {
     "role": "admin"
   }
   ```

### Method 2: Using SQL Editor

If you want to create a new user and make them admin:

1. Go to your Supabase dashboard
2. Navigate to the SQL editor
3. Run this SQL command to update an existing user:
   ```sql
   UPDATE auth.users 
   SET raw_user_meta_data = jsonb_set(
     COALESCE(raw_user_meta_data, '{}'), 
     '{role}', 
     '"admin"'
   ) 
   WHERE email = 'admin@example.com';
   ```

### Method 3: Programmatically (for future reference)

You can also set the admin role programmatically when creating users:

```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'admin@example.com',
  password: 'securepassword',
  options: {
    data: {
      role: 'admin'
    }
  }
});
```

## Verifying Admin Access

Once you've set up an admin user:

1. Log in to the CTF Practice Hub using the admin account
2. Navigate to `/admin`
3. You should see the admin dashboard where you can:
   - Upload new CTF problems
   - Manage existing challenges
   - View problem statistics

If you're redirected to the login page, the admin role was not set correctly.

## Security Notes

- Only grant admin privileges to trusted users
- Regular users will not see or have access to the admin dashboard
- All admin actions are protected by Row Level Security (RLS) policies in the database