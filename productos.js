function cambiarGaleria(idGaleria, colorFondo) {
            // 1. Ocultar todas las galerías primero
            const galerias = document.querySelectorAll('.galeria');
            galerias.forEach(g => g.classList.remove('activa'));

            // 2. Mostrar la galería seleccionada
            const seleccionada = document.getElementById(idGaleria);
            seleccionada.classList.add('activa');

            // 3. Cambiar el color de fondo del body (o del contenedor)
            document.body.style.backgroundColor = colorFondo;
}