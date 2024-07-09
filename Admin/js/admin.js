let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
let currentUserIndex =
  JSON.parse(localStorage.getItem("currentUserIndex")) || 0;
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
let allTickets = JSON.parse(localStorage.getItem("allTickets")) || [];

let productName = document.getElementById("product-name");
let productPrice = document.getElementById("product-price");
let productImage = document.getElementById("product-image");
let productDetails = document.getElementById("product-details");
let categorySelected = document.getElementById("category");
let stock = document.getElementById("product-stock");
let promotion = document.getElementById("promotion");
let addProduct = document.getElementById("add-product");
let productNameAlert = document.getElementById("product-name-alert");
let priceAlert = document.getElementById("price-alert");
let imageAlert = document.getElementById("image-alert");
let promotionAlert = document.getElementById("promotion-alert");
let detailsAlert = document.getElementById("details-alert");
let tableBody = document.getElementById("productsTableBody");
let pendingTicketsTableBody = document.getElementById("ticketsTableBody");
let dropdownItems = document.querySelectorAll(".dropdown-item");
let dropdownButton = document.getElementById("dropdownMenuButton1");
let pendingTableBody = document.getElementById("pendingProductsTableBody");
let handledTicketsTableBody = document.getElementById(
  "handledTicketsTableBody"
);
// Password Toggle Icons
let passwordToggleIcon = document.getElementById("toggle-password");
let rePasswordToggleIcon = document.getElementById("toggle-rePassword");

//      Create/Update Buttons
let createBtn = document.getElementById("createUserBtn");
let updateBtn = document.getElementById("updateUserBtn");

//      USERNAME      //
let userEmail = document.getElementById("user-email");
let userName = document.getElementById("user-name");
let userAddress = document.getElementById("user-address");
let userRole = document.getElementById("user-role");
let userPassword = document.getElementById("user-password");
let userConfirmPassword = document.getElementById("user-confirm-password");

let userEmailAlert = document.getElementById("email-alert");
let userNameAlert = document.getElementById("name-alert");
let userAddressAlert = document.getElementById("address-alert");
let userRoleAlert = document.getElementById("role-alert");
let userPasswordAlert = document.getElementById("password-alert");
let userConfirmPasswordAlert = document.getElementById(
  "user-confirm-password-alert"
);

let existingProduct = null;

categorySelected.addEventListener("change", function () {
  let category = categorySelected.value;
});

