// Check if user is already Login
if (!localStorage.getItem("currentUser")) {
  window.location.replace("../index.html");
}

let allProducts = [];
if (localStorage.getItem("allProducts")) {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
}

let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let allUsers = JSON.parse(localStorage.getItem("allUsers"));
let currentUserIndex = localStorage.getItem("currentUserIndex");
currentUserIndex = parseInt(currentUserIndex, 10);
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

    if (oldUserPassword.value) {
      if (currentUser.password == oldUserPassword.value) {
        if (!newUserPassword.value) {
          return Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Please enter the new password",
            showConfirmButton: false,
            timer: 2000,
          });
        }
        if (!newPasswordValidation()) {
          return Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Please validate your new password",
            showConfirmButton: false,
            timer: 2000,
          });
        }
        if (currentUser.password == newUserPassword.value) {
          return Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Old password can't be equal to new password",
            showConfirmButton: false,
            timer: 2000,
          });
        }
        currentUser.password = newUserPassword.value;
        let updatedUserData = JSON.stringify(currentUser);

        localStorage.setItem("currentUser", updatedUserData);
      } else {
        console.log(currentUser.password);
        return Swal.fire({
          position: "top-center",
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

    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your Data has been updated!",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    Swal.fire({
      position: "top-center",
      icon: "error",
      title: "Please enter all data in a validated format",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

function deleteAccount() {
  if (oldUserPasswordDeleteAccount.value === currentUser.password) {
    let allUsers = JSON.parse(localStorage.getItem("allUsers"));
    clearAllButton();
    allUsers.splice(currentUserIndex, 1);
    allUsers = JSON.stringify(allUsers);
    localStorage.setItem("allUsers", allUsers);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserIndex");
    setTimeout(function () {
      window.location.replace("../../index.html");
    }, 1000);
    return Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your account has been deleted!",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    return Swal.fire({
      position: "top-center",
      icon: "error",
      title: "Old password is incorrect",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

function clearAllButton() {
  console.log("start");
  for (let i = 0; i < currentUser.cart.length; i++) {
    for (let j = 0; j < allProducts.length; j++) {
      if (currentUser.cart[i].productID == allProducts[j].productID) {
        allProducts[j].stock += currentUser.cart[i].count;
        localStorage.setItem("allProducts", JSON.stringify(allProducts));
      }
    }
  }
  console.log("cart empty");
  currentUser.cart = [];
  currentUser.totalCartPrice = 0;
  allUsers[currentUserIndex].totalCartPrice = 0;
  allUsers[currentUserIndex].cart = [];
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
}
