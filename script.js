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
const numStars = 0; // Set to 0 as per previous discussion if you don't want stars

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


// Spotify Status Logic
const spotifyDisplayText = document.getElementById('spotify-display-text');
const discordUserId = '973060391460544513'; // Your Discord User ID

async function updateSpotifyStatus() {
    // This check ensures we have an ID before trying to fetch
    if (!discordUserId || discordUserId === 'YOUR_DISCORD_USER_ID') {
        spotifyDisplayText.textContent = 'Spotify Status: Discord User ID is not set or invalid.';
        return;
    }

    try {
        const response = await fetch(`https://api.lanyard.cnrad.dev/v1/users/${discordUserId}`);
        const data = await response.json();

        // Check if Lanyard fetch was successful and contains Spotify data
        if (data.success && data.data.spotify) {
            const spotify = data.data.spotify;
            spotifyDisplayText.innerHTML = `Spotify: Listening to "${spotify.song}" by ${spotify.artist}`;
            // Optional: You can make the song title a clickable link to Spotify
            // spotifyDisplayText.innerHTML = `Spotify: Listening to "<a href="https://open.spotify.com/track/${spotify.track_id}" target="_blank" style="color: white; text-decoration: underline;">${spotify.song}</a>" by ${spotify.artist}`;
        } else {
            // If fetch was successful but no Spotify data (e.g., not listening)
            spotifyDisplayText.textContent = 'Spotify Status: Not listening.';
        }
    } catch (error) {
        // If there was a network error or Lanyard is unreachable
        console.error('Error fetching Spotify status:', error);
        spotifyDisplayText.textContent = 'Spotify Status: Error fetching status.';
    }
}

// Initial update when the page loads
updateSpotifyStatus();
// Update status every 10 seconds
setInterval(updateSpotifyStatus, 10000);
