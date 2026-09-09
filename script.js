/* ==========================================================================
   HAPPY BIRTHDAY — LUXURY ROMANTIC WEBSITE
   Vanilla JS: loading, particles, typing, scroll-nav, reveals,
   gallery lightbox, music, and the final celebration.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------------------
     1. LOADING SCREEN
     ---------------------------------------------------------------------- */
  const loadingScreen = document.getElementById('loading-screen');
  const loadingBarFill = document.getElementById('loading-bar-fill');
  const loadingPercent = document.getElementById('loading-percent');

  let progress = 0;
  const loadingInterval = setInterval(() => {
    // Ease toward 100 with a natural, slightly irregular pace.
    const increment = progress < 70 ? Math.random() * 12 : Math.random() * 4;
    progress = Math.min(100, progress + increment);
    loadingBarFill.style.width = progress + '%';
    loadingPercent.textContent = Math.floor(progress) + '%';

    if (progress >= 100) {
      clearInterval(loadingInterval);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        startAmbientParticles();
      }, 400);
    }
  }, 140);

  /* ----------------------------------------------------------------------
     2. AMBIENT PARTICLE FIELD (soft dots + sparkles, continuous)
     ---------------------------------------------------------------------- */
  const particleField = document.getElementById('particle-field');

  function startAmbientParticles() {
    setInterval(() => spawnParticle(false), 900);
  }

  function spawnParticle(isSparkle) {
    const particle = document.createElement('div');
    particle.className = 'particle' + (isSparkle ? ' sparkle' : '');
    const size = isSparkle ? Math.random() * 3 + 2 : Math.random() * 5 + 3;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.bottom = '-20px';
    const duration = Math.random() * 10 + 12;
    particle.style.animationDuration = duration + 's';
    particleField.appendChild(particle);
    setTimeout(() => particle.remove(), duration * 1000);
  }

  // Occasional sparkles
  setInterval(() => spawnParticle(true), 1600);

  /* ----------------------------------------------------------------------
     3. FLOATING HEARTS BURST (triggered on "Start Our Journey")
     ---------------------------------------------------------------------- */
  const heartSvgMarkup = `<svg viewBox="0 0 32 29"><path d="M16 29C16 29 0 19.5 0 8.9C0 3.98 4 0 8.7 0C11.7 0 14.2 1.5 16 3.9C17.8 1.5 20.3 0 23.3 0C28 0 32 3.98 32 8.9C32 19.5 16 29 16 29Z"/></svg>`;

  function spawnHeartBurst(count = 24) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'particle heart-particle';
        const size = Math.random() * 16 + 12;
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.bottom = '-30px';
        heart.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
        heart.style.animationDuration = (Math.random() * 4 + 5) + 's';
        heart.innerHTML = heartSvgMarkup;
        particleField.appendChild(heart);
        setTimeout(() => heart.remove(), 9000);
      }, i * 90);
    }
  }

  /* ----------------------------------------------------------------------
     4. START JOURNEY BUTTON — music + transition + hearts
     ---------------------------------------------------------------------- */
  const startBtn = document.getElementById('start-journey');
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');

  startBtn.addEventListener('click', () => {
    spawnHeartBurst(28);
    playMusic();
    document.getElementById('wishes').scrollIntoView({ behavior: 'smooth' });
  });

  /* ----------------------------------------------------------------------
     5. MUSIC CONTROLS
     ---------------------------------------------------------------------- */
  const iconPlay = document.querySelector('.icon-play');
  const iconPause = document.querySelector('.icon-pause');
  const volumeSlider = document.getElementById('volume-slider');
  let isPlaying = false;

  bgMusic.volume = parseFloat(volumeSlider.value);

  function playMusic() {
    bgMusic.play().then(() => {
      isPlaying = true;
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
    }).catch(() => {
      // Autoplay may be blocked or no audio file present — fail silently.
    });
  }

  function pauseMusic() {
    bgMusic.pause();
    isPlaying = false;
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
  }

  musicToggle.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic();
  });

  volumeSlider.addEventListener('input', (e) => {
    bgMusic.volume = parseFloat(e.target.value);
  });

  /* ----------------------------------------------------------------------
     6. SIDE NAVIGATION DOTS — active state + smooth scroll
     ---------------------------------------------------------------------- */
  const sections = document.querySelectorAll('.section');
  const navDots = document.querySelectorAll('.nav-dots .dot');

  navDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(dot.dataset.section);
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navDots.forEach(dot => {
          dot.classList.toggle('active', dot.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => navObserver.observe(section));

  /* ----------------------------------------------------------------------
     7. SCROLL-REVEAL ANIMATIONS (fade-in-up, timeline, letter)
     ---------------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll('.fade-in-up, .timeline-item, .letter-card');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ----------------------------------------------------------------------
     8. TYPING ANIMATION — Birthday Wishes (sentence by sentence)
     ---------------------------------------------------------------------- */
  const wishSentences = [
   "Hari ini, satu tahun hubungan kita dengan berbagai cerita, tawa, perjuangan, dan pelajaran. Aku berdoa semoga hubungan ini kita jaga sama-sama.\t",
    "Semoga kita terus belajar untuk saling memahami, menghargai, menguatkan, dan menjadi tempat pulang yang nyaman satu sama lain.\t\n",
    "Semoga di tahun-tahun berikutnya kita masih bisa menciptakan banyak kenangan indah, melewati setiap masalah bersama, dan tumbuh menjadi pribadi yang lebih baik. ❤️"
  ];

  const typingText = document.getElementById('typing-text');
  const wishesSection = document.getElementById('wishes');
  let typingStarted = false;

  function typeSentences(sentences, el, done) {
    let sIndex = 0, cIndex = 0;

    function typeChar() {
      if (sIndex >= sentences.length) {
        if (done) done();
        return;
      }
      const sentence = sentences[sIndex];
      if (cIndex < sentence.length) {
        el.textContent += sentence.charAt(cIndex);
        cIndex++;
        setTimeout(typeChar, 28);
      } else {
        sIndex++;
        cIndex = 0;
        setTimeout(typeChar, 550); // pause between sentences
      }
    }
    typeChar();
  }

  const wishesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !typingStarted) {
        typingStarted = true;
        typeSentences(wishSentences, typingText);
      }
    });
  }, { threshold: 0.5 });

  wishesObserver.observe(wishesSection);

  /* ----------------------------------------------------------------------
     9. GALLERY LIGHTBOX
     ---------------------------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxFrame = document.getElementById('lightbox-frame');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach((item) => {
  item.addEventListener('click', () => {

    const img = item.querySelector('img');

    if (img) {
      lightboxFrame.innerHTML = `
        <img src="${img.src}" alt="${img.alt || 'Foto kenangan'}">
      `;
    }

    lightboxCaption.textContent = item.dataset.caption || '';

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ----------------------------------------------------------------------
     10. VIDEO PLACEHOLDER — hide once a real source loads
     ---------------------------------------------------------------------- */
  const memoryVideo = document.getElementById('memory-video');
  const videoPlaceholder = document.getElementById('video-placeholder');

  memoryVideo.addEventListener('loadeddata', () => {
    videoPlaceholder.style.display = 'none';
  });
  memoryVideo.addEventListener('error', () => {
    videoPlaceholder.style.display = 'flex';
  }, true);

  
  /* ----------------------------------------------------------------------
     11. FINAL SURPRISE — confetti, fireworks, and floating hearts on canvas
     ---------------------------------------------------------------------- */
  const canvas = document.getElementById('celebration-canvas');
  const ctx = canvas.getContext('2d');
  let celebrationRunning = false;
  let celebrationParticles = [];
  let animationFrameId = null;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);

  const confettiColors = ['#FF8FB1', '#B76E79', '#E8C9A8', '#FFFFFF', '#D8A6AE'];

  function createConfetti(cx, cy, count = 60) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      celebrationParticles.push({
        type: 'confetti',
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: Math.random() * 6 + 4,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.12,
        life: 1
      });
    }
  }

  function createFirework() {
    const cx = Math.random() * canvas.width;
    const cy = Math.random() * canvas.height * 0.5 + 40;
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40;
      const speed = Math.random() * 3 + 2;
      celebrationParticles.push({
        type: 'firework',
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2.5 + 1.5,
        color,
        gravity: 0.03,
        life: 1
      });
    }
  }

  function createHeart(cx, cy) {
    celebrationParticles.push({
      type: 'heart',
      x: cx,
      y: cy,
      vx: (Math.random() - 0.5) * 1.2,
      vy: -(Math.random() * 1.2 + 0.6),
      size: Math.random() * 10 + 10,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      life: 1
    });
  }

  function drawHeartShape(x, y, size, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.fill();
    ctx.restore();
  }

  function animateCelebration() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    celebrationParticles.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity || 0;
      p.life -= p.type === 'firework' ? 0.018 : 0.006;

      if (p.type === 'confetti') {
        p.rotation += p.rotSpeed;
        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      } else if (p.type === 'firework') {
        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (p.type === 'heart') {
        drawHeartShape(p.x, p.y, p.size, p.color, Math.max(p.life, 0));
      }
    });

    celebrationParticles = celebrationParticles.filter(p => p.life > 0 && p.y < canvas.height + 50);

    if (celebrationRunning) {
      animationFrameId = requestAnimationFrame(animateCelebration);
    }
  }

  function launchCelebration() {
    resizeCanvas();
    celebrationParticles = [];
    celebrationRunning = true;
    animateCelebration();

    // Initial confetti bursts
    createConfetti(canvas.width * 0.3, canvas.height * 0.2, 70);
    createConfetti(canvas.width * 0.7, canvas.height * 0.25, 70);

    // Fireworks at intervals
    let fireworkCount = 0;
    const fireworkInterval = setInterval(() => {
      createFirework();
      fireworkCount++;
      if (fireworkCount >= 6) clearInterval(fireworkInterval);
    }, 500);

    // Continuous floating hearts
    let heartTicks = 0;
    const heartInterval = setInterval(() => {
      createHeart(Math.random() * canvas.width, canvas.height + 20);
      heartTicks++;
      if (heartTicks >= 40) clearInterval(heartInterval);
    }, 250);

    // Stop the loop after everything settles to save resources
    setTimeout(() => {
      celebrationRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 14000);
  }

  const surpriseSection = document.getElementById('surprise');
  let celebrationTriggered = false;

  const surpriseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !celebrationTriggered) {
        celebrationTriggered = true;
        launchCelebration();
      }
    });
  }, { threshold: 0.6 });

  surpriseObserver.observe(surpriseSection);

  /* ----------------------------------------------------------------------
     12. REPLAY BUTTON — restart the journey from the top
     ---------------------------------------------------------------------- */
  const replayBtn = document.getElementById('replay-btn');
  replayBtn.addEventListener('click', () => {
    celebrationTriggered = false;
    typingStarted = false;
    typingText.textContent = '';
    document.getElementById('welcome').scrollIntoView({ behavior: 'smooth' });
  });

});
