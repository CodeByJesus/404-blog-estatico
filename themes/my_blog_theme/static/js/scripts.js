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

// Diccionario de traducciones
const translations = {
    // Primer post
    'Mi Primer Post en Pelican': 'My First Post in Pelican',
    'My First Post in Pelican': 'Mi Primer Post en Pelican',
    'Este es un post de ejemplo para verificar que el blog estático funciona correctamente.': 'This is an example post to verify that the static blog is working correctly.',
    'This is an example post to verify that the static blog is working correctly.': 'Este es un post de ejemplo para verificar que el blog estático funciona correctamente.',
    '¡Hola mundo!': 'Hello world!',
    'Hello world!': '¡Hola mundo!',
    'Este es el contenido de mi primer post en el blog estático, generado con Pelican.': 'This is the content of my first post in the static blog, generated with Pelican.',
    'This is the content of my first post in the static blog, generated with Pelican.': 'Este es el contenido de mi primer post en el blog estático, generado con Pelican.',
    'Si estás leyendo esto, significa que el despliegue en Netlify ha sido exitoso y Pelican está funcionando.': 'If you\'re reading this, it means the Netlify deployment has been successful and Pelican is working.',
    'If you\'re reading this, it means the Netlify deployment has been successful and Pelican is working.': 'Si estás leyendo esto, significa que el despliegue en Netlify ha sido exitoso y Pelican está funcionando.',
    'Puedes editar este archivo o añadir más archivos Markdown en la carpeta `content/` para crear nuevos posts.': 'You can edit this file or add more Markdown files in the `content/` folder to create new posts.',
    'You can edit this file or add more Markdown files in the `content/` folder to create new posts.': 'Puedes editar este archivo o añadir más archivos Markdown en la carpeta `content/` para crear nuevos posts.',
    '¡Éxito!': 'Success!',
    'Success!': '¡Éxito!',
    '¡Felicidades por tu blog estático!': 'Congratulations on your static blog!',
    'Congratulations on your static blog!': '¡Felicidades por tu blog estático!',
    
    // Segundo post
    '¿Por Qué Este Blog Usa Pelican?': 'Why This Blog Uses Pelican?',
    'Why This Blog Uses Pelican?': '¿Por Qué Este Blog Usa Pelican?',
    'Descubre por qué este blog ha sido construido como un sitio estático con Pelican, y cómo se relaciona con su versión original de backend en Django.': 'Discover why this blog has been built as a static site with Pelican, and how it relates to its original backend version in Django.',
    'Discover why this blog has been built as a static site with Pelican, and how it relates to its original backend version in Django.': 'Descubre por qué este blog ha sido construido como un sitio estático con Pelican, y cómo se relaciona con su versión original de backend en Django.',
    '¡Hola a todos!': 'Hello everyone!',
    'Hello everyone!': '¡Hola a todos!',
    'Si estás leyendo esto, es probable que hayas notado la velocidad y la eficiencia de este blog. Hoy quiero compartir la razón detrás de su arquitectura y por qué elegí [Pelican](https://getpelican.com/) para potenciarlo.': 'If you\'re reading this, you\'ve probably noticed the speed and efficiency of this blog. Today I want to share the reason behind its architecture and why I chose [Pelican](https://getpelican.com/) to power it.',
    'If you\'re reading this, you\'ve probably noticed the speed and efficiency of this blog. Today I want to share the reason behind its architecture and why I chose [Pelican](https://getpelican.com/) to power it.': 'Si estás leyendo esto, es probable que hayas notado la velocidad y la eficiencia de este blog. Hoy quiero compartir la razón detrás de su arquitectura y por qué elegí [Pelican](https://getpelican.com/) para potenciarlo.',
    'La Ventaja de los Sitios Estáticos': 'The Advantage of Static Sites',
    'The Advantage of Static Sites': 'La Ventaja de los Sitios Estáticos',
    'En el mundo del desarrollo web, existen dos grandes enfoques para construir sitios: dinámicos y estáticos. Los sitios dinámicos (como los construidos con Django, WordPress, etc.) generan el contenido "sobre la marcha" cada vez que un usuario los visita, consultando bases de datos y ejecutando lógica de servidor. Esto es potente, pero puede ser más lento y costoso.': 'In the world of web development, there are two main approaches to building sites: dynamic and static. Dynamic sites (like those built with Django, WordPress, etc.) generate content "on the fly" every time a user visits them, querying databases and executing server logic. This is powerful, but can be slower and more expensive.',
    'In the world of web development, there are two main approaches to building sites: dynamic and static. Dynamic sites (like those built with Django, WordPress, etc.) generate content "on the fly" every time a user visits them, querying databases and executing server logic. This is powerful, but can be slower and more expensive.': 'En el mundo del desarrollo web, existen dos grandes enfoques para construir sitios: dinámicos y estáticos. Los sitios dinámicos (como los construidos con Django, WordPress, etc.) generan el contenido "sobre la marcha" cada vez que un usuario los visita, consultando bases de datos y ejecutando lógica de servidor. Esto es potente, pero puede ser más lento y costoso.',
    'Los sitios estáticos, por otro lado, son simplemente archivos HTML, CSS y JavaScript pre-generados. Cuando un usuario los visita, el servidor simplemente entrega esos archivos directamente. Esto ofrece ventajas significativas:': 'Static sites, on the other hand, are simply pre-generated HTML, CSS, and JavaScript files. When a user visits them, the server simply delivers those files directly. This offers significant advantages:',
    'Static sites, on the other hand, are simply pre-generated HTML, CSS, and JavaScript files. When a user visits them, the server simply delivers those files directly. This offers significant advantages:': 'Los sitios estáticos, por otro lado, son simplemente archivos HTML, CSS y JavaScript pre-generados. Cuando un usuario los visita, el servidor simplemente entrega esos archivos directamente. Esto ofrece ventajas significativas:',
    '**Velocidad Extrema:** Al no haber procesamiento en el servidor, la carga es casi instantánea.': '**Extreme Speed:** With no server-side processing, loading is almost instantaneous.',
    '**Extreme Speed:** With no server-side processing, loading is almost instantaneous.': '**Velocidad Extrema:** Al no haber procesamiento en el servidor, la carga es casi instantánea.',
    '**Seguridad Mejorada:** Menos componentes dinámicos significan menos puntos de ataque.': '**Enhanced Security:** Fewer dynamic components mean fewer attack points.',
    '**Enhanced Security:** Fewer dynamic components mean fewer attack points.': '**Seguridad Mejorada:** Menos componentes dinámicos significan menos puntos de ataque.',
    '**Costo Reducido:** Pueden alojarse de forma gratuita o muy económica en servicios como Netlify.': '**Reduced Cost:** They can be hosted for free or very cheaply on services like Netlify.',
    '**Reduced Cost:** They can be hosted for free or very cheaply on services like Netlify.': '**Costo Reducido:** Pueden alojarse de forma gratuita o muy económica en servicios como Netlify.',
    '**Simplicidad de Mantenimiento:** Una vez generados, los archivos son muy fáciles de servir.': '**Simplicity of Maintenance:** Once generated, the files are very easy to serve.',
    '**Simplicity of Maintenance:** Once generated, the files are very easy to serve.': '**Simplicidad de Mantenimiento:** Una vez generados, los archivos son muy fáciles de servir.',
    'Pelican es un generador de sitios estáticos escrito en Python que me permite escribir mis posts en Markdown y luego "compilarlos" a HTML puro, aprovechando todas estas ventajas.': 'Pelican is a static site generator written in Python that allows me to write my posts in Markdown and then "compile" them to pure HTML, taking advantage of all these benefits.',
    'Pelican is a static site generator written in Python that allows me to write my posts in Markdown and then "compile" them to pure HTML, taking advantage of all these benefits.': 'Pelican es un generador de sitios estáticos escrito en Python que me permite escribir mis posts en Markdown y luego "compilarlos" a HTML puro, aprovechando todas estas ventajas.',
    '¡Espero que esta explicación aclare por qué elegí Pelican para este blog y cómo aprovecha las ventajas de los sitios estáticos!': 'I hope this explanation clarifies why I chose Pelican for this blog and how it takes advantage of the benefits of static sites!',
    'I hope this explanation clarifies why I chose Pelican for this blog and how it takes advantage of the benefits of static sites!': '¡Espero que esta explicación aclare por qué elegí Pelican para este blog y cómo aprovecha las ventajas de los sitios estáticos!',
    
    // Interfaz principal
    'Escrito por': 'Written by',
    'Written by': 'Escrito por',
    'Anterior': 'Previous',
    'Previous': 'Anterior',
    'Siguiente': 'Next',
    'Next': 'Siguiente',
    'No hay publicaciones disponibles.': 'No publications available.',
    'No publications available.': 'No hay publicaciones disponibles.',
    
    // Barra lateral
    'Posts Recientes': 'Recent Posts',
    'Recent Posts': 'Posts Recientes',
    'No hay posts recientes.': 'No recent posts.',
    'No recent posts.': 'No hay posts recientes.',
    'Sígueme': 'Follow Me',
    'Follow Me': 'Sígueme',
    'Categorías': 'Categories',
    'Categories': 'Categorías',
    'No hay categorías.': 'No categories.',
    'No categories.': 'No hay categorías.',
    'Etiquetas': 'Tags',
    'Tags': 'Etiquetas',
    'No hay etiquetas.': 'No tags.',
    'No tags.': 'No hay etiquetas.'
};

