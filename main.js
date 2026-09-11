// AliBuyra Marketplace - Main JavaScript File
// Comprehensive functionality for all pages

// Global Variables
let currentPage = window.location.pathname.split('/').pop() || 'index.html';
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentView = 'grid';
let currentFilters = {
    categories: [],
    priceMin: 0,
    priceMax: 1000,
    rating: 0,
    search: '',
    aiRecommendations: false
};

// Product Data
const productData = [
    // Fashion & T-shirts
    { id: 1, name: "Premium Cotton T-Shirt", category: "fashion", price: 29.99, rating: 4.5, image: "https://kimi-web-img.moonshot.cn/img/wp-stahlsblog.s3.amazonaws.com/d505e3c10d89a24e56149422e56e1e0250e49470.png", description: "Comfortable premium cotton t-shirt" },
    { id: 2, name: "Designer Graphic Tee", category: "fashion", price: 39.99, rating: 4.8, image: "https://kimi-web-img.moonshot.cn/img/m.media-amazon.com/415da832e5944bf9882a5458830fb7dc7df47766.png", description: "Stylish graphic designer t-shirt" },
    { id: 3, name: "Vintage Style Shirt", category: "fashion", price: 34.99, rating: 4.3, image: "https://kimi-web-img.moonshot.cn/img/cobaltchronicles.com/c0f75e59b1cf33544cebced39683ef02e68d17c4.jpg", description: "Classic vintage style t-shirt" },
    { id: 4, name: "Athletic Performance Tee", category: "fashion", price: 44.99, rating: 4.7, image: "https://kimi-web-img.moonshot.cn/img/www.beautyfashionclub.com/0c26c60a8f51d70917aef04b38dfcd6ac2f3068a.jpg", description: "High-performance athletic shirt" },
    { id: 5, name: "Casual Weekend Shirt", category: "fashion", price: 24.99, rating: 4.2, image: "https://kimi-web-img.moonshot.cn/img/img.freepik.com/79e126a23a87c17b260083e1a3803f1817864824.jpg", description: "Perfect casual weekend wear" },
    
    // Shoes & Footwear
    { id: 6, name: "Running Sneakers", category: "shoes", price: 89.99, rating: 4.6, image: "https://kimi-web-img.moonshot.cn/img/www.mommypure.com/740c1cf0d01ba248a2e1b96a5d9c69be35df56ac.jpg", description: "Professional running sneakers" },
    { id: 7, name: "Casual Canvas Shoes", category: "shoes", price: 49.99, rating: 4.4, image: "https://kimi-web-img.moonshot.cn/img/hips.hearstapps.com/3d36035ad79f771180d0fa6013ca508db9a8a3cd.jpg", description: "Comfortable canvas shoes" },
    { id: 8, name: "Formal Leather Shoes", category: "shoes", price: 129.99, rating: 4.8, image: "https://kimi-web-img.moonshot.cn/img/images.shop.com/ae79c057853c1dea8070b49c0a70eb55f22fa26a.jpg", description: "Premium leather formal shoes" },
    { id: 9, name: "Athletic Sports Shoes", category: "shoes", price: 79.99, rating: 4.5, image: "https://kimi-web-img.moonshot.cn/img/hips.hearstapps.com/e6d86d8edd67b30ad2943bd049a3450ca727c51a.png", description: "Multi-sport athletic shoes" },
    { id: 10, name: "Fashion Sneakers", category: "shoes", price: 69.99, rating: 4.3, image: "https://kimi-web-img.moonshot.cn/img/thebeautyminimalist.com/6ad4c4e2a2eb7148e1fd476d9f38c02dc9dd0a95.jpg", description: "Trendy fashion sneakers" },
    
    // Electronics
    { id: 11, name: "Gaming Laptop Pro", category: "electronics", price: 1299.99, rating: 4.7, image: "https://kimi-web-img.moonshot.cn/img/dccomputerwarehouse.com/766c83a744ee91a19b2af63e811811a20ce14732.webp", description: "High-performance gaming laptop" },
    { id: 12, name: "Wireless Headphones", category: "electronics", price: 199.99, rating: 4.6, image: "https://kimi-web-img.moonshot.cn/img/media.wired.com/b143382eefffdc544b2cb4b1ebb5c89b935afbe1.jpg", description: "Premium wireless headphones" },
    { id: 13, name: "Smart Watch Ultra", category: "electronics", price: 399.99, rating: 4.8, image: "https://kimi-web-img.moonshot.cn/img/www.homeknows.com/0e10da8512f9f57c2b7e1af2219deffa92604f01.jpg", description: "Advanced smartwatch with health tracking" },
    { id: 14, name: "Bluetooth Speaker", category: "electronics", price: 89.99, rating: 4.4, image: "https://kimi-web-img.moonshot.cn/img/i.ytimg.com/8e9be2f9fbdb918096fc1852f9080e80e4b80592.jpg", description: "Portable bluetooth speaker" },
    { id: 15, name: "USB-C Hub", category: "electronics", price: 49.99, rating: 4.3, image: "https://kimi-web-img.moonshot.cn/img/gl-images.condecdn.net/7f6d753f0d7be9307f13c25efd09be8e8f7abc0a.jpg", description: "Multi-port USB-C hub" },
    
    // Beauty & Health
    { id: 16, name: "Skincare Essentials Set", category: "beauty", price: 89.99, rating: 4.8, image: "https://kimi-web-img.moonshot.cn/img/www.itcosmetics.com/83bef57f3e862755ef552071fecb5da7420ce2ff.jpg", description: "Complete skincare routine set" },
    { id: 17, name: "Vitamin C Serum", category: "beauty", price: 34.99, rating: 4.6, image: "https://kimi-web-img.moonshot.cn/img/data2.nssmag.com/a65be8174d7b65cc02b4a012cb3f2559f1008e0f.jpg", description: "Anti-aging vitamin C serum" },
    { id: 18, name: "Moisturizing Cream", category: "beauty", price: 24.99, rating: 4.5, image: "https://kimi-web-img.moonshot.cn/img/images.preview.ph/98befe883afd6a7c6fa8aa057f6e866b80bb12e7.webp", description: "Hydrating face moisturizer" },
    { id: 19, name: "Sunscreen SPF 50", category: "beauty", price: 19.99, rating: 4.7, image: "https://kimi-web-img.moonshot.cn/img/rhiannonbosse.com/4f0a34fc17bc0431e45cb6a1899abdd827dc5c3e.jpg", description: "Broad spectrum sunscreen" },
    { id: 20, name: "Face Mask Set", category: "beauty", price: 29.99, rating: 4.4, image: "https://kimi-web-img.moonshot.cn/img/ridgelysradar.com/82f237f8bd3d6ce31fdfcb4a7d6a6596c2579fb5.jpg", description: "Rejuvenating face mask collection" },
    
    // Gaming & Gadgets
    { id: 21, name: "Gaming Mechanical Keyboard", category: "gaming", price: 149.99, rating: 4.8, image: "https://kimi-web-img.moonshot.cn/img/s3.r29static.com/8081f29de902f35ab18dc43b911be3b13507829e.jpg", description: "RGB mechanical gaming keyboard" },
    { id: 22, name: "Wireless Gaming Mouse", category: "gaming", price: 79.99, rating: 4.7, image: "https://kimi-web-img.moonshot.cn/img/media.ulta.com/b9c760b4b0c2dd128039641a6d2d97142a0e6104", description: "High-precision wireless gaming mouse" },
    { id: 23, name: "Gaming Headset", category: "gaming", price: 129.99, rating: 4.6, image: "https://kimi-web-img.moonshot.cn/img/keikolynn.com/c8481a87b1b5410b74e70358592952b67787c840.jpg", description: "Surround sound gaming headset" },
    { id: 24, name: "Controller Gamepad", category: "gaming", price: 59.99, rating: 4.5, image: "https://kimi-web-img.moonshot.cn/img/media.ulta.com/6a5242968ff36d2809fb9fc25d68f284a60b3eb0", description: "Wireless gaming controller" },
    { id: 25, name: "Gaming Chair", category: "gaming", price: 299.99, rating: 4.8, image: "https://kimi-web-img.moonshot.cn/img/freepngimg.com/4d904d5d0a259fde8889fef003780574af28182c.png", description: "Ergonomic gaming chair" },
    
    // Home & Lifestyle
    { id: 26, name: "Smart Home Hub", category: "home", price: 199.99, rating: 4.7, image: "https://kimi-web-img.moonshot.cn/img/static1.squarespace.com/4b85108c02d897475a02cddeb5a88bc822bb9f52.png", description: "Central smart home control hub" },
    { id: 27, name: "LED Desk Lamp", category: "home", price: 49.99, rating: 4.5, image: "https://kimi-web-img.moonshot.cn/img/thepowergroup.com/0823e6964d2ab0e09d2f59135cec8571fc69ce73.jpg", description: "Adjustable LED desk lamp" },
    { id: 28, name: "Air Purifier", category: "home", price: 159.99, rating: 4.6, image: "https://kimi-web-img.moonshot.cn/img/www.mommypure.com/740c1cf0d01ba248a2e1b96a5d9c69be35df56ac.jpg", description: "HEPA filter air purifier" },
    { id: 29, name: "Essential Oil Diffuser", category: "home", price: 39.99, rating: 4.4, image: "https://kimi-web-img.moonshot.cn/img/hips.hearstapps.com/3d36035ad79f771180d0fa6013ca508db9a8a3cd.jpg", description: "Aromatherapy essential oil diffuser" },
    { id: 30, name: "Smart Scale", category: "home", price: 79.99, rating: 4.3, image: "https://kimi-web-img.moonshot.cn/img/images.shop.com/ae79c057853c1dea8070b49c0a70eb55f22fa26a.jpg", description: "Bluetooth smart body scale" },
    
    // Flowers & Gifts
    { id: 31, name: "Rose Bouquet", category: "flowers", price: 49.99, rating: 4.8, image: "https://kimi-web-img.moonshot.cn/img/asset.bloomnation.com/5d20be91a253e78d35f7e4f586f38ba564c0d197", description: "Fresh red rose bouquet" },
    { id: 32, name: "Mixed Flower Arrangement", category: "flowers", price: 69.99, rating: 4.7, image: "https://kimi-web-img.moonshot.cn/img/katiecouric.com/9bac95ca0dce5b651c9066fd5cbc29ba9f38cc49.jpg", description: "Beautiful mixed flower arrangement" },
    { id: 33, name: "Gift Basket Deluxe", category: "flowers", price: 89.99, rating: 4.6, image: "https://kimi-web-img.moonshot.cn/img/www.homelandflorists.co.uk/f94e96d84498ff0caf586aedd22a6a94e0a8839d.jpg", description: "Premium gift basket collection" },
    { id: 34, name: "Tropical Plant", category: "flowers", price: 34.99, rating: 4.5, image: "https://kimi-web-img.moonshot.cn/img/www.jardiniereflowers.com/72650e98b4cef6c4e56ad278790597f0eb68b2df.jpg", description: "Exotic tropical houseplant" },
    { id: 35, name: "Succulent Garden", category: "flowers", price: 29.99, rating: 4.4, image: "https://kimi-web-img.moonshot.cn/img/cdn1.1800flowers.com/858ede7193558bed8bb56463d71cc459adf2921f.jpg", description: "Assorted succulent plant collection" },
    
    // Grocery & Food
    { id: 36, name: "Organic Fruit Basket", category: "grocery", price: 39.99, rating: 4.7, image: "https://kimi-web-img.moonshot.cn/img/m.media-amazon.com/1044901239fa5dec129f51286377700e0036c7b7.jpg", description: "Fresh organic seasonal fruits" },
    { id: 37, name: "Gourmet Coffee Beans", category: "grocery", price: 24.99, rating: 4.8, image: "https://kimi-web-img.moonshot.cn/img/c.pxhere.com/3086e71a46d9d5c6ff8cdff946db910970ca2fa5.jpg!d", description: "Premium arabica coffee beans" },
    { id: 38, name: "Artisan Chocolate Box", category: "grocery", price: 34.99, rating: 4.6, image: "https://kimi-web-img.moonshot.cn/img/lewisfresh.com/8d4e363e0588d5d6c0fc07847dc45ebe0db6cc3d.jpg", description: "Handcrafted artisan chocolates" },
    { id: 39, name: "Organic Tea Set", category: "grocery", price: 29.99, rating: 4.5, image: "https://kimi-web-img.moonshot.cn/img/img-cdn.misfitsmarket.com/c29ec856c2b22ca1a685bfec83b4d05f160e4923.jpg", description: "Premium organic tea collection" },
    { id: 40, name: "Healthy Snack Box", category: "grocery", price: 19.99, rating: 4.3, image: "https://kimi-web-img.moonshot.cn/img/thumbs.dreamstime.com/da6722be8b12b5a7581c58657eedd126cb239b09.jpg", description: "Assorted healthy snacks" },
    
    // Clothing
    { id: 41, name: "Denim Jacket", category: "clothing", price: 89.99, rating: 4.6, image: "https://kimi-web-img.moonshot.cn/img/live.staticflickr.com/e3c50333bc257ff340cd87805770fcb6b325ba14.jpg", description: "Classic denim jacket" },
    { id: 42, name: "Summer Dress", category: "clothing", price: 69.99, rating: 4.7, image: "https://kimi-web-img.moonshot.cn/img/beautbeautyco.com/9029963edb41918ae755040950a301aea7d00a01.png", description: "Elegant summer dress" },
    { id: 43, name: "Winter Coat", category: "clothing", price: 199.99, rating: 4.8, image: "https://kimi-web-img.moonshot.cn/img/www.getrael.com/573a9cf8aa8c83b7aeb59d8fed6baa035bc2934e.png", description: "Warm winter coat" },
    { id: 44, name: "Yoga Pants", category: "clothing", price: 49.99, rating: 4.5, image: "https://kimi-web-img.moonshot.cn/img/media-cldnry.s-nbcnews.com/769a5c157732eef14fe522e2cae46491c50033c8.jpg", description: "Comfortable yoga pants" },
    { id: 45, name: "Formal Suit", category: "clothing", price: 299.99, rating: 4.9, image: "https://kimi-web-img.moonshot.cn/img/imageio.forbes.com/d3687a8a68227ecf8358e2cd22f580b2fbc1c879.png", description: "Professional formal suit" }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    products = [...productData];
    
    // Initialize page-specific functionality
    if (currentPage === 'index.html' || currentPage === '') {
        initializeHomepage();
    } else if (currentPage === 'products.html') {
        initializeProductsPage();
    } else if (currentPage === 'dashboard.html') {
        initializeDashboard();
    }
    
    // Initialize common functionality
    initializeCommonFeatures();
    updateCartCount();
});

