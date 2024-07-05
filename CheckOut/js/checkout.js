if (!localStorage.getItem("currentUser")) {
  location.replace("../../index.html");
}
let signName = document.getElementById("sign-name");
let signEmail = document.getElementById("sign-email");
let signAddress = document.getElementById("sign-address");
let phoneCheckout = document.getElementById("phone-checkout");
let notesShipping = document.getElementById("notes-shipping");
let visaNumber = document.getElementById("visa-number");
let visaExpDate = document.getElementById("visa-exp-date");
let visaCVC = document.getElementById("visa-cvc");
let visaNumberAlert = document.getElementById("visaNumber-alert");
let visaExpDateAlert = document.getElementById("visaDate-alert");
let visaCVCAlert = document.getElementById("visaCVC-alert");
let nameAlert = document.getElementById("name-alert");
let emailAlert = document.getElementById("email-alert");
let addressAlert = document.getElementById("address-alert");
let phoneAlert = document.getElementById("phone-checkout-alert");
let checkoutBtn = document.getElementById("checkout-btn");
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let allUsers = JSON.parse(localStorage.getItem("allUsers"));
let currentUserIndex = localStorage.getItem("currentUserIndex");
let orderDetails = {};
let cart = document.getElementById("cart");
cart.innerHTML = currentUser.cart.length;

// Validation for inputs
function nameValidation() {
  let nameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  return nameRegex.test(signName.value);
}
function emailValidation() {
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(signEmail.value);
}
function phoneValidation() {
  let mobileRegex = /^01[0125][0-9]{8}$/;
  return mobileRegex.test(phoneCheckout.value);
}
function addressValidation() {
  let addressRegex = /^[a-zA-Z\u0080-\u024F0-9\s\/\-\']{6,20}$/;
  return addressRegex.test(signAddress.value);
}

function visaNumberValidation() {
  let visNumberRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  return visNumberRegex.test(visaNumber.value);
}

function visaExpDateValidation() {
  let visaExpDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  return visaExpDateRegex.test(visaExpDate.value);
}

function visaCVCValidation() {
  let visaCVCRegex = /^\d{3}$/;
  return visaCVCRegex.test(visaCVC.value);
}

// Add and Remove Alerts Functions to use in validation events
function addNameAlert() {
  signName.classList.add("is-invalid");
  signName.classList.remove("is-valid");
  nameAlert.classList.remove("d-none");
}
function removeNameAlert() {
  signName.classList.remove("is-invalid");
  signName.classList.add("is-valid");
  nameAlert.classList.add("d-none");
}
function addEmailAlert() {
  signEmail.classList.add("is-invalid");
  signEmail.classList.remove("is-valid");
  emailAlert.classList.remove("d-none");
}
function removeEmailAlert() {
  signEmail.classList.remove("is-invalid");
  signEmail.classList.add("is-valid");
  emailAlert.classList.add("d-none");
}
function addAddressAlert() {
  signAddress.classList.add("is-invalid");
  signAddress.classList.remove("is-valid");
  addressAlert.classList.remove("d-none");
}
function removeAddressAlert() {
  signAddress.classList.remove("is-invalid");
  signAddress.classList.add("is-valid");
  addressAlert.classList.add("d-none");
}
function addPhoneAlert() {
  phoneCheckout.classList.add("is-invalid");
  phoneCheckout.classList.remove("is-valid");
  phoneAlert.classList.remove("d-none");
}
function removePhoneAlert() {
  phoneCheckout.classList.remove("is-invalid");
  phoneCheckout.classList.add("is-valid");
  phoneAlert.classList.add("d-none");
}
function addVisaNumberAlert() {
  visaNumber.classList.add("is-invalid");
  visaNumber.classList.remove("is-valid");
  visaNumberAlert.classList.remove("d-none");
}
function removeVisaNumberAlert() {
  visaNumber.classList.remove("is-invalid");
  visaNumber.classList.add("is-valid");
  visaNumberAlert.classList.add("d-none");
}
function addVisaExpDateAlert() {
  visaExpDate.classList.add("is-invalid");
  visaExpDate.classList.remove("is-valid");
  visaExpDateAlert.classList.remove("d-none");
}
function removeVisaExpDateAlert() {
  visaExpDate.classList.remove("is-invalid");
  visaExpDate.classList.add("is-valid");
  visaExpDateAlert.classList.add("d-none");
}
function addVisaCVCAlert() {
  visaCVC.classList.add("is-invalid");
  visaCVC.classList.remove("is-valid");
  visaCVCAlert.classList.remove("d-none");
}
function removeVisaCVCAlert() {
  visaCVC.classList.remove("is-invalid");
  visaCVC.classList.add("is-valid");
  visaCVCAlert.classList.add("d-none");
}
function enableCheckoutBtn() {
  checkoutBtn.disabled = false;
}
function disableCheckoutBtn() {
  checkoutBtn.disabled = true;
}

// Add Events to inputs
signName.addEventListener("keyup", function () {
  if (nameValidation()) {
    removeNameAlert();
  } else {
    addNameAlert();
  }
});

signEmail.addEventListener("keyup", function () {
  if (emailValidation()) {
    removeEmailAlert();
  } else {
    addEmailAlert();
  }
});

signAddress.addEventListener("keyup", function () {
  if (addressValidation()) {
    removeAddressAlert();
  } else {
    addAddressAlert();
  }
});

phoneCheckout.addEventListener("keyup", function () {
  if (phoneValidation()) {
    removePhoneAlert();
  } else {
    addPhoneAlert();
  }
});

visaNumber.addEventListener("keyup", function () {
  if (visaNumberValidation()) {
    removeVisaNumberAlert();
  } else {
    addVisaNumberAlert();
  }
});

visaExpDate.addEventListener("keyup", function () {
  if (visaExpDateValidation()) {
    removeVisaExpDateAlert();
  } else {
    addVisaExpDateAlert();
  }
});

visaCVC.addEventListener("keyup", function () {
  if (visaCVCValidation()) {
    removeVisaCVCAlert();
  } else {
    addVisaCVCAlert();
  }
});

checkoutBtn.addEventListener("click", function () {
  if (
    nameValidation() &&
    emailValidation() &&
    addressValidation() &&
    phoneValidation() &&
    visaNumberValidation() &&
    visaExpDateValidation() &&
    visaCVCValidation()
  ) {
    if (currentUser.cart.length == 0) {
      return Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Your cart is empty",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Purchase is complete",
      showConfirmButton: false,
      timer: 1000,
    });
    let userOrder = {};
    let totalCartPrice = parseInt(currentUser.totalCartPrice, 10);

    let shippingDetails = {
      phone: phoneCheckout.value,
      address: signAddress.value,
      notes: notesShipping.value,
      totalCartPrice: totalCartPrice,
    };
    userOrder.shippingDetails = shippingDetails;
    userOrder.cart = currentUser.cart;

    currentUser.orders.push(userOrder);
    allUsers[currentUserIndex].orders.push(userOrder);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("allUsers", JSON.stringify(allUsers));

    currentUser.cart = [];
    currentUser.totalCartPrice = 0;
    allUsers[currentUserIndex].cart = [];
    allUsers[currentUserIndex].totalCartPrice = 0;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("allUsers", JSON.stringify(allUsers));

    setTimeout(function () {
      location.replace("../Shop/shop.html");
    }, 1000);
  } else {
    Swal.fire({
      position: "top-center",
      icon: "error",
      title: "Please validate your data",
      showConfirmButton: false,
      timer: 1000,
    });
  }
});

//Logout
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
