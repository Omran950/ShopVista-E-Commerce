let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
let currentUserIndex =
  JSON.parse(localStorage.getItem("currentUserIndex")) || 0;
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

let ticketReasonSelected = document.getElementById("ticket-reason");
let ticketTitle = document.getElementById("ticket-title");
let ticketName = document.getElementById("ticket-name");
let ticketEmail = document.getElementById("ticket-email");
let ticketMobile = document.getElementById("ticket-mobile");
let ticketMessage = document.getElementById("ticket-message");
let submitTicket = document.getElementById("submit-ticket");
let titleAlert = document.getElementById("title-alert");
let nameAlert = document.getElementById("name-alert");
let emailAlert = document.getElementById("email-alert");
let mobileAlert = document.getElementById("mobile-alert");
let messageAlert = document.getElementById("message-alert");
let navUl = document.getElementById("navUl");
let allTickets = JSON.parse(localStorage.getItem("allTickets")) || [];

document.getElementById("contact-right").addEventListener("click", function () {
  document
    .getElementById("contact-form")
    .scrollIntoView({ behavior: "smooth" });
});

ticketReasonSelected.addEventListener("change", function () {
  let ticketReason = ticketReasonSelected.value;
});

// regex
function titleValidation() {
  let titleRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  return titleRegex.test(ticketTitle.value);
}
function nameValidation() {
  let nameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  return nameRegex.test(ticketName.value);
}
function emailValidation() {
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(ticketEmail.value);
}
function mobileValidation() {
  let mobileRegex = /^01[0125][0-9]{8}$/;
  return mobileRegex.test(ticketMobile.value);
}
function messageValidation() {
  let messageRegex = /^[a-zA-Z0-9 _-~!@#$%^&*()+=`{}|:";'<>?,.\/]{10,100}$/;
  return messageRegex.test(ticketMessage.value);
}
document.addEventListener("DOMContentLoaded", function () {
  updateNav();
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const dropdownButton = document.getElementById("dropdownMenuButton1");

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      dropdownButton.textContent = this.textContent;
    });
  });
});

// Event on inputs
ticketTitle.addEventListener("keyup", function () {
  if (titleValidation()) {
    removeTitleAlert();
  } else {
    addTitleAlert();
  }
});

ticketName.addEventListener("keyup", function () {
  if (nameValidation()) {
    removeNameAlert();
  } else {
    addNameAlert();
  }
});

ticketEmail.addEventListener("keyup", function () {
  if (emailValidation()) {
    removeEmailAlert();
  } else {
    addEmailAlert();
  }
});

ticketMobile.addEventListener("keyup", function () {
  if (mobileValidation()) {
    removeMobileAlert();
  } else {
    addMobileAlert();
  }
});

ticketMessage.addEventListener("keyup", function () {
  if (messageValidation()) {
    removeMessageAlert();
  } else {
    addMessageAlert();
  }
});

// add and remove Alerts
function addTitleAlert() {
  ticketTitle.classList.add("is-invalid");
  ticketTitle.classList.remove("is-valid");
  titleAlert.classList.remove("d-none");
}
function removeTitleAlert() {
  ticketTitle.classList.remove("is-invalid");
  ticketTitle.classList.add("is-valid");
  titleAlert.classList.add("d-none");
}
function addNameAlert() {
  ticketName.classList.add("is-invalid");
  ticketName.classList.remove("is-valid");
  nameAlert.classList.remove("d-none");
}
function removeNameAlert() {
  ticketName.classList.remove("is-invalid");
  ticketName.classList.add("is-valid");
  nameAlert.classList.add("d-none");
}
function addEmailAlert() {
  ticketEmail.classList.add("is-invalid");
  ticketEmail.classList.remove("is-valid");
  emailAlert.classList.remove("d-none");
}
function removeEmailAlert() {
  ticketEmail.classList.remove("is-invalid");
  ticketEmail.classList.add("is-valid");
  emailAlert.classList.add("d-none");
}
function addMobileAlert() {
  ticketMobile.classList.add("is-invalid");
  ticketMobile.classList.remove("is-valid");
  mobileAlert.classList.remove("d-none");
}
function removeMobileAlert() {
  ticketMobile.classList.remove("is-invalid");
  ticketMobile.classList.add("is-valid");
  mobileAlert.classList.add("d-none");
}
function addMessageAlert() {
  ticketMessage.classList.add("is-invalid");
  ticketMessage.classList.remove("is-valid");
  messageAlert.classList.remove("d-none");
}
function removeMessageAlert() {
  ticketMessage.classList.remove("is-invalid");
  ticketMessage.classList.add("is-valid");
  messageAlert.classList.add("d-none");
}

