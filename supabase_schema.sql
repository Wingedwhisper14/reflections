-- Create Items Table
create table items (
  id uuid default gen_random_uuid() primary key,
  section_id text not null,
  type text not null,
  title text not null,
  caption text,
  content text,
  genre text,
  created_at timestamptz default now()
);

-- Create Resume Table (Key-Value Store style for simplicity, or just a single JSON row)
-- We'll use a single row table for the resume data to keep it simple
create table resume (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- Enable RLS
alter table items enable row level security;
alter table resume enable row level security;

-- Policies for Items
create policy "Enable read access for all users" on items
  for select using (true);

create policy "Enable insert for authenticated users only" on items
  for insert with check (true); -- Ideally this should be checking auth, but for now we are using client-side admin flag. 
  -- Since we don't have real Auth yet, we will allow Write for Anon for now (and rely on the frontend hidden admin).
  -- SECURITY NOTE: In a real prod app with Auth, remove the boolean true and use auth.uid() checks.
  
create policy "Enable update for all users" on items
  for update using (true);

create policy "Enable delete for all users" on items
  for delete using (true);

-- Policies for Resume
create policy "Enable read access for all users" on resume
  for select using (true);

create policy "Enable all access for all users" on resume
  for all using (true);

-- Storage Bucket for Images
insert into storage.buckets (id, name, public) 
values ('reflections-images', 'reflections-images', true);

create policy "Public Access" on storage.objects for select using ( bucket_id = 'reflections-images' );
create policy "Public Upload" on storage.objects for insert with check ( bucket_id = 'reflections-images' );
