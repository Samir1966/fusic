import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

// GET /api/orders/[id] — get order details with items
export async function GET(request, { params }) {
    const { id } = await params;
    const supabase = getAdminClient();

    const { data: order, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    // Get order items
    const { data: items } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', id);

    return NextResponse.json({ order: { ...order, items: items || [] } });
}

// PUT /api/orders/[id] — update order status (admin)
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const supabase = getAdminClient();

        const { data, error } = await supabase
            .from('orders')
            .update({
                order_status: body.order_status,
                payment_status: body.payment_status || undefined,
                notes: body.notes || undefined,
            })
            .eq('id', id)
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ order: data });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}
