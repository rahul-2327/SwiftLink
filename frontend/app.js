// app.js

document.getElementById("shortenBtn").addEventListener("click", function () {
  const longUrl = document.getElementById("longUrl").value;

  if (longUrl) {
    // Make a POST request to your backend to shorten the URL
    fetch("http://localhost:8001/url", {
      // Replace with your backend URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: longUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.shortUrl) {
          document.getElementById("shortUrl").value = data.shortUrl;
          document.querySelector(".result").style.display = "block";
        } else {
          alert("Failed to shorten URL. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  } else {
    alert("Please enter a valid URL.");
  }
});

document.getElementById("copyBtn").addEventListener("click", function () {
  const shortUrlField = document.getElementById("shortUrl");
  shortUrlField.select();
  shortUrlField.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard
    .writeText(shortUrlField.value)
    .then(() => alert("Short URL copied to clipboard!"))
    .catch((err) => alert("Failed to copy: " + err));
});