// Homepage Initialization
function initializeHomepage() {
    initializeParticles();
    initializeTrendingSlider();
    animateMetrics();
    initializeScrollAnimations();
}

// Products Page Initialization
function initializeProductsPage() {
    renderProducts();
    initializeFilters();
    initializeSearch();
    initializeSorting();
    updatePriceRange();
}

// Dashboard Initialization
function initializeDashboard() {
    initializeIncomeChart();
    initializePredictionChart();
    startRealTimeUpdates();
    animateDashboardMetrics();
}

// Common Features
function initializeCommonFeatures() {
    initializeChatWidget();
    initializeNotifications();
}

// Particle System for Homepage
function initializeParticles() {
    if (typeof p5 === 'undefined') return;
    
    new p5(function(p) {
        let particles = [];
        
        p.setup = function() {
            let canvas = p.createCanvas(window.innerWidth, window.innerHeight);
            canvas.parent('particles');
            canvas.style('position', 'absolute');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '1');
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-1, 1),
                    vy: p.random(-1, 1),
                    size: p.random(2, 6),
                    opacity: p.random(0.3, 0.8)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(0, 191, 166, particle.opacity * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
            });
        };
        
        p.windowResized = function() {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
        };
    });
}

// Trending Products Slider
function initializeTrendingSlider() {
    if (typeof Splide === 'undefined') return;
    
    const trendingProducts = products.slice(0, 8);
    const sliderContainer = document.getElementById('trending-products');
    
    if (sliderContainer) {
        sliderContainer.innerHTML = trendingProducts.map(product => `
            <li class="splide__slide">
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h4 class="font-semibold text-gray-900 mb-2">${product.name}</h4>
                        <p class="text-teal-600 font-bold">$${product.price}</p>
                        <div class="flex items-center mt-2">
                            <div class="flex text-yellow-400">
                                ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                            </div>
                            <span class="text-xs text-gray-500 ml-2">(${product.rating})</span>
                        </div>
                    </div>
                </div>
            </li>
        `).join('');
        
        new Splide('#trending-slider', {
            type: 'loop',
            perPage: 4,
            perMove: 1,
            gap: '1rem',
            autoplay: true,
            interval: 3000,
            breakpoints: {
                768: { perPage: 2 },
                480: { perPage: 1 }
            }
        }).mount();
    }
}

