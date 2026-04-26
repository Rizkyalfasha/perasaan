/* ============================================
   WEBSITE UNTUK EMELLYA - ROMANTIS & MENYENTUH
   MUSIK OTOMATIS NYALA SAAT WEB DIBUKA
   ============================================ */

let currentScene = 1;
let musicPlaying = true;  // SET TRUE - MUSIK LANGSUNG NYALA
let letterOpened = false;
let bgMusic;
let musicAllowed = false;

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c💖 Website untuk Emellya Amanda 💖', 'color: #ff6b8b; font-size: 18px; font-weight: bold;');
    console.log('%c🌸 Dibuat dengan penuh cinta dan ketulusan 🌸', 'color: #ffb3c6; font-size: 14px;');
    
    bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.4;
        
        // COBA PLAY MUSIK OTOMATIS
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // BERHASIL - musik langsung nyala
                musicPlaying = true;
                updateMusicUI();
                console.log('🎵 Musik otomatis nyala!');
            }).catch(() => {
                // GAGAL (karena kebijakan browser) - user harus klik dulu
                console.log('⚠️ Autoplay diblokir browser. Perlu interaksi user.');
                musicPlaying = false;
                updateMusicUI();
                
                // TAMBAHKAN PESAN UNTUK USER KLIK DI MANA SAJA
                const clickToPlayMessage = document.createElement('div');
                clickToPlayMessage.className = 'click-to-play';
                clickToPlayMessage.innerHTML = '🎵 Klik di mana saja untuk memutar musik 🎵';
                clickToPlayMessage.style.cssText = `
                    position: fixed;
                    bottom: 100px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0,0,0,0.7);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 50px;
                    font-size: 0.8rem;
                    z-index: 1000;
                    cursor: pointer;
                    animation: pulse 2s infinite;
                `;
                document.body.appendChild(clickToPlayMessage);
                
                const startMusicOnClick = () => {
                    bgMusic.play().then(() => {
                        musicPlaying = true;
                        updateMusicUI();
                        clickToPlayMessage.remove();
                        document.removeEventListener('click', startMusicOnClick);
                    }).catch(e => console.log('Still blocked:', e));
                };
                document.addEventListener('click', startMusicOnClick);
            });
        }
    }
    
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
    
    // MUSIC BUTTON (TOGGLE)
    const musicBtn = document.getElementById('musicBtn');
    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bgMusic) {
                if (musicPlaying) {
                    bgMusic.pause();
                    musicPlaying = false;
                } else {
                    bgMusic.play().then(() => {
                        musicPlaying = true;
                    }).catch(e => console.log('Play error:', e));
                }
                updateMusicUI();
            }
        });
    }
    
    // START BUTTON
    const startBtn = document.getElementById('startBtn');
    if (startBtn) startBtn.addEventListener('click', () => nextScene());
});

// UPDATE UI MUSIK (TOMBOL & WAVE)
function updateMusicUI() {
    const musicBtn = document.getElementById('musicBtn');
    const musicStatus = document.getElementById('musicStatus');
    const musicWave = document.getElementById('musicWave');
    
    if (musicBtn) {
        if (musicPlaying) {
            musicBtn.style.opacity = '1';
            if (musicStatus) musicStatus.textContent = '🎵 Musik Diputar';
            if (musicWave) musicWave.style.display = 'flex';
        } else {
            musicBtn.style.opacity = '0.7';
            if (musicStatus) musicStatus.textContent = '🔇 Musik Berhenti';
            if (musicWave) musicWave.style.display = 'none';
        }
    }
}

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
}

// ANSWER YES
function answerYes() {
    const overlay = document.getElementById('responseYes');
    if (overlay) overlay.classList.add('show');
    
    createSparkleEffect(120);
    createMassiveConfetti();
    startFireworks();
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

// CONSOLE MESSAGE
setTimeout(() => {
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ff6b8b;');
    console.log('%c💌 Pesan untuk Emellya Amanda 💌', 'color: #e8456e; font-size: 16px; font-weight: bold;');
    console.log('%c🎵 Musik romantis sedang diputar... 🎵', 'color: #ffb3c6; font-size: 13px;');
    console.log('%cTerima kasih sudah membuka website ini.', 'color: #ffb3c6; font-size: 13px;');
    console.log('%cSemoga perasaan ini sampai ke hati kamu. 💕', 'color: #ff6b8b; font-size: 13px;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ff6b8b;');
}, 2000);