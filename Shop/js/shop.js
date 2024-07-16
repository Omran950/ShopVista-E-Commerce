let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
let currentUserIndex =
  JSON.parse(localStorage.getItem("currentUserIndex")) || 0;
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

if (currentUser.role === "seller") {
  let sellerDashboard = document.getElementById("sellerDashboard");
  sellerDashboard.innerHTML = `<a class="nav-link" aria-current="page" href="../Seller/seller.html">Dashboard</a>`;
}

let modalHeader = document.getElementById("staticBackdropLabel");
let modalBody = document.getElementById("modalBody");
let cart = document.getElementById("cart");
let SearchBar = document.getElementById("SearchBar");

function logout() {
  currentUserIndex = JSON.parse(localStorage.getItem("currentUserIndex"));
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
    window.location.replace("../index.html");
  }, 1000);
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
                        <img src="${allProducts[i].productImage}" alt="${allProducts[i].productName}" class="w-100 d-block"/>
                      </figure>
                    </div>
                    <div class="col-md-7">
                      <div>
                        <p class="fw-bold my-2 py-2 fs-4">${allProducts[i].productDetails}</p>
                        <p class="my-2 py-2"><span class="fw-bold">Category :</span> ${allProducts[i].category}</p>
                        <p class="my-2 py-2"><span class="fw-bold">Price :</span> ${allProducts[i].productPrice} EGP</p>
                        ${newPrice}
                        <p class="my-2 py-2"><span class="fw-bold">Stock :</span> ${allProducts[i].stock}</p>
                        <p class="my-2 py-2"><span class="fw-bold">Seller :</span> ${allProducts[i].seller}</p>
                        <p class="my-2 py-2"><span class="fw-bold">Rating :</span> ${allProducts[i].rating}<i class="fa-solid fa-star"></i></p>
                      </div>
                    </div>`;
}

function addToCart(i, cat, body) {
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
  searchByCategory(cat, body, SearchBar.value);
  cart.innerHTML = allUsers[currentUserIndex].cart.length;
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

function searchByCategory(cat, body, query = "") {
  cart.innerHTML = allUsers[currentUserIndex].cart.length;
  let products = "";
  let productCategory = cat;
  let productsBody = body;
  let lowerCaseQuery = query.toLowerCase();

  for (let i = 0; i < allProducts.length; i++) {
    let disableAddToCartBtn = "";
    let buttonText = "Add to cart";
    let textDanger = "";
    let productInCart = allUsers[currentUserIndex].cart.find(
      (item) => item.productID == allProducts[i].productID
    );

    if (productInCart) {
      if (productInCart.count == allProducts[i].stock) {
        disableAddToCartBtn = "disabled";
        buttonText = "Out of stock";
        textDanger = "text-danger";
      }
    }

    if (
      (allProducts[i].category === cat || cat === "all") &&
      (allProducts[i].productName.toLowerCase().includes(lowerCaseQuery) ||
        allProducts[i].productDetails.toLowerCase().includes(lowerCaseQuery) ||
        allProducts[i].category.toLowerCase().includes(lowerCaseQuery) ||
        allProducts[i].seller.toLowerCase().includes(lowerCaseQuery))
    ) {
      if (
        !allProducts[i].pending &&
        allProducts[i].stock > 0 &&
        allProducts[i].active
      ) {
        let priceAfterPromotion = "";
        if (!allProducts[i].featured) {
          priceAfterPromotion =
            allProducts[i].productPrice -
            allProducts[i].productPrice * (allProducts[i].promotion / 100);
        }
        products += `<div class="col-sm-6 col-md-4 col-lg-3">
            <div class="card rounded-3 overflow-hidden">
              <div class="" onclick="productDetails(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <figure class="m-0 p-2">
                  <img src="${allProducts[i].productImage}" alt="${
          allProducts[i].productName
        }" class="d-block w-75 m-auto" style="height: 200px"/>
                </figure>
                <div class="text px-2 py-3">
                  <h6 class="text-center fw-bolder">${
                    allProducts[i].productName
                  }</h6>
                  <p class="">${allProducts[i].productDetails.substring(
                    0,
                    20
                  )}${
          allProducts[i].productDetails.length > 50 ? "..." : ""
        }</p>
                  <p class="text-center" id="price">${
                    allProducts[i].featured
                      ? `Price : ${allProducts[i].productPrice} EGP`
                      : `<div class="d-flex justify-content-around"><p class="text-center" id="priceBefore">Price : <span class="text-decoration-line-through">${allProducts[i].productPrice} EGP</span></p><p class="text-center" id="priceAfter">${priceAfterPromotion} EGP</p></div>`
                  }</p>
                </div>
              </div>
              <button class="btn w-75 ${textDanger} m-auto d-block my-3" ${disableAddToCartBtn} onclick="addToCart( ${i}, '${productCategory}', '${productsBody}')">${buttonText}</button>
            </div>
          </div>`;
      }
    }
  }

  if (products == "") {
    products += `<div class="d-flex justify-content-center"><img src="../images/no-products.jpg" class="d-block m-auto" alt="noProductFound" id="noProductFound"></div>`;
  }
  document.getElementById(body).innerHTML = products;
}

SearchBar.addEventListener("keyup", function () {
  searchByCategory("all", "row-all-tab-pane", SearchBar.value);
});

searchByCategory("all", "row-all-tab-pane");
