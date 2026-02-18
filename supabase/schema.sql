-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Define roles enum
create type user_role as enum ('super_admin', 'content_admin', 'player', 'user');

-- PROFILES (Public Read, Self Update)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  username text unique,
  full_name text,
  avatar_url text,
  role user_role default 'user',
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TEAMS
create table teams (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  logo_url text,
  description text,
  game text not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PLAYERS
create table players (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references teams(id) on delete set null,
  ign text not null, -- In-game Name
  real_name text,
  role text, -- e.g. Entry Fragger, IGL
  avatar_url text,
  socials jsonb default '{}'::jsonb,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ACHIEVEMENTS
create table achievements (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  date date not null,
  placement text not null, -- e.g. "1st Place"
  prize_pool text,
  team_id uuid references teams(id) on delete cascade,
  event_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- BLOG POSTS
create table blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  cover_image text,
  author_id uuid references profiles(id) on delete set null,
  published boolean default false,
  published_at timestamp with time zone,
  tags text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PARTNERS / SPONSORS
create table partners (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  logo_url text not null,
  website_url text,
  tier text, -- e.g. 'Headline', 'Gold'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- APPLICATIONS (Join Us)
create table applications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  discord_id text,
  position text not null, -- e.g. 'Player', 'Content Creator'
  portfolio_url text,
  status text default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  notes text, -- Admin notes
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CONTACT MESSAGES
create table contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text default 'new' check (status in ('new', 'replied', 'closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- FEATURE FLAGS
create table feature_flags (
  id uuid default uuid_generate_v4() primary key,
  key text unique not null,
  description text,
  is_enabled boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ORGANIZATION SETTINGS
create table organization_settings (
  id uuid default uuid_generate_v4() primary key,
  company_name text not null default 'Destroyer Esports',
  contact_email text,
  social_links jsonb default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- MONETIZATION TABLES (Hidden by default)
create table merch_products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price numeric(10, 2) not null,
  image_url text,
  stock_count integer default 0,
  is_visible boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table tournaments (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  start_date timestamp with time zone,
  entry_fee numeric(10, 2) default 0,
  prize_pool numeric(10, 2),
  is_visible boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table sponsorship_packages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  price numeric(10, 2),
  benefits text[],
  is_visible boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table membership_tiers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  price_monthly numeric(10, 2),
  perks text[],
  is_visible boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES

-- Helper function to check role
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from profiles
    where id = auth.uid() and role in ('super_admin', 'content_admin')
  );
end;
$$ language plpgsql security definer;

create or replace function public.is_super_admin()
returns boolean as $$
begin
  return exists (
    select 1 from profiles
    where id = auth.uid() and role = 'super_admin'
  );
end;
$$ language plpgsql security definer;

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table teams enable row level security;
alter table players enable row level security;
alter table achievements enable row level security;
alter table blog_posts enable row level security;
alter table partners enable row level security;
alter table applications enable row level security;
alter table contact_messages enable row level security;
alter table feature_flags enable row level security;
alter table organization_settings enable row level security;
alter table merch_products enable row level security;
alter table tournaments enable row level security;
alter table sponsorship_packages enable row level security;
alter table membership_tiers enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Teams, Players, Achievements, Blog, Partners (Public Read, Admin Write)
create policy "Public read teams" on teams for select using (true);
create policy "Admin insert teams" on teams for insert with check (is_admin());
create policy "Admin update teams" on teams for update using (is_admin());
create policy "Admin delete teams" on teams for delete using (is_admin());

create policy "Public read players" on players for select using (true);
create policy "Admin insert players" on players for insert with check (is_admin());
create policy "Admin update players" on players for update using (is_admin());
create policy "Admin delete players" on players for delete using (is_admin());

create policy "Public read achievements" on achievements for select using (true);
create policy "Admin insert achievements" on achievements for insert with check (is_admin());
create policy "Admin update achievements" on achievements for update using (is_admin());
create policy "Admin delete achievements" on achievements for delete using (is_admin());

create policy "Public read blog" on blog_posts for select using (true);
create policy "Admin insert blog" on blog_posts for insert with check (is_admin());
create policy "Admin update blog" on blog_posts for update using (is_admin());
create policy "Admin delete blog" on blog_posts for delete using (is_admin());

create policy "Public read partners" on partners for select using (true);
create policy "Admin insert partners" on partners for insert with check (is_admin());
create policy "Admin update partners" on partners for update using (is_admin());
create policy "Admin delete partners" on partners for delete using (is_admin());

-- Applications
create policy "Users can view own applications" on applications for select using (auth.uid() = user_id or is_admin());
create policy "Authenticated users can apply" on applications for insert with check (auth.uid() = user_id);
create policy "Admins can update applications" on applications for update using (is_admin());

-- Contact Messages
create policy "Anyone can submit contact form" on contact_messages for insert with check (true);
create policy "Admins can view contact messages" on contact_messages for select using (is_admin());
create policy "Admins can update contact messages" on contact_messages for update using (is_admin());
create policy "Super Admins can delete contact messages" on contact_messages for delete using (is_super_admin());

-- Feature Flags
create policy "Public read feature flags" on feature_flags for select using (true);
create policy "Super Admin write feature flags" on feature_flags for insert with check (is_super_admin());
create policy "Super Admin update feature flags" on feature_flags for update using (is_super_admin());
create policy "Super Admin delete feature flags" on feature_flags for delete using (is_super_admin());

-- Organization Settings
create policy "Public read settings" on organization_settings for select using (true);
create policy "Super Admin update settings" on organization_settings for update using (is_super_admin());

-- Monetization (Conditional Visibility)
create policy "Public read visible merch" on merch_products for select using (is_visible or is_super_admin());
create policy "Super Admin write merch" on merch_products for insert with check (is_super_admin());
create policy "Super Admin update merch" on merch_products for update using (is_super_admin());

create policy "Public read visible tournaments" on tournaments for select using (is_visible or is_super_admin());
create policy "Super Admin write tournaments" on tournaments for insert with check (is_super_admin());
create policy "Super Admin update tournaments" on tournaments for update using (is_super_admin());

create policy "Public read visible packages" on sponsorship_packages for select using (is_visible or is_super_admin());
create policy "Super Admin write packages" on sponsorship_packages for insert with check (is_super_admin());
create policy "Super Admin update packages" on sponsorship_packages for update using (is_super_admin());

create policy "Public read visible memberships" on membership_tiers for select using (is_visible or is_super_admin());
create policy "Super Admin write memberships" on membership_tiers for insert with check (is_super_admin());
create policy "Super Admin update memberships" on membership_tiers for update using (is_super_admin());

-- STORAGE BUCKET SETUP (Logic to be run in Supabase UI or migrations)
insert into storage.buckets (id, name, public) values ('dstr-assets', 'dstr-assets', true) on conflict do nothing;

create policy "Public Access" on storage.objects for select using (bucket_id = 'dstr-assets');
create policy "Admin Upload" on storage.objects for insert with check (bucket_id = 'dstr-assets' and is_admin());
create policy "Admin Delete" on storage.objects for delete using (bucket_id = 'dstr-assets' and is_admin());

-- TRIGGERS
-- Handle new user signup -> create profile
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
