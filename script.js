const patchDates = [
  '2025-09-10T05:00:00', '2025-10-22T05:00:00', '2025-12-03T05:00:00',
  '2026-01-14T05:00:00', '2026-02-25T05:00:00', '2026-04-08T05:00:00', '2026-05-20T05:00:00'
];
let selectedPatchIndex = 3;
let releaseDate = new Date(patchDates[selectedPatchIndex]);

function updateCountdown() {
  const now = new Date();
  const diff = releaseDate - now;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  const segments = document.querySelectorAll('.count');
  if (segments.length === 4) {
    segments[0].textContent = d;
    segments[1].textContent = h.toString().padStart(2, '0');
    segments[2].textContent = m.toString().padStart(2, '0');
    segments[3].textContent = s.toString().padStart(2, '0');
  }
  requestAnimationFrame(updateCountdown);
}

function togglePatchSlider() {
  const el = document.getElementById('patchSliderContainer');
  el.style.display = el.style.display === 'flex' ? 'none' : 'flex';
}
function toggleTheme() {
  document.body.classList.toggle('nightmare');
}
function startQuiz() {
  const el = document.getElementById('quizContainer');
  el.style.display = el.style.display === 'block' ? 'none' : 'block';
}
function generateProphecy() {
  const weapon = document.getElementById('quizWeapon').value;
  const element = document.getElementById('quizElement').value;
  document.getElementById('prophecyResult').textContent =
    `columbina will wield the power of ${element} with a ${weapon}, dancing through dreams.`;
}
function toggleWishCalc() {
  const el = document.getElementById('wishCalcContainer');
  el.style.display = el.style.display === 'block' ? 'none' : 'block';
}
function calculateWishes() {
  const now = parseInt(document.getElementById('primogemsNow').value || '0');
  const perDay = parseInt(document.getElementById('primogemsPerDay').value || '0');
  const target = new Date(patchDates[selectedPatchIndex]);
  const days = Math.floor((target - new Date()) / (1000 * 60 * 60 * 24));
  const total = now + (perDay * days);
  const wishes = Math.floor(total / 160);
  document.getElementById('wishResult').textContent = `you'll have around ${wishes} wishes!`;
}

document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('themeMusic');
  const click = document.getElementById('clickSound');
  const canvas = document.getElementById('visualizer');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = 60;
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioCtx.createAnalyser();
  const source = audioCtx.createMediaElementSource(music);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 64;
  function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 200, 255, 0.7)';
    dataArray.forEach((value, i) => {
      const barHeight = value;
      ctx.fillRect(i * 10, canvas.height - barHeight, 8, barHeight);
    });
  }
  document.getElementById('musicToggle').addEventListener('click', () => {
    click.play();
    if (music.paused) {
      music.play();
      audioCtx.resume().then(drawVisualizer);
    } else {
      music.pause();
    }
  });
  document.getElementById('patchSlider').addEventListener('input', (e) => {
    selectedPatchIndex = parseInt(e.target.value);
    releaseDate = new Date(patchDates[selectedPatchIndex]);
    document.getElementById('patchLabel').textContent = `patch 6.${selectedPatchIndex}`;
    document.getElementById('releaseText').textContent = releaseDate.toLocaleDateString();
  });

  const weaponOptions = ['polearm','catalyst','bow','claymore','sword'];
  const elementOptions = ['pyro','electro','hydro','cryo','geo','anemo'];

  const quizWeapon = document.getElementById('quizWeapon');
  const quizElement = document.getElementById('quizElement');
  quizWeapon.innerHTML = '';
  quizElement.innerHTML = '';

  weaponOptions.forEach(w => {
    const option = document.createElement('option');
    option.textContent = w;
    option.value = w;
    quizWeapon.appendChild(option);
  });

  elementOptions.forEach(e => {
    const option = document.createElement('option');
    option.textContent = e;
    option.value = e;
    quizElement.appendChild(option);
  });

  updateCountdown();
});