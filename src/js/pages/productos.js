document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const imagenPrincipal = document.getElementById('imagen-principal');

    // Rutas de imágenes
    const imagenes = {
        terrestre: '/public/images/terrestre.webp', 
        acuatico: '/public/images/buceando.jpg'
    };

    window.cambiarTema = function(tema, color) {
        // Cambiamos la clase del body para que el CSS haga el resto
        body.className = `tema-${tema}`; 
        body.style.backgroundColor = color;

        // Cambio de imagen con transición
        if (imagenPrincipal) {
            imagenPrincipal.style.opacity = '0';
            
            setTimeout(() => {
                imagenPrincipal.src = imagenes[tema];
                // Forzamos el nombre de la clase para animar la entrada si quieres
                imagenPrincipal.onload = () => {
                    imagenPrincipal.style.opacity = '1';
                };
            }, 300);
        }

        // Cambiar la galería visible
        const galeriaId = (tema === 'terrestre') ? 'serie-a' : 'serie-b';
        cambiarGaleria(galeriaId);
    };

    window.cambiarGaleria = function(idGaleria) {
        const galerias = document.querySelectorAll('.galeria');
        galerias.forEach(g => {
            g.classList.remove('activa');
            g.style.display = 'none';
        });

        const seleccionada = document.getElementById(idGaleria);
        if (seleccionada) {
            seleccionada.classList.add('activa');
            seleccionada.style.display = 'grid';
        }
    };
});