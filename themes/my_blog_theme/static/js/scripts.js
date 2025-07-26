// static/js/scripts.js

// Protección adicional contra clic derecho y teclas
document.addEventListener('keydown', function(e) {
    // Deshabilitar F12, Ctrl+Shift+I, Ctrl+U
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        return false;
    }
});

// Protección contra inspección de elementos
setInterval(() => {
    if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
        document.body.innerHTML = 'Acceso no autorizado';
    }
}, 1000);

// Función de traducción usando Google Translate API
function translatePage() {
    const translateBtn = document.getElementById('translate-btn');
    const currentLang = document.documentElement.lang;
    
    if (currentLang === 'es') {
        // Traducir a inglés
        document.documentElement.lang = 'en';
        translateBtn.innerHTML = '<i class="fas fa-language"></i> Español';
        translateBtn.onclick = () => translatePage();
        
        // Aquí podrías integrar con Google Translate API
        // Por ahora, solo cambiamos el idioma del documento
        console.log('Traduciendo a inglés...');
        
        // Ejemplo básico de traducción (en un caso real usarías la API)
        const elements = document.querySelectorAll('h1, h2, h3, p, a, button, span');
        elements.forEach(element => {
            if (element.textContent.includes('Traducir')) {
                element.textContent = element.textContent.replace('Traducir', 'Translate');
            }
        });
    } else {
        // Traducir a español
        document.documentElement.lang = 'es';
        translateBtn.innerHTML = '<i class="fas fa-language"></i> Traducir';
        translateBtn.onclick = () => translatePage();
        
        console.log('Traduciendo a español...');
        
        // Ejemplo básico de traducción
        const elements = document.querySelectorAll('h1, h2, h3, p, a, button, span');
        elements.forEach(element => {
            if (element.textContent.includes('Translate')) {
                element.textContent = element.textContent.replace('Translate', 'Traducir');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    if (!canvas) return; // Salir si el canvas no existe

    const ctx = canvas.getContext('2d');
    let stars = [];
    const numStars = 200; // Número de estrellas

    // Función para redimensionar el canvas cuando la ventana cambia de tamaño
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Constructor de la estrella
    function Star() {
        this.x = Math.random() * canvas.width; // Posición X aleatoria
        this.y = Math.random() * canvas.height; // Posición Y aleatoria
        this.radius = Math.random() * 1.5 + 0.5; // Radio aleatorio (tamaño)
        this.alpha = Math.random(); // Opacidad aleatoria
        this.velocity = Math.random() * 0.05 + 0.01; // Velocidad de parpadeo/movimiento
    }

    // Dibujar la estrella
    Star.prototype.draw = function() {
        ctx.beginPath(); // Inicia un nuevo camino de dibujo
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // Dibuja un círculo
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`; // Color blanco con opacidad
        ctx.fill(); // Rellena el círculo
    };

    // Actualizar la estrella (para parpadeo o movimiento sutil)
    Star.prototype.update = function() {
        this.alpha += this.velocity; // Cambia la opacidad
        if (this.alpha <= 0 || this.alpha >= 1) {
            this.velocity = -this.velocity; // Invierte la velocidad para parpadear
        }
        // Opcional: movimiento sutil
        // this.x += this.velocity * 0.1;
        // if (this.x > canvas.width) this.x = 0;
    };

    // Inicializar estrellas
    function initStars() {
        stars = []; // Limpiar estrellas existentes
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star()); // Crear nuevas estrellas
        }
    }

    // Bucle de animación
    function animate() {
        requestAnimationFrame(animate); // Solicita el siguiente frame de animación
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
        stars.forEach(star => {
            star.update(); // Actualiza la estrella
            star.draw(); // Dibuja la estrella
        });
    }

    // Event Listeners
    window.addEventListener('resize', () => {
        resizeCanvas(); // Redimensiona el canvas al cambiar el tamaño de la ventana
        initStars(); // Reinicia las estrellas para que se adapten al nuevo tamaño
    });

    // Inicio
    resizeCanvas(); // Establece el tamaño inicial del canvas
    initStars(); // Crea las estrellas iniciales
    animate(); // Inicia la animación
});