import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

// GET /api/orders — list all orders (admin)
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const offset = parseInt(searchParams.get('offset')) || 0;

    const supabase = getAdminClient();
    let query = supabase.from('orders').select('*', { count: 'exact' });

    if (status && status !== 'all') query = query.eq('order_status', status);
    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ orders: data, total: count });
}

// POST /api/orders — create new order (from checkout)
export async function POST(request) {
    try {
        const body = await request.json();
        const supabase = getAdminClient();

        // Generate order number
        const orderNumber = `FUSIC-${Date.now().toString(36).toUpperCase()}`;

        // Check/create customer
        let customerId = null;
        const { data: existingCustomer } = await supabase
            .from('customers')
            .select('id')
            .eq('phone', body.phone)
            .single();

        if (existingCustomer) {
            customerId = existingCustomer.id;
            await supabase
                .from('customers')
                .update({
                    total_orders: (existingCustomer.total_orders || 0) + 1,
                    total_spent: (existingCustomer.total_spent || 0) + body.total,
                })
                .eq('id', customerId);
        } else {
            const { data: newCustomer } = await supabase
                .from('customers')
                .insert({
                    name: body.name,
                    phone: body.phone,
                    email: body.email || null,
                    address_line1: body.address,
                    city: body.city,
                    state: body.state || 'Odisha',
                    pincode: body.pincode,
                    total_orders: 1,
                    total_spent: body.total,
                })
                .select('id')
                .single();
            customerId = newCustomer?.id;
        }

        // Create order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                order_number: orderNumber,
                customer_id: customerId,
                customer_name: body.name,
                customer_phone: body.phone,
                customer_email: body.email || null,
                shipping_address: body.address,
                shipping_city: body.city,
                shipping_state: body.state || 'Odisha',
                shipping_pincode: body.pincode,
                subtotal: body.subtotal,
                discount_amount: body.discountAmount || 0,
                shipping_cost: body.shippingCost || 0,
                total: body.total,
                coupon_code: body.couponCode || null,
                payment_method: body.paymentMethod || 'COD',
                payment_status: 'pending',
                order_status: 'pending',
                notes: body.notes || null,
            })
            .select()
            .single();

        if (orderError) return NextResponse.json({ error: orderError.message }, { status: 400 });

        // Create order items
        if (body.items && body.items.length > 0) {
            const orderItems = body.items.map((item) => ({
                order_id: order.id,
                product_id: item.productId || null,
                product_name: item.name,
                product_image: item.imageUrl || null,
                quantity: item.quantity,
                size: item.size || null,
                color: item.color || null,
                price: item.price,
                total: item.price * item.quantity,
            }));

            await supabase.from('order_items').insert(orderItems);
        }

        // Update coupon used count
        if (body.couponCode) {
            await supabase.rpc('increment_coupon_used', { coupon_code: body.couponCode });
        }

        return NextResponse.json({
            success: true,
            order: { id: order.id, orderNumber: order.order_number },
        }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}
