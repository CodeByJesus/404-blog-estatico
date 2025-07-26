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
    'No tags.': 'No hay etiquetas.',
    
    // Tercer post - Translation Challenges
    'Translation Challenges: Static vs Dynamic Blog Architecture': 'Desafíos de Traducción: Arquitectura Estática vs Dinámica',
    'Desafíos de Traducción: Arquitectura Estática vs Dinámica': 'Translation Challenges: Static vs Dynamic Blog Architecture',
    'Exploring the translation challenges we\'ve faced while implementing a translation system in our static blog, and how it differs from dynamic solutions.': 'Explorando los desafíos de traducción que hemos enfrentado al implementar un sistema de traducción en nuestro blog estático, y cómo difiere de las soluciones dinámicas.',
    'Explorando los desafíos de traducción que hemos enfrentado al implementar un sistema de traducción en nuestro blog estático, y cómo difiere de las soluciones dinámicas.': 'Exploring the translation challenges we\'ve faced while implementing a translation system in our static blog, and how it differs from dynamic solutions.',
    'The Problem We Faced': 'El Problema que Enfrentamos',
    'El Problema que Enfrentamos': 'The Problem We Faced',
    'Recently, I\'ve been working on adding a translation feature to this static blog built with Pelican. What seemed like a simple task turned into a fascinating exploration of the differences between static and dynamic web architectures, particularly when it comes to implementing client-side translations.': 'Recientemente, he estado trabajando en agregar una función de traducción a este blog estático construido con Pelican. Lo que parecía una tarea simple se convirtió en una exploración fascinante de las diferencias entre las arquitecturas web estáticas y dinámicas, particularmente cuando se trata de implementar traducciones del lado del cliente.',
    'Recientemente, he estado trabajando en agregar una función de traducción a este blog estático construido con Pelican. Lo que parecía una tarea simple se convirtió en una exploración fascinante de las diferencias entre las arquitecturas web estáticas y dinámicas, particularmente cuando se trata de implementar traducciones del lado del cliente.': 'Recently, I\'ve been working on adding a translation feature to this static blog built with Pelican. What seemed like a simple task turned into a fascinating exploration of the differences between static and dynamic web architectures, particularly when it comes to implementing client-side translations.',
    'The Initial Approach: Google Translate API': 'El Enfoque Inicial: API de Google Translate',
    'El Enfoque Inicial: API de Google Translate': 'The Initial Approach: Google Translate API',
    'Our first attempt was to integrate Google Translate API. The idea was simple:': 'Nuestro primer intento fue integrar la API de Google Translate. La idea era simple:',
    'Nuestro primer intento fue integrar la API de Google Translate. La idea era simple:': 'Our first attempt was to integrate Google Translate API. The idea was simple:',
    'Load the Google Translate widget': 'Cargar el widget de Google Translate',
    'Cargar el widget de Google Translate': 'Load the Google Translate widget',
    'Let users select their preferred language': 'Permitir que los usuarios seleccionen su idioma preferido',
    'Permitir que los usuarios seleccionen su idioma preferido': 'Let users select their preferred language',
    'Watch as the entire page magically translates': 'Ver cómo toda la página se traduce mágicamente',
    'Ver cómo toda la página se traduce mágicamente': 'Watch as the entire page magically translates',
    'The Reality:': 'La Realidad:',
    'La Realidad:': 'The Reality:',
    'But it quickly became apparent that this approach had several issues:': 'Pero rápidamente se hizo evidente que este enfoque tenía varios problemas:',
    'Pero rápidamente se hizo evidente que este enfoque tenía varios problemas:': 'But it quickly became apparent that this approach had several issues:',
    'Inconsistent behavior across different browsers': 'Comportamiento inconsistente en diferentes navegadores',
    'Comportamiento inconsistente en diferentes navegadores': 'Inconsistent behavior across different browsers',
    'Layout breaking when text lengths changed dramatically': 'Ruptura del diseño cuando las longitudes de texto cambiaban dramáticamente',
    'Ruptura del diseño cuando las longitudes de texto cambiaban dramáticamente': 'Layout breaking when text lengths changed dramatically',
    'SEO complications with dynamically translated content': 'Complicaciones de SEO con contenido traducido dinámicamente',
    'Complicaciones de SEO con contenido traducido dinámicamente': 'SEO complications with dynamically translated content',
    'Performance overhead from loading external scripts': 'Sobrecarga de rendimiento por cargar scripts externos',
    'Sobrecarga de rendimiento por cargar scripts externos': 'Performance overhead from loading external scripts',
    'The Manual Translation Approach': 'El Enfoque de Traducción Manual',
    'El Enfoque de Traducción Manual': 'The Manual Translation Approach',
    'We then switched to a manual translation system using JavaScript dictionaries:': 'Luego cambiamos a un sistema de traducción manual usando diccionarios de JavaScript:',
    'Luego cambiamos a un sistema de traducción manual usando diccionarios de JavaScript:': 'We then switched to a manual translation system using JavaScript dictionaries:',
    'This approach seemed more reliable, but we encountered a critical issue that highlights the fundamental difference between static and dynamic architectures.': 'Este enfoque parecía más confiable, pero encontramos un problema crítico que resalta la diferencia fundamental entre las arquitecturas estáticas y dinámicas.',
    'Este enfoque parecía más confiable, pero encontramos un problema crítico que resalta la diferencia fundamental entre las arquitecturas estáticas y dinámicas.': 'This approach seemed more reliable, but we encountered a critical issue that highlights the fundamental difference between static and dynamic architectures.',
    'The Link Breaking Problem': 'El Problema de Enlaces Rotos',
    'El Problema de Enlaces Rotos': 'The Link Breaking Problem',
    'Here\'s where things got interesting. When we implemented the translation function:': 'Aquí es donde las cosas se pusieron interesantes. Cuando implementamos la función de traducción:',
    'Aquí es donde las cosas se pusieron interesantes. Cuando implementamos la función de traducción:': 'Here\'s where things got interesting. When we implemented the translation function:',
    'The Problem: Links stopped working after translation.': 'El Problema: Los enlaces dejaron de funcionar después de la traducción.',
    'El Problema: Los enlaces dejaron de funcionar después de la traducción.': 'The Problem: Links stopped working after translation.',
    'Why This Happens:': 'Por Qué Sucede Esto:',
    'Por Qué Sucede Esto:': 'Why This Happens:',
    'DOM Manipulation: When we change textContent, we\'re modifying the DOM structure': 'Manipulación del DOM: Cuando cambiamos textContent, estamos modificando la estructura del DOM',
    'Manipulación del DOM: Cuando cambiamos textContent, estamos modificando la estructura del DOM': 'DOM Manipulation: When we change textContent, we\'re modifying the DOM structure',
    'Event Listeners: Some event listeners might get detached or become inconsistent': 'Escuchadores de Eventos: Algunos escuchadores de eventos podrían desconectarse o volverse inconsistentes',
    'Escuchadores de Eventos: Algunos escuchadores de eventos podrían desconectarse o volverse inconsistentes': 'Event Listeners: Some event listeners might get detached or become inconsistent',
    'Browser Behavior: Modern browsers are very sensitive to DOM changes, especially on interactive elements': 'Comportamiento del Navegador: Los navegadores modernos son muy sensibles a los cambios del DOM, especialmente en elementos interactivos',
    'Comportamiento del Navegador: Los navegadores modernos son muy sensibles a los cambios del DOM, especialmente en elementos interactivos': 'Browser Behavior: Modern browsers are very sensitive to DOM changes, especially on interactive elements',
    'Static vs Dynamic: The Key Differences': 'Estático vs Dinámico: Las Diferencias Clave',
    'Estático vs Dinámico: Las Diferencias Clave': 'Static vs Dynamic: The Key Differences',
    'Dynamic Blog (Django/WordPress)': 'Blog Dinámico (Django/WordPress)',
    'Blog Dinámico (Django/WordPress)': 'Dynamic Blog (Django/WordPress)',
    'Server-side translation': 'Traducción del lado del servidor',
    'Traducción del lado del servidor': 'Server-side translation',
    'Advantages:': 'Ventajas:',
    'Ventajas:': 'Advantages:',
    'Clean URLs: /post/my-post/?lang=en': 'URLs Limpias: /post/my-post/?lang=en',
    'URLs Limpias: /post/my-post/?lang=en': 'Clean URLs: /post/my-post/?lang=en',
    'SEO Friendly: Each language has its own URL': 'Amigable para SEO: Cada idioma tiene su propia URL',
    'Amigable para SEO: Cada idioma tiene su propia URL': 'SEO Friendly: Each language has its own URL',
    'No JavaScript Required: Server handles everything': 'No Se Requiere JavaScript: El servidor maneja todo',
    'No Se Requiere JavaScript: El servidor maneja todo': 'No JavaScript Required: Server handles everything',
    'Consistent Behavior: Links always work': 'Comportamiento Consistente: Los enlaces siempre funcionan',
    'Comportamiento Consistente: Los enlaces siempre funcionan': 'Consistent Behavior: Links always work',
    'Static Blog (Pelican)': 'Blog Estático (Pelican)',
    'Blog Estático (Pelican)': 'Static Blog (Pelican)',
    'Client-side translation': 'Traducción del lado del cliente',
    'Traducción del lado del cliente': 'Client-side translation',
    'We have to be very careful with DOM manipulation': 'Tenemos que ser muy cuidadosos con la manipulación del DOM',
    'Tenemos que ser muy cuidadosos con la manipulación del DOM': 'We have to be very careful with DOM manipulation',
    'Challenges:': 'Desafíos:',
    'Desafíos:': 'Challenges:',
    'DOM Fragility: Any DOM manipulation can break functionality': 'Fragilidad del DOM: Cualquier manipulación del DOM puede romper la funcionalidad',
    'Fragilidad del DOM: Cualquier manipulación del DOM puede romper la funcionalidad': 'DOM Fragility: Any DOM manipulation can break functionality',
    'No Server Control: Everything happens client-side': 'Sin Control del Servidor: Todo sucede del lado del cliente',
    'Sin Control del Servidor: Todo sucede del lado del cliente': 'No Server Control: Everything happens client-side',
    'SEO Limitations: Search engines see only one version': 'Limitaciones de SEO: Los motores de búsqueda ven solo una versión',
    'Limitaciones de SEO: Los motores de búsqueda ven solo una versión': 'SEO Limitations: Search engines see only one version',
    'Browser Dependencies: Different browsers handle DOM changes differently': 'Dependencias del Navegador: Diferentes navegadores manejan los cambios del DOM de manera diferente',
    'Dependencias del Navegador: Diferentes navegadores manejan los cambios del DOM de manera diferente': 'Browser Dependencies: Different browsers handle DOM changes differently',
    'Our Solution: Ultra-Conservative Translation': 'Nuestra Solución: Traducción Ultra-Conservadora',
    'Nuestra Solución: Traducción Ultra-Conservadora': 'Our Solution: Ultra-Conservative Translation',
    'After multiple iterations, we arrived at a solution that prioritizes functionality over completeness:': 'Después de múltiples iteraciones, llegamos a una solución que prioriza la funcionalidad sobre la completitud:',
    'Después de múltiples iteraciones, llegamos a una solución que prioriza la funcionalidad sobre la completitud:': 'After multiple iterations, we arrived at a solution that prioritizes functionality over completeness:',
    'Only translate elements that definitely don\'t contain links': 'Solo traducir elementos que definitivamente no contengan enlaces',
    'Solo traducir elementos que definitivamente no contengan enlaces': 'Only translate elements that definitely don\'t contain links',
    'Key Principles:': 'Principios Clave:',
    'Principios Clave:': 'Key Principles:',
    'Never touch elements with links': 'Nunca tocar elementos con enlaces',
    'Nunca tocar elementos con enlaces': 'Never touch elements with links',
    'Verify before translating': 'Verificar antes de traducir',
    'Verificar antes de traducir': 'Verify before translating',
    'Preserve all interactive functionality': 'Preservar toda la funcionalidad interactiva',
    'Preservar toda la funcionalidad interactiva': 'Preserve all interactive functionality',
    'Accept partial translation': 'Aceptar traducción parcial',
    'Aceptar traducción parcial': 'Accept partial translation',
    'Why This Matters for Static Sites': 'Por Qué Esto Importa para Sitios Estáticos',
    'Por Qué Esto Importa para Sitios Estáticos': 'Why This Matters for Static Sites',
    'This experience highlights why static sites, while excellent for performance and security, have different constraints than dynamic sites:': 'Esta experiencia resalta por qué los sitios estáticos, aunque excelentes para el rendimiento y la seguridad, tienen diferentes restricciones que los sitios dinámicos:',
    'Esta experiencia resalta por qué los sitios estáticos, aunque excelentes para el rendimiento y la seguridad, tienen diferentes restricciones que los sitios dinámicos:': 'This experience highlights why static sites, while excellent for performance and security, have different constraints than dynamic sites:',
    'Performance Benefits': 'Beneficios de Rendimiento',
    'Beneficios de Rendimiento': 'Performance Benefits',
    'Instant Loading: No server processing': 'Carga Instantánea: Sin procesamiento del servidor',
    'Carga Instantánea: Sin procesamiento del servidor': 'Instant Loading: No server processing',
    'Enhanced Security: No server-side vulnerabilities': 'Seguridad Mejorada: Sin vulnerabilidades del lado del servidor',
    'Seguridad Mejorada: Sin vulnerabilidades del lado del servidor': 'Enhanced Security: No server-side vulnerabilities',
    'Cost Effective: Can be hosted for free': 'Económicamente Eficiente: Se puede alojar gratis',
    'Económicamente Eficiente: Se puede alojar gratis': 'Cost Effective: Can be hosted for free',
    'Translation Limitations': 'Limitaciones de Traducción',
    'Limitaciones de Traducción': 'Translation Limitations',
    'Manual Maintenance: Translation dictionaries must be updated manually': 'Mantenimiento Manual: Los diccionarios de traducción deben actualizarse manualmente',
    'Mantenimiento Manual: Los diccionarios de traducción deben actualizarse manualmente': 'Manual Maintenance: Translation dictionaries must be updated manually',
    'Link Sensitivity: DOM manipulation can break functionality': 'Sensibilidad de Enlaces: La manipulación del DOM puede romper la funcionalidad',
    'Sensibilidad de Enlaces: La manipulación del DOM puede romper la funcionalidad': 'Link Sensitivity: DOM manipulation can break functionality',
    'Partial Coverage: Not all content can be safely translated': 'Cobertura Parcial: No todo el contenido se puede traducir de forma segura',
    'Cobertura Parcial: No todo el contenido se puede traducir de forma segura': 'Partial Coverage: Not all content can be safely translated',
    'Lessons Learned': 'Lecciones Aprendidas',
    'Lecciones Aprendidas': 'Lessons Learned',
    'Static sites require different thinking: What works in dynamic sites doesn\'t always translate (pun intended) to static sites.': 'Los sitios estáticos requieren un pensamiento diferente: Lo que funciona en sitios dinámicos no siempre se traduce (juego de palabras intencional) a sitios estáticos.',
    'Los sitios estáticos requieren un pensamiento diferente: Lo que funciona en sitios dinámicos no siempre se traduce (juego de palabras intencional) a sitios estáticos.': 'Static sites require different thinking: What works in dynamic sites doesn\'t always translate (pun intended) to static sites.',
    'DOM manipulation is fragile: Even simple textContent changes can have unexpected consequences.': 'La manipulación del DOM es frágil: Incluso los cambios simples de textContent pueden tener consecuencias inesperadas.',
    'La manipulación del DOM es frágil: Incluso los cambios simples de textContent pueden tener consecuencias inesperadas.': 'DOM manipulation is fragile: Even simple textContent changes can have unexpected consequences.',
    'Functionality over completeness: It\'s better to have a working site with partial translation than a broken site with complete translation.': 'Funcionalidad sobre completitud: Es mejor tener un sitio funcional con traducción parcial que un sitio roto con traducción completa.',
    'Funcionalidad sobre completitud: Es mejor tener un sitio funcional con traducción parcial que un sitio roto con traducción completa.': 'Functionality over completeness: It\'s better to have a working site with partial translation than a broken site with complete translation.',
    'Browser behavior is unpredictable: Different browsers handle DOM changes differently.': 'El comportamiento del navegador es impredecible: Diferentes navegadores manejan los cambios del DOM de manera diferente.',
    'El comportamiento del navegador es impredecible: Diferentes navegadores manejan los cambios del DOM de manera diferente.': 'Browser behavior is unpredictable: Different browsers handle DOM changes differently.',
    'The Future of Static Site Translation': 'El Futuro de la Traducción de Sitios Estáticos',
    'El Futuro de la Traducción de Sitios Estáticos': 'The Future of Static Site Translation',
    'For truly robust translation in static sites, we might need to consider:': 'Para una traducción verdaderamente robusta en sitios estáticos, podríamos necesitar considerar:',
    'Para una traducción verdaderamente robusta en sitios estáticos, podríamos necesitar considerar:': 'For truly robust translation in static sites, we might need to consider:',
    'Build-time translation: Generate separate HTML files for each language': 'Traducción en tiempo de compilación: Generar archivos HTML separados para cada idioma',
    'Traducción en tiempo de compilación: Generar archivos HTML separados para cada idioma': 'Build-time translation: Generate separate HTML files for each language',
    'URL-based switching: /en/post-slug vs /es/post-slug': 'Cambio basado en URL: /en/post-slug vs /es/post-slug',
    'Cambio basado en URL: /en/post-slug vs /es/post-slug': 'URL-based switching: /en/post-slug vs /es/post-slug',
    'Progressive enhancement: Start with basic functionality, enhance with JavaScript': 'Mejora progresiva: Comenzar con funcionalidad básica, mejorar con JavaScript',
    'Mejora progresiva: Comenzar con funcionalidad básica, mejorar con JavaScript': 'Progressive enhancement: Start with basic functionality, enhance with JavaScript',
    'Conclusion': 'Conclusión',
    'Conclusión': 'Conclusion',
    'While our translation system isn\'t perfect, it represents a realistic compromise between functionality and translation coverage. The challenges we\'ve faced highlight the fundamental differences between static and dynamic web architectures.': 'Aunque nuestro sistema de traducción no es perfecto, representa un compromiso realista entre funcionalidad y cobertura de traducción. Los desafíos que hemos enfrentado resaltan las diferencias fundamentales entre las arquitecturas web estáticas y dinámicas.',
    'Aunque nuestro sistema de traducción no es perfecto, representa un compromiso realista entre funcionalidad y cobertura de traducción. Los desafíos que hemos enfrentado resaltan las diferencias fundamentales entre las arquitecturas web estáticas y dinámicas.': 'While our translation system isn\'t perfect, it represents a realistic compromise between functionality and translation coverage. The challenges we\'ve faced highlight the fundamental differences between static and dynamic web architectures.',
    'For now, we have a working solution that:': 'Por ahora, tenemos una solución funcional que:',
    'Por ahora, tenemos una solución funcional que:': 'For now, we have a working solution that:',
    'Preserves all link functionality': 'Preserva toda la funcionalidad de enlaces',
    'Preserva toda la funcionalidad de enlaces': 'Preserves all link functionality',
    'Provides partial translation coverage': 'Proporciona cobertura de traducción parcial',
    'Proporciona cobertura de traducción parcial': 'Provides partial translation coverage',
    'Maintains the performance benefits of static sites': 'Mantiene los beneficios de rendimiento de los sitios estáticos',
    'Mantiene los beneficios de rendimiento de los sitios estáticos': 'Maintains the performance benefits of static sites',
    'Works consistently across browsers': 'Funciona consistentemente en todos los navegadores',
    'Funciona consistentemente en todos los navegadores': 'Works consistently across browsers',
    'Sometimes, the best solution isn\'t the most complete one, but the one that works reliably within the constraints of your chosen architecture.': 'A veces, la mejor solución no es la más completa, sino la que funciona de manera confiable dentro de las restricciones de tu arquitectura elegida.',
    'A veces, la mejor solución no es la más completa, sino la que funciona de manera confiable dentro de las restricciones de tu arquitectura elegida.': 'Sometimes, the best solution isn\'t the most complete one, but the one that works reliably within the constraints of your chosen architecture.',
    'This post was written as we were solving the translation challenges in real-time. The solution we arrived at represents several iterations of trial and error, highlighting the iterative nature of web development and the importance of understanding your platform\'s constraints.': 'Este post fue escrito mientras estábamos resolviendo los desafíos de traducción en tiempo real. La solución a la que llegamos representa varias iteraciones de prueba y error, resaltando la naturaleza iterativa del desarrollo web y la importancia de entender las restricciones de tu plataforma.'
};

