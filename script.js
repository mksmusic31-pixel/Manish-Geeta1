const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const envelope = document.getElementById("openEnvelope");
const openText = document.getElementById("openText");

const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");

// Open the envelope and reveal the invitation.
let opened = false;

function openInvitation() {
  if (opened) return;
  opened = true;

  envelope.classList.add("open");

  window.setTimeout(() => {
    intro.hidden = true;
    invitation.hidden = false;
    document.getElementById("home").scrollIntoView();
  }, 550);
}

envelope.addEventListener("click", openInvitation);
openText.addEventListener("click", openInvitation);

// Music plays only when the guest presses the button.
musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.textContent = "♫ Pause music";
    } catch {
      musicButton.textContent = "Music unavailable";
    }
  } else {
    music.pause();
    musicButton.textContent = "♫ Play music";
  }
});

// Countdown: February is month 1 in JavaScript.
const weddingDate = new Date(2027, 1, 15, 19, 0, 0);

function updateCountdown() {
  let remaining = weddingDate.getTime() - Date.now();

  if (remaining <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach(id => {
      document.getElementById(id).textContent = "00";
    });
    return;
  }

  const days = Math.floor(remaining / 86400000);
  remaining %= 86400000;

  const hours = Math.floor(remaining / 3600000);
  remaining %= 3600000;

  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

// Click any photo to enlarge it.
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

document.querySelectorAll(".photo").forEach(button => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  });
});

document.getElementById("closeLightbox")
  .addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) lightbox.close();
});
