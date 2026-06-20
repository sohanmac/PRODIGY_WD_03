const products = [
  {
    id: 1,
    name: "Artisan Coffee Beans",
    description: "Freshly roasted beans sourced from local farms, perfect for espresso or pour over.",
    price: 180,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
    category: "Beverages",
  },
  {
    id: 2,
    name: "Handcrafted Ceramic Mug",
    description: "A sturdy ceramic mug with a textured finish, ideal for coffee, tea, or hot cocoa.",
    price: 240,
    image: "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=800&q=80",
    category: "Home",
  },
  {
    id: 3,
    name: "Organic Soap Bundle",
    description: "Natural soap bars made with coconut oil, lavender, and citrus essential oils.",
    price: 140,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    category: "Wellness",
  },
  {
    id: 4,
    name: "Local Honey Jar",
    description: "Raw wildflower honey harvested from nearby beehives for a sweet local treat.",
    price: 127.5,
    image: "https://images.unsplash.com/photo-1504346431910-5b6dbf8fc20f?auto=format&fit=crop&w=800&q=80",
    category: "Food",
  },
  {
    id: 5,
    name: "Stylish Tote Bag",
    description: "Eco-friendly tote bag with a bold print—perfect for shopping and everyday errands.",
    price: 220,
    image: "https://images.unsplash.com/photo-1520950053405-604e314f36f6?auto=format&fit=crop&w=800&q=80",
    category: "Fashion",
  },
  {
    id: 6,
    name: "Indoor Plant Kit",
    description: "A small beginner-friendly plant kit with pot, soil, and care guide.",
    price: 299,
    image: "https://images.unsplash.com/photo-1524594154908-c6c53f3e79a1?auto=format&fit=crop&w=800&q=80",
    category: "Garden",
  },
];

const cart = new Map();
const productsGrid = document.getElementById("productsGrid");
const cartToggle = document.getElementById("cartToggle");
const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const closeCart = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

function renderProducts(items) {
  productsGrid.innerHTML = "";

  items.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <div>
          <h4>${product.name}</h4>
          <p>${product.description}</p>
        </div>
        <div class="price">${product.price.toFixed(2)}</div>
        <button data-product-id="${product.id}">Add to Cart</button>
      </div>
    `;

    const addButton = card.querySelector("button");
    addButton.addEventListener("click", () => addToCart(product));
    productsGrid.appendChild(card);
  });
}

function updateCartPanel() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item) => {
    count += item.quantity;
    total += item.quantity * item.price;

    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
      <h4>${item.name}</h4>
      <div class="item-meta">
        <span>Qty: ${item.quantity}</span>
        <span>$${(item.quantity * item.price).toFixed(2)}</span>
      </div>
      <button data-remove-id="${item.id}">Remove</button>
    `;

    itemElement.querySelector("button").addEventListener("click", () => removeFromCart(item.id));
    cartItems.appendChild(itemElement);
  });

  cartCount.textContent = count;
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function addToCart(product) {
  if (cart.has(product.id)) {
    cart.get(product.id).quantity += 1;
  } else {
    cart.set(product.id, { ...product, quantity: 1 });
  }
  updateCartPanel();
  showCart();
}

function removeFromCart(productId) {
  if (!cart.has(productId)) return;

  const product = cart.get(productId);
  product.quantity -= 1;
  if (product.quantity <= 0) {
    cart.delete(productId);
  }
  updateCartPanel();
}

function showCart() {
  cartPanel.classList.remove("hidden");
  cartToggle.setAttribute("aria-expanded", "true");
}

function hideCart() {
  cartPanel.classList.add("hidden");
  cartToggle.setAttribute("aria-expanded", "false");
}

function filterAndSortProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedSort = sortSelect.value;

  let filtered = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  });

  if (selectedSort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

cartToggle.addEventListener("click", () => {
  if (cartPanel.classList.contains("hidden")) {
    showCart();
  } else {
    hideCart();
  }
});

closeCart.addEventListener("click", hideCart);
checkoutBtn.addEventListener("click", () => {
  if (cart.size === 0) {
    alert("Your cart is empty. Add items before checkout.");
    return;
  }
  alert("Thank you for your order! Our local store will contact you soon.");
  cart.clear();
  updateCartPanel();
  hideCart();
});

searchInput.addEventListener("input", filterAndSortProducts);
sortSelect.addEventListener("change", filterAndSortProducts);

renderProducts(products);
updateCartPanel();
