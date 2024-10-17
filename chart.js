const products = [
  { name: "Samsung s24 ", price: 13000000 },
  { name: "Foco F6 ", price: 5000000 },
  { name: "Black Shark 5 Pro", price: 10000000 },
];

let cart = [];

function displayProductList() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
           ${product.name} - Rp ${product.price}
           <button class="add-to-cart" data-index="${index}">Tambah ke Keranjang</button>
       `;
    productList.appendChild(li);
  });
}

function addToCart(event) {
  const index = event.target.dataset.index;
  const product = products[index];

  const existingProduct = cart.find((item) => item.name === product.name);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  displayCart();
}

function displayCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  cart.forEach((product) => {
    const li = document.createElement("li");
    const totalPrice = product.price * product.quantity;
    li.innerHTML = `${product.name} - ${product.quantity} pcs - Rp ${totalPrice}`;
    cartList.appendChild(li);
  });
}

function toggleCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.style.display = cartDiv.style.display === "none" ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  displayProductList();

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  const cartIcon = document.getElementById("cart-icon");
  cartIcon.addEventListener("click", toggleCart);
});
