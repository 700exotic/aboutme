// Hover effect with HTML support
const listItems = document.querySelectorAll('.info-list li');

listItems.forEach(item => {
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
music.volume = 0.1;
music.muted = false;

// Try to autoplay, fallback to user interaction if blocked
music.play().catch(() => {
  function tryPlay() {
    music.play();
    window.removeEventListener('click', tryPlay);
    window.removeEventListener('mousemove', tryPlay);
  }

  window.addEventListener('click', tryPlay);
  window.addEventListener('mousemove', tryPlay);
});

// Shooting stars background
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 100;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 2 + 0.5,
  };
}

// Initialize stars
for (let i = 0; i < numStars; i++) {
  stars.push(createStar());
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateStars() {
  stars.forEach(star => {
    star.x -= star.speed;
    star.y += star.speed;
    if (star.x < 0 || star.y > canvas.height) {
      Object.assign(star, createStar(), { x: canvas.width, y: 0 });
    }
  });
}

function animate() {
  drawStars();
  updateStars();
  requestAnimationFrame(animate);
}

animate();
