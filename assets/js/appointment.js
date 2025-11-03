import { fetchDocData } from "./database.js";

const doctorSelect = document.getElementById("doctor_name");
const daysSelect = document.getElementById("doc_days");
const timeSelect = document.getElementById("time_slots");
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
