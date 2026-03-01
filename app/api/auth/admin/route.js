import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';
import { cookies } from 'next/headers';

// Simple admin auth using a signed token approach
// POST /api/auth/admin — login
export async function POST(request) {
    try {
        const { email, password } = await request.json();
        const supabase = getAdminClient();

        // Get admin user
        const { data: admin, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('email', email.toLowerCase().trim())
            .single();

        if (error || !admin) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Simple password check (for production, use bcrypt)
        // For now we store plain text and compare — will upgrade to bcrypt
        if (admin.password_hash !== password && admin.password_hash !== `plain:${password}`) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Update last login
        await supabase
            .from('admin_users')
            .update({ last_login: new Date().toISOString() })
            .eq('id', admin.id);

        // Create session token (simple base64 for now)
        const sessionData = JSON.stringify({
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
            exp: Date.now() + 24 * 60 * 60 * 1000, // 24h
        });
        const token = Buffer.from(sessionData).toString('base64');

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set('fusic_admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 86400, // 24h
            path: '/',
        });

        return NextResponse.json({
            success: true,
            admin: { name: admin.name, email: admin.email, role: admin.role },
        });
    } catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// GET /api/auth/admin — check session
export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('fusic_admin_token')?.value;
        if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });

        const sessionData = JSON.parse(Buffer.from(token, 'base64').toString());
        if (sessionData.exp < Date.now()) {
            return NextResponse.json({ authenticated: false, error: 'Session expired' }, { status: 401 });
        }

        return NextResponse.json({ authenticated: true, admin: sessionData });
    } catch {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}

// DELETE /api/auth/admin — logout
export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete('fusic_admin_token');
    return NextResponse.json({ success: true });
}
