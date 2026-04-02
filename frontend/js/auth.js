//  Change placeholder based on role (Register page)
const roleSelect = document.getElementById("role");
if (roleSelect) {
  roleSelect.addEventListener("change", function () {
    const nameField = document.getElementById("name");
    if (this.value === "agency") {
      nameField.placeholder = "Enter Agency Name";
    } else {
      nameField.placeholder = "Enter Your Name";
    }
  });
}

//  Handle registration form submission
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const role = document.getElementById("role").value;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("msg");
    msg.innerText = "";

    if (!name || !email || !password) {
      msg.innerText = "All fields are required";
      return;
    }

    try {
      const res = await fetch("https://car-rental-app-6frm.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful! Please login.");
        window.location.href = "login.html";
      } else {
        msg.innerText = data.message || "Registration failed";
      }
    } catch (error) {
      console.error(error);
      msg.innerText = "Something went wrong";
    }
  });
}

//  Handle login form submission
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("msg");
    msg.innerText = "";

    try {
      const res = await fetch("https://car-rental-app-6frm.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        msg.innerText = data.message || "Login failed";
        return;
      }

      // Save token and role
      const user = { role: data.role, email: document.getElementById("email").value }
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", data.token);

      // Redirect based on role
      if (data.role === "customer") {
        window.location.href = "index.html"; // available cars page
      } else if (data.role === "agency") {
        window.location.href = "bookings.html"; // agency dashboard
      }
    } catch (err) {
      console.error(err);
      msg.innerText = "Something went wrong";
    }
  });
}