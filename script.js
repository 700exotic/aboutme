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

music.play().catch(() => {
  function tryPlay() {
    music.play();
    window.removeEventListener('click', tryPlay);
    window.removeEventListener('mousemove', tryPlay);
  }

  window.addEventListener('click', tryPlay);
  window.addEventListener('mousemove', tryPlay);
});

// Starfield background
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 1000;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createStar() {
  return {
    x: Math.random() * (canvas.width + 100) - 50,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 2 + 0.5,
  };
}

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
  stars.forEach((star, index) => {
    star.x -= star.speed;
    star.y += star.speed;

    if (star.x < -50 || star.y > canvas.height + 50) {
      stars[index] = {
        x: Math.random() * (canvas.width + 100) - 50,
        y: Math.random() * -50,
        size: Math.random() * 2,
        speed: Math.random() * 2 + 0.5,
      };
    }
  });
}

function animate() {
  drawStars();
  updateStars();
  requestAnimationFrame(animate);
}

animate();
