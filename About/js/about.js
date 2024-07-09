document.addEventListener("DOMContentLoaded", function () {
  updateNav();
});

let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
let currentUserIndex =
  JSON.parse(localStorage.getItem("currentUserIndex")) || 0;
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

let navUl = document.getElementById("navUl");

function updateNav() {
  if (!localStorage.getItem("currentUser")) {
    navUl.innerHTML = `
        <li class="nav-item  mx-1 ">
          <a class="nav-link " aria-current="page" href="../index.html">Home</a>
        </li>
        <li class="nav-item  mx-1 ">
          <a class="nav-link active" href="../About/about.html">About</a>
        </li>
        <li class="nav-item  mx-1 ">
          <a class="nav-link " href="../Contact/contact.html">Contact</a>
        </li>
        <li class="nav-item  mx-1 ">
          <a class="nav-link" href="../Authentication/login.html">Login</a>
        </li>
        <li class="nav-item  mx-1 ">
          <a class="nav-link" href="../Authentication/register.html">Register</a>
        </li>`;
  } else {
    let sellerDashboard = ``;
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser.role === "seller") {
      sellerDashboard = `<li class="nav-item mx-1 ">
        <a class="nav-link" aria-current="page" href="../Seller/seller.html">Dashboard</a>
      </li>`;
    }
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    navUl.innerHTML = `${sellerDashboard}
        <li class="nav-item mx-1 ">
          <a class="nav-link " aria-current="page" href="../index.html">Home</a>
        </li>
        <li class="nav-item mx-1 ">
          <a class="nav-link active" href="../About/about.html">About</a>
        </li>
        <li class="nav-item mx-1 ">
          <a class="nav-link " href="../Contact/contact.html">Contact</a>
        </li>
        <li class="nav-item  mx-1 isUserCheck">
          <a class="nav-link" aria-current="page" href="../Shop/shop.html">Shop</a>
        </li>
              <li class="nav-item mx-1">
                <a class="nav-link position-relative" href="../Cart/cart.html">
                  <i class="fa-solid fa-cart-shopping fa-lg"></i>
                  <span
                    id="cart"
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >${currentUser.cart.length}</span>
                </a>
              </li>
        <li class="nav-item mx-1">
                <a class="nav-link" href="../Profile/profile.html">
                  <i class="fa-solid fa-user"></i>
                </a>
              </li>
        <li class="nav-item  mx-1 isUserCheck">
              <button class="nav-link w-100" onclick="logout()">
                <i class="fa-solid fa-arrow-right-to-bracket"></i>
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
    window.location.replace("../index.html");
  }, 1000);
}
