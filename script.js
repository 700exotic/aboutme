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

// Lower the volume of background music
const music = document.getElementById('bg-music');
music.volume = 1; // 10% volume
