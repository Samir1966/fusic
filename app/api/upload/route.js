import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        // 1. Verify Admin Auth
        const cookieStore = await cookies();
        const adminToken = cookieStore.get('fusic_admin_token');

        if (!adminToken) {
            return NextResponse.json({ error: 'Unauthorized: Admin access required.' }, { status: 401 });
        }

        const supabase = getAdminClient();

        // 2. Parse the multipart form data
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Validate it's an image
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
        }

        // Check size (e.g., max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
        }

        // 3. Prepare File for Supabase
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate a unique filename using timestamp and a random string
        const ext = file.name ? file.name.split('.').pop() : file.type.split('/')[1] || 'img';
        const randomString = Math.random().toString(36).substring(2, 8);
        const fileName = `${Date.now()}_${randomString}.${ext}`;
        const filePath = `products/${fileName}`; // Put them in a 'products' folder inside the bucket

        // 4. Upload using Admin Client (bypasses RLS)
        const { data, error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false // Don't overwrite existing files
            });

        if (uploadError) {
            console.error('Supabase Upload Error:', uploadError);
            return NextResponse.json({ error: 'Failed to upload image to storage' }, { status: 500 });
        }

        // 5. Get Public URL
        const { data: publicUrlData } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        return NextResponse.json({
            success: true,
            url: publicUrlData.publicUrl,
            message: 'Image uploaded successfully'
        }, { status: 200 });

    } catch (error) {
        console.error('Upload handler error:', error);
        return NextResponse.json({ error: 'Internal server error during upload' }, { status: 500 });
    }
}
