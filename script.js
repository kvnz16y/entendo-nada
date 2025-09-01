// Função para fazer a chama piscar
const flame = document.querySelector('.flame');

function flicker() {
    const opacity = 0.5 + Math.random() * 0.5;
    flame.style.opacity = opacity;
    requestAnimationFrame(flicker);
}

flicker();

// Animação lateral dos balões existentes
const balloons = document.querySelectorAll('.balloon');

balloons.forEach((balloon) => {
    let x = 0;
    let direction = 1;
    function floatSideToSide() {
        if (x > 15) direction = -1;
        else if (x < -15) direction = 1;
        x += direction * 0.3;
        // Extrair valor atual de translateY ou padrão para 0
        const translateYMatch = balloon.style.transform.match(/translateY\((-?\d+)px\)/);
        const translateY = translateYMatch ? parseFloat(translateYMatch[1]) : 0;
        balloon.style.transform = `translateX(${x}px) translateY(${translateY}px)`;
        requestAnimationFrame(floatSideToSide);
    }
    floatSideToSide();
});

// Confetti effect
const confettiContainer = document.createElement('div');
confettiContainer.classList.add('confetti-container');
document.body.appendChild(confettiContainer);

function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.position = 'absolute';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    confetti.style.top = '0px';
    confetti.style.left = `${Math.random() * window.innerWidth}px`;
    confetti.style.opacity = '1';
    confetti.style.borderRadius = '2px';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1001';
    confettiContainer.appendChild(confetti);

    const fallDuration = 3000 + Math.random() * 2000;
    const horizontalMovement = (Math.random() - 0.5) * 200;

    let start = null;
    function animateConfetti(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = elapsed / fallDuration;

        confetti.style.top = `${progress * window.innerHeight}px`;
        confetti.style.left = `${parseFloat(confetti.style.left) + horizontalMovement * progress}px`;
        confetti.style.opacity = `${1 - progress}`;

        if (progress < 1) {
            requestAnimationFrame(animateConfetti);
        } else {
            confetti.remove();
        }
    }
    requestAnimationFrame(animateConfetti);
}

function launchConfetti() {
    for (let i = 0; i < 100; i++) {
        setTimeout(createConfettiPiece, i * 10);
    }
}

// Confetti on cake click
const cake = document.getElementById('cake');
cake.addEventListener('click', () => {
    launchConfetti();
});

const resetBalloonsBtn = document.getElementById('resetBalloonsBtn');
const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD700', '#FF69B4', '#9B59B6', '#1ABC9C'];
const letters = document.querySelectorAll('.letter');

resetBalloonsBtn.addEventListener('click', () => {
    letters.forEach(letter => {
        letter.style.opacity = '1';
    });
});

// Adicionar evento de clique a cada letra
letters.forEach((letter) => {
    letter.addEventListener('click', () => {
        // Obter posição da letra na tela
        const rect = letter.getBoundingClientRect();
        const x = rect.left + rect.width / 2 - 30; // Centralizar o balão
        const y = rect.top;

        // Criar novo elemento balão
        const balloon = document.createElement('div');
        balloon.className = 'balloon-letter';
        balloon.textContent = letter.textContent; // Colocar a letra dentro do balão
        balloon.style.left = `${x}px`;
        balloon.style.top = `${y}px`;
        balloon.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)]; // Cor aleatória

        // Adicionar ao corpo da página
        document.body.appendChild(balloon);

        // Esconder a letra original
        letter.style.opacity = '0';

        // Remover o balão após a animação
        setTimeout(() => {
            balloon.style.transition = 'opacity 1s ease';
            balloon.style.opacity = '0';
            setTimeout(() => {
                balloon.remove();
            }, 1000);
        }, 3000); // Tempo da animação
    });
});
