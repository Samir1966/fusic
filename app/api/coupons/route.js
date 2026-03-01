import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

// GET /api/coupons
export async function GET() {
    const supabase = getAdminClient();
    const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ coupons: data });
}

// POST /api/coupons
export async function POST(request) {
    try {
        const body = await request.json();
        const supabase = getAdminClient();

        const { data, error } = await supabase
            .from('coupons')
            .insert({
                code: body.code.toUpperCase().trim(),
                description: body.description,
                type: body.type || 'percentage',
                value: body.value,
                min_order: body.min_order || 0,
                max_discount: body.max_discount || null,
                usage_limit: body.usage_limit || null,
                is_active: body.is_active !== false,
                expires_at: body.expires_at || null,
            })
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ coupon: data }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
    }
}