// Animate Metrics on Homepage
function animateMetrics() {
    const metrics = [
        { id: 'products-count', target: 45000, suffix: 'K+', divisor: 1000 },
        { id: 'users-count', target: 2100000, suffix: 'M', divisor: 1000000 },
        { id: 'revenue-count', target: 12500000, suffix: 'M', divisor: 1000000 },
        { id: 'ai-accuracy', target: 98.5, suffix: '%', divisor: 1 }
    ];
    
    metrics.forEach(metric => {
        const element = document.getElementById(metric.id);
        if (element) {
            anime({
                targets: { value: 0 },
                value: metric.target,
                duration: 2000,
                delay: 500,
                easing: 'easeOutQuart',
                update: function(anim) {
                    const value = anim.animatables[0].target.value / metric.divisor;
                    element.textContent = metric.divisor === 1 ? value.toFixed(1) + metric.suffix : Math.floor(value) + metric.suffix;
                }
            });
        }
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutQuart'
                });
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.metric-card, .category-card, .product-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Products Page Functions
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    const filteredProducts = filterProducts();
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h4 class="font-semibold text-gray-900 mb-2">${product.name}</h4>
                <p class="text-sm text-gray-600 mb-3">${product.description}</p>
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-teal-600 font-bold text-lg">$${product.price}</p>
                        <div class="flex items-center mt-1">
                            <div class="flex text-yellow-400 text-sm">
                                ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                            </div>
                            <span class="text-xs text-gray-500 ml-1">(${product.rating})</span>
                        </div>
                    </div>
                    <button onclick="event.stopPropagation(); addToCart(${product.id})" class="btn-primary text-sm px-4 py-2">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update product count
    const countElement = document.getElementById('product-count');
    if (countElement) {
        countElement.textContent = filteredProducts.length;
    }
    
    // Animate product cards
    anime({
        targets: '.product-card',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutQuart'
    });
}

