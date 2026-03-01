-- Run this in your Supabase SQL Editor to create the Storage Bucket for Product Images

-- 1. Create the product-images bucket
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- 2. Allow public access to view/download images
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'product-images' );

-- Note: We do not need an INSERT policy here because we are using the 
-- Backend API with the Service Role Key to upload files, which bypasses RLS policies entirely.
