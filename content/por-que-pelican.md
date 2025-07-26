Title: ¿Por Qué Este Blog Usa Pelican?
Date: 2025-07-25 16:00
Category: Blog
Tags: Pelican, Static Site, Django, Backend, Netlify
Author: Jesus Martinez
Summary: Descubre por qué este blog ha sido construido como un sitio estático con Pelican, y cómo se relaciona con su versión original de backend en Django.

¡Hola a todos!

Si estás leyendo esto, es probable que hayas notado la velocidad y la eficiencia de este blog. Hoy quiero compartir la razón detrás de su arquitectura y por qué elegí [Pelican](https://getpelican.com/) para potenciarlo.

## La Ventaja de los Sitios Estáticos

En el mundo del desarrollo web, existen dos grandes enfoques para construir sitios: dinámicos y estáticos. Los sitios dinámicos (como los construidos con Django, WordPress, etc.) generan el contenido "sobre la marcha" cada vez que un usuario los visita, consultando bases de datos y ejecutando lógica de servidor. Esto es potente, pero puede ser más lento y costoso.

Los sitios estáticos, por otro lado, son simplemente archivos HTML, CSS y JavaScript pre-generados. Cuando un usuario los visita, el servidor simplemente entrega esos archivos directamente. Esto ofrece ventajas significativas:

*   **Velocidad Extrema:** Al no haber procesamiento en el servidor, la carga es casi instantánea.
*   **Seguridad Mejorada:** Menos componentes dinámicos significan menos puntos de ataque.
*   **Costo Reducido:** Pueden alojarse de forma gratuita o muy económica en servicios como Netlify.
*   **Simplicidad de Mantenimiento:** Una vez generados, los archivos son muy fáciles de servir.

Pelican es un generador de sitios estáticos escrito en Python que me permite escribir mis posts en Markdown y luego "compilarlos" a HTML puro, aprovechando todas estas ventajas.

¡Espero que esta explicación aclare por qué elegí Pelican para este blog y cómo aprovecha las ventajas de los sitios estáticos!