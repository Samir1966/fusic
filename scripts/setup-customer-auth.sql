-- Run this in your Supabase SQL Editor to set up Customer Auth syncing

-- 1. Create a trigger function to automatically create a customer record 
-- whenever a new user signs up via Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.customers (id, email, phone, name, total_orders, total_spent)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'phone',
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    0,
    0
  );
  return new;
end;
$$;

-- 2. Attach the trigger to the auth.users table
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. (Optional but recommended) Update RLS so customers can read their own data
alter table public.customers enable row level security;

create policy "Customers can view their own data."
  on public.customers for select
  using ( auth.uid() = id );

create policy "Customers can update their own data."
  on public.customers for update
  using ( auth.uid() = id );
