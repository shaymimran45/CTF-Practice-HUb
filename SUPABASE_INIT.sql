-- Supabase Initialization Script
-- Run this script in the Supabase SQL editor to set up the database

-- Create categories table
create table categories (
  id varchar(50) primary key,
  name varchar(100) not null,
  description text,
  color varchar(20)
);

-- Create problems table
create table problems (
  id serial primary key,
  title varchar(200) not null,
  description text,
  category varchar(50) references categories(id),
  difficulty varchar(20) check (difficulty in ('Easy', 'Medium', 'Hard')),
  points integer not null,
  solves integer default 0,
  created_at timestamp with time zone default now(),
  flag varchar(255) not null,
  hints text[],
  files jsonb
);

-- Create users table
create table users (
  id uuid primary key references auth.users,
  username varchar(50) unique not null,
  email varchar(255) unique not null,
  created_at timestamp with time zone default now()
);

-- Create submissions table
create table submissions (
  id serial primary key,
  user_id uuid references users(id),
  problem_id integer references problems(id),
  flag varchar(255) not null,
  correct boolean not null,
  submitted_at timestamp with time zone default now()
);

-- Create user_progress table
create table user_progress (
  user_id uuid references users(id),
  problem_id integer references problems(id),
  solved boolean default false,
  solved_at timestamp with time zone,
  primary key (user_id, problem_id)
);

-- Enable Row Level Security (RLS) for all tables
alter table categories enable row level security;
alter table problems enable row level security;
alter table users enable row level security;
alter table submissions enable row level security;
alter table user_progress enable row level security;

-- Insert sample categories
insert into categories (id, name, description, color) values
('web', 'Web Exploitation', 'Exploiting web application vulnerabilities including XSS, SQL injection, CSRF, and other common web bugs.', 'bg-red-500'),
('crypto', 'Cryptography', 'Decrypting encoded messages, breaking encryption algorithms, and understanding cryptographic protocols.', 'bg-green-500'),
('reversing', 'Reverse Engineering', 'Analyzing binaries and compiled code to understand their functionality and find vulnerabilities.', 'bg-blue-500'),
('forensics', 'Forensics', 'Recovering hidden information from digital media, analyzing file formats, and investigating digital evidence.', 'bg-purple-500'),
('pwn', 'Binary Exploitation', 'Exploiting binary programs for unintended behavior through buffer overflows, format strings, and other memory corruption techniques.', 'bg-yellow-500'),
('misc', 'Miscellaneous', 'Various other types of challenges that don\'t fit into the standard categories including programming, steganography, and more.', 'bg-pink-500');

-- Insert sample problems
insert into problems (title, description, category, difficulty, points, flag, hints, files) values
('Simple Caesar Cipher', 
 'Decrypt the following message that has been encrypted with a Caesar cipher: "Wklv lv d vlpsoh fdhvdu flskhu". 
  Caesar ciphers work by shifting each letter by a fixed number of positions in the alphabet. 
  For example, with a shift of 3, A becomes D, B becomes E, etc. 
  Your task is to determine the shift value and decrypt the message to find the flag.', 
 'crypto', 
 'Easy', 
 100, 
 'WOW{caesar_cipher_solved}',
 array['Try all possible shifts from 1 to 25', 'The decrypted message should make sense in English'],
 '[{"name": "cipher.txt", "url": "https://example.com/cipher.txt", "size": "1KB"}]'),

('SQL Injection Basics', 
 'You are presented with a simple login form at https://ctf.example.com/login. 
  The form takes a username and password and appears to be vulnerable to SQL injection. 
  Your goal is to bypass the authentication to gain access to the admin account. 
  Try to understand how the SQL query is constructed and how you can manipulate it. 
  Remember that SQL injection occurs when user input is not properly sanitized before being included in SQL queries.', 
 'web', 
 'Easy', 
 150, 
 'WOW{sql_injection_success}',
 array['Try using '' OR ''1''=''1'' as the username', 'Consider how the SQL query might be structured'],
 '[{"name": "login.html", "url": "https://example.com/login.html", "size": "2KB"}]'),

('File Header Analysis', 
 'Download the file "mystery.png" from the provided link. 
  Although it appears to be a PNG image, there might be something hidden in the file headers. 
  Use a hex editor or command-line tools to examine the file structure. 
  Look for any anomalies in the file signature or any hidden data that might be appended to the file. 
  File headers contain metadata about the file format and can sometimes reveal hidden information.', 
 'forensics', 
 'Medium', 
 200, 
 'WOW{hidden_in_headers}',
 array['Use the "file" command on Linux or a hex editor', 'PNG files should start with the bytes 89 50 4E 47'],
 '[{"name": "mystery.png", "url": "https://example.com/mystery.png", "size": "45KB"}]'),

