if (!localStorage.getItem("currentUser")) {
  window.location.replace("../index.html");
}
let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
let currentUserIndex =
  JSON.parse(localStorage.getItem("currentUserIndex")) || 0;
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

if (currentUser.role === "customer") {
  window.location.replace("../index.html");
}
let cart = document.getElementById("cart");
let tbody = document.getElementById("tbody");
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
let existingProduct = null;
let tableBody = document.getElementById("productsTableBody");

function getSoldProducts() {
  cart.innerHTML = currentUser.cart.length;
  let product = ``;
  for (let i = 0; i < allUsers.length; i++) {
    for (let j = 0; j < allUsers[i].orders.length; j++) {
      for (let k = 0; k < allUsers[i].orders[j].cart.length; k++) {
        if (allUsers[i].orders[j].cart[k].sellerID == currentUser.email) {
          product += `<tr class="text-center fs-6">
                <td>${allUsers[i].orders[j].cart[k].productName}</td>
                <td><img src="${allUsers[i].orders[j].cart[k].productImage}" alt="${allUsers[i].orders[j].cart[k].productName}" class="table-img" style="width: 50px;"></td>
                <td>${allUsers[i].orders[j].cart[k].category}</td>
                <td>${allUsers[i].orders[j].cart[k].productPrice} EGP</td>
                <td>${allUsers[i].orders[j].cart[k].promotion}%</td>
                <td>${allUsers[i].orders[j].cart[k].count}</td>
                <td>${allUsers[i].name}</td>
                <td>${allUsers[i].email}</td>
                <td>${allUsers[i].orders[j].shippingDetails.phone}</td>
                <td>${allUsers[i].orders[j].shippingDetails.address}</td>
              </tr>`;
        }
      }
    }
  }
  if (product === ``) {
    product = `<tr><td colspan="10" rowspan="3" class="text-center py-5"><h2 class="fs-1 fw-bolder py-5">No products found</h2></td></tr>`;
  }
  tbody.innerHTML = product;
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

categorySelected.addEventListener("change", function () {
  let category = categorySelected.value;
});
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
  let detailsRegex = /^[a-zA-Z0-9_ ]{50,100}$/;
  return detailsRegex.test(productDetails.value);
}
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
  return Math.floor(Math.random() * 6);
}

document.addEventListener("DOMContentLoaded", function () {
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const dropdownButton = document.getElementById("dropdownMenuButton1");

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      dropdownButton.textContent = this.textContent;
    });
  });
});

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

function recalcTotalCartPrice(user) {
  user.totalCartPrice = user.cart.reduce((total, cartProduct) => {
    let priceAfterPromotion = cartProduct.featured
      ? cartProduct.productPrice
      : cartProduct.productPrice -
        cartProduct.productPrice * (cartProduct.promotion / 100);
    return total + cartProduct.count * priceAfterPromotion;
  }, 0);
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
    sellerID: currentUser.email,
    promotion: Number(promotion.value),
    featured: featured,
    productID: existingProduct || generateUUID(),
    pending: true,
  };
  if (
    productNameValidation() &&
    productPriceValidation() &&
    productImageValidation() &&
    productDetailsValidation() &&
    categoryValidation()
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

  allProducts = allProducts.filter(
    (product) => product.productID !== productID
  );
  localStorage.setItem("allProducts", JSON.stringify(allProducts));

  displayProducts();
}

function displayProducts() {
  cart.innerHTML = allUsers[currentUserIndex].cart.length;
  let trs = "";
  for (let i = 0; i < allProducts.length; i++) {
    let state = "";
    if (allProducts[i].pending == true) {
      state = "Pending";
    } else {
      state = "Approved";
    }
    if (allProducts[i].sellerID === currentUser.email) {
      trs += `
                <tr class="text-center">
                    <td>${allProducts[i].productName}</td>
                    <td>${allProducts[i].productPrice}</td>
                    <td><img src="${allProducts[i].productImage}" alt="${allProducts[i].productName}" style="max-width: 100px; max-height: 100px;"></td>
                    <td>${allProducts[i].productDetails}</td>
                    <td>${allProducts[i].category}</td>
                    <td>${allProducts[i].stock}</td>
                    <td>${allProducts[i].promotion}%</td>
                    <td>${state}</td>
                    <td class="text-center">
                        <button type="button" class="btn  update-btn" data-product-id="${allProducts[i].productID}">Update</button></td>
                    <td class="text-center">
                        <button type="button" class="btn  delete-btn" data-product-id="${allProducts[i].productID}">Delete</button></td>
            </tr>
            `;
    }
  }
  if (trs === ``) {
    trs = `<tr>
            <td colspan="10" rowspan="3" class="text-center py-5">
              <h2 class="fs-1 fw-bolder py-5">No products found</h2>
            </td>
          </tr>`;
  }
  tableBody.innerHTML = trs;
}

displayProducts();
