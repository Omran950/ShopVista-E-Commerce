document.addEventListener("DOMContentLoaded", function () {
  updateNav();
  displayAllProducts();
});

let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [
  {
    name: "admin",
    email: "admin1122@shopvista.com",
    address: "cairo",
    password: "mM#2345432",
    role: "admin",
    isLogin: false,
    cart: [],
    orders: [],
    totalCartPrice: 0,
    active: true,
  },
];

if (!localStorage.getItem("allUsers")) {
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
}

let currentUserIndex =
  JSON.parse(localStorage.getItem("currentUserIndex")) || 0;
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

let navUl = document.getElementById("navUl");
let featuredProducts = document.getElementById("featured-products");
let promotedProducts = document.getElementById("promoted-products");
let modalHeader = document.getElementById("staticBackdropLabel");
let modalBody = document.getElementById("modalBody");
let modalFooter = document.getElementById("modalFooter");

if (localStorage.getItem("allProducts")) {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
} else {
  allProducts = [
    {
      productName: "Basketball",
      productPrice: 3000,
      productImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkMdh5o49QiEQQ9Q1jhlgLafvEH6Yjv8BIpQ&s",
      productDetails:
        "Official size and weight basketball, suitable for professional games.",
      category: "sports",
      stock: 15,
      rating: 4.5,
      seller: "shopVista",
      promotion: 10,
      featured: false,
      productID: "b1d1f69a-01c5-4e68-b1c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Football",
      productPrice: 1500,
      productImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQusE0-IE3FX-sgPeQ2jp0yAagulCmybuSbcQ&s",
      productDetails:
        "Professional leather football, designed for optimal performance and durability.",
      category: "sports",
      stock: 20,
      rating: 4,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "b2d1f69b-02c5-4e69-b2c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Tennis Racket",
      productPrice: 700,
      productImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_vpAK8oJgZq88O2nRhz1uwVuTRuLmlgBdIQ&s",
      productDetails:
        "Lightweight and durable tennis racket, ideal for recreational and competitive play.",
      category: "sports",
      stock: 8,
      rating: 4,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "b3d1f69c-03c5-4e70-b3c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Soccer Ball",
      productPrice: 2000,
      productImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXS6IlwealwypItTjBrVcGpMBYkEjKzjicNw&s",
      productDetails:
        "FIFA-pending soccer ball, crafted for superior performance and durability on the field.",
      category: "sports",
      stock: 12,
      rating: 3.5,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "b4d1f69d-04c5-4e71-b4c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Running Shoes",
      productPrice: 7000,
      productImage: "https://m.media-amazon.com/images/I/41vh2WVwHuL._AC_.jpg",
      productDetails:
        "Comfortable and lightweight running shoes, designed to enhance performance and support during workouts.",
      category: "sports",
      stock: 25,
      rating: 2.5,
      seller: "shopVista",
      promotion: 15,
      featured: false,
      productID: "b5d1f69e-05c5-4e72-b5c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Smartphone",
      productPrice: 25000,
      productImage:
        "https://m.media-amazon.com/images/I/71SfoZu9a3L._AC_SL1500_.jpg",
      productDetails:
        "Latest model smartphone with advanced features, offering cutting-edge technology and exceptional performance.",
      category: "electronics",
      stock: 50,
      rating: 4,
      seller: "shopVista",
      promotion: 15,
      featured: false,
      productID: "e1d1f69a-06c5-4e73-e1c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Laptop",
      productPrice: 25000,
      productImage:
        "https://images-cdn.ubuy.co.id/64c41e4771c5f52216163af1-hp-stream-14-laptop-intel-celeron.jpg",
      productDetails:
        "High-performance laptop with long battery life, perfect for work, study, and entertainment.",
      category: "electronics",
      stock: 30,
      rating: 4.5,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "e2d1f69b-07c5-4e74-e2c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Smart TV",
      productPrice: 8000,
      productImage:
        "https://i5.walmartimages.com/seo/VIZIO-24-Class-D-Series-FHD-LED-Smart-TV-D24f-J09_00fc72d4-adb7-4ab9-ae85-01e0f34034d0.be28d3a49f3357f156cfbd6187d3463d.jpeg",
      productDetails:
        "4K Ultra HD Smart TV with voice control, providing stunning picture quality and immersive entertainment experience.",
      category: "electronics",
      stock: 20,
      rating: 5,
      seller: "shopVista",
      promotion: 5,
      featured: false,
      productID: "e3d1f69c-08c5-4e75-e3c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Gaming Console",
      productPrice: 15000,
      productImage:
        "https://btech.com/media/catalog/product/c/4/c49e30e23d92979b0096a65610891c652ba26d8b17593e430129e45672a9ef57.jpeg?width=500&height=500&store=en&image-type=image",
      productDetails:
        "Next-gen gaming console with 1TB storage, delivering immersive gaming experiences and high-speed performance.",
      category: "electronics",
      stock: 15,
      rating: 5,
      seller: "shopVista",
      promotion: 20,
      featured: false,
      productID: "e4d1f69d-09c5-4e76-e4c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Wireless Speaker",
      productPrice: 1500,
      productImage:
        "https://cairosales.com/53476-large_default/sony-portable-wireless-speaker-with-microphone-black-xb23b.jpg",
      productDetails:
        "Portable wireless speaker with excellent sound quality, ideal for indoor and outdoor use.",
      category: "electronics",
      stock: 40,
      rating: 4.5,
      seller: "shopVista",
      promotion: 10,
      featured: false,
      productID: "e5d1f69e-10c5-4e77-e5c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Smart Watch",
      productPrice: 4000,
      productImage: "https://m.media-amazon.com/images/I/61ZjlBOp+rL.jpg",
      productDetails:
        "Wearable device with health tracking features, designed to monitor fitness metrics and provide smart notifications.",
      category: "electronics",
      stock: 35,
      rating: 3.5,
      seller: "shopVista",
      promotion: 20,
      featured: false,
      productID: "e6d1f69f-11c5-4e78-e6c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Organic Apples",
      productPrice: 5,
      productImage:
        "https://i5.walmartimages.com/seo/Fresh-Gala-Apple-Each_f46d4fa7-6108-4450-a610-cc95a1ca28c5_3.38c2c5b2f003a0aafa618f3b4dc3cbbd.jpeg",
      productDetails:
        "Fresh and organic apples from local farms, known for their quality and nutritional benefits.",
      category: "grocery",
      stock: 100,
      rating: 3,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "g1d1f69a-12c5-4e79-g1c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Whole Grain Bread",
      productPrice: 12,
      productImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTazPBjYM5w5AaMIofrYdPMzqx27oUFajfa5w&s",
      productDetails:
        "Healthy whole grain bread, baked fresh with nutritious ingredients for a wholesome diet.",
      category: "grocery",
      stock: 50,
      rating: 3.5,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "g2d1f69b-13c5-4e80-g2c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Almond Milk",
      productPrice: 50,
      productImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGtuYu4cmqWCFTdOWSVoQILfrDwTP-VZkfVg&s",
      productDetails:
        "Dairy-free and gluten-free almond milk, known for its smooth texture and nutritional benefits.",
      category: "grocery",
      stock: 60,
      rating: 4,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "g3d1f69c-14c5-4e81-g3c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Organic Eggs",
      productPrice: 100,
      productImage:
        "https://i5.walmartimages.com/seo/Happy-Egg-Co-Organic-Free-Range-Large-Brown-Eggs-18-Count_7dc09cb7-bbee-4bb9-8428-be614e5ff76b.acf5c10ed8baca38354350027aec22c8.jpeg",
      productDetails:
        "Cage-free and organic eggs, sourced locally for their freshness and high-quality.",
      category: "grocery",
      stock: 70,
      rating: 5,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "g4d1f69d-15c5-4e82-g4c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Greek Yogurt",
      productPrice: 20,
      productImage:
        "https://i5.walmartimages.com/seo/Great-Value-Greek-Vanilla-Nonfat-Yogurt-32-oz-Tub-Plastic-Container_674fcaa2-5368-4846-a795-304198b75733.1fd0fae92efa76b6977e0e3430a375fa.png",
      productDetails:
        "High-protein Greek yogurt, known for its creamy texture and nutritional value.",
      category: "grocery",
      stock: 40,
      rating: 4.5,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "g5d1f69e-16c5-4e83-g5c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Avocado",
      productPrice: 15,
      productImage:
        "https://www.fourwindsgrowers.com/cdn/shop/products/shutterstock_116205556bacon_b59ae0a5-6673-4d99-a9ba-ec6ded5ba99c_1024x1024.jpg?v=1569305453",
      productDetails:
        "Fresh and ripe avocados, perfect for salads, spreads, and healthy snacking.",
      category: "grocery",
      stock: 80,
      rating: 3.5,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "g6d1f69f-17c5-4e84-g6c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Bananas",
      productPrice: 12,
      productImage:
        "https://www.quicklly.com/upload_images/product/1522348874-organic-bananas.jpg",
      productDetails:
        "Fresh and organic bananas, packed with nutrients and ideal for a quick and healthy snack.",
      category: "grocery",
      stock: 90,
      rating: 3,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "g7d1f69g-18c5-4e85-g7c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Organic Spinach",
      productPrice: 30,
      productImage:
        "https://www.kroger.com/product/images/large/front/0001111091128",
      productDetails:
        "Fresh and organic spinach, rich in vitamins and minerals, perfect for salads and cooking.",
      category: "grocery",
      stock: 50,
      rating: 2.5,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "g8d1f69h-19c5-4e86-g8c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Leather Jacket",
      productPrice: 1500,
      productImage:
        "https://hips.hearstapps.com/hmg-prod/images/best-leather-jackets-64dce7321e652.jpg?crop=0.500xw:1.00xh;0.500xw,0&resize=640:*",
      productDetails:
        "Stylish and durable leather jacket, crafted for comfort and timeless fashion.",
      category: "fashion",
      stock: 10,
      rating: 2,
      seller: "shopVista",
      promotion: 25,
      featured: false,
      productID: "f1d1f69a-20c5-4e87-f1c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Sneakers",
      productPrice: 8000,
      productImage:
        "https://target.scene7.com/is/image/Target/GUEST_bb901552-2436-4cb6-b805-ce34b1a41d55?wid=488&hei=488&fmt=pjpeg",
      productDetails:
        "Comfortable and trendy sneakers, designed for all-day wear with a modern aesthetic.",
      category: "fashion",
      stock: 20,
      rating: 4,
      seller: "shopVista",
      promotion: 10,
      featured: false,
      productID: "f2d1f69b-21c5-4e88-f2c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Designer Handbag",
      productPrice: 2000,
      productImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC21nqGT7QLUwGzlyti1rumP5TFHVgBNOsvw&s",
      productDetails:
        "Elegant and high-quality designer handbag, crafted with attention to detail and style.",
      category: "fashion",
      stock: 5,
      rating: 2,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "f3d1f69c-22c5-4e89-f3c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Wool Scarf",
      productPrice: 500,
      productImage:
        "https://m.media-amazon.com/images/I/31LYpI-bKNS._AC_SY580_.jpg",
      productDetails:
        "Warm and cozy wool scarf, perfect for chilly weather with a stylish and comfortable design.",
      category: "fashion",
      stock: 30,
      rating: 2.5,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "f4d1f69d-23c5-4e90-f4c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
    {
      productName: "Sunglasses",
      productPrice: 800,
      productImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGv_TPjNqnfIc-nLHZ5DPtJzQbwnOjfvl0g&s",
      productDetails:
        "Stylish and UV-protective sunglasses, designed to complement your look while shielding your eyes.",
      category: "fashion",
      stock: 25,
      rating: 3.5,
      seller: "shopVista",
      promotion: 5,
      featured: false,
      productID: "f5d1f69e-24c5-4e91-f5c8-9e1bf9m9d53f",
      sellerID: "shopVista",
      pending: false,
      active: true,
    },
  ];
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
}

function updateNav() {
  if (!localStorage.getItem("currentUser")) {
    navUl.innerHTML = `
      <li class="nav-item  mx-1">
        <a class="nav-link active" aria-current="page" href="index.html">Home</a>
      </li>
      <li class="nav-item  mx-1">
        <a class="nav-link" href="About/about.html">About</a>
      </li>
      <li class="nav-item  mx-1">
        <a class="nav-link" href="Contact/contact.html">Contact</a>
      </li>
      <li class="nav-item  mx-1">
        <a class="nav-link" href="Authentication/login.html">Login</a>
      </li>
      <li class="nav-item  mx-1">
        <a class="nav-link" href="Authentication/register.html">Register</a>
      </li>`;
  } else {
    let sellerDashboard = ``;
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser.role === "seller") {
      sellerDashboard = `<li class="nav-item mx-1 ">
        <a class="nav-link" aria-current="page" href="Seller/seller.html">Dashboard</a>
      </li>`;
    }
    navUl.innerHTML = `
    ${sellerDashboard}
      <li class="nav-item mx-1 ">
        <a class="nav-link active" aria-current="page" href="index.html">Home</a>
      </li>
      <li class="nav-item mx-1 ">
        <a class="nav-link" href="About/about.html">About</a>
      </li>
      <li class="nav-item mx-1 ">
        <a class="nav-link" href="Contact/contact.html">Contact</a>
      </li>
      <li class="nav-item  mx-1 isUserCheck">
        <a class="nav-link" aria-current="page" href="Shop/shop.html">Shop</a>
      </li>
            <li class="nav-item mx-1">
              <a class="nav-link position-relative" href="Cart/cart.html">
                <i class="fa-solid fa-cart-shopping fa-lg"></i>
                <span
                  id="cart"
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >${allUsers[currentUserIndex].cart.length}</span>
              </a>
            </li>
      <li class="nav-item mx-1">
              <a class="nav-link" href="Profile/profile.html">
                <i class="fa-solid fa-user"></i>
              </a>
            </li>
      <li class="nav-item  mx-1 isUserCheck">
        <button class="nav-link  w-100" onclick="logout()"><i class="fa-solid fa-arrow-right-to-bracket"></i>
</button>
      </li>`;
  }
}

