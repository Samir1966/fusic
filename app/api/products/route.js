import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminClient } from '@/lib/supabase';

// GET /api/products — list products (public)
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const trending = searchParams.get('trending');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const offset = parseInt(searchParams.get('offset')) || 0;
    const admin = searchParams.get('admin'); // if admin, show all including inactive

    const client = admin === 'true' ? getAdminClient() : supabase;
    let query = client.from('products').select('*', { count: 'exact' });

    if (admin !== 'true') query = query.eq('is_active', true);
    if (category) query = query.eq('category', category);
    if (trending === 'true') query = query.eq('trending', true);
    if (search) query = query.ilike('name', `%${search}%`);

    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ products: data, total: count });
}

// POST /api/products — create product (admin only)
export async function POST(request) {
    try {
        const body = await request.json();
        const supabase = getAdminClient();

        // Generate slug from name
        if (!body.slug) {
            body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
        }

        const { data, error } = await supabase
            .from('products')
            .insert(body)
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ product: data }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
