// ===== Scroll suave =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    // Evitamos el scroll solo para el botón de la sección hero
    if (!this.closest('.hero')) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href'))
              .scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Animaciones al hacer scroll =====
const elements = document.querySelectorAll('.card, .hero h2, .hero p, .community p, .join p');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

// ===== Header sticky =====
window.addEventListener('scroll', () => {
  const header = document.querySelector('.main-header');
  header.classList.toggle('sticky', window.scrollY > 50);
});

// ===== Botón "Únete ahora" en hero =====
const joinButton = document.querySelector('.hero .btn');
const originalText = joinButton.textContent;
const serverIP = 'play.prysmania.com';

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback para navegadores antiguos
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('No se pudo copiar', err);
    }
    document.body.removeChild(textArea);
  }
}

joinButton.addEventListener('click', (e) => {
  e.preventDefault(); // Evita el scroll hacia #unete
  copyToClipboard(serverIP);
  joinButton.textContent = '¡IP Copiada!';
  setTimeout(() => {
    joinButton.textContent = originalText;
  }, 5000);
});
