const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height, balls;

const config = {
    ballCount: 28, minRad: 35, maxRad: 85, minVel: 0.6, maxVel: 1.6,
    colors: ['rgba(168, 85, 247, 0.35)', 'rgba(37, 99, 235, 0.25)', 'rgba(139, 92, 246, 0.3)']
};

function init() {
    resize();
    balls = [];
    for (let i = 0; i < config.ballCount; i++) { balls.push(new Ball()); }
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Ball {
    constructor() {
        this.radius = Math.random() * (config.maxRad - config.minRad) + config.minRad;
        this.x = Math.random() * (width - this.radius * 2) + this.radius;
        this.y = Math.random() * (height - this.radius * 2) + this.radius;
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
        this.vx = (Math.random() - 0.5) * 2 * config.maxVel;
        this.vy = (Math.random() - 0.5) * 2 * config.maxVel;
        if(Math.abs(this.vx) < config.minVel) this.vx = config.minVel * Math.sign(this.vx);
        if(Math.abs(this.vy) < config.minVel) this.vy = config.minVel * Math.sign(this.vy);
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x - this.radius < 0 || this.x + this.radius > width) this.vx *= -1;
        if (this.y - this.radius < 0 || this.y + this.radius > height) this.vy *= -1;
    }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); ctx.closePath(); }
}

function animate() {
    ctx.fillStyle = '#000000'; ctx.fillRect(0, 0, width, height);
    ctx.filter = 'blur(25px) contrast(35)'; // Эффект слияния
    balls.forEach(ball => { ball.update(); ball.draw(); });
    ctx.filter = 'none';
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
init(); animate();