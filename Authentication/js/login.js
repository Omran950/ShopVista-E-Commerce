// Select Elemnts
let loginEmail = document.getElementById("login-email");
let loginPassword = document.getElementById("login-password");
let loginBtn = document.getElementById("login-btn");
let passwordIcon = document.getElementById("toggle-password");
let allUsers = [];

// Get data from local storage and copy it in an array
if (JSON.parse(localStorage.getItem("allUsers")) != null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
} else {
  allUsers = [];
}

// Make user info index of array global with initial value
let index = 0;

// Clear Function
function clearInputs() {
  loginEmail.value = "";
  loginPassword.value = "";
}

// Search for User email and password in local storage
function searchUserEmailLogin() {
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email == loginEmail.value) {
      index = i;
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
  if (searchUserEmailLogin() && searchUserPasswordLogin()) {
    clearInputs();
    allUsers[index].isLogin = true;
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    sessionStorage.setItem("currentUser", JSON.stringify(allUsers[index]));
    sessionStorage.setItem("currentUserIndex", JSON.stringify(index));
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Welcome",
      showConfirmButton: false,
      timer: 1000,
    });
    if (allUsers[index].role == "customer") {
      setTimeout(() => {
        window.location.replace("../home.html");
      }, 1000);
    } else if (allUsers[index].role == "seller") {
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
