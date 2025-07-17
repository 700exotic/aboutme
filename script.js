const listItems = document.querySelectorAll('.info-list li');

listItems.forEach(item => {
  const originalHTML = item.innerHTML;  // save original HTML, not just text

  item.addEventListener('mouseenter', () => {
    item.innerHTML = item.dataset.hover; // set as HTML, so <img> renders
  });

  item.addEventListener('mouseleave', () => {
    item.innerHTML = originalHTML;       // revert to original HTML
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