// Función de traducción manual
function translatePage() {
    const translateBtn = document.getElementById('translate-btn');
    
    if (!isTranslated) {
        // Traducir a inglés
        isTranslated = true;
        translateBtn.innerHTML = '<i class="fas fa-language"></i> Español';
        translateBtn.classList.add('translating');
        
        // Traducir contenido
        translateContent();
        
        // Reparar enlaces después de la traducción
        setTimeout(() => {
            repairLinks();
        }, 100);
        
    } else {
        // Traducir de vuelta a español
        isTranslated = false;
        translateBtn.innerHTML = '<i class="fas fa-language"></i> Inglés';
        translateBtn.classList.remove('translating');
        
        // Restaurar contenido original
        translateContent();
        
        // Reparar enlaces después de la traducción
        setTimeout(() => {
            repairLinks();
        }, 100);
    }
}

// Función para reparar enlaces
function repairLinks() {
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        // Asegurar que todos los enlaces sean clickeables
        link.style.pointerEvents = 'auto';
        link.style.cursor = 'pointer';
        link.style.position = 'relative';
        link.style.zIndex = '10';
        
        // Verificar que el enlace tenga un href válido
        if (link.href && link.href !== '#' && link.href !== 'javascript:void(0)') {
            // Asegurar que el enlace sea funcional
            link.onclick = null; // Remover cualquier onclick que pueda interferir
        }
    });
}