function productNameValidation() {
  let productNameRegex = /^[a-zA-Z0-9_ ]{3,20}$/;
  return productNameRegex.test(productName.value);
}
function productPriceValidation() {
  let priceRegex = /^[1-9]\d*(\.\d{1,2})?$|^0\.\d{1,2}$/;
  return priceRegex.test(productPrice.value);
}
function productImageValidation() {
  let imageRegex =
    /((http[s]?|ftp):\/\/)?([^:/\s]+)(:([^/\s]*))?((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(\?([^#\s]*))?(#(\w*))?/;
  return imageRegex.test(productImage.value);
}
function categoryValidation() {
  return categorySelected.value !== "";
}
function promotionValidation() {
  let promotionRegex = /^(100|[1-9]?[0-9])$/;
  return promotionRegex.test(promotion.value);
}
function productDetailsValidation() {
  let detailsRegex = /^[a-zA-Z0-9_ !@#$%^&*()-+=,.]{20,100}$/;
  return detailsRegex.test(productDetails.value);
}
// User Management Form Validation
function nameValidation() {
  let nameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  return nameRegex.test(userName.value);
}
function emailValidation() {
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(userEmail.value);
}
function addressValidation() {
  let addressRegex = /^[a-zA-Z\u0080-\u024F0-9\s\/\-\']{6,20}$/;
  return addressRegex.test(userAddress.value);
}
function roleValidation() {
  if (userRole && userRole.value) return true;
  else return false;
}
function passwordValidation() {
  let passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z!@#$%^&*\d]{8,}$/;
  return passwordRegex.test(userPassword.value);
}
function rePasswordValidation() {
  return userConfirmPassword.value === userPassword.value;
}
document.addEventListener("DOMContentLoaded", function () {
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      dropdownButton.textContent = this.textContent;
    });
  });
});

// Event on inputs
productName.addEventListener("keyup", function () {
  if (productNameValidation()) {
    removeProductNameAlert();
  } else {
    addProductNameAlert();
  }
});

productPrice.addEventListener("keyup", function () {
  if (productPriceValidation()) {
    removeProductPriceAlert();
  } else {
    addProductPriceAlert();
  }
});

productImage.addEventListener("keyup", function () {
  if (productImageValidation()) {
    removeProductImageAlert();
  } else {
    addProductImageAlert();
  }
});

productDetails.addEventListener("keyup", function () {
  if (productDetailsValidation()) {
    removeProductDetailsAlert();
  } else {
    addProductDetailsAlert();
  }
});

promotion.addEventListener("keyup", function () {
  if (promotionValidation()) {
    removePromotionAlert();
  } else {
    addPromotionAlert();
  }
});
// Event Listeners on User Management Form
userEmail.addEventListener("keyup", function () {
  if (emailValidation()) removeUserEmailAlert();
  else addUserEmailAlert();
});
userName.addEventListener("keyup", function () {
  if (nameValidation()) removeUserNameAlert();
  else addUserNameAlert();
});
userAddress.addEventListener("keyup", function () {
  if (addressValidation()) removeUserAddressAlert();
  else addUserAddressAlert();
});
userRole.addEventListener("keyup", function () {
  if (roleValidation()) removeUserAddressAlert();
  else addUserRoleAlert();
});
userPassword.addEventListener("keyup", function () {
  if (passwordValidation()) removePasswordAlert();
  else addPasswordAlert();
});
userConfirmPassword.addEventListener("keyup", function () {
  if (rePasswordValidation()) removeRePasswordAlert();
  else addRePasswordAlert();
});
// add and remove Alerts
function addProductNameAlert() {
  productName.classList.add("is-invalid");
  productName.classList.remove("is-valid");
  productNameAlert.classList.remove("d-none");
}
function removeProductNameAlert() {
  productName.classList.remove("is-invalid");
  productName.classList.add("is-valid");
  productNameAlert.classList.add("d-none");
}

function addProductPriceAlert() {
  productPrice.classList.add("is-invalid");
  productPrice.classList.remove("is-valid");
  priceAlert.classList.remove("d-none");
}
function removeProductPriceAlert() {
  productPrice.classList.remove("is-invalid");
  productPrice.classList.add("is-valid");
  priceAlert.classList.add("d-none");
}

function addProductImageAlert() {
  productImage.classList.add("is-invalid");
  productImage.classList.remove("is-valid");
  imageAlert.classList.remove("d-none");
}
function removeProductImageAlert() {
  productImage.classList.remove("is-invalid");
  productImage.classList.add("is-valid");
  imageAlert.classList.add("d-none");
}

function addCategoryAlert() {
  categorySelected.classList.add("is-invalid");
  categorySelected.classList.remove("is-valid");
}
function removeCategoryAlert() {
  categorySelected.classList.remove("is-invalid");
  categorySelected.classList.add("is-valid");
}

function addPromotionAlert() {
  promotion.classList.add("is-invalid");
  promotion.classList.remove("is-valid");
  promotionAlert.classList.remove("d-none");
}
function removePromotionAlert() {
  promotion.classList.remove("is-invalid");
  promotion.classList.add("is-valid");
  promotionAlert.classList.add("d-none");
}

function addProductDetailsAlert() {
  productDetails.classList.add("is-invalid");
  productDetails.classList.remove("is-valid");
  detailsAlert.classList.remove("d-none");
}
function removeProductDetailsAlert() {
  productDetails.classList.remove("is-invalid");
  productDetails.classList.add("is-valid");
  detailsAlert.classList.add("d-none");
}
// Add and remove user Alerts
function addUserEmailAlert() {
  userEmail.classList.add("is-invalid");
  userEmail.classList.remove("is-valid");
  userEmailAlert.classList.remove("d-none");
}
function removeUserEmailAlert() {
  userEmail.classList.remove("is-invalid");
  userEmail.classList.add("is-valid");
  userEmailAlert.classList.add("d-none");
}
function addUserNameAlert() {
  userName.classList.add("is-invalid");
  userName.classList.remove("is-valid");
  userNameAlert.classList.remove("d-none");
}
function removeUserNameAlert() {
  userName.classList.remove("is-invalid");
  userName.classList.add("is-valid");
  userNameAlert.classList.add("d-none");
}
function addUserAddressAlert() {
  userAddress.classList.add("is-invalid");
  userAddress.classList.remove("is-valid");
  userAddressAlert.classList.remove("d-none");
}
function removeUserAddressAlert() {
  userAddress.classList.remove("is-invalid");
  userAddress.classList.add("is-valid");
  userAddressAlert.classList.add("d-none");
}
function addUserRoleAlert() {
  userRole.classList.add("is-invalid");
  userRole.classList.remove("is-valid");
  userRoleAlert.classList.remove("d-none");
}
function removeUserRoleAlert() {
  userRole.classList.remove("is-invalid");
  userRole.classList.add("is-valid");
  userRoleAlert.classList.add("d-none");
}
function addPasswordAlert() {
  userPassword.classList.add("is-invalid");
  userPassword.classList.remove("is-valid");
  userPasswordAlert.classList.remove("d-none");
}
function removePasswordAlert() {
  userPassword.classList.remove("is-invalid");
  userPassword.classList.add("is-valid");
  userPasswordAlert.classList.add("d-none");
}
function addRePasswordAlert() {
  userConfirmPassword.classList.add("is-invalid");
  userConfirmPassword.classList.remove("is-valid");
  userConfirmPasswordAlert.classList.remove("d-none");
}
function removeRePasswordAlert() {
  userConfirmPassword.classList.remove("is-invalid");
  userConfirmPassword.classList.add("is-valid");
  userConfirmPasswordAlert.classList.add("d-none");
}
function resetUserValidation() {
  userName.classList.remove("is-valid");
  userEmail.classList.remove("is-valid");
  userAddress.classList.remove("is-valid");
  userRole.classList.remove("is-valid");
  userPassword.classList.remove("is-valid");
  userConfirmPassword.classList.remove("is-valid");
}

function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productImage.value = "";
  productDetails.value = "";
  categorySelected.value = "";
  stock.value = "";
  promotion.value = "";
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateRandomRating() {
  const ratings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  const randomIndex = Math.floor(Math.random() * ratings.length);
  return ratings[randomIndex];
}

addProduct.addEventListener("click", function () {
  if (!categoryValidation()) {
    addCategoryAlert();
    return;
  }
  let featured = promotion.value == 0 || promotion.value == "";
  let product = {
    productName: productName.value,
    productPrice: Number(productPrice.value),
    productImage: productImage.value,
    productDetails: productDetails.value,
    category: categorySelected.value,
    stock: Number(stock.value),
    rating: generateRandomRating(),
    seller: currentUser.name,
    sellerID: "ShopVista",
    promotion: Number(promotion.value),
    featured: featured,
    productID: existingProduct || generateUUID(),
    pending: false,
  };
  if (
    productNameValidation() &&
    productPriceValidation() &&
    productImageValidation() &&
    productDetailsValidation()
  ) {
    if (existingProduct) {
      let index = allProducts.findIndex((p) => p.productID === existingProduct);
      product.rating = allProducts[index].rating;
      allProducts[index] = product;
      allUsers.forEach((user) => {
        user.cart.forEach((cartProduct) => {
          if (cartProduct.productID === existingProduct) {
            cartProduct.productName = product.productName;
            cartProduct.productPrice = product.productPrice;
            cartProduct.productImage = product.productImage;
            cartProduct.productDetails = product.productDetails;
            cartProduct.category = product.category;
            cartProduct.stock = product.stock;
            cartProduct.promotion = product.promotion;
            cartProduct.featured = product.featured;
          }
          recalcTotalCartPrice(user);
        });
      });
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product Updated",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      allProducts.push(product);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product Added",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
    clearInputs();
    existingProduct = null;
    displayProducts();
  } else if (!productNameValidation()) {
    addProductNameAlert();
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please fill all the fields",
      showConfirmButton: false,
      timer: 1000,
    });
  } else if (!productPriceValidation()) {
    addProductPriceAlert();
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please fill all the fields",
      showConfirmButton: false,
      timer: 1000,
    });
  } else if (!productImageValidation()) {
    addProductImageAlert();
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please fill all the fields",
      showConfirmButton: false,
      timer: 1000,
    });
  } else if (!productDetailsValidation()) {
    addProductDetailsAlert();
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please fill all the fields",
      showConfirmButton: false,
      timer: 1000,
    });
  } else if (!categoryValidation()) {
    addCategoryAlert();
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please fill all the fields",
      showConfirmButton: false,
      timer: 1000,
    });
  }
});

