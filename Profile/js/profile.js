let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
let currentUserIndex =
  JSON.parse(localStorage.getItem("currentUserIndex")) || 0;
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

if (currentUser.role == "admin") {
  window.location.replace("../Admin/admin.html");
}

if (currentUser.role === "seller") {
  let sellerDashboard = document.getElementById("sellerDashboard");
  sellerDashboard.innerHTML = `<a class="nav-link" aria-current="page" href="../Seller/seller.html">Dashboard</a>
    `;
}

let currentUserEmail = document.getElementById("sign-email");
let currentUserName = document.getElementById("sign-name");
let currentUserAddress = document.getElementById("sign-address");
let oldUserPassword = document.getElementById("old-password");
let newUserPassword = document.getElementById("new-password");
let oldPasswordIcon = document.getElementById("toggle-password");
let newPasswordIcon = document.getElementById("toggle-rePassword");
let nameAlert = document.getElementById("name-alert");
let addressAlert = document.getElementById("address-alert");
let oldPasswordAlert = document.getElementById("old-password-alert");
let newPasswordAlert = document.getElementById("new-password-alert");
let oldUserPasswordDeleteAccount = document.getElementById(
  "old-password-delete-account"
);
let cart = document.getElementById("cart");
cart.innerHTML = currentUser.cart.length;

// Show Password
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
oldPasswordIcon.addEventListener("click", function (e) {
  eye(oldUserPassword, e.target);
});
newPasswordIcon.addEventListener("click", function (e) {
  eye(newUserPassword, e.target);
});

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