// Clear Function
function clearInputs() {
  ticketReasonSelected.value = "";
  ticketTitle.value = "";
  ticketName.value = "";
  ticketEmail.value = "";
  ticketMobile.value = "";
  ticketMessage.value = "";
}

function generateTicketID() {
  const timestamp = Date.now().toString(36);
  const randomNum = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomNum}`;
}
// Add Ticket Function
submitTicket.addEventListener("click", function () {
  let ticket = {
    reason: ticketReasonSelected.value,
    title: ticketTitle.value,
    name: ticketName.value,
    email: ticketEmail.value,
    mobile: ticketMobile.value,
    message: ticketMessage.value,
    pending: true,
    ticketID: generateTicketID(),
  };
  if (
    titleValidation() &&
    nameValidation() &&
    emailValidation() &&
    mobileValidation() &&
    messageValidation()
  ) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Ticket Submitted",
      showConfirmButton: false,
      timer: 1000,
    });
    allTickets.push(ticket);
    localStorage.setItem("allTickets", JSON.stringify(allTickets));
    clearInputs();
    setTimeout(() => {
      window.location.replace("contact.html");
    }, 1000);
  } else if (!titleValidation()) {
    addTitleAlert();
  } else if (!nameValidation()) {
    addNameAlert();
  } else if (!emailValidation()) {
    addEmailAlert();
  } else if (!mobileValidation()) {
    addMobileAlert();
  } else if (!messageValidation()) {
    addMessageAlert();
  }
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

function updateNav() {
  if (!localStorage.getItem("currentUser")) {
    navUl.innerHTML = `
        <li class="nav-item  mx-1 ">
          <a class="nav-link " aria-current="page" href="../index.html">Home</a>
        </li>
        <li class="nav-item  mx-1 ">
          <a class="nav-link " href="../About/about.html">About</a>
        </li>
        <li class="nav-item  mx-1 ">
          <a class="nav-link active" href="../Contact/contact.html">Contact</a>
        </li>
        <li class="nav-item  mx-1 ">
          <a class="nav-link" href="../Authentication/login.html">Login</a>
        </li>
        <li class="nav-item  mx-1 ">
          <a class="nav-link" href="../Authentication/register.html">Register</a>
        </li>`;
  } else {
    let sellerDashboard = ``;
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser.role === "seller") {
      sellerDashboard = `<li class="nav-item mx-1 ">
        <a class="nav-link" aria-current="page" href="../Seller/seller.html">Dashboard</a>
      </li>`;
    }
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    navUl.innerHTML = `${sellerDashboard}
        <li class="nav-item mx-1 ">
          <a class="nav-link " aria-current="page" href="../index.html">Home</a>
        </li>
        <li class="nav-item mx-1 ">
          <a class="nav-link " href="../About/about.html">About</a>
        </li>
        <li class="nav-item mx-1 ">
          <a class="nav-link active" href="../Contact/contact.html">Contact</a>
        </li>
        <li class="nav-item  mx-1 isUserCheck">
          <a class="nav-link" aria-current="page" href="../Shop/shop.html">Shop</a>
        </li>
              <li class="nav-item mx-1">
                <a class="nav-link position-relative" href="../Cart/cart.html">
                  <i class="fa-solid fa-cart-shopping fa-lg"></i>
                  <span
                    id="cart"
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >${currentUser.cart.length}</span>
                </a>
              </li>
        <li class="nav-item mx-1">
                <a class="nav-link" href="../Profile/profile.html">
                  <i class="fa-solid fa-user"></i>
                </a>
              </li>
        <li class="nav-item  mx-1 isUserCheck">
          <button class="nav-link w-100" onclick="logout()"><i class="fa-solid fa-arrow-right-to-bracket"></i>
  </button>
        </li>`;
  }
}
