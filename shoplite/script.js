// ===========================
// PRODUCT DATA (No API!)
// ===========================
const PRODUCTS = [
    { id: 1, name: "Wireless Earbuds", category: "Electronics", price: 29.99, emoji: "🎧", color: "#dbeafe", desc: "Crystal-clear sound with 20hr battery life." },
    { id: 2, name: "Smart Watch", category: "Electronics", price: 89.99, emoji: "⌚", color: "#e0e7ff", desc: "Track fitness, calls, and notifications." },
    { id: 3, name: "Bluetooth Speaker", category: "Electronics", price: 45.99, emoji: "🔊", color: "#cffafe", desc: "Waterproof portable speaker, 360° sound." },
    { id: 4, name: "USB-C Hub", category: "Electronics", price: 34.99, emoji: "🔌", color: "#f0fdf4", desc: "7-in-1 adapter for laptops and tablets." },
    { id: 5, name: "Cotton T-Shirt", category: "Clothing", price: 19.99, emoji: "👕", color: "#fef3c7", desc: "Soft 100% organic cotton, unisex fit." },
    { id: 6, name: "Denim Jacket", category: "Clothing", price: 59.99, emoji: "🧥", color: "#dbeafe", desc: "Classic vintage-wash denim jacket." },
    { id: 7, name: "Running Shoes", category: "Clothing", price: 74.99, emoji: "👟", color: "#fce7f3", desc: "Lightweight mesh with cushioned sole." },
    { id: 8, name: "Wool Beanie", category: "Accessories", price: 14.99, emoji: "🧢", color: "#fef9c3", desc: "Warm knit beanie for cold weather." },
    { id: 9, name: "Leather Wallet", category: "Accessories", price: 24.99, emoji: "👛", color: "#fde68a", desc: "Slim RFID-blocking bifold wallet." },
    { id: 10, name: "Sunglasses", category: "Accessories", price: 32.99, emoji: "🕶️", color: "#e0e7ff", desc: "UV400 polarized lenses, retro frame." },
    { id: 11, name: "Scented Candle", category: "Home", price: 12.99, emoji: "🕯️", color: "#fff7ed", desc: "Lavender & vanilla, 40hr burn time." },
    { id: 12, name: "Desk Lamp", category: "Home", price: 38.99, emoji: "💡", color: "#ecfdf5", desc: "LED lamp with 3 brightness levels." }
];

// ===========================
// STATE
// ===========================
let state = {
    searchQuery: "",
    activeCategory: "All",
    sortBy: "default",
    cart: loadCart()
};

// ===========================
// LOCAL STORAGE
// ===========================
function loadCart() {
    try {
        const saved = localStorage.getItem("shoplite_cart");
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

function saveCart() {
    localStorage.setItem("shoplite_cart", JSON.stringify(state.cart));
}

// ===========================
// DOM REFERENCES
// ===========================
const $grid = document.getElementById("productGrid");
const $count = document.getElementById("productCount");
const $categories = document.getElementById("categories");
const $search = document.getElementById("searchInput");
const $sort = document.getElementById("sortSelect");
const $cartBtn = document.getElementById("cartBtn");
const $cartBadge = document.getElementById("cartBadge");
const $cartSidebar = document.getElementById("cartSidebar");
const $cartOverlay = document.getElementById("cartOverlay");
const $cartItems = document.getElementById("cartItems");
const $cartFooter = document.getElementById("cartFooter");
const $closeCart = document.getElementById("closeCart");
const $toast = document.getElementById("toast");

// ===========================
// RENDER CATEGORIES
// ===========================
function renderCategories() {
    const cats = ["All", ...new Set(PRODUCTS.map(p => p.category))];
    $categories.innerHTML = cats.map(c =>
        `<button class="cat-btn ${c === state.activeCategory ? 'active' : ''}" data-cat="${c}">${c}</button>`
    ).join("");
}

// ===========================
// FILTER + SORT
// ===========================
function getFilteredProducts() {
    let list = [...PRODUCTS];

    if (state.activeCategory !== "All") {
        list = list.filter(p => p.category === state.activeCategory);
    }

    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        list = list.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.desc.toLowerCase().includes(q)
        );
    }

    switch (state.sortBy) {
        case "price-asc": list.sort((a, b) => a.price - b.price); break;
        case "price-desc": list.sort((a, b) => b.price - a.price); break;
        case "name-asc": list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    return list;
}

// ===========================
// RENDER PRODUCTS
// ===========================
function renderProducts() {
    const filtered = getFilteredProducts();
    $count.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} products`;

    if (filtered.length === 0) {
        $grid.innerHTML = `<div class="no-results"><span>😕</span>No products found. Try a different search.</div>`;
        return;
    }

    $grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img" style="background:${p.color}">
        <span class="product-category-tag">${p.category}</span>
        ${p.emoji}
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-bottom">
          <span class="product-price">$${p.price.toFixed(2)}</span>
          <button class="add-btn" data-id="${p.id}" title="Add to cart">+</button>
        </div>
      </div>
    </div>
  `).join("");
}

