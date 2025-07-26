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

// Variable global para controlar el estado de traducción
let isTranslated = false;
let googleTranslateInstance = null;

// Función de traducción usando Google Translate
function translatePage() {
    const translateBtn = document.getElementById('translate-btn');
    
    if (!isTranslated) {
        // Traducir a inglés
        isTranslated = true;
        translateBtn.innerHTML = '<i class="fas fa-language"></i> Español';
        translateBtn.classList.add('translating');
        
        // Cargar Google Translate si no está cargado
        if (!window.google || !window.google.translate) {
            const googleTranslateScript = document.createElement('script');
            googleTranslateScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.head.appendChild(googleTranslateScript);
        } else {
            initGoogleTranslate('en');
        }
        
    } else {
        // Traducir de vuelta a español
        isTranslated = false;
        translateBtn.innerHTML = '<i class="fas fa-language"></i> Traducir';
        translateBtn.classList.remove('translating');
        
        // Restaurar idioma original
        if (window.google && window.google.translate) {
            initGoogleTranslate('es');
        }
    }
}

// Función de inicialización de Google Translate
window.googleTranslateElementInit = function() {
    initGoogleTranslate(isTranslated ? 'en' : 'es');
};

function initGoogleTranslate(targetLang) {
    if (googleTranslateInstance) {
        // Si ya existe una instancia, cambiar el idioma
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = targetLang;
            select.dispatchEvent(new Event('change'));
        }
        return;
    }
    
    // Crear nueva instancia
    googleTranslateInstance = new google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'en,es',
        autoDisplay: false,
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
    
    // Activar traducción después de un breve delay
    setTimeout(() => {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = targetLang;
            select.dispatchEvent(new Event('change'));
        }
    }, 500);
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