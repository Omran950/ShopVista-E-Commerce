// Select elements
let signName = document.getElementById("sign-name");
let signEmail = document.getElementById("sign-email");
let signAddress = document.getElementById("sign-address");
let signPassword = document.getElementById("sign-password");
let signRePassword = document.getElementById("re-password");
let signRole = document.getElementById("sign-role");
let signupBtn = document.getElementById("signup-btn");
let nameAlert = document.getElementById("name-alert");
let emailAlert = document.getElementById("email-alert");
let addressAlert = document.getElementById("address-alert");
let passwordAlert = document.getElementById("password-alert");
let rePasswordAlert = document.getElementById("repassword-alert");
let passwordIcon = document.getElementById("toggle-password");
let rePasswordIcon = document.getElementById("toggle-rePassword");
let allUsers = [];

// Create Array to save data of all users and get users info from local storage
if (JSON.parse(localStorage.getItem("allUsers")) != null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}

// Validation for inputs
function nameValidation() {
  let nameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  return nameRegex.test(signName.value);
}
function emailValidation() {
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(signEmail.value);
}
function addressValidation() {
  let addressRegex = /^(?!\s).{6,20}$/;
  return addressRegex.test(signAddress.value);
}
function passwordValidation() {
  let passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z!@#$%^&*\d]{8,}$/;
  return passwordRegex.test(signPassword.value);
}

function rePasswordValidation() {
  return signRePassword.value === signPassword.value;
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
function addPasswordAlert() {
  signPassword.classList.add("is-invalid");
  signPassword.classList.remove("is-valid");
  passwordAlert.classList.remove("d-none");
}
function removePasswordAlert() {
  signPassword.classList.remove("is-invalid");
  signPassword.classList.add("is-valid");
  passwordAlert.classList.add("d-none");
}
function addRePasswordAlert() {
  signRePassword.classList.add("is-invalid");
  signRePassword.classList.remove("is-valid");
  rePasswordAlert.classList.remove("d-none");
}
function removeRePasswordAlert() {
  signRePassword.classList.remove("is-invalid");
  signRePassword.classList.add("is-valid");
  rePasswordAlert.classList.add("d-none");
}

// Search for user email in local storage
function searchUserEmail() {
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email == signEmail.value) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Oops...",
          text: "Email already exists",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Go to login page",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            window.location.replace("login.html");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              icon: "error",
            });
          }
        });
      addEmailAlert();
      return false;
    }
  }
  return true;
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

signPassword.addEventListener("keyup", function () {
  if (passwordValidation()) {
    removePasswordAlert();
  } else {
    addPasswordAlert();
  }
});
signRePassword.addEventListener("keyup", function () {
  if (rePasswordValidation()) {
    removeRePasswordAlert();
  } else {
    addRePasswordAlert();
  }
});

// Clear Function
function clearInputs() {
  signName.value = "";
  signEmail.value = "";
  signAddress.value = "";
  signPassword.value = "";
  signRePassword.value = "";
}

// Add User Function
signupBtn.addEventListener("click", function () {
  let user = {
    name: signName.value,
    email: signEmail.value,
    address: signAddress.value,
    password: signPassword.value,
    role: signRole.value,
    isLogin: false,
    cart: [],
    orders: [],
    totalCartPrice: 0,
    active: true,
  };
  if (
    nameValidation() &&
    passwordValidation() &&
    emailValidation() &&
    addressValidation() &&
    rePasswordValidation()
  ) {
    if (searchUserEmail()) {
      swal("", "SignUp Successfully", "success");
      allUsers.push(user);
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      clearInputs();
      setTimeout(() => {
        window.location.replace("login.html");
      }, 1000);
      signName.classList.remove("is-valid");
      signEmail.classList.remove("is-valid");
      signAddress.classList.remove("is-valid");
      signPassword.classList.remove("is-valid");
      signRePassword.classList.remove("is-valid");
      nameAlert.classList.add("d-none");
      emailAlert.classList.add("d-none");
      addressAlert.classList.add("d-none");
      passwordAlert.classList.add("d-none");
      rePasswordAlert.classList.add("d-none");
    }
  } else if (!nameValidation()) {
    addNameAlert();
  } else if (!emailValidation()) {
    addEmailAlert();
  } else if (!addressValidation()) {
    addAddressAlert();
  } else if (!passwordValidation()) {
    addPasswordAlert();
  } else {
    addRePasswordAlert();
  }
});

// Toggle Password and repassword
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
passwordIcon.addEventListener("click", function (e) {
  eye(signPassword, e.target);
});
rePasswordIcon.addEventListener("click", function (e) {
  eye(signRePassword, e.target);
});