function logout() {
  allUsers[currentUserIndex].isLogin = false;
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentUserIndex");
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Logged Out Successfully",
    showConfirmButton: false,
    timer: 1000,
  });
  setTimeout(() => {
    window.location.replace("index.html");
  }, 1000);
}

function displayAllProducts() {
  let cardFeaturedProduct = "";
  let cardPromotionProduct = "";
  let priceAfterPromotion = 0;
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].active) {
      let disableAddToCartBtn = "";
      let buttonText = "Add to cart";
      let textDanger = "";
      let productInCart = allUsers[currentUserIndex].cart.find(
        (item) => item.productID == allProducts[i].productID
      );
      if (allProducts[i].stock > 0) {
        if (!allProducts[i].pending) {
          if (productInCart) {
            if (productInCart.count == allProducts[i].stock) {
              disableAddToCartBtn = "disabled";
              buttonText = "Out of stock";
              textDanger = "text-danger";
            }
          }
          if (allProducts[i].featured) {
            cardFeaturedProduct += `<div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card rounded-3  overflow-hidden">
          <div class="" onclick="productDetails(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              <figure class="m-0 p-2">
                <img
                  src="${allProducts[i].productImage}"
                  alt="${allProducts[i].productName}"
                  class="d-block w-75 m-auto"
                  style="height: 200px"
                />
              </figure>
              <div class="text px-2 py-3">
                <h6  class="text-center fw-bolder">${
                  allProducts[i].productName
                }</h6>
                <p class="">${allProducts[i].productDetails.substring(0, 20)}${
              allProducts[i].productDetails.length > 50 ? "..." : ""
            }</p>
                <p class="text-center" id='price'>Price : ${
                  allProducts[i].productPrice
                } EGP</p>
              </div>
            </div>
          <button class="btn w-75 ${textDanger} m-auto d-block my-3" ${disableAddToCartBtn} onclick="addToCart(${i})">${buttonText}</button>
            </div>
          </div>`;
          } else {
            priceAfterPromotion =
              allProducts[i].productPrice -
              allProducts[i].productPrice * (allProducts[i].promotion / 100);
            cardPromotionProduct += `<div class="col-sm-6 col-md-4 col-lg-3">
        <div class="card rounded-3 overflow-hidden">
  <div class="" onclick="productDetails(${i})" data-bs-toggle="modal"
  data-bs-target="#staticBackdrop">
          <figure class="m-0 p-2">
            <img
              src="${allProducts[i].productImage}"
              alt="${allProducts[i].productName}"
              class="d-block w-75 m-auto"
              style="height: 200px"
            />
          </figure>
          <div class="text px-2 py-3">
            <h6 class="text-center fw-bolder">${allProducts[i].productName}</h6>
            <p class="">${allProducts[i].productDetails.substring(0, 40)}${
              allProducts[i].productDetails.length > 20 ? "..." : ""
            }</p>
            <div class="d-flex justify-content-around">
            <p class="text-center" id="priceBefore">Price : <span class="text-decoration-line-through">${
              allProducts[i].productPrice
            } EGP</span></p>
            <p class="text-center" id="priceAfter">${priceAfterPromotion} EGP</p>
            </div>
          </div>
        </div>
          <button class="btn w-75 ${textDanger} m-auto d-block my-3" ${disableAddToCartBtn} onclick="addToCart(${i})">${buttonText}</button>

        </div>
      </div>`;
          }
        }
      }
      featuredProducts.innerHTML = cardFeaturedProduct;
      promotedProducts.innerHTML = cardPromotionProduct;
    }
  }
}