('Buffer Overflow Introduction', 
 'You are given a vulnerable binary program that takes user input and stores it in a fixed-size buffer. 
  The program can be accessed at nc example.com 1337. 
  Your task is to exploit this buffer overflow to redirect execution flow and print the flag. 
  Buffer overflows occur when more data is written to a buffer than it can hold, potentially overwriting adjacent memory. 
  This can be used to change the program''s execution flow by overwriting the return address on the stack.', 
 'pwn', 
 'Hard', 
 300, 
 'WOW{buffer_overflow_conquered}',
 array['Try sending a long string to see if you can crash the program', 'Consider the memory layout and how you can control EIP/RIP'],
 '[{"name": "vuln_program", "url": "https://example.com/vuln_program", "size": "12KB"}]'),

('Reverse Engineering Challenge', 
 'Analyze the provided binary file "secret_algorithm" to understand its functionality. 
  The program takes an input and performs some operations to generate an output. 
  Your goal is to reverse engineer the algorithm to determine the correct input that produces the flag. 
  Use disassembly tools like IDA Pro, Ghidra, or radare2 to analyze the binary. 
  Look for string references, function calls, and mathematical operations that might reveal the algorithm.', 
 'reversing', 
 'Medium', 
 250, 
 'WOW{reverse_engineering_master}',
 array['Look for string references in the binary', 'Try to identify the main function and trace the execution flow'],
 '[{"name": "secret_algorithm", "url": "https://example.com/secret_algorithm", "size": "32KB"}]'),

('Steganography Challenge', 
 'The image "hidden_message.jpg" contains a secret message hidden within it. 
  Use steganography techniques to extract the hidden information. 
  Steganography is the practice of concealing messages or information within other non-secret text or data. 
  Common techniques include least significant bit (LSB) encoding, metadata hiding, and spatial domain techniques. 
  Try different steganography tools and methods to reveal the hidden content.', 
 'misc', 
 'Medium', 
 200, 
 'WOW{steganography_cracked}',
 array['Try using steghide or stegsolve', 'Check the image metadata with exiftool'],
 '[{"name": "hidden_message.jpg", "url": "https://example.com/hidden_message.jpg", "size": "128KB"}]');

-- Create policies for RLS
-- Categories: Anyone can read, only admins can write
create policy "Categories are viewable by everyone" on categories
  for select using (true);

create policy "Only admins can insert categories" on categories
  for insert with check (('admin' = (auth.jwt() ->> 'user_metadata')::json->>'role'));

create policy "Only admins can update categories" on categories
  for update using (('admin' = (auth.jwt() ->> 'user_metadata')::json->>'role'));

create policy "Only admins can delete categories" on categories
  for delete using (('admin' = (auth.jwt() ->> 'user_metadata')::json->>'role'));

-- Problems: Anyone can read, only admins can write
create policy "Problems are viewable by everyone" on problems
  for select using (true);

create policy "Only admins can insert problems" on problems
  for insert with check (('admin' = (auth.jwt() ->> 'user_metadata')::json->>'role'));

create policy "Only admins can update problems" on problems
  for update using (('admin' = (auth.jwt() ->> 'user_metadata')::json->>'role'));

create policy "Only admins can delete problems" on problems
  for delete using (('admin' = (auth.jwt() ->> 'user_metadata')::json->>'role'));

-- Users: Users can view and update their own data
create policy "Users can view their own data" on users
  for select using (auth.uid() = id);

create policy "Users can insert their own data" on users
  for insert with check (auth.uid() = id);

create policy "Users can update their own data" on users
  for update using (auth.uid() = id);

-- Submissions: Users can view and insert their own submissions
create policy "Users can view their own submissions" on submissions
  for select using (auth.uid() = user_id);

create policy "Users can insert their own submissions" on submissions
  for insert with check (auth.uid() = user_id);

-- User Progress: Users can view and update their own progress
create policy "Users can view their own progress" on user_progress
  for select using (auth.uid() = user_id);

create policy "Users can insert their own progress" on user_progress
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own progress" on user_progress
  for update using (auth.uid() = user_id);

-- Grant permissions
grant usage on schema public to anon, authenticated;
grant all on categories to anon, authenticated;
grant all on problems to anon, authenticated;
grant all on users to anon, authenticated;
grant all on submissions to anon, authenticated;
grant all on user_progress to anon, authenticated;
grant usage, select on all sequences in schema public to anon, authenticated;