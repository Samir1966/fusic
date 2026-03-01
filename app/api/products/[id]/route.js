import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminClient } from '@/lib/supabase';

// GET /api/products/[id]
export async function GET(request, { params }) {
    const { id } = await params;
    // Try UUID first, then slug
    const isUUID = /^[0-9a-f]{8}-/.test(id);
    const query = isUUID
        ? supabase.from('products').select('*').eq('id', id)
        : supabase.from('products').select('*').eq('slug', id);

    const { data, error } = await query.single();
    if (error || !data) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ product: data });
}

// PUT /api/products/[id] — update product (admin)
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const admin = getAdminClient();

        const { data, error } = await admin
            .from('products')
            .update(body)
            .eq('id', id)
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ product: data });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}

// DELETE /api/products/[id] — delete product (admin)
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const admin = getAdminClient();
        const { error } = await admin.from('products').delete().eq('id', id);
        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
