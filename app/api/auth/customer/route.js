import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const body = await request.json();
        const action = body.action; // 'signup', 'login', or 'logout'
        const cookieStore = await cookies();

        if (action === 'signup') {
            const { email, password, name, phone } = body;

            // 1. Sign up with Supabase Auth
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { name, phone } // Passing extra meta data for our trigger to catch
                }
            });

            if (error) return NextResponse.json({ error: error.message }, { status: 400 });

            // 2. Set Session Cookie
            if (data.session) {
                cookieStore.set('fusic_customer_token', data.session.access_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: data.session.expires_in,
                    path: '/'
                });
            }

            return NextResponse.json({ success: true, user: data.user, session: data.session }, { status: 200 });
        }

        else if (action === 'login') {
            const { email, password } = body;

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

            // Set Session Cookie
            if (data.session) {
                cookieStore.set('fusic_customer_token', data.session.access_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: data.session.expires_in,
                    path: '/'
                });
            }

            return NextResponse.json({ success: true, user: data.user }, { status: 200 });
        }

        else if (action === 'logout') {
            cookieStore.delete('fusic_customer_token');
            return NextResponse.json({ success: true }, { status: 200 });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (err) {
        console.error('Customer Auth API Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('fusic_customer_token');

        if (!token) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        // Verify token with Supabase by getting the user
        const { data: { user }, error } = await supabase.auth.getUser(token.value);

        if (error || !user) {
            cookieStore.delete('fusic_customer_token');
            return NextResponse.json({ user: null }, { status: 200 });
        }

        // Fetch their expanded profile from our custom 'customers' table
        const { data: customerData } = await supabase
            .from('customers')
            .select('*')
            .eq('id', user.id)
            .single();

        return NextResponse.json({
            user: { ...user, profile: customerData }
        }, { status: 200 });

    } catch (err) {
        return NextResponse.json({ user: null }, { status: 200 });
    }
}