// Función para traducir el contenido
function translateContent() {
    // Traducir títulos (incluyendo la barra lateral)
    const titles = document.querySelectorAll('h1, h2, h3');
    titles.forEach(title => {
        if (translations[title.textContent]) {
            title.textContent = translations[title.textContent];
        }
    });
    
    // Traducir párrafos
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        if (translations[p.textContent]) {
            p.textContent = translations[p.textContent];
        }
    });
    
    // Traducir elementos de lista (pero preservar enlaces)
    const listItems = document.querySelectorAll('li');
    listItems.forEach(li => {
        // Solo traducir si no contiene enlaces
        if (!li.querySelector('a') && translations[li.textContent]) {
            li.textContent = translations[li.textContent];
        }
    });
    
    // Traducir metadatos
    const metaTexts = document.querySelectorAll('.meta');
    metaTexts.forEach(meta => {
        if (translations[meta.textContent]) {
            meta.textContent = translations[meta.textContent];
        }
    });
    
    // Traducir enlaces de paginación
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        if (translations[link.textContent]) {
            link.textContent = translations[link.textContent];
        }
    });
    
    // Traducir enlaces de la barra lateral (solo el texto, no la URL)
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => {
        if (translations[link.textContent]) {
            // Preservar el href original
            const originalHref = link.href;
            link.textContent = translations[link.textContent];
            // Asegurar que el href se mantenga
            link.href = originalHref;
            // Asegurar que sea clickeable
            link.style.pointerEvents = 'auto';
            link.style.cursor = 'pointer';
        }
    });
    
    // Traducir otros elementos de la barra lateral
    const sidebarElements = document.querySelectorAll('.sidebar p, .sidebar li');
    sidebarElements.forEach(element => {
        // Solo traducir si no contiene enlaces
        if (!element.querySelector('a') && translations[element.textContent]) {
            element.textContent = translations[element.textContent];
        }
    });
    
    // Traducir enlaces principales (posts) - solo el texto, preservando funcionalidad
    const postLinks = document.querySelectorAll('h2 a');
    postLinks.forEach(link => {
        if (translations[link.textContent]) {
            // Preservar el href original
            const originalHref = link.href;
            link.textContent = translations[link.textContent];
            // Asegurar que el href se mantenga
            link.href = originalHref;
            // Asegurar que sea clickeable
            link.style.pointerEvents = 'auto';
            link.style.cursor = 'pointer';
        }
    });
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