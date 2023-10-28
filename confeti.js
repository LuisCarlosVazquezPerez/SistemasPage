function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function confettiRandom() {
    const confettiOptions = {
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 },
        colors: ["#0E95E8", "#FFFF1C", "#0E95E8"]
    };
    
    confetti(confettiOptions);
}

const boton = document.getElementById('conLuis');
boton.addEventListener('click', confettiRandom);
