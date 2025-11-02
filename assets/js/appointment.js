// import { getUserSession } from "./auth.js";

// document.addEventListener("click", async (e) => {
//   if (e.target.classList.contains("cta-btn")) {
//     e.preventDefault(); // Stop default navigation

//     const { session } = await getUserSession();

//     if (!session) {
//       alert("Please login to book an appointment ✅");
//       window.location.href = "./login-signup.html";
//     } else {
//       window.location.href = "./appointment.html";
//     }
//   }
// });