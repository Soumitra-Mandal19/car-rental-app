// navbar.js

const userJSON = localStorage.getItem("user");
const user = userJSON ? JSON.parse(userJSON) : null;

const navbarContainer = document.getElementById("navbar");

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("myBookings");
  window.location.href = "login.html";
}

if (navbarContainer) {
  let html = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow p-2">
    <div class="container-fluid">

      
      <div class="d-flex align-items-center gap-2">
        <a class="navbar-brand d-flex align-items-center" href="index.html">
          <img src="assets/car.png" alt="Brand" height="40" />
        </a>
        <a class="btn btn-outline-primary" href="index.html">Home</a>
      </div>
  `;

  //  Guest
  if (!user) {
    html += `
      <div class="ms-auto d-flex gap-2">
        <a class="btn btn-outline-primary" href="login.html">Login</a>
        <a class="btn btn-primary" href="register.html">Register</a>
      </div>
    `;
  }

  //  Customer
  else if (user.role === "customer") {
    html += `
      <div class="ms-auto d-flex gap-2">
        <button class="btn btn-danger" onclick="logout()">Logout</button>
      </div>
    `;
  }

  //  Agency
  else if (user.role === "agency") {
    html += `
      
      <div class="ms-auto d-flex align-items-center gap-2">
        <a class="btn btn-outline-secondary" href="bookings.html">My Bookings</a>
        <a class="btn btn-success" href="add-car.html">Add Car</a>
        <button class="btn btn-danger" onclick="logout()">Logout</button>
      </div>
    `;
  }

  html += `
    </div>
  </nav>
  `;

  navbarContainer.innerHTML = html;
}

// make logout global (important for onclick)
window.logout = logout;