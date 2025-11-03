import { fetchDocData } from "./database.js";
import { supabaseApi } from "./auth.js";
import { showToast } from "./toast.js";


const doctorSelect = document.getElementById("doctor_name");
const daysSelect = document.getElementById("doc_days");
const timeSelect = document.getElementById("time_slots");
const form = document.querySelector("#app_form");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");
const userMsg = document.querySelector("textarea[name='message']");

let doctorsData = [];

daysSelect.disabled = true;
daysSelect.style.cursor = "not-allowed";

timeSelect.disabled = true;
timeSelect.style.cursor = "not-allowed";

async function loadDoctors() {
  doctorSelect.innerHTML = `<option value="">Loading...</option>`;

  const doctors = await fetchDocData("doctors_data");
  doctorsData = doctors;

  if (!doctors || doctors.length === 0) {
    doctorSelect.innerHTML = `<option value="">No doctors found</option>`;
    return;
  }

  doctorSelect.innerHTML = `<option value="">Select Doctor</option>`;

  doctors.forEach((doc) => {
    const op = document.createElement("option");
    op.value = doc.doc_name;
    op.textContent = doc.doc_name;
    doctorSelect.appendChild(op);
  });
}

doctorSelect.addEventListener("change", (e) => {
  const selectedDoctor = e.target.value;

  daysSelect.innerHTML = `<option value="">Select Day</option>`;
  daysSelect.disabled = true;
  daysSelect.style.cursor = "not-allowed";

  timeSelect.innerHTML = `<option value="">Select Time Slot</option>`;
  timeSelect.disabled = true;
  timeSelect.style.cursor = "not-allowed";

  if (!selectedDoctor) return;

  const doctor = doctorsData.find((d) => d.doc_name === selectedDoctor);
  if (!doctor) return;

//   daysSelect.innerHTML = `<option value="">Select Day</option>`;
  doctor.avail_days.forEach((day) => {
    const op = document.createElement("option");
    op.value = day;
    op.textContent = day;
    daysSelect.appendChild(op);
  });
  daysSelect.disabled = false;
  daysSelect.style.cursor = "pointer";
});

daysSelect.addEventListener("change", (e) => {
  const selectedDoctor = doctorSelect.value;

  const doctor = doctorsData.find((d) => d.doc_name === selectedDoctor);
  timeSelect.innerHTML = "";
  if (!doctor || !e.target.value) {
    timeSelect.disabled = true;
    timeSelect.style.cursor = "not-allowed";
    return;
  }
  timeSelect.innerHTML = `<option value="">Select Time Slot</option>`;
  doctor.app_timing.forEach((slot) => {
    const op = document.createElement("option");
    op.value = slot;
    op.textContent = slot;
    timeSelect.appendChild(op);
  });
  timeSelect.disabled = false;
  timeSelect.style.cursor = "pointer";
});

loadDoctors();

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent form submission

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }


  const appointmentData = {
    user_name: userName.value.trim(),
    user_email: userEmail.value.trim(),
    phone_num: userPhone.value || null, // Optional
    doctor_name: doctorSelect.value,
    day: daysSelect.value,
    time: timeSelect.value,
    opt_msg: userMsg.value.trim() || null, // Optional
  };

  console.log("Saving appointment: ", appointmentData); // ✅ Debug

  const { data, error } = await supabaseApi
    .from("appointments")
    .insert([appointmentData]);

  if (error) {
    showToast("❌ Something went wrong during appointment booking. Try again." , "danger");
    console.error("❌ Supabase Error:", error.message);
    return;
  }
  showToast("✅ Appointment booked successfully!" , "success");
  form.reset();
  form.classList.remove("was-validated");

  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    input.classList.remove("is-invalid", "is-valid");
  });

  // Reset dropdown UI again
  daysSelect.disabled = true;
  daysSelect.style.cursor = "not-allowed";
  timeSelect.disabled = true;
  timeSelect.style.cursor = "not-allowed";
});
