const listItems = document.querySelectorAll('.info-list li');

listItems.forEach(item => {
  const originalText = item.textContent;

  item.addEventListener('mouseenter', () => {
    item.textContent = item.dataset.hover;
  });

  item.addEventListener('mouseleave', () => {
    item.textContent = originalText;
  });
});

// Background music control
const music = document.getElementById('bg-music');
music.volume = 0.1; // 10% volume

// Flag to track if music is unmuted
let musicStarted = false;

function unmuteAndFadeIn() {
  if (musicStarted) return;
  musicStarted = true;

  music.muted = false;
  music.play();

  let vol = 0;
  const targetVol = 0.1;
  const fadeStep = 0.01;

  const fadeInInterval = setInterval(() => {
    if (vol < targetVol) {
      vol += fadeStep;
      music.volume = Math.min(vol, targetVol);
    } else {
      clearInterval(fadeInInterval);
    }
  }, 100);
}

// Listen for user interaction to unmute and fade in music
window.addEventListener('click', unmuteAndFadeIn, { once: true });
window.addEventListener('mousemove', unmuteAndFadeIn, { once: true });
