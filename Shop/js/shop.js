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
  let currentUser = "";
  let allUsers = [];
  let modalHeader = document.getElementById("staticBackdropLabel");
  let modalBody = document.getElementById("modalBody");
  let modalFooter = document.getElementById("modalFooter");
  let ourProductsHeader = document.getElementById("ourProductsHeader");
  let productsContainer = document.getElementById("productsContainer");
  let floatingInputGroup1 = document.getElementById("floatingInputGroup1");
  let e = document.getElementById("selectCriteria");

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
      window.location.replace("index.html");
    }, 1000);
  }

  function displayAllProducts() {
    let productTemp = "";
    let priceAfterPromotion = 0;
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].featured) {
        productTemp += `<div class="col-sm-6 col-md-4 col-lg-3">
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
                <button class="btn w-75 text-capitalize m-auto d-block my-3" onclick="addToCart(event, ${i})">
                      Add to cart
                    </button>
                </div>
              </div>`;
      } else {
        priceAfterPromotion =
          allProducts[i].productPrice -
          allProducts[i].productPrice * (allProducts[i].promotion / 100);
        productTemp += `<div class="col-sm-6 col-md-4 col-lg-3">
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
            <button class="btn  w-75 text-capitalize m-auto d-block my-3"  onclick="addToCart(event, ${i})">
                  Add to cart
                </button>
            </div>
          </div>`;
      }
    }
    productsContainer.innerHTML = productTemp;
  }

  function productDetails(i) {
    console.log(allProducts[i]);
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
    modalFooter.innerHTML = `<button class="btn w-50 text-capitalize m-auto d-block mt-3" onclick="addToCart(event, ${i})">Add to cart</button>;
  `;
  }

  // Set the height of the select tag to match the height of search bar
  let searchBarHeight = document.getElementById("searchBar").offsetHeight;
  let selectCriteriaHeight = document.getElementById("selectCriteria");
  selectCriteriaHeight.style.height = searchBarHeight + "px";

  function searchProducts() {
    let productTemp = "";
    let userInput = floatingInputGroup1.value;
    let userSearchCriteria = e.value;
    for (i = 0; i < allProducts.length; i++) {
      if (
        allProducts[i][userSearchCriteria]
          .toLowerCase()
          .includes(userInput.toLowerCase())
      ) {
        if (allProducts[i].featured) {
          productTemp += `<div class="col-sm-6 col-md-4 col-lg-3">
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
                <button class="btn w-75 text-capitalize m-auto d-block my-3" onclick="addToCart(event, ${i})">
                      Add to cart
                    </button>
                </div>
              </div>`;
        } else {
          priceAfterPromotion =
            allProducts[i].productPrice -
            allProducts[i].productPrice * (allProducts[i].promotion / 100);
          productTemp += `<div class="col-sm-6 col-md-4 col-lg-3">
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
            <button class="btn  w-75 text-capitalize m-auto d-block my-3"  onclick="addToCart(event, ${i})">
                  Add to cart
                </button>
            </div>
          </div>`;
        }
      }
    }

    if (productTemp == "") {
      ourProductsHeader.classList.add("d-none");
      productsContainer.innerHTML = `<div class="d-flex justify-content-center"><img src="../images/no-products.jpg" class="d-block m-auto" alt="noProductFound" id="noProductFound"></div>`;
    } else {
      ourProductsHeader.classList.remove("d-none");
      productsContainer.innerHTML = productTemp;
    }
  }

  function addToCart(event, i) {
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
      console.log(i);
      allUsers = JSON.parse(localStorage.getItem("allUsers"));
      currentUser = JSON.parse(localStorage.getItem("currentUser"));
      currentUserIndex = JSON.parse(localStorage.getItem("currentUserIndex"));
      console.log(allUsers[currentUserIndex].cart);
      allUsers[currentUserIndex].cart.push(allProducts[i]);
      currentUser = allUsers[currentUserIndex];
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }

  displayAllProducts();
}
