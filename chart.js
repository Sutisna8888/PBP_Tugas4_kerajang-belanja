const products = [
  { name: "Samsung S24 Ultra", harga: 29000000, image: "samsung.png" },
  { name: "Black Shark 5", harga: 10000000, image: "Black Shark 5.png" },
  { name: "Foco F6", harga: 5000000, image: "poco f6.png" },
];

let cart = [];

function displayProductList() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
           <div>
               <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto; border-radius: 5px;">
               <div>${product.name}</div>
               <div>Rp ${product.harga}</div>
               <button class="add-to-cart" data-index="${index}">Tambah ke Keranjang</button>
           </div>
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

function increaseQuantity(index) {
  cart[index].quantity += 1;
  displayCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  displayCart();
}

function displayCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  cart.forEach((product, index) => {
    const totalharga = product.harga * product.quantity;
    const li = document.createElement("li");

    li.innerHTML = `
           <div class="product-info">
               ${product.name} - ${product.quantity} pcs - Rp ${totalharga}
           </div>
           <div>
               <button class="decrease-quantity" data-index="${index}">-</button>
               <button class="increase-quantity" data-index="${index}">+</button>
           </div>
       `;
    cartList.appendChild(li);
  });

  const increaseButtons = document.querySelectorAll(".increase-quantity");
  increaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = button.getAttribute("data-index");
      increaseQuantity(index);
    });
  });

  const decreaseButtons = document.querySelectorAll(".decrease-quantity");
  decreaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = button.getAttribute("data-index");
      decreaseQuantity(index);
    });
  });
}

function toggleCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.style.display = cartDiv.style.display === "none" ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  displayProductList();

  document
    .getElementById("product-list")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("add-to-cart")) {
        addToCart(e);
      }
    });

  const cartIcon = document.getElementById("cart-icon");
  cartIcon.addEventListener("click", toggleCart);
});
