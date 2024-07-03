if (!localStorage.getItem("currentUser")) {
  window.location.replace("../index.html");
} else {
  let currentUserIndex = 0;
  let currentUser = {};
  let allUsers = [];

  if (localStorage.getItem("allUsers")) {
    allUsers = JSON.parse(localStorage.getItem("allUsers"));
  }

  if (localStorage.getItem("currentUser")) {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUserIndex = JSON.parse(localStorage.getItem("currentUserIndex"));
  }
  let cartBody = document.getElementById("cartBody");
  let modalHeader = document.getElementById("staticBackdropLabel");
  let modalBody = document.getElementById("modalBody");

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
      window.location.replace("../index.html");
    }, 1000);
  }

  function displayCurrentUserCart() {
    if (currentUser.cart.length == 0) {
      cartBody.innerHTML = `<div class="my-5 py-5 text-center shadow rounded-3">
  <h2 class="fs-1 mt-5 pt-5 mb-3 pb-2 text-black">Cart Empty</h2>
  <button class="btn mb-5">
    <a href="../Shop/shop.html"
      >Press Here To Add Products <i class="fa-solid fa-cart-plus ms-1"></i
    ></a>
  </button>
</div>`;
    } else {
      let cartProducts = "";
      for (let i = 0; i < currentUser.cart.length; i++) {
        cartProducts += `<div id="row"
              class="row py-5 mt-4 px-3 align-items-center rounded-3 shadow gy-3"
            >
              <div class="col-3">
                <figure class="overflow-hidden" onclick="productDetails(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <img
                    src="../images/Lenovo (2).jpg"
                    alt="${currentUser.cart[i].productName}"
                    class="w-75 d-block m-auto"
                  />
                </figure>
              </div>
              <div class="col-7">
                <div>
                  <h3>${currentUser.cart[i].productName}</h3>
                  <p>Price : ${currentUser.cart[i].productPrice} EGP</p>
                  <button class="btn btn-danger py-1" onclick="removeProduct(${i})">
                    <i class="fa-solid fa-trash-can me-1 text-white"></i> Remove
                  </button>
                </div>
              </div>
              <div class="col-2">
                <div class="d-flex align-items-center justify-content-center gap-2">
                  <button class="btn btn-outline-success py-1">+</button>
                  <p class="mb-0">1</p>
                  <button class="btn btn-outline-success py-1">-</button>
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
    modalHeader.innerHTML = `${currentUser.cart[i].productName}`;
    modalBody.innerHTML = `<div class="col-md-5">
                    <figure class="overflow-hidden p-3">
                      <img
                        src="../images/Lenovo (2).jpg"
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
                      <p class="my-2 py-2">
                        <span class="fw-bold">Stock :</span> ${currentUser.cart[i].stock}
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
          currentUser.cart = [];
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

  displayCurrentUserCart();
}
