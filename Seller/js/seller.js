if (!localStorage.getItem("currentUser")) {
  window.location.replace("../index.html");
} else {
  let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
  let currentUserIndex =
    JSON.parse(localStorage.getItem("currentUserIndex")) || 0;
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

  if (currentUser.role === "customer") {
    window.location.replace("../index.html");
  } else {
    let cart = document.getElementById("cart");
    cart.innerHTML = currentUser.cart.length;

    let myProductsDiv = document.getElementById("myProductsDiv");
    let soldProductsDiv = document.getElementById("soldProductsDiv");
    let salesAnalyticsDiv = document.getElementById("salesAnalyticsDiv");

    function getSoldProducts() {
      cart.innerHTML = currentUser.cart.length;
      let product = ``;
      for (let i = 0; i < allUsers.length; i++) {
        for (let j = 0; j < allUsers[i].orders.length; j++) {
          for (let k = 0; k < allUsers[i].orders[j].cart.length; k++) {
            if (allUsers[i].orders[j].cart[k].sellerID == currentUser.email) {
              console.log(
                allUsers[i].orders[j].cart[k].productName,
                allUsers[i].orders[j].cart[k].sellerID,
                allUsers[i]
              );
              product += `<div class="col"><div class="p-2 my-2 rounded-3 shadow"></div></div>`;
            }
          }
        }
      }
      soldProductsDiv.innerHTML = `<img src="../images/no-products.jpg" alt="no-products" class="w-50 m-auto d-block" />`;
      soldProductsDiv.innerHTML = product;
    }

    function logout() {
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
  }
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

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

let allUsers = JSON.parse(localStorage.getItem("allUsers"));

let allProducts = [];
if (localStorage.getItem("allProducts")) {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
}
let productIdToEdit = null;

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
function promotionValidation() {
  let promotionRegex = /^(100|[1-9]?[0-9])$/;
  return promotionRegex.test(promotion.value);
}
function productDetailsValidation() {
  let detailsRegex = /^[a-zA-Z0-9_ ]{50,100}$/;
  return detailsRegex.test(productDetails.value);
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

addProduct.addEventListener("click", function () {
  if (promotion.value == 0 || promotion.value == "") {
    featured = true;
  } else {
    featured = false;
  }
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
    productID: productIdToEdit || generateUUID(),
  };
  if (
    productNameValidation() &&
    productPriceValidation() &&
    productImageValidation() &&
    productDetailsValidation()
  ) {
    if (productIdToEdit) {
      let index = allProducts.findIndex((p) => p.productID === productIdToEdit);
      allProducts[index] = product;
      swal("", "Product Updated", "success");
    } else {
      allProducts.push(product);
      swal("", "Product Added", "success");
    }
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
    clearInputs();
    productIdToEdit = null;
    displayProducts();
    setTimeout(() => {
      window.location.replace("seller.html");
    }, 1000);
  } else if (!productNameValidation()) {
    addProductNameAlert();
  } else if (!productPriceValidation()) {
    addProductPriceAlert();
  } else if (!productImageValidation()) {
    addProductImageAlert();
  } else if (!productDetailsValidation()) {
    addProductDetailsAlert();
  }
});

let tableBody = document.getElementById("productsTableBody");

function displayProducts() {
  trs = "";
  for (let i = 0; i < allProducts.length; i++) {
    trs += `
            <tr class="text-center">
                <td>${allProducts[i].productName}</td>
                <td>${allProducts[i].productPrice}</td>
                <td><img src="${allProducts[i].productImage}" alt="${allProducts[i].productName}" style="max-width: 100px; max-height: 100px;"></td>
                <td>${allProducts[i].productDetails}</td>
                <td>${allProducts[i].category}</td>
                <td>${allProducts[i].stock}</td>
                <td>${allProducts[i].promotion}%</td>
                <td class="text-center">
                    <button type="button" class="btn btn-sm update-btn" data-product-id="${allProducts[i].productID}">Update</button>
                     <td class="text-center">
 <button type="button" class="btn btn-sm delete-btn" data-product-id="${allProducts[i].productID}">Delete</button></td>
            </tr>
        `;
  }
  tableBody.innerHTML = trs;
}

displayProducts();

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("update-btn")) {
    let productID = event.target.getAttribute("data-product-id");
    updateRow(productID);
  } else if (event.target.classList.contains("delete-btn")) {
    let productID = event.target.getAttribute("data-product-id");
    deleteRow(productID);
  }
});

function updateRow(productID) {
  let productToUpdate = allProducts.find((p) => p.productID === productID);
  if (productToUpdate) {
    productName.value = productToUpdate.productName;
    productPrice.value = productToUpdate.productPrice;
    productImage.value = productToUpdate.productImage;
    productDetails.value = productToUpdate.productDetails;
    categorySelected.value = productToUpdate.category;
    stock.value = productToUpdate.stock;
    promotion.value = productToUpdate.promotion;
    productIdToEdit = productID;
  }
}

function deleteRow(productID) {
  let cartProductIndex = 0;
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].cart.length > 0) {
      for (let j = 0; j < allUsers[i].cart.length; j++) {
        if (allUsers[i].cart[j].productID == productID) {
          allIndex = j;
        }
      }
      if (allUsers[i].cart[cartProductIndex].featured) {
        allUsers[i].totalCartPrice -=
          allUsers[i].cart[cartProductIndex].count *
          allUsers[i].cart[cartProductIndex].productPrice;
      } else {
        let priceAfterPromotion =
          allProducts[i].cart[cartProductIndex].productPrice -
          allProducts[i].cart[cartProductIndex].productPrice *
            (allProducts[i].promotion / 100);

        allUsers[i].totalCartPrice -=
          allUsers[i].cart[cartProductIndex].count * priceAfterPromotion;
      }
      allUsers[i].cart.splice(cartProductIndex, 1);
    }
  }
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
  allProducts.splice(
    allProducts.findIndex((p) => p.productID === productID),
    1
  );
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
  displayProducts();
}

displayProducts();