function displayProducts() {
  let trs = "";
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].pending == false) {
      trs += `
            <tr class="text-center">
                <td>${allProducts[i].productName}</td>
                <td>${allProducts[i].productPrice}</td>
                <td><img src="${allProducts[i].productImage}" alt="${allProducts[i].productName}" style="max-width: 100px; max-height: 100px;"></td>
                <td>${allProducts[i].productDetails}</td>
                <td>${allProducts[i].category}</td>
                <td>${allProducts[i].stock}</td>
                <td>${allProducts[i].promotion}%</td>
                <td>${allProducts[i].sellerID}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-sm update-btn" data-product-id="${allProducts[i].productID}">Update</button></td>
                <td class="text-center">
                    <button type="button" class="btn btn-sm delete-btn" data-product-id="${allProducts[i].productID}">Delete</button></td>
        </tr>
        `;
    }
  }
  tableBody.innerHTML = trs;
}

function recalcTotalCartPrice(user) {
  user.totalCartPrice = user.cart.reduce((total, cartProduct) => {
    let priceAfterPromotion = cartProduct.featured
      ? cartProduct.productPrice
      : cartProduct.productPrice -
        cartProduct.productPrice * (cartProduct.promotion / 100);
    return total + cartProduct.count * priceAfterPromotion;
  }, 0);
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("update-btn")) {
    let productID = event.target.getAttribute("data-product-id");
    updateRow(productID);
    document.getElementById("add-product").innerHTML = "Save changes";
  } else if (event.target.classList.contains("delete-btn")) {
    let productID = event.target.getAttribute("data-product-id");
    deleteRow(productID);
  }
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("handle-btn")) {
    let ticketID = event.target.getAttribute("data-product-id");
    handleTicket(ticketID);
  } else if (event.target.classList.contains("ignore-btn")) {
    let ticketID = event.target.getAttribute("data-product-id");
    ignoreTicket(ticketID);
  }
});

