
const countdownEl = document.getElementById('countdown');
const releaseDate = new Date('2026-01-14T00:00:00');

function updateCountdown() {
  const now = new Date();
  const diff = releaseDate - now;
  if (diff <= 0) {
    countdownEl.textContent = 'Columbina is here!';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

const patchInput = document.getElementById('patch');
const patchValue = document.getElementById('patch-value');
patchInput.addEventListener('input', () => {
  patchValue.textContent = `patch ${patchInput.value}`;
});

function calculatePrimogems() {
  const current = parseInt(document.getElementById('primogems').value, 10);
  const daily = parseInt(document.getElementById('daily').value, 10);
  const daysLeft = Math.floor((releaseDate - new Date()) / (1000 * 60 * 60 * 24));
  const total = current + (daily * daysLeft);
  document.getElementById('result').textContent = `Estimated primogems by release: ${total}`;
}