function filterProducts() {
    let filtered = [...products];
    
    // Apply category filters
    if (currentFilters.categories.length > 0) {
        filtered = filtered.filter(product => currentFilters.categories.includes(product.category));
    }
    
    // Apply price filters
    filtered = filtered.filter(product => 
        product.price >= currentFilters.priceMin && product.price <= currentFilters.priceMax
    );
    
    // Apply rating filter
    if (currentFilters.rating > 0) {
        filtered = filtered.filter(product => product.rating >= currentFilters.rating);
    }
    
    // Apply search filter
    if (currentFilters.search) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            product.description.toLowerCase().includes(currentFilters.search.toLowerCase())
        );
    }
    
    // Apply AI recommendations (mock implementation)
    if (currentFilters.aiRecommendations) {
        // Simulate AI sorting by rating and popularity
        filtered.sort((a, b) => b.rating - a.rating);
    }
    
    return filtered;
}

function initializeFilters() {
    // Category filters
    document.querySelectorAll('.category-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Rating filters
    document.querySelectorAll('input[name="rating"]').forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });
}

function applyFilters() {
    // Get selected categories
    currentFilters.categories = Array.from(document.querySelectorAll('.category-filter:checked'))
        .map(cb => cb.value);
    
    // Get selected rating
    const ratingRadio = document.querySelector('input[name="rating"]:checked');
    currentFilters.rating = ratingRadio ? parseInt(ratingRadio.value) : 0;
    
    updateActiveFilters();
    renderProducts();
}

