// Function to show toast
export function showToast(message, type = "primary") {
  const toastEl = document.getElementById("liveToast");
  const toastMessage = document.getElementById("toastMessage");

  toastMessage.textContent = message;

  // Update toast color based on type
  toastEl.className = `toast align-items-center text-white bg-${type} border-0`;

  const bsToast = new bootstrap.Toast(toastEl);
  bsToast.show();
}