function updateRow(productID) {
  window.scrollTo({ top: 0, behavior: "smooth" });

  let productToUpdate = allProducts.find((p) => p.productID === productID);

  if (productToUpdate) {
    productName.value = productToUpdate.productName;
    productPrice.value = productToUpdate.productPrice;
    productImage.value = productToUpdate.productImage;
    productDetails.value = productToUpdate.productDetails;
    categorySelected.value = productToUpdate.category;
    stock.value = productToUpdate.stock;
    promotion.value = productToUpdate.promotion;
    existingProduct = productID;
  }
}

function deleteRow(productID) {
  allUsers.forEach((user) => {
    let productIndex = user.cart.findIndex(
      (cartProduct) => cartProduct.productID === productID
    );

    if (productIndex !== -1) {
      let cartProduct = user.cart[productIndex];
      let priceAfterPromotion = cartProduct.featured
        ? cartProduct.productPrice
        : cartProduct.productPrice -
          cartProduct.productPrice * (cartProduct.promotion / 100);

      user.totalCartPrice -= cartProduct.count * priceAfterPromotion;

      user.cart.splice(productIndex, 1);

      recalcTotalCartPrice(user);
    }
  });

  localStorage.setItem("allUsers", JSON.stringify(allUsers));
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Product Deleted",
    showConfirmButton: false,
    timer: 1000,
  });
  allProducts = allProducts.filter(
    (product) => product.productID !== productID
  );
  localStorage.setItem("allProducts", JSON.stringify(allProducts));

  displayProducts();
}

