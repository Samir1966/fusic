import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

// GET /api/analytics — dashboard stats
export async function GET() {
    try {
        const supabase = getAdminClient();

        // Get counts in parallel
        const [productsRes, ordersRes, customersRes, revenueRes, recentOrdersRes, topProductsRes] =
            await Promise.all([
                supabase.from('products').select('id', { count: 'exact', head: true }),
                supabase.from('orders').select('id', { count: 'exact', head: true }),
                supabase.from('customers').select('id', { count: 'exact', head: true }),
                supabase.from('orders').select('total, order_status'),
                supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
                supabase.from('order_items').select('product_name, quantity, total'),
            ]);

        // Calculate revenue (only from non-cancelled orders)
        const allOrders = revenueRes.data || [];
        const totalRevenue = allOrders
            .filter((o) => o.order_status !== 'cancelled')
            .reduce((sum, o) => sum + parseFloat(o.total || 0), 0);

        const pendingOrders = allOrders.filter((o) => o.order_status === 'pending').length;
        const deliveredOrders = allOrders.filter((o) => o.order_status === 'delivered').length;

        // Top products by quantity sold
        const productMap = {};
        (topProductsRes.data || []).forEach((item) => {
            if (!productMap[item.product_name]) {
                productMap[item.product_name] = { name: item.product_name, sold: 0, revenue: 0 };
            }
            productMap[item.product_name].sold += item.quantity;
            productMap[item.product_name].revenue += parseFloat(item.total || 0);
        });
        const topProducts = Object.values(productMap)
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 5);

        return NextResponse.json({
            stats: {
                totalProducts: productsRes.count || 0,
                totalOrders: ordersRes.count || 0,
                totalCustomers: customersRes.count || 0,
                totalRevenue,
                pendingOrders,
                deliveredOrders,
                avgOrderValue: (ordersRes.count || 0) > 0
                    ? (totalRevenue / ordersRes.count).toFixed(0)
                    : 0,
            },
            recentOrders: recentOrdersRes.data || [],
            topProducts,
        });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}
