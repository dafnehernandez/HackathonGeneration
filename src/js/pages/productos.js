function cambiarGaleria(idGaleria) {
    // 1. Ocultar todas las galerías primero
    const galerias = document.querySelectorAll('.galeria');
    galerias.forEach(g => g.classList.remove('activa'));
    // 2. Mostrar la galería seleccionada
    const seleccionada = document.getElementById(idGaleria);
    seleccionada.classList.add('activa');
}

// document.addEventListener("DOMContentLoaded", () => {
//     cambiarGaleria('serie-a');
// });

// Script para el componente de productos
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const botonesGaleria = document.querySelectorAll('.btn-galeria');
    const galerias = document.querySelectorAll('.galeria');
    
    // Función para cambiar de galería
    function cambiarGaleria(idGaleria) {
        // Remover clase activa de todas las galerías
        galerias.forEach(galeria => {
            galeria.classList.remove('activa');
        });
        
        // Remover clase activa de todos los botones
        botonesGaleria.forEach(boton => {
            boton.classList.remove('activo');
        });
        
        // Activar galería seleccionada
        const galeriaSeleccionada = document.getElementById(idGaleria);
        if (galeriaSeleccionada) {
            galeriaSeleccionada.classList.add('activa');
        }
        
        // Activar botón correspondiente
        const botonActivo = document.querySelector(`.btn-galeria[data-galeria="${idGaleria}"]`);
        if (botonActivo) {
            botonActivo.classList.add('activo');
        }
    }
    
    // Asignar eventos a los botones
    botonesGaleria.forEach(boton => {
        boton.addEventListener('click', function() {
            const galeriaId = this.getAttribute('data-galeria');
            cambiarGaleria(galeriaId);
        });
    });
    
    // Inicializar con la primera galería activa
    cambiarGaleria('serie-a');
});