function updateActiveFilters() {
    const activeFiltersContainer = document.getElementById('active-filters');
    const filterTagsContainer = document.getElementById('filter-tags');
    
    if (!activeFiltersContainer || !filterTagsContainer) return;
    
    const tags = [];
    
    // Add category tags
    currentFilters.categories.forEach(category => {
        tags.push(`<span class="filter-tag">${category} <button onclick="removeFilter('category', '${category}')">×</button></span>`);
    });
    
    // Add price range tag
    if (currentFilters.priceMin > 0 || currentFilters.priceMax < 1000) {
        tags.push(`<span class="filter-tag">$${currentFilters.priceMin} - $${currentFilters.priceMax} <button onclick="removeFilter('price')">×</button></span>`);
    }
    
    // Add rating tag
    if (currentFilters.rating > 0) {
        tags.push(`<span class="filter-tag">${currentFilters.rating}+ Stars <button onclick="removeFilter('rating')">×</button></span>`);
    }
    
    if (tags.length > 0) {
        filterTagsContainer.innerHTML = tags.join('');
        activeFiltersContainer.classList.remove('hidden');
    } else {
        activeFiltersContainer.classList.add('hidden');
    }
}

function removeFilter(type, value) {
    if (type === 'category') {
        const checkbox = document.querySelector(`.category-filter[value="${value}"]`);
        if (checkbox) checkbox.checked = false;
    } else if (type === 'price') {
        document.getElementById('price-min').value = 0;
        document.getElementById('price-max').value = 1000;
        currentFilters.priceMin = 0;
        currentFilters.priceMax = 1000;
        updatePriceRange();
    } else if (type === 'rating') {
        document.querySelector('input[name="rating"][value="0"]').checked = true;
    }
    
    applyFilters();
}