// Regex
function nameValidation() {
  let nameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  return nameRegex.test(currentUserName.value);
}
function addressValidation() {
  let addressRegex = /^[a-zA-Z\u0080-\u024F0-9\s\/\-\']{6,20}$/;
  return addressRegex.test(currentUserAddress.value);
}
function oldPasswordValidation() {
  let passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z!@#$%^&*\d]{8,}$/;
  return passwordRegex.test(oldUserPassword.value);
}
function newPasswordValidation() {
  let passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z!@#$%^&*\d]{8,}$/;
  return passwordRegex.test(newUserPassword.value);
}

// Alerts
function addNameAlert() {
  currentUserName.classList.add("is-invalid");
  currentUserName.classList.remove("is-valid");
  nameAlert.classList.remove("d-none");
}
function removeNameAlert() {
  currentUserName.classList.remove("is-invalid");
  currentUserName.classList.add("is-valid");
  nameAlert.classList.add("d-none");
}
function addAddressAlert() {
  currentUserAddress.classList.add("is-invalid");
  currentUserAddress.classList.remove("is-valid");
  addressAlert.classList.remove("d-none");
}
function removeAddressAlert() {
  currentUserAddress.classList.remove("is-invalid");
  currentUserAddress.classList.add("is-valid");
  addressAlert.classList.add("d-none");
}
function addOldPasswordAlert() {
  oldUserPassword.classList.add("is-invalid");
  oldUserPassword.classList.remove("is-valid");
  oldPasswordAlert.classList.remove("d-none");
}
function removeOldPasswordAlert() {
  oldUserPassword.classList.remove("is-invalid");
  oldUserPassword.classList.add("is-valid");
  oldPasswordAlert.classList.add("d-none");
}
function addNewPasswordAlert() {
  newUserPassword.classList.add("is-invalid");
  newUserPassword.classList.remove("is-valid");
  newPasswordAlert.classList.remove("d-none");
}
function removeNewPasswordAlert() {
  newUserPassword.classList.remove("is-invalid");
  newUserPassword.classList.add("is-valid");
  newPasswordAlert.classList.add("d-none");
}

//INputs keyUp event
currentUserName.addEventListener("keyup", function () {
  if (nameValidation()) {
    removeNameAlert();
  } else {
    addNameAlert();
  }
});

currentUserAddress.addEventListener("keyup", function () {
  if (addressValidation()) {
    removeAddressAlert();
  } else {
    addAddressAlert();
  }
});

oldUserPassword.addEventListener("keyup", function () {
  if (oldPasswordValidation()) {
    removeOldPasswordAlert();
  } else {
    addOldPasswordAlert();
  }
});
newUserPassword.addEventListener("keyup", function () {
  if (newPasswordValidation()) {
    removeNewPasswordAlert();
  } else {
    addNewPasswordAlert();
  }
});

currentUserEmail.value = currentUser.email;
currentUserName.value = currentUser.name;
currentUserAddress.value = currentUser.address;

function updateUser() {
  if (nameValidation() && addressValidation()) {
    currentUser.name = currentUserName.value;
    currentUser.address = currentUserAddress.value;
    currentUserName.classList.remove("is-valid");
    currentUserAddress.classList.remove("is-valid");

    if (oldUserPassword.value) {
      if (currentUser.password == oldUserPassword.value) {
        if (!newUserPassword.value) {
          return Swal.fire({
            position: "center",
            icon: "error",
            title: "Please enter the new password",
            showConfirmButton: false,
            timer: 2000,
          });
        }
        if (!newPasswordValidation()) {
          return Swal.fire({
            position: "center",
            icon: "error",
            title: "Please validate your new password",
            showConfirmButton: false,
            timer: 2000,
          });
        }
        if (currentUser.password == newUserPassword.value) {
          return Swal.fire({
            position: "center",
            icon: "error",
            title: "Old password can't be equal to new password",
            showConfirmButton: false,
            timer: 2000,
          });
        }
        currentUser.password = newUserPassword.value;
        let updatedUserData = JSON.stringify(currentUser);
        oldUserPassword.classList.remove("is-valid");
        newUserPassword.classList.remove("is-valid");
        oldUserPassword.value = "";
        newUserPassword.value = "";
        localStorage.setItem("currentUser", updatedUserData);
      } else {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "The old password is incorrect",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }

    allUsers[currentUserIndex] = currentUser;
    let updatedCurrentUserData = JSON.stringify(currentUser);
    let updatedAllUsersData = JSON.stringify(allUsers);
    localStorage.setItem("allUsers", updatedAllUsersData);
    localStorage.setItem("currentUser", updatedCurrentUserData);

    if (allUsers[currentUserIndex].role == "seller") {
      for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].sellerID == allUsers[currentUserIndex].email) {
          allProducts[i].seller = allUsers[currentUserIndex].name;
        }
      }
      for (let i = 0; i < allUsers.length; i++) {
        for (let j = 0; j < allUsers[i].cart.length; j++) {
          if (
            allUsers[i].cart[j].sellerID == allUsers[currentUserIndex].email
          ) {
            allUsers[i].cart[j].seller = allUsers[currentUserIndex].name;
          }
        }
      }
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      localStorage.setItem("allProducts", JSON.stringify(allProducts));
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Data has been updated!",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please enter all data in a validated format",
      showConfirmButton: false,
      timer: 2000,
    });
  }
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

function deleteAccount() {
  if (oldUserPasswordDeleteAccount.value === currentUser.password) {
    if (allUsers[currentUserIndex].role == "seller") {
      for (let i = allProducts.length - 1; i >= 0; i--) {
        if (allUsers[currentUserIndex].email == allProducts[i].sellerID) {
          allProducts[i].active = false;
        }
      }

      // Remove Product from all users cart only if it exists
      for (let x = 0; x < allUsers.length; x++) {
        for (let i = allUsers[x].cart.length - 1; i >= 0; i--) {
          if (
            allUsers[x].cart[i].sellerID == allUsers[currentUserIndex].email
          ) {
            allUsers[x].cart.splice(i, 1);
          }
        }
        recalcTotalCartPrice(allUsers[x]);
      }
    }

    allUsers[currentUserIndex].active = false;
    allUsers[currentUserIndex].cart = [];

    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserIndex");
    setTimeout(function () {
      window.location.replace("../index.html");
    }, 1000);
    return Swal.fire({
      position: "center",
      icon: "success",
      title: "Your account has been Deactivated!",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    return Swal.fire({
      position: "center",
      icon: "error",
      title: "Password is incorrect",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
