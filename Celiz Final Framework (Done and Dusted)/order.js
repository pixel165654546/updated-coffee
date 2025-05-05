document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.cart--icons');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartCount = document.querySelector('.cart--icons span');
    let cart = [];
    cartIcon.addEventListener('click', () => {
        sidebar.classList.add('open');
    });
    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const itemName = card.querySelector('.card--title').textContent;
            const itemPrice = parseFloat(card.querySelector('.price').textContent.replace('₱', ''));
            const item = cart.find(cartItem => cartItem.name === itemName);
            if (item) {
                item.quantity++;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: 1 });
            }
            updateCart();
        });
    });
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.classList.add('individual-cart-item');
            cartItem.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span class="cart-item-price">₱${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        cartTotal.textContent = `₱${total.toFixed(2)}`;
        cartCount.textContent = cart.length;
        const removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
});