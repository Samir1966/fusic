import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

// GET /api/customers
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const offset = parseInt(searchParams.get('offset')) || 0;

    const supabase = getAdminClient();
    let query = supabase.from('customers').select('*', { count: 'exact' });

    if (search) {
        query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`);
    }

    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);
    const { data, error, count } = await query;

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ customers: data, total: count });
}
