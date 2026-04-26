/* ============================================
   WEBSITE UNTUK EMELLYA - ROMANTIS & MENYENTUH
   ============================================ */

let currentScene = 1;
let musicPlaying = false;
let letterOpened = false;
let bgMusic;

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c💖 Website untuk Emellya Amanda 💖', 'color: #ff6b8b; font-size: 18px; font-weight: bold;');
    console.log('%c🌸 Dibuat dengan penuh cinta dan ketulusan 🌸', 'color: #ffb3c6; font-size: 14px;');
    
    bgMusic = document.getElementById('bgMusic');
    if (bgMusic) bgMusic.volume = 0.4;
    
    // LOADER
    const fill = document.getElementById('loadingFill');
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        if (fill) fill.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                const loader = document.getElementById('loadingScreen');
                if (loader) loader.classList.add('hidden');
            }, 500);
        }
    }, 20);
    
    // FLOATING HEARTS
    startFloatingHearts();
    
    // MUSIC BUTTON
    const musicBtn = document.getElementById('musicBtn');
    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (bgMusic) {
                if (musicPlaying) {
                    bgMusic.pause();
                    musicPlaying = false;
                    musicBtn.innerHTML = '<i class="fas fa-music"></i> <span class="music-status">Play Musik</span>';
                } else {
                    bgMusic.play().then(() => {
                        musicPlaying = true;
                        musicBtn.innerHTML = '<i class="fas fa-pause"></i> <span class="music-status">Musik Diputar</span>';
                    }).catch(e => console.log('Play error:', e));
                }
            }
        });
    }
    
    // START BUTTON
    const startBtn = document.getElementById('startBtn');
    if (startBtn) startBtn.addEventListener('click', () => nextScene());
});

// FLOATING HEARTS
function startFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;
    const hearts = ['💕', '💖', '💗', '💝', '❤️', '💓', '💞', '💘'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 8 + 6) + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 14000);
    }, 800);
}

// SCENE NAVIGATION
function nextScene() {
    const current = document.getElementById('scene' + currentScene);
    if (current) current.classList.remove('active');
    currentScene++;
    const next = document.getElementById('scene' + currentScene);
    if (next) next.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Special effect for scene 4 (letter)
    if (currentScene === 5) {
        createSparkleEffect(30);
    }
}

// OPEN LETTER
function openLetter() {
    if (letterOpened) return;
    letterOpened = true;
    
    const envelope = document.getElementById('envelopeContainer');
    const letter = document.getElementById('letterContainer');
    const btn = document.getElementById('toQuestionBtn');
    
    createSparkleEffect(60);
    
    setTimeout(() => {
        if (envelope) envelope.style.display = 'none';
        if (letter) letter.style.display = 'block';
        if (btn) btn.style.display = 'inline-flex';
    }, 500);
}

// SPARKLE EFFECT
function createSparkleEffect(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = ['✨', '⭐', '💫', '🌟', '💖'][Math.floor(Math.random() * 5)];
            sparkle.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                font-size: ${Math.random() * 30 + 20}px;
                pointer-events: none;
                z-index: 10000;
                animation: sparklePop 1s ease-out forwards;
            `;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 30);
    }
    
    if (!document.querySelector('#sparkleStyle')) {
        const style = document.createElement('style');
        style.id = 'sparkleStyle';
        style.textContent = `
            @keyframes sparklePop {
                0% { opacity: 0; transform: scale(0) rotate(0deg); }
                30% { opacity: 1; transform: scale(1.3) rotate(180deg); }
                100% { opacity: 0; transform: scale(0) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ANSWER YES
function answerYes() {
    const overlay = document.getElementById('responseYes');
    if (overlay) overlay.classList.add('show');
    
    // CELEBRATION EFFECTS
    createSparkleEffect(120);
    createMassiveConfetti();
    startFireworks();
    
    if (bgMusic) bgMusic.pause();
}

// ANSWER NO
function answerNo() {
    const overlay = document.getElementById('responseNo');
    if (overlay) overlay.classList.add('show');
    createSparkleEffect(50);
}

// CONFETTI
function createMassiveConfetti() {
    const container = document.getElementById('confettiArea');
    if (!container) return;
    const colors = ['#ff6b8b', '#e8456e', '#ffb3c6', '#e6b800', '#ffdb4d'];
    
    for (let i = 0; i < 300; i++) {
        setTimeout(() => {
            const c = document.createElement('div');
            c.className = 'confetti';
            c.style.left = Math.random() * 100 + 'vw';
            c.style.background = colors[Math.floor(Math.random() * colors.length)];
            c.style.animationDuration = (Math.random() * 3 + 2) + 's';
            c.style.width = (Math.random() * 12 + 6) + 'px';
            c.style.height = (Math.random() * 12 + 6) + 'px';
            if (Math.random() > 0.7) c.style.borderRadius = '50%';
            container.appendChild(c);
            setTimeout(() => c.remove(), 6000);
        }, i * 20);
    }
}

// FIREWORKS
function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w; canvas.height = h;
    let particles = [];
    const colors = ['#ff6b8b', '#e8456e', '#ffb3c6', '#e6b800'];
    
    class Particle {
        constructor(x, y, color) {
            this.x = x; this.y = y; this.color = color;
            let a = Math.random() * Math.PI * 2;
            let s = Math.random() * 7 + 3;
            this.vx = Math.cos(a) * s;
            this.vy = Math.sin(a) * s;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
            this.size = Math.random() * 4 + 2;
        }
        update() {
            this.vx *= 0.98;
            this.vy *= 0.98;
            this.vy += 0.15;
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    function explode() {
        let x = Math.random() * w * 0.6 + w * 0.2;
        let y = Math.random() * h * 0.5 + h * 0.1;
        let color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 80; i++) particles.push(new Particle(x, y, color));
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, w, h);
        for (let i = particles.length-1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].alpha <= 0) particles.splice(i,1);
        }
        if (particles.length > 0 || Date.now() - start < 15000) requestAnimationFrame(animate);
        else canvas.style.display = 'none';
    }
    
    let start = Date.now();
    let interval = setInterval(() => { if (Math.random() < 0.6) explode(); }, 350);
    setTimeout(() => clearInterval(interval), 12000);
    animate();
}

// GLOBAL FUNCTIONS
window.nextScene = nextScene;
window.openLetter = openLetter;
window.answerYes = answerYes;
window.answerNo = answerNo;

// WELCOME CONSOLE MESSAGE
setTimeout(() => {
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ff6b8b;');
    console.log('%c💌 Pesan untuk Emellya Amanda 💌', 'color: #e8456e; font-size: 16px; font-weight: bold;');
    console.log('%c', '');
    console.log('%cTerima kasih sudah membuka website ini.', 'color: #ffb3c6; font-size: 13px;');
    console.log('%cSemoga perasaan ini sampai ke hati kamu. 💕', 'color: #ff6b8b; font-size: 13px;');
    console.log('%c', '');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ff6b8b;');
}, 2000);