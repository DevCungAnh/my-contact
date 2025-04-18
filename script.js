function copyZalo() {
    const zaloNumber = '0559629469'; // Số Zalo
    navigator.clipboard.writeText(zaloNumber).then(() => {
        // Hiển thị thông báo khi sao chép thành công
        const copiedMsg = document.getElementById('copied-msg');
        copiedMsg.style.display = 'block'; // Hiển thị thông báo
        setTimeout(() => {
            copiedMsg.style.display = 'none'; // Ẩn thông báo sau 3 giây
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 1000; // Tăng số lượng particles để dày hơn 

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        // Màu sắc ngẫu nhiên 
        this.color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.05;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    // Tạo particles
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            particlesArray.push(new Particle());
        }
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
