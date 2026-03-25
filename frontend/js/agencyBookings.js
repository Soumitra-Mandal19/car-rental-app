
// Redirect if not logged in or not agency
    if(!user || user.role !== "agency") {
      alert("Access denied. Only agencies can view bookings.");
      window.location.href = "login.html";
    }
async function fetchAgencyBookings() {
  const userJSON = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const user = userJSON ? JSON.parse(userJSON) : null;

  if (!user || user.role !== "agency") {
    alert("Access denied. Only agencies can view bookings.");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(`${CONFIG.BASE_URL}/agency/bookings`, {
      headers: { "Authorization": `Bearer ${token}` },
    });

    let data;
    try {
      data = await res.json();
      console.log("Agency bookings response:", data);
    } catch (err) {
      console.error("Invalid JSON response:", await res.text());
      alert("Failed to fetch bookings: invalid server response");
      return;
    }

    if (!res.ok) {
      alert(data?.message || "Failed to fetch bookings");
      return;
    }

    const tbody = document.querySelector("#bookingsTable tbody");
    tbody.innerHTML = "";

    if (!data.bookings || data.bookings.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center">No bookings found</td></tr>`;
      return;
    }

  data.bookings.forEach((booking, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${booking.vehicle_model}</td>
            <td>${booking.vehicle_number}</td>
            <td>${booking.customer_name}</td>
            <td>${new Date(booking.start_date).toLocaleDateString()}</td>
            <td>${booking.number_of_days}</td>
            <td>${booking.total_cost}</td>
          `;
          tbody.appendChild(row);
        });

  } catch (error) {
    console.error(error);
    alert("Something went wrong while fetching bookings");
  }
}

if (document.querySelector("#bookingsTable")) {
  fetchAgencyBookings();
}