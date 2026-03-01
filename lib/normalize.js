// Helper to convert Supabase snake_case product to frontend camelCase format
export function normalizeProduct(p) {
    if (!p) return null;
    return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        subcategory: p.subcategory,
        price: parseFloat(p.price),
        originalPrice: parseFloat(p.original_price || p.price),
        discount: p.discount || 0,
        rating: parseFloat(p.rating || 0),
        reviewCount: p.review_count || 0,
        colors: p.colors || [],
        colorNames: p.color_names || [],
        sizes: p.sizes || [],
        imageUrl: p.image_url || '',
        images: p.images || [],
        description: p.description || '',
        fabric: p.fabric || '',
        fit: p.fit || 'Regular',
        trending: p.trending || false,
        newArrival: p.new_arrival || false,
        stock: p.stock || 0,
        tags: p.tags || [],
        gradient: p.gradient || '',
        isActive: p.is_active !== false,
    };
}

export function normalizeCategory(c) {
    if (!c) return null;
    return {
        id: c.id,
        name: c.name,
        icon: c.icon || '🏷️',
        gradient: c.gradient || '',
        imageUrl: c.image_url || '',
        count: c.count || 0,
        sortOrder: c.sort_order || 0,
    };
}
