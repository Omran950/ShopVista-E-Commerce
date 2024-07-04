document.addEventListener("DOMContentLoaded", function () {
  updateNav();
  displayAllProducts();
});

let currentUserIndex = 0;
let currentUser = {};
let allUsers = [];
let allProducts = [];
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
      productName: "Wireless Headphones",
      productPrice: 100,
      productImage: "images/wireless_headphones.jpg",
      productDetails:
        "High-quality wireless headphones with noise cancellation.",
      category: "sports",
      stock: 5,
      rating: 5,
      seller: "shopVista",
      promotion: 10,
      featured: false,
      productID: "b4529ffb-4ee3-4eeb-95e8-28ea880a78f8",
    },
    {
      productName: "Smartwatch",
      productPrice: 200,
      productImage: "images/smartwatch.jpg",
      productDetails:
        "A sleek smartwatch with fitness tracking and notifications.",
      category: "electric",
      stock: 5,
      rating: 4,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "681684d6-2801-46d6-9345-faa4d275e879",
    },
    {
      productName: "Bluetooth Speaker",
      productPrice: 50,
      productImage: "images/bluetooth_speaker.jpg",
      productDetails:
        "Portable Bluetooth speaker with deep bass and long battery life.",
      category: "food",
      stock: 5,
      rating: 4,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "033cd9dc-e8ce-40ff-9505-b73586822c39",
    },
    {
      productName: "4K Monitor",
      productPrice: 300,
      productImage: "images/4k_monitor.jpg",
      productDetails:
        "Ultra HD 4K monitor with vibrant colors and sharp details.",
      category: "electric",
      stock: 5,
      rating: 4.5,
      seller: "shopVista",
      promotion: 20,
      featured: false,
      productID: "57aae2b4-15df-467d-8dab-c0e405513959",
    },
    {
      productName: "Gaming Mouse",
      productPrice: 40,
      productImage: "images/gaming_mouse.jpg",
      productDetails: "Ergonomic gaming mouse with customizable buttons.",
      category: "electric",
      stock: 5,
      rating: 4,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "5dc49878-335c-4a45-89d7-7b78b7f8baed",
    },
    {
      productName: "Laptop Stand",
      productPrice: 300,
      productImage: "images/laptop_stand.jpg",
      productDetails: "Adjustable laptop stand for better ergonomics.",
      category: "electric",
      stock: 5,
      rating: 4,
      seller: "shopVista",
      promotion: 10,
      featured: false,
      productID: "a00c25d0-68ee-483b-a801-9790906a17e7",
    },
    {
      productName: "Fitness Tracker",
      productPrice: 150,
      productImage: "images/fitness_tracker.jpg",
      productDetails:
        "Water-resistant fitness tracker with heart rate monitor.",
      category: "sports",
      stock: 5,
      rating: 3.5,
      seller: "shopVista",
      promotion: 15,
      featured: false,
      productID: "1bd3887a-d163-43e8-b927-d4fec2153b39",
    },
    {
      productName: "Wireless Charger",
      productPrice: 25,
      productImage: "images/wireless_charger.jpg",
      productDetails:
        "Fast wireless charger compatible with all Qi-enabled devices.",
      category: "electric",
      stock: 5,
      rating: 4,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "632ff54e-6cf6-45a9-96c4-9ac04a54c00e",
    },
    {
      productName: "Noise-Cancelling Earbuds",
      productPrice: 90,
      productImage: "images/noise_cancelling_earbuds.jpg",
      productDetails:
        "Compact earbuds with superior noise-cancelling technology.",
      category: "fashion",
      stock: 5,
      rating: 3,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "a0baf02f-b761-4295-a5e9-2f2e07dc7701",
    },
    {
      productName: "Smart Light Bulb",
      productPrice: 20,
      productImage: "images/smart_light_bulb.jpg",
      productDetails: "Energy-efficient smart light bulb with app control.",
      category: "food",
      stock: 5,
      rating: 4.5,
      seller: "shopVista",
      promotion: 0,
      featured: true,
      productID: "a72d1f69-06c5-4e67-b0c8-9e1bf6b9d53f",
    },
  ];
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
}

function updateNav() {
  let navUl = document.getElementById("navUl");
  console.log("nav");
  if (!localStorage.getItem("currentUser")) {
    navUl.innerHTML = `
      <li class="nav-item  mx-1 ">
        <a class="nav-link active" aria-current="page" href="index.html">Home</a>
      </li>
      <li class="nav-item  mx-1 ">
        <a class="nav-link" href="About/about.html">About</a>
      </li>
      <li class="nav-item  mx-1 ">
        <a class="nav-link" href="Contact/contact.html">Contact</a>
      </li>
      <li class="nav-item  mx-1 ">
        <a class="nav-link" href="Authentication/login.html">Login</a>
      </li>
      <li class="nav-item  mx-1 ">
        <a class="nav-link" href="Authentication/register.html">Register</a>
      </li>`;
  } else {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    navUl.innerHTML = `
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
                >${currentUser.cart.length}</span>
              </a>
            </li>
      <li class="nav-item mx-1">
              <a class="nav-link" href="Profile/profile.html">
                <i class="fa-solid fa-user"></i>
              </a>
            </li>
      <li class="nav-item  mx-1 isUserCheck">
        <button class="nav-link m-auto" onclick="logout()"><i class="fa-solid fa-arrow-right-to-bracket"></i>
</button>
      </li>`;
  }
}

