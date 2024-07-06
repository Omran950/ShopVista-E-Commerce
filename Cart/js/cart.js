if (!localStorage.getItem("currentUser")) {
  window.location.replace("../index.html");
} else {
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

  let cartBody = document.getElementById("cartBody");
  let modalHeader = document.getElementById("staticBackdropLabel");
  let modalBody = document.getElementById("modalBody");
  let totalPrice = document.getElementById("totalPrice");
  let cart = document.getElementById("cart");
  let confirmPaymentButton = document.getElementById("confirmPaymentButton");

  function logout() {
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
      window.location.replace("../index.html");
    }, 1000);
  }

  function displayCurrentUserCart() {
    cart.innerHTML = currentUser.cart.length;
    totalPrice.innerHTML = `Total cart price : ${currentUser.totalCartPrice} EGP`;
    if (currentUser.cart.length == 0) {
      cartBody.innerHTML = `<div class="my-5 py-5 text-center shadow rounded-3">
  <h2 class="fs-1 mt-5 pt-5 mb-3 pb-2 text-black">Cart Empty</h2>
  <button class="btn mb-5">
    <a href="../Shop/shop.html"
      >Press Here To Add Products <i class="fa-solid fa-cart-plus ms-1"></i
    ></a>
  </button>
</div>`;
      confirmPaymentButton.disabled = true;
    } else {
      confirmPaymentButton.disabled = false;
      let newPrice = "";
      let cartProducts = "";
      for (let i = 0; i < currentUser.cart.length; i++) {
        newPrice = "";
        if (!currentUser.cart[i].featured) {
          let priceAfterPromotion =
            currentUser.cart[i].productPrice -
            currentUser.cart[i].productPrice *
              (currentUser.cart[i].promotion / 100);
          newPrice = `<p class="py-1" id="priceAfter"><span class="fw-bold text-">After Discount :</span> ${priceAfterPromotion} EGP</p>`;
        }
        let disableMinus = currentUser.cart[i].count === 1 ? "disabled" : "";
        let disablePlus =
          allProducts.find(
            (product) => product.productID === currentUser.cart[i].productID
          ).stock === 0
            ? "disabled"
            : "";
        cartProducts += `<div id="row"
            class="row py-2 mt-2 px-2 align-items-center rounded-3 shadow gy-3"
          >
            <div class="col-3">
              <figure class="overflow-hidden" onclick="productDetails(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <img
                  src="${currentUser.cart[i].productImage}"
                  alt="${currentUser.cart[i].productName}"
                  class="w-75 d-block m-auto"
                />
              </figure>
            </div>
            <div class="col-6">
              <div>
                <h3>${currentUser.cart[i].productName}</h3>
                <p class="mb-1">Price : ${currentUser.cart[i].productPrice} EGP</p>
                ${newPrice}
                <button class="btn btn-danger py-1" onclick="removeProduct(${i})">
                  <i class="fa-solid fa-trash-can me-1 text-white"></i> Remove
                </button>
              </div>
            </div>
            <div class="col-3">
              <div class="d-flex align-items-center justify-content-center gap-2">
                <button class="btn btn-outline-success py-1" ${disableMinus} onclick="removeProductCounter(${i})">-</button>
                <p class="mb-0">${currentUser.cart[i].count}</p>
                <button class="btn btn-outline-success py-1" ${disablePlus} onclick="addProductCounter(${i})">+</button>
              </div>
            </div>
          </div>`;
      }
      cartProducts += `<div class="text-center py-3 my-4">
      <button class="btn btn-danger" onclick="clearAllButton()">
        <i class="fa-solid fa-trash-can me-1 text-white"></i>Clear Cart
      </button>
    </div>`;
      cartBody.innerHTML = cartProducts;
    }
  }

  function productDetails(i) {
    allProducts = JSON.parse(localStorage.getItem("allProducts"));
    let newPrice = "";
    if (!currentUser.cart[i].featured) {
      let priceAfterPromotion =
        currentUser.cart[i].productPrice -
        currentUser.cart[i].productPrice *
          (currentUser.cart[i].promotion / 100);
      newPrice = `<p class="my-2 py-2" id="priceAfter"><span class="fw-bold text-">After Discount :</span> ${priceAfterPromotion} EGP</p>`;
    }
    modalHeader.innerHTML = `${currentUser.cart[i].productName}`;
    modalBody.innerHTML = `<div class="col-md-5">
                    <figure class="overflow-hidden p-3">
                      <img
                        src="${currentUser.cart[i].productImage}"
                        alt="${currentUser.cart[i].productName}"
                        class="w-100 d-block"
                      />
                    </figure>
                  </div>
                  <div class="col-md-7">
                    <div>
                      <p class="fw-bold my-2 py-2 fs-4">${currentUser.cart[i].productDetails}</p>
                      <p class="my-2 py-2">
                        <span class="fw-bold">Category :</span> ${currentUser.cart[i].category}
                      </p>
                      <p class="my-2 py-2">
                        <span class="fw-bold">Price :</span> ${currentUser.cart[i].productPrice} EGP
                      </p>
                      ${newPrice}
                      <p class="my-2 py-2">
                        <span class="fw-bold">Cart Amount :</span> ${currentUser.cart[i].count}
                      </p>
                      <p class="my-2 py-2">
                        <span class="fw-bold">Seller :</span> ${currentUser.cart[i].seller}
                      </p>
                      <p class="my-2 py-2">
                        <span class="fw-bold">Rating :</span> ${currentUser.cart[i].rating}
                        <i class="fa-solid fa-star"></i>
                      </p>
                    </div>
                  </div>`;
  }

  function clearAllButton() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn  btn-danger",
        cancelButton: "btn btn-success",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Oops...",
        text: "Are you sure ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Clear All",
        cancelButtonText: "cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          for (let i = 0; i < currentUser.cart.length; i++) {
            for (let j = 0; j < allProducts.length; j++) {
              if (currentUser.cart[i].productID == allProducts[j].productID) {
                allProducts[j].stock += currentUser.cart[i].count;
                localStorage.setItem(
                  "allProducts",
                  JSON.stringify(allProducts)
                );
              }
            }
          }

          currentUser.cart = [];
          currentUser.totalCartPrice = 0;
          allUsers[currentUserIndex].totalCartPrice = 0;
          allUsers[currentUserIndex].cart = [];
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          localStorage.setItem("allUsers", JSON.stringify(allUsers));
          displayCurrentUserCart();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  }

  function removeProduct(i) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn  btn-danger",
        cancelButton: "btn btn-success",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Oops...",
        text: "Are you sure ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Remove Product",
        cancelButtonText: "cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          for (let j = 0; j < allProducts.length; j++) {
            if (currentUser.cart[i].productID == allProducts[j].productID) {
              allProducts[j].stock += currentUser.cart[i].count;
              localStorage.setItem("allProducts", JSON.stringify(allProducts));
            }
          }
          if (currentUser.cart[i].featured) {
            currentUser.totalCartPrice -=
              currentUser.cart[i].productPrice * currentUser.cart[i].count;
            allUsers[currentUserIndex].totalCartPrice -=
              currentUser.cart[i].productPrice * currentUser.cart[i].count;
          } else {
            let priceAfterPromotion =
              currentUser.cart[i].productPrice -
              currentUser.cart[i].productPrice *
                (currentUser.cart[i].promotion / 100);
            currentUser.totalCartPrice -=
              priceAfterPromotion * currentUser.cart[i].count;
            allUsers[currentUserIndex].totalCartPrice -=
              priceAfterPromotion * currentUser.cart[i].count;
          }
          currentUser.cart.splice(i, 1);
          allUsers[currentUserIndex].cart.splice(i, 1);
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          localStorage.setItem("allUsers", JSON.stringify(allUsers));
          displayCurrentUserCart();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  }

  function addProductCounter(i) {
    for (let j = 0; j < allProducts.length; j++) {
      if (currentUser.cart[i].productID == allProducts[j].productID) {
        if (allProducts[j].stock > 0) {
          allProducts[j].stock -= 1;
          localStorage.setItem("allProducts", JSON.stringify(allProducts));
          allUsers[currentUserIndex].cart[i].count += 1;
          currentUser.cart[i].count += 1;
          if (currentUser.cart[i].featured) {
            currentUser.totalCartPrice += currentUser.cart[i].productPrice;
            allUsers[currentUserIndex].totalCartPrice +=
              currentUser.cart[i].productPrice;
          } else {
            let priceAfterPromotion =
              currentUser.cart[i].productPrice -
              currentUser.cart[i].productPrice *
                (currentUser.cart[i].promotion / 100);
            currentUser.totalCartPrice += priceAfterPromotion;
            allUsers[currentUserIndex].totalCartPrice += priceAfterPromotion;
          }

          localStorage.setItem("allUsers", JSON.stringify(allUsers));
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          displayCurrentUserCart();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product has been added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          break;
        }
      }
    }
  }

  function removeProductCounter(i) {
    for (let j = 0; j < allProducts.length; j++) {
      if (currentUser.cart[i].productID == allProducts[j].productID) {
        if (currentUser.cart[i].count > 1) {
          allProducts[j].stock += 1;
          localStorage.setItem("allProducts", JSON.stringify(allProducts));
          allUsers[currentUserIndex].cart[i].count -= 1;
          currentUser.cart[i].count -= 1;

          if (currentUser.cart[i].featured) {
            currentUser.totalCartPrice -= currentUser.cart[i].productPrice;
            allUsers[currentUserIndex].totalCartPrice -=
              currentUser.cart[i].productPrice;
          } else {
            let priceAfterPromotion =
              currentUser.cart[i].productPrice -
              currentUser.cart[i].productPrice *
                (currentUser.cart[i].promotion / 100);
            currentUser.totalCartPrice -= priceAfterPromotion;
            allUsers[currentUserIndex].totalCartPrice -= priceAfterPromotion;
          }

          localStorage.setItem("allUsers", JSON.stringify(allUsers));
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          displayCurrentUserCart();

          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Product has been removed successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          break;
        }
      }
    }
  }

  displayCurrentUserCart();
}
