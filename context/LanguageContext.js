'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
    en: {
        // Header
        'nav.men': 'Men',
        'nav.women': 'Women',
        'nav.oversized': 'Oversized',
        'nav.hoodies': 'Hoodies',
        'nav.under999': 'Under ₹999',
        // Trust Bar
        'trust.cod': 'COD Available',
        'trust.returns': 'Free Returns',
        'trust.delivery': 'Fast Delivery',
        // USP
        'usp.cod': 'COD + UPI',
        'usp.codDesc': 'Pay your way',
        'usp.returns': '7 Day Easy Returns',
        'usp.returnsDesc': 'No questions asked',
        'usp.affordable': 'Affordable Fashion',
        'usp.affordableDesc': 'Premium at low prices',
        'usp.size': 'Size Assist',
        'usp.sizeDesc': 'AI-powered fit guide',
        // Homepage
        'home.trending': "What's Trending in",
        'home.trendingSub': 'Hottest picks in your city right now',
        'home.category': 'Shop By Category',
        'home.categorySub': 'Find your perfect style',
        'home.festival': 'Festival Bundles 🎉',
        'home.festivalSub': 'Curated combos at unbeatable prices — limited stock!',
        'home.reviews': 'Real People. Real Stories. 💬',
        'home.reviewsSub': '50,000+ happy customers across India',
        // Cart
        'cart.title': 'Your Cart',
        'cart.empty': 'Your cart is empty',
        'cart.emptyDesc': 'Add some amazing FUSIC pieces!',
        'cart.savings': 'You save',
        'cart.checkout': 'Proceed to Checkout',
        'cart.continue': 'Continue Shopping',
        // Product
        'product.addToCart': 'Add to Cart',
        'product.buyNow': 'Buy Now',
        'product.delivery': 'Delivery',
        'product.sizeGuide': 'Size Guide',
        'product.related': 'You May Also Like',
        // Footer
        'footer.newsletter': 'Join the FUSIC Crew',
        'footer.newsletterSub': 'Get 15% off your first order + early access to drops',
        'footer.subscribe': 'Subscribe',
    },
    hi: {
        'nav.men': 'पुरुष',
        'nav.women': 'महिला',
        'nav.oversized': 'ओवरसाइज़्ड',
        'nav.hoodies': 'हुडीज़',
        'nav.under999': '₹999 से कम',
        'trust.cod': 'कैश ऑन डिलीवरी',
        'trust.returns': 'मुफ़्त रिटर्न',
        'trust.delivery': 'तेज़ डिलीवरी',
        'usp.cod': 'COD + UPI',
        'usp.codDesc': 'अपने तरीके से भुगतान करें',
        'usp.returns': '7 दिन आसान रिटर्न',
        'usp.returnsDesc': 'कोई सवाल नहीं',
        'usp.affordable': 'सस्ता फैशन',
        'usp.affordableDesc': 'प्रीमियम कम दाम में',
        'usp.size': 'साइज़ सहायता',
        'usp.sizeDesc': 'AI फिट गाइड',
        'home.trending': 'ट्रेंडिंग में',
        'home.trendingSub': 'आपके शहर में सबसे हॉट पिक्स',
        'home.category': 'कैटेगरी से खरीदें',
        'home.categorySub': 'अपना स्टाइल खोजें',
        'home.festival': 'फेस्टिवल बंडल 🎉',
        'home.festivalSub': 'बेहतरीन कॉम्बो — सीमित स्टॉक!',
        'home.reviews': 'असली लोग। असली कहानियां। 💬',
        'home.reviewsSub': 'पूरे भारत में 50,000+ खुश ग्राहक',
        'cart.title': 'आपकी कार्ट',
        'cart.empty': 'कार्ट खाली है',
        'cart.emptyDesc': 'FUSIC के शानदार कपड़े जोड़ें!',
        'cart.savings': 'आपकी बचत',
        'cart.checkout': 'चेकआउट करें',
        'cart.continue': 'शॉपिंग जारी रखें',
        'product.addToCart': 'कार्ट में जोड़ें',
        'product.buyNow': 'अभी खरीदें',
        'product.delivery': 'डिलीवरी',
        'product.sizeGuide': 'साइज़ गाइड',
        'product.related': 'आपको ये भी पसंद आएगा',
        'footer.newsletter': 'FUSIC क्रू में शामिल हों',
        'footer.newsletterSub': 'पहले ऑर्डर पर 15% छूट + जल्दी एक्सेस',
        'footer.subscribe': 'सब्सक्राइब',
    },
    bn: {
        'nav.men': 'পুরুষ',
        'nav.women': 'মহিলা',
        'nav.oversized': 'ওভারসাইজড',
        'nav.hoodies': 'হুডিজ',
        'nav.under999': '₹999 এর নিচে',
        'trust.cod': 'ক্যাশ অন ডেলিভারি',
        'trust.returns': 'ফ্রি রিটার্ন',
        'trust.delivery': 'দ্রুত ডেলিভারি',
        'home.trending': 'ট্রেন্ডিং',
        'home.trendingSub': 'আপনার শহরে হটেস্ট পিক্স',
        'home.category': 'ক্যাটেগরি অনুযায়ী কিনুন',
        'home.categorySub': 'আপনার স্টাইল খুঁজুন',
        'home.festival': 'ফেস্টিভ্যাল বান্ডেল 🎉',
        'home.festivalSub': 'অবিশ্বাস্য দামে কিউরেটেড কম্বো!',
        'cart.title': 'আপনার কার্ট',
        'cart.checkout': 'চেকআউট করুন',
        'product.addToCart': 'কার্টে যোগ করুন',
        'product.buyNow': 'এখনই কিনুন',
        'footer.newsletter': 'FUSIC ক্রু-তে যোগ দিন',
        'footer.subscribe': 'সাবস্ক্রাইব',
    },
    te: {
        'nav.men': 'పురుషులు',
        'nav.women': 'మహిళలు',
        'nav.oversized': 'ఓవర్‌సైజ్డ్',
        'nav.hoodies': 'హుడీస్',
        'nav.under999': '₹999 లోపు',
        'trust.cod': 'క్యాష్ ఆన్ డెలివరీ',
        'trust.returns': 'ఉచిత రిటర్న్‌లు',
        'trust.delivery': 'వేగవంతమైన డెలివరీ',
        'home.trending': 'ట్రెండింగ్',
        'home.category': 'కేటగిరీ వారీగా షాప్',
        'cart.title': 'మీ కార్ట్',
        'product.addToCart': 'కార్ట్‌కు జోడించు',
        'product.buyNow': 'ఇప్పుడే కొనండి',
        'footer.newsletter': 'FUSIC క్రూలో చేరండి',
        'footer.subscribe': 'సబ్‌స్క్రైబ్',
    },
    od: {
        'nav.men': 'ପୁରୁଷ',
        'nav.women': 'ମହିଳା',
        'nav.oversized': 'ଓଭରସାଇଜଡ',
        'nav.hoodies': 'ହୁଡିଜ',
        'nav.under999': '₹999 ତଳେ',
        'trust.cod': 'କ୍ୟାସ ଅନ ଡେଲିଭରି',
        'trust.returns': 'ମାଗଣା ରିଟର୍ନ',
        'trust.delivery': 'ଦ୍ରୁତ ଡେଲିଭରି',
        'home.trending': 'ଟ୍ରେଣ୍ଡିଂ',
        'home.category': 'ବର୍ଗ ଅନୁସାରେ କିଣନ୍ତୁ',
        'cart.title': 'ଆପଣଙ୍କ କାର୍ଟ',
        'product.addToCart': 'କାର୍ଟରେ ଯୋଡ଼ନ୍ତୁ',
        'product.buyNow': 'ବର୍ତ୍ତମାନ କିଣନ୍ତୁ',
        'footer.newsletter': 'FUSIC କ୍ରୁରେ ଯୋଡ଼ି ହୁଅନ୍ତୁ',
        'footer.subscribe': 'ସବସ୍କ୍ରାଇବ',
    },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const saved = localStorage.getItem('fusic-lang');
        if (saved && translations[saved]) setLanguage(saved);
    }, []);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('fusic-lang', lang);
    };

    const t = (key) => {
        return translations[language]?.[key] || translations.en[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        return { language: 'en', changeLanguage: () => { }, t: (key) => translations.en[key] || key };
    }
    return context;
}