function logout() {
  let allUsers = JSON.parse(localStorage.getItem("allUsers"));
  currentUserIndex = JSON.parse(localStorage.getItem("currentUserIndex"));
  allUsers[currentUserIndex].isLogin = false;
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentUserIndex");
  Swal.fire({
    position: "top-center",
    icon: "success",
    title: "Logged Out Successfully",
    showConfirmButton: false,
    timer: 1000,
  });
  setTimeout(() => {
    window.location.replace("index.html");
  }, 1000);
}

// Collect Featured Products in one Array named FeaturedProducts
function displayAllProducts() {
  let cardFeaturedProduct = "";
  let cardPromotionProduct = "";
  let priceAfterPromotion = 0;
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].stock > 0) {
      if (allProducts[i].featured) {
        cardFeaturedProduct += `<div class="col-sm-6 col-md-4 col-lg-3">
              <div class="card rounded-3  overflow-hidden">
              <div class="" onclick="productDetails(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <figure class="m-0 p-2">
                    <img
                      src="images/Lenovo (2).jpg"
                      alt="${allProducts[i].productName}"
                      class="d-block w-75 m-auto"
                      style="height: 200px"
                    />
                  </figure>
                  <div class="text px-2 py-3">
                    <h6  class="text-center fw-bolder">${
                      allProducts[i].productName
                    }</h6>
                    <p class="">${allProducts[i].productDetails.substring(
                      0,
                      50
                    )}${
          allProducts[i].productDetails.length > 50 ? "..." : ""
        }</p>
                    <p class="text-center" id='price'>Price : ${
                      allProducts[i].productPrice
                    } EGP</p>
                  </div>
                </div>
                <button class="btn w-75 text-capitalize m-auto d-block my-3" onclick="addToCart(event, ${i})">
                      Add to cart
                    </button>
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
                  src="images/Lenovo (2).jpg"
                  alt="${allProducts[i].productName}"
                  class="d-block w-75 m-auto"
                  style="height: 200px"
                />
              </figure>
              <div class="text px-2 py-3">
                <h6 class="text-center fw-bolder">${
                  allProducts[i].productName
                }</h6>
                <p class="">${allProducts[i].productDetails.substring(0, 50)}${
          allProducts[i].productDetails.length > 50 ? "..." : ""
        }</p>
                <div class="d-flex justify-content-around">
                <p class="text-center" id="priceBefore">Price : <span class="text-decoration-line-through">${
                  allProducts[i].productPrice
                } EGP</span></p>
                <p class="text-center" id="priceAfter">${priceAfterPromotion.toPrecision(
                  4
                )} EGP</p>
                </div>
              </div>
            </div>
            <button class="btn  w-75 text-capitalize m-auto d-block my-3"  onclick="addToCart(event, ${i})">
                  Add to cart
                </button>
            </div>
          </div>`;
      }
    }
  }
  featuredProducts.innerHTML = cardFeaturedProduct;
  promotedProducts.innerHTML = cardPromotionProduct;
}

function productDetails(i) {
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
                      src="images/Lenovo (2).jpg"
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

  modalFooter.innerHTML = `<button class="btn w-50 text-capitalize m-auto d-block mt-3" onclick="addToCart(event, ${i})">Add to cart</button>`;
}

function addToCart(event, i) {
  event.stopPropagation();
  if (!localStorage.getItem("currentUser")) {
    Swal.fire({
      position: "top-center",
      icon: "warning",
      title: "Please LogIn First",
      showConfirmButton: false,
      timer: 1000,
    });
    setTimeout(() => {
      window.location.replace("Authentication/login.html");
    }, 1000);
  } else {
    if (allProducts[i].stock > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product has been added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      allProducts[i].stock--;
      localStorage.setItem("allProducts", JSON.stringify(allProducts));
      allUsers = JSON.parse(localStorage.getItem("allUsers"));
      currentUser = JSON.parse(localStorage.getItem("currentUser"));
      currentUserIndex = JSON.parse(localStorage.getItem("currentUserIndex"));

      // Chech product in cart
      let checkCartProducts = false;
      if (allUsers[currentUserIndex].cart.length == 0) {
        allUsers[currentUserIndex].cart.push(allProducts[i]);
        allUsers[currentUserIndex].cart[
          allUsers[currentUserIndex].cart.length - 1
        ].count = 1;
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

      if (allProducts[i].featured) {
        allUsers[currentUserIndex].totalCartPrice +=
          allProducts[i].productPrice;
      } else {
        let priceAfterPromotion =
          allProducts[i].productPrice -
          allProducts[i].productPrice * (allProducts[i].promotion / 100);
        allUsers[currentUserIndex].totalCartPrice += priceAfterPromotion;
        currentUser.totalCartPrice += priceAfterPromotion;
      }
      currentUser = allUsers[currentUserIndex];
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      Swal.fire({
        icon: "error",
        title: "Sorry...",
        text: "This product is out of stock",
      });
      displayAllProducts();
    }
  }
  updateNav();
}
