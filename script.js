// Product Data
const products = [
    {
        id: 1,
        name: "Classic Silver Watch",
        price: 12500,
        description: "Elegant silver watch with leather strap, perfect for formal occasions.",
        image: "images/watch1.jpg"
    },
    {
        id: 2,
        name: "Sport Black Chronograph",
        price: 9800,
        description: "Modern black chronograph with multiple dials and water resistance.",
        image: "images/watch2.jpg"
    },
    {
        id: 3,
        name: "Luxury Gold Timepiece",
        price: 18900,
        description: "Premium gold-plated watch with diamond markers and sapphire glass.",
        image: "images/watch3.jpg"
    },
    {
        id: 4,
        name: "Minimalist Brown Leather",
        price: 7500,
        description: "Simple and elegant brown leather watch for everyday wear.",
        image: "images/watch4.jpg"
    },
    {
        id: 5,
        name: "Blue Diver's Watch",
        price: 14200,
        description: "Professional diver's watch with 200m water resistance and luminous hands.",
        image: "images/watch5.jpg"
    },
    {
        id: 6,
        name: "Rose Gold Fashion",
        price: 11500,
        description: "Trendy rose gold watch with mesh bracelet and mother-of-pearl dial.",
        image: "images/watch6.jpg"
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const contactForm = document.getElementById('contactForm');

// Initialize the website
function init() {
    displayProducts();
    updateCartCount();
    setupEventListeners();
}

// Display products in the grid
function displayProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <div style="width: 100%; height: 100%; background: #f8f9fa; display: flex; align-items: center; justify-content: center; color: #6c757d; font-size: 0.9rem;">
                    Watch Image<br>${product.name}
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">KES ${product.price.toLocaleString()}</div>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Shopping Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
}

function displayCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <div style="width: 40px; height: 40px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #6c757d;">
                    Image
                </div>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">KES ${item.price.toLocaleString()} x ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toLocaleString();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Checkout Process
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // For now, we'll simulate checkout
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // In a real implementation, you would integrate with M-Pesa here
    const phone = prompt('Enter your phone number for M-Pesa payment (2547XXXXXXXX):');
    
    if (phone && phone.length === 12) {
        alert(`M-Pesa payment of KES ${total.toLocaleString()} will be sent to ${phone}. In a real website, this would trigger an STK Push.`);
        
        // Clear cart after successful "payment"
        cart = [];
        updateCart();
        closeCart.click();
    } else if (phone) {
        alert('Please enter a valid phone number (2547XXXXXXXX)');
    }
}

// Event Listeners
function setupEventListeners() {
    // Cart toggle
    cartIcon.addEventListener('click', () => {
        cartOverlay.style.display = 'block';
        displayCartItems();
    });

    closeCart.addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });

    // Close cart when clicking outside
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.style.display = 'none';
        }
    });

    // Checkout button
    checkoutBtn.addEventListener('click', proceedToCheckout);

    // Contact form
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Mobile navigation
    document.querySelector('.hamburger').addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', init);