// Pending Products
function displayPendingProducts() {
  let pendingTrs = "";
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].pending == true) {
      pendingTrs += `
            <tr class="text-center">
                <td>${allProducts[i].productName}</td>
                <td>${allProducts[i].productPrice}</td>
                <td><img src="${allProducts[i].productImage}" alt="${allProducts[i].productName}" style="max-width: 100px; max-height: 100px;"></td>
                <td>${allProducts[i].productDetails}</td>
                <td>${allProducts[i].category}</td>
                <td>${allProducts[i].stock}</td>
                <td>${allProducts[i].promotion}%</td>
                <td>${allProducts[i].sellerID}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-sm approve-btn" data-product-id="${allProducts[i].productID}">Approve</button></td>
                <td class="text-center">
                    <button type="button" class="btn btn-sm reject-btn" data-product-id="${allProducts[i].productID}">Reject</button></td>
        </tr>
        `;
    }
  }
  if (pendingTrs === ``) {
    pendingTrs = `<tr><td colspan="10" rowspan="3" class="text-center py-5"><h2 class="fs-1 fw-bolder py-5">No products found</h2></td></tr>`;
  }
  pendingTableBody.innerHTML = pendingTrs;
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("approve-btn")) {
    let productID = event.target.getAttribute("data-product-id");
    approveProduct(productID);
  } else if (event.target.classList.contains("reject-btn")) {
    let productID = event.target.getAttribute("data-product-id");
    rejectProduct(productID);
  }
});

function approveProduct(productID) {
  let productToUpdate = allProducts.find((p) => p.productID === productID);

  if (productToUpdate) {
    productToUpdate.pending = false;
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
    displayPendingProducts();
    displayProducts();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Product Approved",
      showConfirmButton: false,
      timer: 1000,
    });
  }
}

function rejectProduct(productID) {
  let productToUpdate = allProducts.find((p) => p.productID === productID);

  if (productToUpdate) {
    allProducts.splice(allProducts.indexOf(productToUpdate), 1);
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
    displayPendingProducts();
    displayProducts();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Product Rejected",
      showConfirmButton: false,
      timer: 1000,
    });
  }
}

// Customer Service
function displayPendingTickets() {
  let ticketsTrs = "";
  for (let i = 0; i < allTickets.length; i++) {
    if (allTickets[i].pending == true) {
      ticketsTrs += `
            <tr class="text-center">
                <td>${allTickets[i].email}</td>
                <td>${allTickets[i].name}</td>
                <td>${allTickets[i].mobile}</td>
                <td>${allTickets[i].title}</td>
                <td>${allTickets[i].message}</td>
                <td>${allTickets[i].reason}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-sm handle-btn" data-product-id="${allTickets[i].ticketID}">Handle</button></td>
                <td class="text-center">
                    <button type="button" class="btn btn-sm ignore-btn" data-product-id="${allTickets[i].ticketID}">Ignore</button></td>
        </tr>
        `;
    }
  }
  if (ticketsTrs === ``) {
    ticketsTrs = `<tr><td colspan="10" rowspan="3" class="text-center py-5"><h2 class="fs-1 fw-bolder py-5">No tickets found</h2></td></tr>`;
  }
  pendingTicketsTableBody.innerHTML = ticketsTrs;
}

function displayHandledTickets() {
  let handledTicketsTrs = "";
  for (let i = 0; i < allTickets.length; i++) {
    if (allTickets[i].pending == false) {
      handledTicketsTrs += `
            <tr class="text-center">
                <td>${allTickets[i].email}</td>
                <td>${allTickets[i].name}</td>
                <td>${allTickets[i].mobile}</td>
                <td>${allTickets[i].title}</td>
                <td>${allTickets[i].message}</td>
                <td>${allTickets[i].reason}</td>
                <td><i class="fa-regular fa-square-check"></i></td>
        </tr>
        `;
    }
  }
  if (handledTicketsTrs === ``) {
    handledTicketsTrs = `<tr><td colspan="10" rowspan="3" class="text-center py-5"><h2 class="fs-1 fw-bolder py-5">No tickets found</h2></td></tr>`;
  }
  handledTicketsTableBody.innerHTML = handledTicketsTrs;
}

