const bookingForm = document.querySelector("#bookingForm");

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(bookingForm);
  const name = String(form.get("name") || "");
  const email = String(form.get("email") || "");
  const date = String(form.get("date") || "");
  const eventType = String(form.get("eventType") || "");
  const details = String(form.get("details") || "");

  const subject = encodeURIComponent(`360 Rentals inquiry from ${name || "website"}`);
  const body = encodeURIComponent(
    [
      `Name: ${name}`,
      `Email: ${email}`,
      `Event date: ${date || "Not provided"}`,
      `Event type: ${eventType}`,
      "",
      "Details:",
      details || "Not provided"
    ].join("\n")
  );

  window.location.href = `mailto:hello@360rentalsusa.com?subject=${subject}&body=${body}`;
});
