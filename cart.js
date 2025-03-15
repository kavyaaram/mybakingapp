// Add product to cart with quantity tracking
function addToCart(productName) {
    console.log("cart.js is loaded and running!");
    console.log(`Adding ${productName} to cart...`);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    let existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if already in cart
    } else {
        cart.push({ name: productName, quantity: 1 }); // Add new product
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
    updateCartIcon();
}

function displayCart() {
    let cartItemsDiv = document.getElementById('cart-items');
    if (!cartItemsDiv) return; // Stop execution if cart-items doesn't exist

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is currently empty.</p>';
        return;
    } 
        cartItemsDiv.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <p>${item.name} (x${item.quantity})</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `).join('');
}


// Remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Decrease quantity
    } else {
        cart.splice(index, 1); // Remove item if quantity is 1
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartIcon();
}

function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Find the cart icon text container
    let cartIcon = document.querySelector('.cart-count'); 

    if (cartIcon) {
        cartIcon.textContent = `(${totalItems})`; // Only update the count, not the whole icon
    }
}

function clearCart() {
    localStorage.removeItem('cart'); // Only remove cart data
    displayCart(); // Refresh cart display
    updateCartIcon(); // Update cart count
    alert("Cart has been cleared!");
}

// Call functions when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    updateCartIcon();
});
