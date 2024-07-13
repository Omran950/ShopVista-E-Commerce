// Get data from local storage and copy it in an array
let allUsers = [];
let allProducts = [];
let currentUser = [];
let currentUserIndex = 0;
if (localStorage.getItem("currentUserIndex")) {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  currentUserIndex = JSON.parse(localStorage.getItem("currentUserIndex"));
}
if (JSON.parse(localStorage.getItem("allUsers")) != null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
} else {
  allUsers = [];
}
if (JSON.parse(localStorage.getItem("allProducts")) != null) {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
} else {
  allProducts = [];
}

// Select Elemnts
let loginEmail = document.getElementById("login-email");
let loginPassword = document.getElementById("login-password");
let loginBtn = document.getElementById("login-btn");
let passwordIcon = document.getElementById("toggle-password");

// Clear Function
function clearInputs() {
  loginEmail.value = "";
  loginPassword.value = "";
}

// Search for User email and password in local storage
function searchUserEmailLogin() {
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email == loginEmail.value) {
      currentUserIndex = i;
      return true;
    }
  }
  return false;
}

function searchUserPasswordLogin() {
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].password == loginPassword.value) {
      return true;
    }
  }
  return false;
}

// Login Button and store user info index in session storage
loginBtn.addEventListener("click", function () {
  if (localStorage.getItem("currentUser")) {
    if (currentUser.email != loginEmail.value) {
      allUsers[currentUserIndex].isLogin = false;
    }
  }
  if (searchUserEmailLogin() && searchUserPasswordLogin()) {
    clearInputs();
    allUsers[currentUserIndex].isLogin = true;
    if (!allUsers[currentUserIndex].active) {
      if (allUsers[currentUserIndex].role == "seller") {
        allProducts.forEach((product) => {
          if (product.sellerID == allUsers[currentUserIndex].email) {
            product.active = true;
          }
        });
        localStorage.setItem("allProducts", JSON.stringify(allProducts));
      }
      allUsers[currentUserIndex].active = true;
    }
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    localStorage.setItem(
      "currentUser",
      JSON.stringify(allUsers[currentUserIndex])
    );
    localStorage.setItem("currentUserIndex", JSON.stringify(currentUserIndex));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Welcome",
      showConfirmButton: false,
      timer: 1000,
    });
    if (allUsers[currentUserIndex].role == "customer") {
      setTimeout(() => {
        window.location.replace("../index.html");
      }, 1000);
    } else if (allUsers[currentUserIndex].role == "seller") {
      setTimeout(() => {
        window.location.replace("../Seller/seller.html");
      }, 1000);
    } else {
      setTimeout(() => {
        window.location.replace("../Admin/admin.html");
      }, 1000);
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Wrong Email or Password",
    });
  }
});

// Toggle Password
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
  eye(loginPassword, e.target);
});
