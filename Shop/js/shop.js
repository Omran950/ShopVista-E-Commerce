if (!localStorage.getItem("currentUser")) {
  window.location.replace("../index.html");
} else {
  let allProducts;
  if (localStorage.getItem("allProducts")) {
    allProducts = JSON.parse(localStorage.getItem("allProducts"));
  } else {
    allProducts = [];
  }
  let currentUserIndex = 0;
  let currentUser = {};
  let allUsers = [];
  if (!localStorage.getItem("currentUser")) {
    allUsers = JSON.parse(localStorage.getItem("allUsers"));
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUserIndex = JSON.parse(localStorage.getItem("currentUserIndex"));
  }
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  currentUserIndex = JSON.parse(localStorage.getItem("currentUserIndex"));
  let modalHeader = document.getElementById("staticBackdropLabel");
  let modalBody = document.getElementById("modalBody");
  let modalFooter = document.getElementById("modalFooter");
  let ourProductsHeader = document.getElementById("ourProductsHeader");
  let productsContainer = document.getElementById("productsContainer");
  let floatingInputGroup1 = document.getElementById("floatingInputGroup1");
  let e = document.getElementById("selectCriteria");
  let cart = document.getElementById("cart");

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

  function productDetails(i) {
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
                      <img
                        src="../images/Lenovo (2).jpg"
                        alt="${allProducts[i].productName}"
                        class="w-100 d-block"
                      />
                    </figure>
                  </div>
                  <div class="col-md-7">
                    <div>
                      <p class="fw-bold my-2 py-2 fs-4">${allProducts[i].productDetails}</p>
                      <p class="my-2 py-2">
                        <span class="fw-bold">Category :</span> ${allProducts[i].category}
                      </p>
                      <p class="my-2 py-2">
                        <span class="fw-bold">Price :</span> ${allProducts[i].productPrice} EGP
                      </p>
                      ${newPrice}
                      <p class="my-2 py-2">
                        <span class="fw-bold">Stock :</span> ${allProducts[i].stock}
                      </p>
                      <p class="my-2 py-2">
                        <span class="fw-bold">Seller :</span> ${allProducts[i].seller}
                      </p>
                      <p class="my-2 py-2">
                        <span class="fw-bold">Rating :</span> ${allProducts[i].rating}
                        <i class="fa-solid fa-star"></i>
                      </p>
                    </div>
                  </div>`;

    modalFooter.innerHTML = `<button class="btn w-50 text-capitalize m-auto d-block mt-3" onclick="addToCart(event, ${i})">Add to cart</button>`;
  }
  function addToCart(event, i, cat, body) {
    let productCategory = cat;
    let productsBody = body;
    event.stopPropagation();
    if (!localStorage.getItem("currentUser")) {
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title: "Please LogIn First",
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => {
        window.location.replace("Authentication/login.html");
      }, 1000);
    } else {
      if (allProducts[i].stock >= 1) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product has been added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        allProducts[i].stock--;
        localStorage.setItem("allProducts", JSON.stringify(allProducts));
        allUsers = JSON.parse(localStorage.getItem("allUsers"));
        currentUser = JSON.parse(localStorage.getItem("currentUser"));
        currentUserIndex = JSON.parse(localStorage.getItem("currentUserIndex"));

        // Check product in cart
        let checkCartProducts = false;
        if (allUsers[currentUserIndex].cart.length == 0) {
          allUsers[currentUserIndex].cart.push(allProducts[i]);
          allUsers[currentUserIndex].cart[
            allUsers[currentUserIndex].cart.length - 1
          ].count = 1;
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

        if (allProducts[i].featured) {
          allUsers[currentUserIndex].totalCartPrice +=
            allProducts[i].productPrice;
        } else {
          let priceAfterPromotion =
            allProducts[i].productPrice -
            allProducts[i].productPrice * (allProducts[i].promotion / 100);
          allUsers[currentUserIndex].totalCartPrice += priceAfterPromotion;
          currentUser.totalCartPrice += priceAfterPromotion;
        }
        currentUser = allUsers[currentUserIndex];
        localStorage.setItem("allUsers", JSON.stringify(allUsers));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        searchByCategory(productCategory, productsBody);
      }
    }
    cart.innerHTML = currentUser.cart.length;
  }

  function searchByCategory(cat, body) {
    cart.innerHTML = currentUser.cart.length;
    let products = "";
    let productCategory = cat;
    let productsBody = body;
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].category == cat || cat == "all") {
        if (allProducts[i].stock > 0) {
          if (allProducts[i].featured) {
            products += `<div class="col-sm-6 col-md-4 col-lg-3">
            <div class="card rounded-3  overflow-hidden">
            <div class="" onclick="productDetails(${i})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <figure class="m-0 p-2">
                  <img
                    src="../images/Lenovo (2).jpg"
                    alt="${allProducts[i].productName}"
                    class="d-block w-75 m-auto"
                    style="height: 200px"
                  />
                </figure>
                <div class="text px-2 py-3">
                  <h6  class="text-center fw-bolder">${
                    allProducts[i].productName
                  }</h6>
                  <p class="">${allProducts[i].productDetails.substring(
                    0,
                    50
                  )}${
              allProducts[i].productDetails.length > 50 ? "..." : ""
            }</p>
                  <p class="text-center" id='price'>Price : ${
                    allProducts[i].productPrice
                  } EGP</p>
                </div>
              </div>
          <button class="btn w-75 text-capitalize m-auto d-block my-3" onclick="addToCart(event, ${i}, '${productCategory}', '${productsBody}')">Add to cart</button>
              </div>
            </div>`;
          } else {
            priceAfterPromotion =
              allProducts[i].productPrice -
              allProducts[i].productPrice * (allProducts[i].promotion / 100);
            products += `<div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card rounded-3 overflow-hidden">
    <div class="" onclick="productDetails(${i})" data-bs-toggle="modal"
    data-bs-target="#staticBackdrop">
            <figure class="m-0 p-2">
              <img
                src="../images/Lenovo (2).jpg"
                alt="${allProducts[i].productName}"
                class="d-block w-75 m-auto"
                style="height: 200px"
              />
            </figure>
            <div class="text px-2 py-3">
              <h6 class="text-center fw-bolder">${
                allProducts[i].productName
              }</h6>
              <p class="">${allProducts[i].productDetails.substring(0, 50)}${
              allProducts[i].productDetails.length > 50 ? "..." : ""
            }</p>
              <div class="d-flex justify-content-around">
              <p class="text-center" id="priceBefore">Price : <span class="text-decoration-line-through">${
                allProducts[i].productPrice
              } EGP</span></p>
              <p class="text-center" id="priceAfter">${priceAfterPromotion.toPrecision(
                4
              )} EGP</p>
              </div>
            </div>
          </div>
          <button class="btn w-75 text-capitalize m-auto d-block my-3" onclick="addToCart(event, ${i}, '${productCategory}', '${productsBody}')">Add to cart</button>
          </div>
        </div>`;
          }
        }
      }
    }
    if (products == "") {
      products += `<div class="d-flex justify-content-center"><img src="../images/no-products.jpg" class="d-block m-auto" alt="noProductFound" id="noProductFound"></div>`;
    }
    document.getElementById(body).innerHTML = products;
  }

  searchByCategory("all", "row-all-tab-pane");
}
