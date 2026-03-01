import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

// PUT /api/coupons/[id]
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const supabase = getAdminClient();

        const { data, error } = await supabase
            .from('coupons')
            .update(body)
            .eq('id', id)
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ coupon: data });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update coupon' }, { status: 500 });
    }
}

// DELETE /api/coupons/[id]
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const supabase = getAdminClient();
        const { error } = await supabase.from('coupons').delete().eq('id', id);
        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete coupon' }, { status: 500 });
    }
}
