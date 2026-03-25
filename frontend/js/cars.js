

const token = localStorage.getItem("token");
const role = localStorage.getItem("role"); // customer or agency

//  Load Cars
async function loadCars() {
  try {
    const res = await fetch(`${CONFIG.BASE_URL}/cars`);
    const data = await res.json();

    const carList = document.getElementById("carList");
    carList.innerHTML = "";

    data.forEach((car) => {
      carList.innerHTML += `
            <div class="col-md-4 mb-4">
              <div class="card p-3 shadow">
                <img src="${car.imageUrl || "assets/placeholder.png"}" class="car-image" alt="Car Image" />
                <h5>${car.vehicleModel}</h5>
                <p><b>Number:</b> ${car.vehicleNumber}</p>
                <p><b>Seats:</b> ${car.seatingCapacity}</p>
                <p><b>Rent/day:</b> ₹${car.rentPerDay}</p>

                ${
                  role === "customer"
                    ? `
                      <input type="date" id="date-${car.id}" class="form-control mb-2" />
                      <select id="days-${car.id}" class="form-control mb-2">
                        <option value="">Select Days</option>
                        ${[1, 2, 3, 4, 5, 6, 7].map((d) => `<option value="${d}">${d} Day(s)</option>`).join("")}
                      </select>
                    `
                    : ""
                }

                <button class="btn btn-primary w-100"
                  onclick="rentCar(${car.id})">
                  Rent Car
                </button>

              </div>
            </div>
          `;
    });
  } catch (error) {
    console.error(error);
  }
}

    // Load cars on page load
    loadCars();