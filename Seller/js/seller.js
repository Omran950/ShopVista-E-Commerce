let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
let currentUserIndex =
  JSON.parse(localStorage.getItem("currentUserIndex")) || 0;
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

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
let productStockAlert = document.getElementById("stock-alert");
let productCategoryAlert = document.getElementById("category-alert");
let priceAlert = document.getElementById("price-alert");
let imageAlert = document.getElementById("image-alert");
let promotionAlert = document.getElementById("promotion-alert");
let detailsAlert = document.getElementById("details-alert");
let existingProduct = null;
let tableBody = document.getElementById("productsTableBody");

function getSoldProducts() {
  cart.innerHTML = currentUser.cart.length;
  let no = 1;
  let product = ``;
  for (let i = 0; i < allUsers.length; i++) {
    for (let j = 0; j < allUsers[i].orders.length; j++) {
      for (let k = 0; k < allUsers[i].orders[j].cart.length; k++) {
        if (allUsers[i].orders[j].cart[k].sellerID == currentUser.email) {
          product += `<tr class="text-center fs-6">
                <td>${no}</td>
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
          no++;
        }
      }
    }
  }
  if (product === ``) {
    product = `<tr><td colspan="11" rowspan="3" class="text-center py-5"><h2 class="fs-1 fw-bolder py-5">No products found</h2></td></tr>`;
  }
  tbody.innerHTML = product;
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

categorySelected.addEventListener("change", function () {
  if (categoryValidation()) {
    removeCategoryAlert();
  } else {
    addCategoryAlert();
  }
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

stock.addEventListener("keyup", function () {
  if (stockValidation()) {
    removeStockAlert();
  } else {
    addStockAlert();
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
  let productNameRegex = /^[a-zA-Z0-9_-][a-zA-Z0-9_ -]{1,18}[a-zA-Z0-9_ -]$/;
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
  let catRegex = /\b(sports|electronics|fashion|grocery)\b/;
  return catRegex.test(categorySelected.value);
}
function stockValidation() {
  let stockRegex = /^[1-9]\d*(\.\d{1,2})?$|^0\.\d{1,2}$/;
  return stockRegex.test(stock.value);
}
function promotionValidation() {
  let promotionRegex = /^(100|[1-9]?[0-9])$/;
  return promotionRegex.test(promotion.value);
}
function productDetailsValidation() {
  let detailsRegex = /^(?!\s).{20,100}$/;
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
function addProductCategoryAlert() {
  categorySelected.classList.add("is-invalid");
  categorySelected.classList.remove("is-valid");
  categorySelectedAlert.classList.remove("d-none");
}
function removeProductCategoryAlert() {
  categorySelected.classList.remove("is-invalid");
  categorySelected.classList.add("is-valid");
  categorySelectedAlert.classList.add("d-none");
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
  productCategoryAlert.classList.add("d-none");
}
function removeCategoryAlert() {
  categorySelected.classList.remove("is-invalid");
  categorySelected.classList.add("is-valid");
  productCategoryAlert.classList.add("d-none");
}
function addStockAlert() {
  stock.classList.add("is-invalid");
  stock.classList.remove("is-valid");
  productStockAlert.classList.add("d-none");
}
function removeStockAlert() {
  stock.classList.remove("is-invalid");
  stock.classList.add("is-valid");
  productStockAlert.classList.add("d-none");
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
    active: true,
  };
  if (
    productNameValidation() &&
    productPriceValidation() &&
    productImageValidation() &&
    productDetailsValidation() &&
    categoryValidation() &&
    stockValidation()
  ) {
    productName.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
    productImage.classList.remove("is-valid");
    productDetails.classList.remove("is-valid");
    categorySelected.classList.remove("is-valid");
    categorySelected.classList.remove("is-invalid");
    stock.classList.remove("is-valid");
    promotion.classList.remove("is-valid");
    if (existingProduct) {
      let index = allProducts.findIndex((p) => p.productID === existingProduct);
      product.rating = allProducts[index].rating;
      allProducts[index] = product;
      for (let x = 0; x < allUsers.length; x++) {
        for (let i = allUsers[x].cart.length - 1; i >= 0; i--) {
          if (allUsers[x].cart[i].productID == allProducts[index].productID) {
            allUsers[x].cart.splice(i, 1);
          }
        }
        recalcTotalCartPrice(allUsers[x]);
      }
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
  } else if (!categoryValidation()) {
    addCategoryAlert();
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please fill all the fields",
      showConfirmButton: false,
      timer: 1000,
    });
  } else if (!stockValidation()) {
    addStockAlert();
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
  }
});

function updateRow(productID) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  existingProduct = allProducts.find((p) => p.productID === productID);
  if (existingProduct) {
    productName.value = existingProduct.productName;
    productPrice.value = existingProduct.productPrice;
    productImage.value = existingProduct.productImage;
    productDetails.value = existingProduct.productDetails;
    categorySelected.value = existingProduct.category;
    stock.value = existingProduct.stock;
    promotion.value = existingProduct.promotion;
    existingProduct = productID;
  }
}

function deleteRow(productID) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn  btn-danger",
      cancelButton: "btn btn-success",
    },
    buttonsStyling: true,
  });
  swalWithBootstrapButtons
    .fire({
      text: "Are you sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove Product",
      cancelButtonText: "cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        allUsers.forEach((user) => {
          let productIndex = user.cart.findIndex(
            (cartProduct) => cartProduct.productID === productID
          );

          if (productIndex !== -1) {
            user.cart.splice(productIndex, 1);
            recalcTotalCartPrice(user);
          }
        });

        localStorage.setItem("allUsers", JSON.stringify(allUsers));

        allProducts = allProducts.filter(
          (product) => product.productID !== productID
        );
        localStorage.setItem("allProducts", JSON.stringify(allProducts));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product has been removed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        displayProducts();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          icon: "error",
        });
      }
    });
}

function displayProducts() {
  cart.innerHTML = allUsers[currentUserIndex].cart.length;
  let trs = "";
  let no = 1;
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
                    <td>${no}</td>
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
      no++;
    }
  }
  if (trs === ``) {
    trs = `<tr>
            <td colspan="11" rowspan="3" class="text-center py-5">
              <h2 class="fs-1 fw-bolder py-5">No products found</h2>
            </td>
          </tr>`;
  }
  tableBody.innerHTML = trs;
}

// Sales analytics

let soldProductsNames = [];
let soldProductsQuantity = [];
let myChart;

function getSalesAnalytics() {
  soldProductsNames = [];
  soldProductsQuantity = [];
  let productsSold = [];
  let productSoldCounts = {};

  // Collect products sold by the current user
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].sellerID == allUsers[currentUserIndex].email) {
      productsSold.push(allProducts[i]);
      productSoldCounts[allProducts[i].productID] = 0;
    }
  }
  // Track product sales
  for (let j = 0; j < allUsers.length; j++) {
    for (let k = 0; k < allUsers[j].orders.length; k++) {
      for (let x = 0; x < allUsers[j].orders[k].cart.length; x++) {
        if (
          allUsers[j].orders[k].cart[x].sellerID ==
          allUsers[currentUserIndex].email
        ) {
          let myProductIndex = productsSold.findIndex(
            (product) =>
              product.productID == allUsers[j].orders[k].cart[x].productID
          );
          if (myProductIndex === -1) {
            productsSold.push(allUsers[j].orders[k].cart[x]);
            productSoldCounts[allUsers[j].orders[k].cart[x].productID] = 0;
          }
          productSoldCounts[allUsers[j].orders[k].cart[x].productID] +=
            allUsers[j].orders[k].cart[x].count;
        }
      }
    }
  }
  // Extract product names and sold quantities
  productsSold.forEach((product) => {
    soldProductsNames.push(product.productName);
    soldProductsQuantity.push(productSoldCounts[product.productID] || 0);
  });

  // Update the chart
  if (myChart) {
    myChart.destroy();
  }

  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: soldProductsNames,
      datasets: [
        {
          label: "Quantity sold for the product",
          data: soldProductsQuantity,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

displayProducts();
