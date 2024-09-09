document.addEventListener('DOMContentLoaded', function () {
    // Product data
    const products = [
        { id: 1, title: 'Watch', price: 200, image: 'watch1.jpg', description: 'A smartwatch with fitness tracking features', category: 'electronics' },
        { id: 2, title: 'Casual Shirt', price: 50, image: 'shirt.jpg', description: 'A stylish casual shirt for everyday wear', category: 'clothing' },
        { id: 3, title: 'Electric Cooker', price: 120, image: 'cooker.jpg', description: 'An efficient electric cooker for easy cooking', category: 'home' },
        { id: 4, title: 'Smartphone', price: 300, image: 'smartphone.jpg', description: 'A high-quality smartphone', category: 'electronics' },
        { id: 5, title: 'Laptop', price: 500, image: 'laptop.jpg', description: 'A powerful laptop for work and play', category: 'electronics' },
        { id: 6, title: 'Running Shoes', price: 80, image: 'shoes.jpg', description: 'Comfortable running shoes', category: 'clothing' },
        { id: 7, title: 'Blender', price: 50, image: 'blender.jpg', description: 'A blender for smoothies and more', category: 'home' },
        { id: 8, title: 'Smartwatch', price: 200, image: 'smartwatch.jpg', description: 'A smartwatch with fitness tracking features', category: 'electronics' },
        { id: 9, title: 'T-shirt', price: 20, image: 'tshirt.jpg', description: 'A stylish cotton t-shirt', category: 'clothing' }
    ];

    // Category data (for dynamic sidebar rendering)
    const categories = [
        { id: 'electronics', name: 'Electronics' },
        { id: 'clothing', name: 'Clothing' },
        { id: 'home', name: 'Home' }
    ];

    // DOM elements
    const productList = document.getElementById('productList');
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortBy = document.getElementById('sortBy');
    const noProductsMessage = document.getElementById('noProductsMessage');

    // Render products
    function renderProducts(filteredProducts) {
        productList.innerHTML = ''; // Clear the product list before rendering
        if (filteredProducts.length === 0) {
            noProductsMessage.style.display = 'block';
        } else {
            noProductsMessage.style.display = 'none';
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'col-md-4 mb-4';
                productCard.innerHTML = `
                    <div class="card product-card">
                        <img src="images/${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">$${product.price.toFixed(2)}</p>
                            <a href="product-view.html?productId=${product.id}&title=${encodeURIComponent(product.title)}&price=${product.price}&image=${encodeURIComponent(product.image)}&description=${encodeURIComponent(product.description)}" class="btn btn-primary">View Product</a>
                        </div>
                    </div>
                `;
                productList.appendChild(productCard);
            });
        }
    }

    // Filter products based on category, price, and search query
    function filterProducts() {
        const searchQuery = searchInput.value.trim().toLowerCase();
        const selectedCategory = categoryFilter.value;
        const maxPrice = parseFloat(document.getElementById('priceRange').value);

        const filteredProducts = products.filter(product =>
            (selectedCategory === 'all' || product.category === selectedCategory) &&
            product.price <= maxPrice &&
            product.title.toLowerCase().includes(searchQuery)
        );

        renderProducts(filteredProducts);
    }

    // Sort products
    function sortProducts(products, sortOption) {
        if (sortOption === 'priceAsc') {
            return products.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'priceDesc') {
            return products.sort((a, b) => b.price - a.price);
        }
        return products; // Default sorting
    }

    // Update price display
    function updatePriceDisplay(value) {
        priceMin.textContent = `$0`;
        priceMax.textContent = `$${value}`;
    }

    // Initialize category filter options
    function initializeCategoryFilter() {
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categoryFilter.appendChild(option);
        });
    }

    // Event listeners
    categoryFilter.addEventListener('change', filterProducts);
    document.getElementById('priceRange').addEventListener('input', function () {
        updatePriceDisplay(this.value);
        filterProducts();
    });
    searchInput.addEventListener('input', filterProducts);
    sortBy.addEventListener('change', function () {
        const sortedProducts = sortProducts(products, this.value);
        filterProducts(sortedProducts);
    });

    // Initialize
    initializeCategoryFilter();
    updatePriceDisplay(document.getElementById('priceRange').value);
    filterProducts(); // Initial render
});