function clearAllFilters() {
    // Clear category filters
    document.querySelectorAll('.category-filter').forEach(cb => cb.checked = false);
    
    // Clear price filters
    document.getElementById('price-min').value = 0;
    document.getElementById('price-max').value = 1000;
    currentFilters.priceMin = 0;
    currentFilters.priceMax = 1000;
    updatePriceRange();
    
    // Clear rating filter
    document.querySelector('input[name="rating"][value="0"]').checked = true;
    
    // Clear search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
        currentFilters.search = '';
    }
    
    applyFilters();
}

function updatePriceRange() {
    const minSlider = document.getElementById('price-min');
    const maxSlider = document.getElementById('price-max');
    const minValue = document.getElementById('price-min-value');
    const maxValue = document.getElementById('price-max-value');
    
    if (minSlider && maxSlider && minValue && maxValue) {
        currentFilters.priceMin = parseInt(minSlider.value);
        currentFilters.priceMax = parseInt(maxSlider.value);
        
        minValue.textContent = currentFilters.priceMin;
        maxValue.textContent = currentFilters.priceMax;
        
        applyFilters();
    }
}

function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentFilters.search = e.target.value;
            applyFilters();
        });
    }
}

function initializeSorting() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function(e) {
            sortProducts(e.target.value);
        });
    }
}

function sortProducts(sortBy) {
    switch (sortBy) {
        case 'price-low':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            products.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            products.sort((a, b) => b.id - a.id);
            break;
        default:
            // Featured - keep original order
            break;
    }
    
    renderProducts();
}

function toggleAIRecommendations() {
    const checkbox = document.getElementById('ai-recommendations');
    currentFilters.aiRecommendations = checkbox ? checkbox.checked : false;
    renderProducts();
}

function toggleView(view) {
    currentView = view;
    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');
    const productsGrid = document.getElementById('products-grid');
    
    if (view === 'grid') {
        gridView.classList.add('bg-teal-600', 'text-white');
        gridView.classList.remove('bg-gray-200', 'text-gray-600');
        listView.classList.add('bg-gray-200', 'text-gray-600');
        listView.classList.remove('bg-teal-600', 'text-white');
        productsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    } else {
        listView.classList.add('bg-teal-600', 'text-white');
        listView.classList.remove('bg-gray-200', 'text-gray-600');
        gridView.classList.add('bg-gray-200', 'text-gray-600');
        gridView.classList.remove('bg-teal-600', 'text-white');
        productsGrid.className = 'grid grid-cols-1 gap-4';
    }
    
    renderProducts();
}

// Shopping Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
    
    // Animate cart icon
    anime({
        targets: '#cart-count',
        scale: [1, 1.3, 1],
        duration: 300,
        easing: 'easeOutQuart'
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.toggle('hidden');
        if (!modal.classList.contains('hidden')) {
            renderCartItems();
        }
    }
}

function renderCartItems() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item flex items-center justify-between p-3 border-b">
            <div class="flex items-center gap-3">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                <div>
                    <h4 class="font-medium text-sm">${item.name}</h4>
                    <p class="text-xs text-gray-500">$${item.price} × ${item.quantity}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <span class="font-semibold">$${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">×</button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Simulate checkout process
    showNotification('Processing checkout...', 'info');
    
    setTimeout(() => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        toggleCart();
        showNotification('Order placed successfully!', 'success');
    }, 2000);
}

