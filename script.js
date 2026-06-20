const products = [
  {
    id: 1,
    name: "Artisan Coffee Beans",
    description: "Freshly roasted beans sourced from local farms, perfect for espresso or pour over.",
    price: 180,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=85",
    category: "Beverages",
  },
  {
    id: 2,
    name: "Handcrafted Ceramic Mug",
    description: "A sturdy ceramic mug with a textured finish, ideal for coffee, tea, or hot cocoa.",
    price: 240,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=85",
    category: "Home",
  },
  {
    id: 3,
    name: "Organic Soap Bundle",
    description: "Natural soap bars made with coconut oil, lavender, and citrus essential oils.",
    price: 140,
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=800&q=85",
    category: "Wellness",
  },
  {
    id: 4,
    name: "Local Honey Jar",
    description: "Raw wildflower honey harvested from nearby beehives for a sweet local treat.",
    price: 127.5,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=85",
    category: "Food",
  },
  {
    id: 5,
    name: "Stylish Tote Bag",
    description: "Eco-friendly tote bag with a bold print—perfect for shopping and everyday errands.",
    price: 220,
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=85",
    category: "Fashion",
  },
  {
    id: 6,
    name: "Indoor Plant Kit",
    description: "A small beginner-friendly plant kit with pot, soil, and care guide.",
    price: 299,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=85",
    category: "Garden",
  },
  {
    id: 7,
    name: "Scented Soy Candle",
    description: "A hand-poured soy candle with a warm vanilla and sandalwood fragrance.",
    price: 175,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85",
    category: "Home",
  },
  {
    id: 8,
    name: "Fresh Bakery Basket",
    description: "A delicious selection of locally baked croissants, rolls, and artisan bread.",
    price: 320,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85",
    category: "Food",
  },
  {
    id: 9,
    name: "Natural Skincare Set",
    description: "A gentle everyday skincare collection made with nourishing botanical ingredients.",
    price: 450,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85",
    category: "Wellness",
  },
  {
    id: 10,
    name: "Handwoven Market Basket",
    description: "A durable woven basket for market trips, picnics, storage, and home decor.",
    price: 385,
    image: "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=800&q=85",
    category: "Home",
  },
  {
    id: 11,
    name: "Artisan Chocolate Box",
    description: "Rich handcrafted chocolates with a tempting assortment of local flavors.",
    price: 265,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=85",
    category: "Food",
  },
  {
    id: 12,
    name: "Cozy Knitted Scarf",
    description: "A soft, warm scarf made for chilly mornings and effortless everyday style.",
    price: 340,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=85",
    category: "Fashion",
  },
];

const imageFallback =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#162852"/>
          <stop offset="1" stop-color="#4fb7ff"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)"/>
      <circle cx="400" cy="250" r="88" fill="#edf2ff" opacity=".18"/>
      <path d="M345 225h110l-14 102h-82zM370 225c0-42 60-42 60 0" fill="none" stroke="#edf2ff" stroke-width="14" stroke-linejoin="round"/>
      <text x="400" y="405" fill="#edf2ff" font-family="Arial, sans-serif" font-size="38" font-weight="700" text-anchor="middle">Find More</text>
      <text x="400" y="452" fill="#edf2ff" opacity=".75" font-family="Arial, sans-serif" font-size="22" text-anchor="middle">Local product</text>
    </svg>
  `);

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
const authLinks = document.getElementById("authLinks");
const userMenu = document.getElementById("userMenu");
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

function updateAuthHeader() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  if (currentUser) {
    userName.textContent = currentUser.name;
    authLinks.classList.add("hidden");
    userMenu.classList.remove("hidden");
  } else {
    authLinks.classList.remove("hidden");
    userMenu.classList.add("hidden");
  }
}

function renderProducts(items) {
  productsGrid.innerHTML = "";

  items.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
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
    const productImage = card.querySelector("img");
    productImage.addEventListener("error", () => {
      productImage.src = imageFallback;
    }, { once: true });
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
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  updateAuthHeader();
});

renderProducts(products);
updateCartPanel();
updateAuthHeader();
