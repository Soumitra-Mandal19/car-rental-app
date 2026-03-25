// Customer: Rent Car

async function rentCar(carId) {
  console.log("rentCar called for carId:", carId);

  const userJSON = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const user = userJSON ? JSON.parse(userJSON) : null;

  if (!user || !token) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  if (user.role === "agency") {
    alert("Agencies cannot rent cars");
    return;
  }

  const startDate = document.getElementById(`date-${carId}`)?.value;
  const noOfDays = document.getElementById(`days-${carId}`)?.value;
  console.log("Start date:", startDate, "No. of days:", noOfDays);

  if (!startDate || !noOfDays) {
    alert("Please select date and number of days");
    return;
  }

  try {
    const res = await fetch(`${CONFIG.BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ carId, startDate, noOfDays }),
    });

    let data;
    try {
      data = await res.json();
      console.log("Server response:", data);
    } catch (err) {
      console.error("Invalid JSON response:", await res.text());
      alert("Booking failed: invalid server response");
      return;
    }

    if (!res.ok) {
      alert(data?.message || "Booking failed");
      return;
    }

    // Save booking locally
    const bookings = JSON.parse(localStorage.getItem("myBookings") || "[]");
    bookings.push({
      bookingId: data.booking.bookingId,
      carId: data.booking.carId,
      startDate: data.booking.startDate,
      noOfDays: data.booking.noOfDays,
      totalCost: data.booking.totalCost,
      vehicleModel: data.booking.vehicleModel || "Car",
    });
    localStorage.setItem("myBookings", JSON.stringify(bookings));

    alert("Car booked successfully 🚗");
    window.location.href = "booking-success.html";

  } catch (error) {
    console.error(error);
    alert("Something went wrong while booking");
  }
}



// globally available for inline onclick
window.rentCar = rentCar;