function productDetails(i) {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
  let newPrice = "";
  if (!allProducts[i].featured) {
    priceAfterPromotion =
      allProducts[i].productPrice -
      allProducts[i].productPrice * (allProducts[i].promotion / 100);
    newPrice = `<p class="my-2 py-2" id="priceAfter"><span class="fw-bold text-">After Discount :</span> ${priceAfterPromotion} EGP</p>`;
  }
  modalHeader.innerHTML = `${allProducts[i].productName}`;
  modalBody.innerHTML = `<div class="col-md-5">
                  <figure class="overflow-hidden p-3">
                    <img
                      src="${allProducts[i].productImage}"
                      alt="${allProducts[i].productName}"
                      class="w-100 d-block"
                    />
                  </figure>
                </div>
                <div class="col-md-7">
                  <div>
                    <p class="fw-bold my-2 py-2 fs-4">${allProducts[i].productDetails}</p>
                    <p class="my-2 py-2">
                      <span class="fw-bold">Category :</span> ${allProducts[i].category}
                    </p>
                    <p class="my-2 py-2">
                      <span class="fw-bold">Price :</span> ${allProducts[i].productPrice} EGP
                    </p>
                    ${newPrice}
                    <p class="my-2 py-2">
                      <span class="fw-bold">Stock :</span> ${allProducts[i].stock}
                    </p>
                    <p class="my-2 py-2">
                      <span class="fw-bold">Seller :</span> ${allProducts[i].seller}
                    </p>
                    <p class="my-2 py-2">
                      <span class="fw-bold">Rating :</span> ${allProducts[i].rating}
                      <i class="fa-solid fa-star"></i>
                    </p>
                  </div>
                </div>`;
}

