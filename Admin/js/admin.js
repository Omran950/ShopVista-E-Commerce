if (!localStorage.getItem("currentUser")) {
  window.location.replace("../index.html");
}
let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
let currentUserIndex =
  JSON.parse(localStorage.getItem("currentUserIndex")) || 0;
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
let allTickets = JSON.parse(localStorage.getItem("allTickets")) || [];

if (!currentUser.role === "admin") {
  window.location.replace("../index.html");
}

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
    ticketsTrs = `<tr><td colspan="10" rowspan="3" class="text-center py-5"><h2 class="fs-1 fw-bolder py-5">No products found</h2></td></tr>`;
  }
  pendingTicketsTableBody.innerHTML = ticketsTrs;
}

let handledTicketsTableBody = document.getElementById(
  "handledTicketsTableBody"
);

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
    handledTicketsTrs = `<tr><td colspan="10" rowspan="3" class="text-center py-5"><h2 class="fs-1 fw-bolder py-5">No products found</h2></td></tr>`;
  }
  handledTicketsTableBody.innerHTML = handledTicketsTrs;
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("handle-btn")) {
    let ticketID = event.target.getAttribute("data-product-id");
    handleTicket(ticketID);
  } else if (event.target.classList.contains("ignore-btn")) {
    let ticketID = event.target.getAttribute("data-product-id");
    ignoreTicket(ticketID);
  }
});

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

function displayTickets() {
  displayPendingTickets();
  displayHandledTickets();
}

displayProducts();
displayPendingProducts();
displayTickets();
