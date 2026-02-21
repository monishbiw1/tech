const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const statusEl = document.getElementById('status');

let noZIndex = 8;

function overlapsAnyElement(target) {
  const all = document.querySelectorAll('body *');
  const tRect = target.getBoundingClientRect();

  for (const el of all) {
    if (el === target || el.contains(target) || target.contains(el)) {
      continue;
    }

    const r = el.getBoundingClientRect();
    const intersects =
      tRect.left < r.right &&
      tRect.right > r.left &&
      tRect.top < r.bottom &&
      tRect.bottom > r.top;

    if (intersects && r.width > 0 && r.height > 0) {
      return true;
    }
  }

  return false;
}

function moveNoButton() {
  const margin = 8;
  const btnRect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - btnRect.width - margin;
  const maxY = window.innerHeight - btnRect.height - margin;

  const nextX = Math.max(margin, Math.random() * maxX);
  const nextY = Math.max(margin, Math.random() * maxY);

  noBtn.style.left = `${nextX}px`;
  noBtn.style.top = `${nextY}px`;

  requestAnimationFrame(() => {
    const isOverlapping = overlapsAnyElement(noBtn);
    noZIndex += 1;
    noBtn.style.zIndex = String(isOverlapping ? noZIndex + 25 : noZIndex);
  });

  statusEl.textContent = 'No option is running away again 😂';
}

noBtn.addEventListener('click', (event) => {
  event.preventDefault();
  moveNoButton();
});

noBtn.addEventListener('touchstart', (event) => {
  event.preventDefault();
  moveNoButton();
}, { passive: false });

yesBtn.addEventListener('click', () => {
  statusEl.textContent = 'Yaaay! I knew it 💕';
});

window.addEventListener('resize', () => {
  const rect = noBtn.getBoundingClientRect();
  if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
    moveNoButton();
  }
});