// Función de traducción manual - versión simplificada
function translatePage() {
    const translateBtn = document.getElementById('translate-btn');
    
    if (!isTranslated) {
        // Traducir a inglés
        isTranslated = true;
        translateBtn.innerHTML = '<i class="fas fa-language"></i> Español';
        translateBtn.classList.add('translating');
        
        // Solo traducir elementos que no sean enlaces
        translateSafeElements();
        
    } else {
        // Traducir de vuelta a español
        isTranslated = false;
        translateBtn.innerHTML = '<i class="fas fa-language"></i> Inglés';
        translateBtn.classList.remove('translating');
        
        // Restaurar contenido original
        translateSafeElements();
    }
}

// Función para traducir solo elementos seguros (sin tocar enlaces)
function translateSafeElements() {
    // Solo traducir títulos principales (h1)
    const mainTitles = document.querySelectorAll('h1');
    mainTitles.forEach(title => {
        if (translations[title.textContent]) {
            title.textContent = translations[title.textContent];
        }
    });
    
    // Solo traducir párrafos que no contengan enlaces
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        if (!p.querySelector('a') && translations[p.textContent]) {
            p.textContent = translations[p.textContent];
        }
    });
    
    // Solo traducir metadatos
    const metaTexts = document.querySelectorAll('.meta');
    metaTexts.forEach(meta => {
        if (translations[meta.textContent]) {
            meta.textContent = translations[meta.textContent];
        }
    });
    
    // Solo traducir elementos de la barra lateral que no sean enlaces
    const sidebarElements = document.querySelectorAll('.sidebar h3, .sidebar p');
    sidebarElements.forEach(element => {
        if (!element.querySelector('a') && translations[element.textContent]) {
            element.textContent = translations[element.textContent];
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