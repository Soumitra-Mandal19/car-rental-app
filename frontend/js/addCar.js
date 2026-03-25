(function () {

  const BASE_URL = CONFIG.BASE_URL;

  //  Safe user fetch (no conflict now)
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // 🔒 Protect route
  if (!user || user.role !== "agency") {
    alert("Access denied. Only agencies can add cars.");
    window.location.href = "login.html";
    return;
  }

  // Form handler
  const form = document.getElementById("addCarForm");

  if (!form) return; // safety

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const vehicleModel = document.getElementById("vehicleModel").value.trim();
    const vehicleNumber = document.getElementById("vehicleNumber").value.trim();
    const seatingCapacity = document.getElementById("seatingCapacity").value;
    const rentPerDay = document.getElementById("rentPerDay").value;
    const imageUrl = document.getElementById("imageUrl").value.trim();

    console.log("Sending data:", {
      vehicleModel,
      vehicleNumber,
      seatingCapacity,
      rentPerDay,
      imageUrl
    });

    if (!vehicleModel || !vehicleNumber || !seatingCapacity || !rentPerDay) {
      alert("All fields except image are required");
      return;
    }

    try {
      const res = await fetch(`${CONFIG.BASE_URL}/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          vehicleModel,
          vehicleNumber,
          seatingCapacity,
          rentPerDay,
          imageUrl: imageUrl || null
        })
      });

      let data;

      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        console.error(" Non-JSON response:", text);
        alert("Server error");
        return;
      }

      console.log(" Response:", data);

      if (res.ok) {
        alert("Car added successfully ");
        form.reset();
      } else {
        alert(data.message || "Failed to add car");
      }

    } catch (error) {
      console.error(" Fetch error:", error);
      alert("Something went wrong");
    }
  });

})();