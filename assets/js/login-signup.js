import { registerUser, signInUser } from "./auth.js";
import { showToast } from "./toast.js";

// Simple UI behavior: toggle forms
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showLogin = document.getElementById("showLogin");
const showSignup = document.getElementById("showSignup");

showLogin.addEventListener("click", () => {
  signupForm.classList.add("d-none");
  loginForm.classList.remove("d-none");
  showLogin.classList.add("active");
  showSignup.classList.remove("active");
});
showSignup.addEventListener("click", () => {
  loginForm.classList.add("d-none");
  signupForm.classList.remove("d-none");
  showSignup.classList.add("active");
  showLogin.classList.remove("active");
});
document.getElementById("toggleLoginPass").addEventListener("click", (e) => {
  const pw = document.getElementById("loginPassword");
  pw.type = pw.type === "password" ? "text" : "password";
  e.target.textContent = pw.type === "password" ? "Show" : "Hide";
});
document.getElementById("toggleSignupPass").addEventListener("click", (e) => {
  const pw = document.getElementById("signupPassword");
  pw.type = pw.type === "password" ? "text" : "password";
  e.target.textContent = pw.type === "password" ? "Show" : "Hide";
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const { data, error } = await signInUser(email, password);

  if (error) {
    showToast(error.message, "danger");
    return;
  }

  if (!data) {
    return;
  }

  showToast("Login successful ✅", "success");

  setTimeout(() => {
    window.location.href = "../html/appointment.html";
  }, 1500);
});

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("userName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!signupForm.checkValidity()) {
    signupForm.classList.add("was-validated");
    showToast("Please fill out all the fields.", "danger");
    return;
  }

  const { data, error } = await registerUser(email, password, username);

  if (error) {
    showToast(error.message, "danger");
    return;
  }

  if (!data) {
    return;
  }
  showToast(
    "Signup successful ✅. Book an appointment now!",
    "success"
  );
  signupForm.reset();
  //   document.getElementById("showLogin").click();
  signupForm.classList.remove("was-validated");
});