function recalcTotalCartPrice() {
  let user = allUsers[currentUserIndex];
  user.totalCartPrice = user.cart.reduce((total, cartProduct) => {
    let priceAfterPromotion = cartProduct.featured
      ? cartProduct.productPrice
      : cartProduct.productPrice -
        cartProduct.productPrice * (cartProduct.promotion / 100);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    return total + cartProduct.count * priceAfterPromotion;
  }, 0);
}

function addToCart(i) {
  if (!localStorage.getItem("currentUser")) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Please LogIn First",
      showConfirmButton: false,
      timer: 1000,
    });
    setTimeout(() => {
      window.location.replace("Authentication/login.html");
    }, 1000);
  } else {
    // Chech product in cart
    let checkCartProducts = false;
    if (allUsers[currentUserIndex].cart.length == 0) {
      allUsers[currentUserIndex].cart.push(allProducts[i]);
      allUsers[currentUserIndex].cart[0].count = 1;
    } else {
      for (let j = 0; j < allUsers[currentUserIndex].cart.length; j++) {
        if (
          allProducts[i].productID ===
          allUsers[currentUserIndex].cart[j].productID
        ) {
          allUsers[currentUserIndex].cart[j].count += 1;
          checkCartProducts = true;
          break;
        }
      }
      if (!checkCartProducts) {
        allUsers[currentUserIndex].cart.push(allProducts[i]);
        allUsers[currentUserIndex].cart[
          allUsers[currentUserIndex].cart.length - 1
        ].count = 1;
      }
    }
    recalcTotalCartPrice();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product has been added successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    localStorage.setItem(
      "currentUser",
      JSON.stringify(allUsers[currentUserIndex])
    );
    displayAllProducts();
  }

  updateNav();
}