function handleTicket(ticketID) {
  let ticketToUpdate = allTickets.find((p) => p.ticketID === ticketID);

  if (ticketToUpdate) {
    ticketToUpdate.pending = false;

    const email = ticketToUpdate.email;
    const subject = `Handling Ticket: ${ticketToUpdate.title}`;
    const body = `Dear ${ticketToUpdate.name},\n\nYour ticket titled "${ticketToUpdate.title}" is being handled.\n\nThank you,\nSupport Team`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    localStorage.setItem("allTickets", JSON.stringify(allTickets));
    displayPendingTickets();
    displayHandledTickets();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Ticket Handled",
      showConfirmButton: false,
      timer: 1000,
    });
  }
}

function ignoreTicket(ticketID) {
  let ticketToUpdate = allTickets.find((p) => p.ticketID === ticketID);

  if (ticketToUpdate) {
    allTickets.splice(allTickets.indexOf(ticketToUpdate), 1);
    localStorage.setItem("allTickets", JSON.stringify(allTickets));
    displayPendingTickets();
    displayHandledTickets();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Ticket Ignored",
      showConfirmButton: false,
      timer: 1000,
    });
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

function displayTickets() {
  displayPendingTickets();
  displayHandledTickets();
}

// Users

//      Show Password     //
function eye(targetInput, icon) {
  if (targetInput.type === "password") {
    targetInput.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    targetInput.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}
passwordToggleIcon.addEventListener("click", function (e) {
  eye(userPassword, e.target);
});
rePasswordToggleIcon.addEventListener("click", function (e) {
  eye(userConfirmPassword, e.target);
});

function displayUsers() {
  let tempUsers = "";
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
  for (let i = 1; i < allUsers.length; i++) {
    tempUsers += `
            <tr>
              <td>${allUsers[i].name}</td>
              <td>${allUsers[i].email}</td>
              <td>${allUsers[i].address}</td>
              <td>${allUsers[i].role}</td>
              <td>${allUsers[i].totalCartPrice}</td>
              <td class="text-center"><button type="button" class="btn" onclick="displayOrders(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  View Orders
                </button></td>
              <td class="text-center"><button type="button" class="btn" onclick="displayCart(${i})" data-bs-toggle="modal" data-bs-target="#cart-modal">
                  View Cart
                </button></td>
              <td class="text-center"><button type="button" class="btn" onclick="preUpdateUser(${i})">Update</button></td>
              <td class="text-center"><button type="button" class="btn delete-btn-user" onclick="deleteUser(${i})">Delete</button></td>
            </tr>
    `;
  }
  if (!tempUsers) {
    tempUsers = `<tr><td colspan="10" rowspan="3" class="text-center py-5"><h2 class="fs-1 fw-bolder py-5">No products found</h2></td></tr>`;
  }
  document.getElementById("tableBodyUsers").innerHTML = tempUsers;
}

function createUser() {
  let createdUser = {};
  if (
    emailValidation() &&
    nameValidation() &&
    addressValidation() &&
    roleValidation() &&
    passwordValidation() &&
    rePasswordValidation()
  ) {
    for (let i = 0; i < allUsers.length; i++) {
      if (userEmail.value == allUsers[i].email) {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "This email already exists",
          showConfirmButton: false,
          timer: 2000,
        });
      } else emailValue = userEmail.value;
    }

    createdUser.name = userName.value;
    createdUser.email = emailValue;
    createdUser.address = userAddress.value;
    createdUser.role = userRole.value;
    createdUser.totalCartPrice = 0;
    createdUser.cart = [];
    createdUser.orders = [];
    createdUser.password = userPassword.value;
    createdUser.isLogin = false;

    allUsers.push(createdUser);

    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    displayUsers();
    resetUserValidation();

    userEmail.value = "";
    userName.value = "";
    userAddress.value = "";
    userRole.value = "";
    userPassword.value = "";
    userConfirmPassword.value = "";

    Swal.fire({
      position: "center",
      icon: "success",
      title: "User has been added",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please validate User Data",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

function deleteUser(userIndex) {
  // Remove Product from all Products array only if it exists
  if (allUsers[userIndex].role == "seller") {
    for (let i = allProducts.length - 1; i >= 0; i--) {
      if (allUsers[userIndex].email == allProducts[i].sellerID) {
        allProducts.splice(i, 1);
      }
    }

    // Remove Product from all users cart only if it exists
    for (let x = 0; x < allUsers.length; x++) {
      for (let i = allUsers[x].cart.length - 1; i >= 0; i--) {
        if (allUsers[x].cart[i].sellerID == allUsers[userIndex].email) {
          allUsers[x].cart.splice(i, 1);
        }
      }
      reCalcTotalCartPrice(allUsers[x]);
    }
  }

  for (let i = 0; i < allUsers[userIndex].cart.length; i++) {
    for (let j = 0; j < allProducts.length; j++) {
      if (allProducts[j].productID == allUsers[userIndex].cart[i].productID) {
        allProducts[j].stock += allUsers[userIndex].cart[i].count;
        break;
      }
    }
  }

  if (allUsers[userIndex].email == currentUser.email) {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserIndex");
    setTimeout(function () {
      window.location.replace("../index.html");
    }, 1000);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your account has been deleted!",
      showConfirmButton: false,
      timer: 2000,
    });
  }
  allUsers.splice(userIndex, 1);
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
  Swal.fire({
    position: "center",
    icon: "success",
    title: "User Deleted",
    showConfirmButton: false,
    timer: 1000,
  });
  displayUsers();
}

let userIndexToUpdate = 0;

function preUpdateUser(userIndex) {
  userIndexToUpdate = userIndex;
  window.scrollTo({ top: 0, behavior: "smooth" });
  userEmail.value = allUsers[userIndex].email;
  userName.value = allUsers[userIndex].name;
  userAddress.value = allUsers[userIndex].address;
  userRole.value = allUsers[userIndex].role;
  createBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateUser() {
  for (let i = 0; i < allUsers.length; i++) {
    if (userEmail.value == allUsers[i].email) {
      if (i == userIndexToUpdate) break;
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "This email already exists",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      allUsers[userIndexToUpdate].email = userEmail.value;
    }
  }
  allUsers[userIndexToUpdate].name = userName.value;
  allUsers[userIndexToUpdate].address = userAddress.value;
  allUsers[userIndexToUpdate].role = userRole.value;

  // Update CurrentUser in local storage
  if (userIndexToUpdate == currentUserIndex) {
    currentUser.name = userName.value;
    currentUser.address = userAddress.value;
    currentUser.role = userRole.value;
    currentUser.email = userEmail.value;
  }
  if (userPassword.value) {
    if (passwordValidation() && rePasswordValidation()) {
      allUsers[userIndexToUpdate].password = userPassword.value;
      if (userIndexToUpdate == currentUserIndex)
        currentUser.password = userPassword.value;
    } else {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Please validate your password",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  displayUsers();

  createBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");

  userEmail.value = "";
  userName.value = "";
  userAddress.value = "";
  userRole.value = "";
  userPassword.value = "";
  userConfirmPassword.value = "";

  if (allUsers[userIndexToUpdate].role == "seller") {
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].productID == allUsers[userIndexToUpdate].email) {
        allProducts[i].name = allUsers[userIndexToUpdate].name;
      }
    }
    for (let i = 0; i < allUsers.length; i++) {
      for (let j = 0; j < allUsers[i].cart.length; j++) {
        if (
          allUsers[i].cart[j].productID == allUsers[userIndexToUpdate].email
        ) {
          allUsers[i].cart[j].name = allUsers[userIndexToUpdate].name;
        }
      }
    }
  }

  return Swal.fire({
    position: "center",
    icon: "success",
    title: "User data has been updated",
    showConfirmButton: false,
    timer: 2000,
  });
}

function displayOrders(index) {
  let orderTemp = "";
  let cartTemp = "";

  for (let i = 0; i < allUsers[index].orders.length; i++) {
    cartTemp = "";
    for (let x = 0; x < allUsers[index].orders[i].cart.length; x++) {
      cartTemp += `<tr>
                                    <td>${allUsers[index].orders[i]?.cart[x].productID}</td>
                                    <td>${allUsers[index].orders[i]?.cart[x].productName}</td>
                                    <td><img src="${allUsers[index].orders[i]?.cart[x].productImage}"/></td>
                                    <td>${allUsers[index].orders[i]?.cart[x].productDetails}</td>
                                    <td>${allUsers[index].orders[i]?.cart[x].productPrice}</td>
                                    <td>${allUsers[index].orders[i]?.cart[x].category}</td>
                                    <td>${allUsers[index].orders[i]?.cart[x].promotion}</td>
                                    <td>${allUsers[index].orders[i]?.cart[x].stock}</td>
                                    <td>${allUsers[index].orders[i]?.cart[x].seller}</td>
                                  </tr>`;
    }
    orderTemp += `<div class="orderContainer mb-5 p-3 shadow-lg rounded-5 px-3 bg-info bg-opacity-10">
                          <h2 class="text-center">Order ${i + 1}</h2>
                          <div class="orderInnerContainer mb-3 p-4">
                            <div class="shippingDetails mb-4">
                              <h4>Shipping Details</h4>
                              <table class="table table-striped table-bordered">
                                <thead>
                                  <tr>
                                    <td>Name</td>
                                    <td>Phone</td>
                                    <td>Address</td>
                                    <td>Comments</td>
                                    <td>Total Cart Price</td>
                                  </tr>
                                </thead>

                                <tbody class="table-group-divider">
                                  <tr class="text-center">
                                    <td>${allUsers[index].name}</td>
                                    <td>${
                                      allUsers[index].orders[i].shippingDetails
                                        .phone
                                    }</td>
                                    <td>${
                                      allUsers[index].orders[i].shippingDetails
                                        .address
                                    }</td>
                                    <td>${
                                      allUsers[index].orders[i].shippingDetails
                                        .notes
                                    }</td>
                                    <td>${
                                      allUsers[index].orders[i].shippingDetails
                                        .totalCartPrice
                                    }</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div class="orderDetails">
                              <h4>Order Details</h4>
                              <table class="table table-striped table-bordered">
                                <thead>
                                  <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Image</td>
                                    <td>Details</td>
                                    <td>Price</td>
                                    <td>Category</td>
                                    <td>Promotion</td>
                                    <td>Stock</td>
                                    <td>Seller</td>
                                  </tr>
                                </thead>

                                <tbody class="table-group-divider" id="cartBody">
                                  ${cartTemp}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>`;
  }
  if (!orderTemp) {
    orderTemp += `<tr><td colspan="10" rowspan="3" class="text-center py-5"><h2 class="fs-1 fw-bolder py-5">No orders history</h2></td></tr>`;
  }
  document.getElementById("ordersContainer").innerHTML = orderTemp;
}

function displayCart(index) {
  let cartTemp = "";
  let cartData = "";
  for (let i = 0; i < allUsers[index].cart.length; i++) {
    cartData += `
                                
                                  <tr class="text-center">
                                    <td>${allUsers[index].cart[i].productID}</td>
                                    <td>${allUsers[index].cart[i].productName}</td>
                                    <td><img src="${allUsers[index].cart[i].productImage}" /></td>
                                    <td>${allUsers[index].cart[i].productDetails}</td>
                                    <td>${allUsers[index].cart[i].productPrice}</td>
                                    <td>${allUsers[index].cart[i].category}</td>
                                    <td>${allUsers[index].cart[i].promotion}</td>
                                    <td>${allUsers[index].cart[i].count}</td>
                                    <td>${allUsers[index].cart[i].seller}</td>
                                  </tr>`;
  }
  cartTemp = `<div class="orderInnerContainer mb-3 p-4">
                            <div class="cartDetails mb-4">
                              <h4>Cart Details</h4>
                              <table class="table table-striped table-bordered">
                                <thead>
                                  <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Image</td>
                                    <td>Details</td>
                                    <td>Price</td>
                                    <td>Category</td>
                                    <td>Promotion</td>
                                    <td>Amount</td>
                                    <td>Seller</td>
                                  </tr>
                                </thead>
                                <tbody class="table-group-divider">
                                ${cartData}
                                </tbody>
                            </table>
                            </div>
                    </div>`;
  if (!cartData) {
    cartData = `<tr><td colspan="10" rowspan="3" class="text-center py-5"><h2 class="fs-1 fw-bolder py-5">No products found</h2></td></tr>`;
  }
  document.getElementById("cartContainer").innerHTML = cartData;
}

displayProducts();
