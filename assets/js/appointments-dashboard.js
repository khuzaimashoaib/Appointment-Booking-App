import { supabaseApi } from "./auth.js";

const container = document.getElementById("myAppointments");

async function loadAppointments() {
  const {
    data: { user },
  } = await supabaseApi.auth.getUser();

  if (!user) {
    window.location.href = "login-signup.html";
    return;
  }

  const { data, error } = await supabaseApi
    .from("appointments")
    .select("*")
    .eq("user_email", user.email)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Fetch Error:", error.message);
    return;
  }

  if (!data.length) {
    container.innerHTML = `<p class="text-center">No appointments found 🧑‍⚕️</p>`;
    return;
  }
  const { data: doctors } = await supabaseApi.from("doctors_data").select("*");

  container.innerHTML = data
    .map((app) => {
      const doctor = doctors.find((d) => d.doc_name === app.doctor_name);

      return `
      <div class="card shadow-sm mb-4 p-3 w-75" style="border-radius: 12px;">

        <div class="row">
          
          <!-- ✅ Doctor Info Section -->
          <div class="col-md-6 border-end">
            <h5 class=" mb-2">${app.doctor_name}</h5>
            <p class="mb-1"><strong>Speciality:</strong> ${
              doctor?.speciality || "N/A"
            }</p>
            <p class="mb-1"><strong>Availability:</strong> ${
              doctor?.availability || "N/A"
            }</p>
          </div>

          <!-- ✅ Appointment Info -->
          <div class="col-md-6">
            <p class="mb-1"><strong>Date:</strong> ${app.day}</p>
            <p class="mb-1"><strong>Time:</strong> ${app.time}</p>
            ${
              app.opt_msg
                ? `<p class="mb-1"><strong>Note:</strong> ${app.opt_msg}</p>`
                : ""
            }
          </div>

        </div>

        <!-- ✅ Status Badge -->
        <div class="mt-3 text-end">
          <span class="badge fs-6"
            style="
              padding: 10px 16px;
              background-color: #3fbbc0;
                        ">
            ✅ Booked
          </span>
        </div>

      </div>
    `;
    })
    .join("");
}

loadAppointments();