// ===========================
// CART LOGIC
// ===========================
function addToCart(productId) {
    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        state.cart.push({ id: productId, qty: 1 });
    }
    saveCart();
    renderCart();
    showToast("Added to cart! ✅");
}

function updateQty(productId, delta) {
    const item = state.cart.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        state.cart = state.cart.filter(i => i.id !== productId);
    }
    saveCart();
    renderCart();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(i => i.id !== productId);
    saveCart();
    renderCart();
    showToast("Item removed 🗑️");
}

function clearCart() {
    state.cart = [];
    saveCart();
    renderCart();
    showToast("Cart cleared 🧹");
}

function getCartTotal() {
    return state.cart.reduce((sum, item) => {
        const product = PRODUCTS.find(p => p.id === item.id);
        return sum + (product ? product.price * item.qty : 0);
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((sum, item) => sum + item.qty, 0);
}

// ===========================
// RENDER CART
// ===========================
function renderCart() {
    const count = getCartCount();

    $cartBadge.textContent = count;
    $cartBadge.classList.toggle("hidden", count === 0);

    if (state.cart.length === 0) {
        $cartItems.innerHTML = `<div class="cart-empty"><span>🛒</span>Your cart is empty</div>`;
        $cartFooter.innerHTML = "";
        return;
    }

    $cartItems.innerHTML = state.cart.map(item => {
        const p = PRODUCTS.find(pr => pr.id === item.id);
        if (!p) return "";
        return `
      <div class="cart-item">
        <div class="cart-item-emoji" style="background:${p.color}">${p.emoji}</div>
        <div class="cart-item-details">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">$${(p.price * item.qty).toFixed(2)}</div>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" data-id="${p.id}" data-delta="-1">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-id="${p.id}" data-delta="1">+</button>
        </div>
        <button class="remove-btn" data-id="${p.id}" title="Remove">🗑️</button>
      </div>
    `;
    }).join("");

    const subtotal = getCartTotal();
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    $cartFooter.innerHTML = `
    <div class="cart-total-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
    <div class="cart-total-row"><span>Tax (8%)</span><span>$${tax.toFixed(2)}</span></div>
    <div class="cart-total-row grand"><span>Total</span><span>$${total.toFixed(2)}</span></div>
    <button class="checkout-btn" id="checkoutBtn">Checkout — $${total.toFixed(2)}</button>
    <button class="clear-cart-btn" id="clearCartBtn">Clear Cart</button>
  `;

    document.getElementById("checkoutBtn").addEventListener("click", () => {
        alert("Checkout coming soon! 🚀");
    });

    document.getElementById("clearCartBtn").addEventListener("click", clearCart);
}

// ===========================
// CART SIDEBAR TOGGLE
// ===========================
function openCart() {
    $cartSidebar.classList.add("open");
    $cartOverlay.classList.add("open");
}

function closeCartPanel() {
    $cartSidebar.classList.remove("open");
    $cartOverlay.classList.remove("open");
}

// ===========================
// TOAST
// ===========================
function showToast(msg) {
    $toast.textContent = msg;
    $toast.classList.add("show");
    setTimeout(() => $toast.classList.remove("show"), 2000);
}

// ===========================
// EVENT LISTENERS
// ===========================
$search.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderProducts();
});

$sort.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderProducts();
});

$categories.addEventListener("click", (e) => {
    if (e.target.classList.contains("cat-btn")) {
        state.activeCategory = e.target.dataset.cat;
        renderCategories();
        renderProducts();
    }
});

$grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-btn");
    if (btn) addToCart(Number(btn.dataset.id));
});

$cartItems.addEventListener("click", (e) => {
    const qtyBtn = e.target.closest(".qty-btn");
    if (qtyBtn) {
        updateQty(Number(qtyBtn.dataset.id), Number(qtyBtn.dataset.delta));
        return;
    }
    const rmBtn = e.target.closest(".remove-btn");
    if (rmBtn) {
        removeFromCart(Number(rmBtn.dataset.id));
    }
});

$cartBtn.addEventListener("click", openCart);
$closeCart.addEventListener("click", closeCartPanel);
$cartOverlay.addEventListener("click", closeCartPanel);

// ===========================
// INIT
// ===========================
renderCategories();
renderProducts();
renderCart();