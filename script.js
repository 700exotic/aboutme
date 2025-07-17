const listItems = document.querySelectorAll('.info-list li');

listItems.forEach(item => {
  const originalText = item.textContent;
  const originalHTML = item.innerHTML;

  item.addEventListener('mouseenter', () => {
    item.innerHTML = item.dataset.hover;
  });

  item.addEventListener('mouseleave', () => {
    item.innerHTML = originalHTML;
  });
});

// Background music control
const music = document.getElementById('bg-music');
music.volume = 0.1; // 10% volume
music.muted = false; // Unmute for autoplay (browser may block autoplay sound, user interaction might be needed)
music.play().catch(() => {
  // Autoplay might fail, wait for user interaction to play
  function playOnInteraction() {
    music.play();
    window.removeEventListener('click', playOnInteraction);
    window.removeEventListener('mousemove', playOnInteraction);
  }
  window.addEventListener('click', playOnInteraction);
  window.addEventListener('mousemove', playOnInteraction);
});
