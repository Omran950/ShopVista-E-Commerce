document.addEventListener("DOMContentLoaded", function () {
  updateNav();
});
function updateNav() {
  let navUl = document.getElementById("navUl");

  if (!localStorage.getItem("currentUser")) {
    navUl.innerHTML = `
        <li class="nav-item  mx-1 ">
          <a class="nav-link" aria-current="page" href="../index.html">Home</a>
        </li>
        <li class="nav-item  mx-1 ">
          <a class="nav-link active" href="about.html">About</a>
        </li>
        <li class="nav-item  mx-1 ">
          <a class="nav-link" href="../Contact/contact.html">Contact</a>
        </li>
        <li class="nav-item  mx-1 ">
          <a class="nav-link" href="../Authentication/login.html">Login</a>
        </li>
        <li class="nav-item  mx-1 ">
          <a class="nav-link" href="../Authentication/register.html">Register</a>
        </li>`;
  } else {
    navUl.innerHTML = `
        <li class="nav-item mx-1 ">
          <a class="nav-link" aria-current="page" href="../index.html">Home</a>
        </li>
        <li class="nav-item  mx-1 isUserCheck">
          <a class="nav-link" aria-current="page" href="../Shop/shop.html">Shop</a>
        </li>
        <li class="nav-item mx-1 ">
          <a class="nav-link active" href="about.html">About</a>
        </li>
        <li class="nav-item mx-1 ">
          <a class="nav-link" href="../Contact/contact.html">Contact</a>
        </li>
        <li class="nav-item  mx-1 isUserCheck">
          <button class="nav-link m-auto" onclick="logout()"><i class="fa-solid fa-arrow-right-to-bracket"></i>
  </button>
        </li>`;
  }
}

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
