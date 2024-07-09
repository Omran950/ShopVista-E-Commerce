let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
let currentUserIndex =
  JSON.parse(localStorage.getItem("currentUserIndex")) || 0;
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

if (currentUser.role === "seller") {
  let sellerDashboard = document.getElementById("sellerDashboard");
  sellerDashboard.innerHTML = `<a class="nav-link" aria-current="page" href="../Seller/seller.html">Dashboard</a>
    `;
}

let ordersBody = document.getElementById("ordersBody");
let modalHeader = document.getElementById("staticBackdropLabel");
let modalBody = document.getElementById("modalBody");
let cart = document.getElementById("cart");

function displayCurrentUserOrders() {
  cart.innerHTML = allUsers[currentUserIndex].cart.length;
  let order = "";
  let product = {};
  let priceAfterPromotion = 0;
  let priceText = "";
  let totalPrice = 0;
  let notes = ``;
  if (allUsers[currentUserIndex].orders.length == 0) {
    ordersBody.innerHTML = `<div class="my-5 py-5 text-center shadow rounded-3">
          <h2 class="fs31 mt-3 pt-3 mb-3 pb-2 text-black">No orders found for your account.</h2>
          <button class="btn mb-5">
            <a href="../Cart/cart.html">Press here to make your first order <i class="fa-solid fa-cart-plus ms-1"></i></a>
          </button>
        </div>`;
  } else {
    for (let i = 0; i < allUsers[currentUserIndex].orders.length; i++) {
      if (allUsers[currentUserIndex].orders[i].shippingDetails.notes) {
        notes = `<p class="m-0">Notes : <span class="text-success fw-bold">${allUsers[currentUserIndex].orders[i].shippingDetails.notes}</span></p>`;
      }
      order += `<div class="row gy-2 my-3 rounded-3 shadow p-3">
              <div class="col">
                <div>
                  <h3 class="py-1 my-1">Order ${i + 1}</h3>
                  <p class="my-1">Phone number :
                    <span class="text-success fw-bold">${
                      allUsers[currentUserIndex].orders[i].shippingDetails.phone
                    }</span></p>
                    <p class="my-1">
                    This order is delivered to address : 
                    <span class="text-success fw-bold">${
                      allUsers[currentUserIndex].orders[i].shippingDetails
                        .address
                    }</span></p>
                  <p class="my-1">Payment Method : <span class="text-success fw-bold">${
                    allUsers[currentUserIndex].orders[i].shippingDetails
                      .paymentMethod
                  }</span></p>
                  <p class="my-1">Order Total Price :<span class="text-success fw-bold"> ${
                    allUsers[currentUserIndex].orders[i].shippingDetails
                      .totalCartPrice
                  } EGP</span></p>
                  ${notes}
              <div class="row align-items-center g-4 mt-1">`;
      for (
        let j = 0;
        j < allUsers[currentUserIndex].orders[i].cart.length;
        j++
      ) {
        product = allUsers[currentUserIndex].orders[i].cart[j];
        priceAfterPromotion = product.productPrice;
        priceText = `<p class="m-0">Price : ${priceAfterPromotion} EGP</p>`;
        totalPrice = product.productPrice * product.count;

        if (product.promotion > 0) {
          priceAfterPromotion =
            product.productPrice -
            product.productPrice * (product.promotion / 100);
          priceText = `<p class="m-0">Price : ${priceAfterPromotion.toFixed(
            2
          )} EGP</p>`;
        }
        totalPrice = priceAfterPromotion * product.count;

        order += `<div class="col-md-3">
              <div class="text-center shadow rounded-3 p-3 card-order border-0" onclick="productDetails(${i},${j})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <figure class="overflow-hidden">
                  <img src="${
                    product.productImage
                  }" alt="name" style="width: 100px; height: 100px" />
                </figure>
                <div>
                  <h3 class="text-success fw-bold m-0 fs-4">${
                    product.productName
                  }</h3>
                  ${priceText}
                  <p class="m-0">Quantity purchased : ${product.count}</p>
                  <p class="m-0">Total Price : ${totalPrice.toFixed(2)} EGP</p>
                </div>
              </div>
            </div>`;
      }
      order += `</div>
          </div>
          </div>
        </div>`;
    }
    ordersBody.innerHTML = order;
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
    window.location.replace("../index.html");
  }, 1000);
}

function productDetails(i, j) {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
  let product = allUsers[currentUserIndex].orders[i].cart[j];
  let priceAfterPromotion = product.productPrice;
  let promotionText = "";

  if (product.promotion > 0) {
    priceAfterPromotion =
      product.productPrice - product.productPrice * (product.promotion / 100);
    promotionText = `<p class="my-2 py-2" id="priceAfter"><span class="fw-bold text-">After Discount :</span> ${priceAfterPromotion.toFixed(
      2
    )} EGP</p>`;
  }

  modalHeader.innerHTML = `${product.productName}`;
  modalBody.innerHTML = `<div class="col-md-5">
                        <figure class="overflow-hidden p-3">
                          <img src="${product.productImage}" alt="${
    product.productName
  }" class="w-100 d-block" />
                        </figure>
                      </div>
                      <div class="col-md-7">
                        <div>
                          <p class="fw-bold my-2 py-2 fs-4">${
                            product.productDetails
                          }</p>
                          <p class="my-2 py-2">
                            <span class="fw-bold">Category :</span> ${
                              product.category
                            }
                          </p>
                          <p class="my-2 py-2">
                            <span class="fw-bold">Price :</span> ${priceAfterPromotion.toFixed(
                              2
                            )} EGP
                          </p>
                          <p class="my-2 py-2">
                            <span class="fw-bold">Total Price :</span> ${
                              priceAfterPromotion * product.count.toFixed(2)
                            } EGP
                          </p>
                          ${promotionText}
                          <p class="my-2 py-2">
                            <span class="fw-bold">Quantity purchased :</span> ${
                              product.count
                            }
                          </p>
                          <p class="my-2 py-2">
                            <span class="fw-bold">Seller :</span> ${
                              product.seller
                            }
                          </p>
                          <p class="my-2 py-2">
                            <span class="fw-bold">Rating :</span> ${
                              product.rating
                            }
                            <i class="fa-solid fa-star"></i>
                          </p>
                        </div>
                      </div>`;
}

displayCurrentUserOrders();