// Dashboard Functions
function initializeIncomeChart() {
    if (typeof echarts === 'undefined') return;
    
    const chartDom = document.getElementById('income-chart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    // Generate sample data
    const hours = Array.from({length: 24}, (_, i) => i);
    const incomeData = hours.map(hour => {
        const baseIncome = 100;
        const peakHours = [14, 15, 16, 17, 18]; // 2PM - 6PM
        const multiplier = peakHours.includes(hour) ? 2.5 : 1;
        return Math.floor(baseIncome * multiplier + Math.random() * 50);
    });
    
    const option = {
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                return `Hour: ${params[0].axisValue}:00<br/>Income: $${params[0].value}`;
            }
        },
        xAxis: {
            type: 'category',
            data: hours.map(h => h.toString().padStart(2, '0')),
            axisLabel: {
                formatter: '{value}:00'
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '${value}'
            }
        },
        series: [{
            data: incomeData,
            type: 'line',
            smooth: true,
            lineStyle: {
                color: '#00BFA6',
                width: 3
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(0, 191, 166, 0.3)' },
                        { offset: 1, color: 'rgba(0, 191, 166, 0.1)' }
                    ]
                }
            }
        }]
    };
    
    myChart.setOption(option);
    
    // Store chart instance for updates
    window.incomeChart = myChart;
}

function initializePredictionChart() {
    if (typeof echarts === 'undefined') return;
    
    const chartDom = document.getElementById('prediction-chart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    // Generate prediction data
    const days = Array.from({length: 30}, (_, i) => i + 1);
    const actualData = days.slice(0, 20).map(day => {
        return 2000 + Math.sin(day * 0.3) * 500 + Math.random() * 300;
    });
    const predictedData = days.slice(19).map(day => {
        return 2200 + Math.sin(day * 0.2) * 400 + Math.random() * 200;
    });
    
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Actual', 'AI Prediction']
        },
        xAxis: {
            type: 'category',
            data: days.map(d => `Day ${d}`)
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '${value}'
            }
        },
        series: [
            {
                name: 'Actual',
                type: 'line',
                data: [...actualData, ...Array(10).fill(null)],
                lineStyle: { color: '#00BFA6' },
                itemStyle: { color: '#00BFA6' }
            },
            {
                name: 'AI Prediction',
                type: 'line',
                data: [null, ...Array(19).fill(null), ...predictedData],
                lineStyle: { 
                    color: '#6A00F4',
                    type: 'dashed'
                },
                itemStyle: { color: '#6A00F4' }
            }
        ]
    };
    
    myChart.setOption(option);
}

function updateChartPeriod(period) {
    // Update active button
    document.querySelectorAll('.time-selector button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`${period}-btn`).classList.add('active');
    
    // Update chart data based on period
    if (window.incomeChart) {
        let data, labels;
        
        switch (period) {
            case 'hourly':
                labels = Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0') + ':00');
                data = Array.from({length: 24}, () => Math.floor(Math.random() * 200) + 50);
                break;
            case 'daily':
                labels = Array.from({length: 7}, (_, i) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]);
                data = Array.from({length: 7}, () => Math.floor(Math.random() * 3000) + 1000);
                break;
            case 'weekly':
                labels = Array.from({length: 4}, (_, i) => `Week ${i + 1}`);
                data = Array.from({length: 4}, () => Math.floor(Math.random() * 15000) + 5000);
                break;
        }
        
        window.incomeChart.setOption({
            xAxis: { data: labels },
            series: [{ data: data }]
        });
    }
}

function startRealTimeUpdates() {
    // Simulate real-time updates every 5 seconds
    setInterval(() => {
        updateDashboardMetrics();
    }, 5000);
}

function updateDashboardMetrics() {
    // Update daily income with small random changes
    const dailyIncomeElement = document.getElementById('daily-income');
    if (dailyIncomeElement) {
        const currentValue = parseFloat(dailyIncomeElement.textContent.replace(/[$,]/g, ''));
        const change = (Math.random() - 0.5) * 100; // ±$50 change
        const newValue = Math.max(0, currentValue + change);
        
        anime({
            targets: { value: currentValue },
            value: newValue,
            duration: 1000,
            easing: 'easeOutQuart',
            update: function(anim) {
                dailyIncomeElement.textContent = '$' + Math.floor(anim.animatables[0].target.value).toLocaleString();
            }
        });
    }
}

function animateDashboardMetrics() {
    // Animate metric cards on load
    anime({
        targets: '.metric-card',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(200),
        duration: 800,
        easing: 'easeOutQuart'
    });
}

