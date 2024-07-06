if (!localStorage.getItem("currentUser")) {
  window.location.replace("../index.html");
} else {
  let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
  let currentUserIndex =
    JSON.parse(localStorage.getItem("currentUserIndex")) || 0;
  let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

  if (currentUser.role === "customer") {
    window.location.replace("../index.html");
  } else {
    let cart = document.getElementById("cart");
    cart.innerHTML = currentUser.cart.length;
    function logout() {
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
  }
}
