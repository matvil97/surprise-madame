// ---- Navigation entre écrans ----
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

document.querySelectorAll('[data-next]').forEach(btn => {
  btn.addEventListener('click', () => showScreen(btn.dataset.next));
});

// ---- Ecran "as-tu bien dormi" ----
const sleepReplies = {
  'sleep-a': "Parfait, parce qu'aujourd'hui commence une belle journée avec moi 🌸",
  'sleep-b': "Moi aussi je pense à toi tout le temps 💭💕"
};

document.querySelectorAll('[data-answer]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('sleep-reply').textContent = sleepReplies[btn.dataset.answer];
    document.getElementById('sleep-continue').classList.remove('hidden');
  });
});

// ---- Ecran routine (animation en cascade) ----
const routineItems = document.querySelectorAll('#routine-list li');
routineItems.forEach((li, i) => {
  li.style.animationDelay = `${i * 0.35 + 0.2}s`;
});
setTimeout(() => {
  document.getElementById('routine-continue').classList.remove('hidden');
}, routineItems.length * 350 + 500);

// ---- Ecran question : le bouton "Non" fuit ----
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const questionChoices = document.getElementById('question-choices');
const taunt = document.getElementById('taunt-msg');

const taunts = [
  "Essaie encore 😏",
  "Non non non, ce n'est pas une option",
  "Tu es sûre ? 👀",
  "Ce bouton n'aime pas être cliqué",
  "Trop lente !",
  "On dirait bien que c'est oui alors 🌸"
];
let dodgeCount = 0;

function dodgeButton() {
  const area = questionChoices.getBoundingClientRect();
  const btn = btnNo.getBoundingClientRect();
  const maxX = Math.max(area.width - btn.width, 0);
  const maxY = Math.max(area.height - btn.height, 0);
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  btnNo.style.position = 'absolute';
  btnNo.style.left = `${x}px`;
  btnNo.style.top = `${y}px`;
  taunt.textContent = taunts[Math.min(dodgeCount, taunts.length - 1)];
  dodgeCount++;
}

btnNo.addEventListener('mouseenter', dodgeButton);
btnNo.addEventListener('click', (e) => {
  e.preventDefault();
  dodgeButton();
});
btnNo.addEventListener('touchstart', (e) => {
  e.preventDefault();
  dodgeButton();
});

btnYes.addEventListener('click', () => {
  showScreen('screen-final');
  burstHearts();
});

// ---- Pétales de sakura en continu ----
const petalsContainer = document.getElementById('petals');
const petalEmojis = ['🌸', '🌸', '🌸', '💮'];

function spawnPetal() {
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 6;
  const drift = (Math.random() - 0.5) * 120;
  petal.style.left = `${left}vw`;
  petal.style.fontSize = `${0.9 + Math.random() * 0.8}rem`;
  petal.style.animationDuration = `${duration}s`;
  petal.style.setProperty('--drift', `${drift}px`);
  petalsContainer.appendChild(petal);
  setTimeout(() => petal.remove(), duration * 1000);
}

setInterval(spawnPetal, 400);

// ---- Pluie de coeurs sur l'écran final ----
const heartsOverlay = document.getElementById('hearts-overlay');
const heartEmojis = ['❤️', '💕', '💖', '💗', '💘'];
let heartsInterval = null;

function spawnHeart() {
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  const left = Math.random() * 100;
  const duration = 3.5 + Math.random() * 3;
  const drift = (Math.random() - 0.5) * 160;
  heart.style.left = `${left}vw`;
  heart.style.fontSize = `${1 + Math.random() * 1.4}rem`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.setProperty('--drift', `${drift}px`);
  heartsOverlay.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

function burstHearts() {
  for (let i = 0; i < 30; i++) {
    setTimeout(spawnHeart, i * 40);
  }
  if (!heartsInterval) {
    heartsInterval = setInterval(spawnHeart, 250);
  }
}
