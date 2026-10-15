const products = [
  { id: 1, name: "Classic T-Shirt", price: 19.99 },
  { id: 2, name: "Running Shoes", price: 59.99 },
  { id: 3, name: "Travel Backpack", price: 39.99 },
];

const cart = new Map();

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-btn");
const checkoutMessage = document.getElementById("checkout-message");

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button type="button" data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(card);
  });
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  for (const [id, quantity] of cart.entries()) {
    const product = products.find((item) => item.id === id);
    if (!product) {
      continue;
    }

    total += product.price * quantity;
    const item = document.createElement("li");
    item.textContent = `${product.name} x${quantity}`;
    cartItems.appendChild(item);
  }

  cartEmpty.hidden = cart.size > 0;
  cartTotal.textContent = total.toFixed(2);
}

productList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);
  if (!Number.isFinite(id)) {
    return;
  }

  cart.set(id, (cart.get(id) || 0) + 1);
  checkoutMessage.textContent = "";
  renderCart();
});

checkoutButton.addEventListener("click", () => {
  if (cart.size === 0) {
    checkoutMessage.textContent = "Your cart is empty.";
    return;
  }

  cart.clear();
  renderCart();
  checkoutMessage.textContent = "Order placed successfully!";
});

renderProducts();
renderCart();
