// Custom event for cart updates
export const CART_UPDATED_EVENT = "cartUpdated";

// Dispatch cart update event
const dispatchCartUpdate = (cart) => {
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: cart }));
};

export default function getCart() {
    let cart = localStorage.getItem("cart");

    if (cart === null) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        return [];
    }

    cart = JSON.parse(cart);
    return cart;
}

export function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

export function addToCart(product, qty) {
    let cart = getCart();

    // Support both productId and productID
    const prodId = product.productId || product.productID;
    
    const productIndex = cart.findIndex(
        (item) => item.productId === prodId,
    );
    
    if (productIndex === -1) {
        cart.push({
            productId: prodId,
            name: product.name,
            altNames: product.altNames,
            price: product.price,
            labeledPrice: product.labeledPrice,
            image: product.images[0],
            quantity: qty,
        });
    } else {
        cart[productIndex].quantity += qty;
        if (cart[productIndex].quantity <= 0) {
            cart = cart.filter((item) => item.productId !== prodId);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatchCartUpdate(cart);
    return cart;
}

export function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatchCartUpdate(updatedCart);
    return updatedCart;
}

export function clearCart() {
    localStorage.setItem("cart", JSON.stringify([]));
    dispatchCartUpdate([]);
}

export function getTotal() {
    const cart = getCart();
    let total = 0;
    cart.forEach((product) => {
        total += product.price * product.quantity;
    });
    return total;
}

export function getTotalForLabeledPrice() {
    const cart = getCart();
    let total = 0;
    cart.forEach((product) => {
        total += product.labeledPrice * product.quantity;
    });
    return total;
}