// Withdrawal Modal Functions
function openWithdrawalModal() {
    const modal = document.getElementById('withdrawal-modal');
    if (modal) {
        modal.classList.remove('hidden');
        
        // Update net amount calculation
        const amountInput = document.getElementById('withdrawal-amount');
        if (amountInput) {
            amountInput.addEventListener('input', updateNetAmount);
        }
    }
}

function closeWithdrawalModal() {
    const modal = document.getElementById('withdrawal-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function updateNetAmount() {
    const amountInput = document.getElementById('withdrawal-amount');
    const netAmountElement = document.getElementById('net-amount');
    
    if (amountInput && netAmountElement) {
        const amount = parseFloat(amountInput.value) || 0;
        const fee = 25;
        const netAmount = Math.max(0, amount - fee);
        netAmountElement.textContent = '$' + netAmount.toFixed(2);
    }
}

function processWithdrawal() {
    const amountInput = document.getElementById('withdrawal-amount');
    const amount = parseFloat(amountInput.value) || 0;
    
    if (amount <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    if (amount > 3456) {
        showNotification('Insufficient funds', 'error');
        return;
    }
    
    // Simulate withdrawal process
    showNotification('Processing withdrawal...', 'info');
    
    setTimeout(() => {
        closeWithdrawalModal();
        showNotification('Withdrawal processed successfully!', 'success');
        
        // Update balance (mock)
        const balanceElement = document.getElementById('affiliate-balance');
        if (balanceElement) {
            const newBalance = 3456 - amount;
            balanceElement.textContent = '$' + newBalance.toLocaleString();
        }
    }, 2000);
}

// Chat Widget Functions
function initializeChatWidget() {
    // Chat functionality is already in HTML, just ensure it works
}

function toggleChat() {
    const chatPanel = document.getElementById('chat-panel');
    const chatIcon = document.getElementById('chat-icon');
    
    if (chatPanel && chatIcon) {
        chatPanel.classList.toggle('hidden');
        chatIcon.textContent = chatPanel.classList.contains('hidden') ? '💬' : '✕';
    }
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatInput || !chatMessages || !chatInput.value.trim()) return;
    
    const userMessage = chatInput.value.trim();
    
    // Add user message
    chatMessages.innerHTML += `
        <div class="bg-teal-100 p-2 rounded-lg mb-2 ml-auto max-w-xs">
            <p class="text-sm">${userMessage}</p>
        </div>
    `;
    
    chatInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponses = [
            "I found some great products for you! Check out our trending items.",
            "Based on your interests, I recommend looking at our electronics section.",
            "That's a popular category! Here are some top-rated items.",
            "I can help you find the perfect product. What specific features are you looking for?",
            "Great choice! Let me show you some similar products you might like."
        ];
        
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        
        chatMessages.innerHTML += `
            <div class="bg-gray-100 p-2 rounded-lg mb-2 max-w-xs">
                <p class="text-sm">${randomResponse}</p>
            </div>
        `;
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Notification System
function initializeNotifications() {
    // Notification system is ready
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    if (!notification || !notificationText) return;
    
    const colors = {
        success: 'bg-teal-600',
        error: 'bg-red-600',
        info: 'bg-blue-600',
        warning: 'bg-yellow-600'
    };
    
    // Update notification content
    notificationText.textContent = message;
    notification.className = `notification ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg`;
    
    // Show notification
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Utility Functions
function filterProducts(category) {
    if (currentPage === 'products.html') {
        // Navigate to products page with category filter
        window.location.href = `products.html?category=${category}`;
    } else {
        // Handle category clicks from homepage
        window.location.href = `products.html?category=${category}`;
    }
}

function viewProduct(productId) {
    // Simulate product detail view
    showNotification('Opening product details...', 'info');
    
    // In a real app, this would navigate to a product detail page
    setTimeout(() => {
        showNotification('Feature coming soon!', 'info');
    }, 1000);
}

function loadMoreProducts() {
    // Simulate loading more products
    showNotification('Loading more products...', 'info');
    
    setTimeout(() => {
        showNotification('All products loaded!', 'success');
    }, 1500);
}

// Handle URL parameters for category filtering
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && currentPage === 'products.html') {
        // Check the corresponding category filter
        const categoryCheckbox = document.querySelector(`.category-filter[value="${category}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
            applyFilters();
        }
    }
}

// Initialize URL parameter handling when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    handleURLParameters();
});

// Handle window resize for responsive charts
window.addEventListener('resize', function() {
    if (window.incomeChart) {
        window.incomeChart.resize();
    }
});