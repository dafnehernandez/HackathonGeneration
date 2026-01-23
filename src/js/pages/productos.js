document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM para el tema
    const body = document.body;
    const imagenPrincipal = document.getElementById('imagen-principal');
    const rainOverlay = document.querySelector('.rain-overlay');
    const wavesContainer = document.querySelector('.waves-container');
    const rainImageContainer = document.querySelector('.rain-image-container');
    const btnTerrestre = document.getElementById('btn-terrestre');
    const btnAcuatico = document.getElementById('btn-acuatico');

    // Variables de estado
    let temaActual = 'acuatico'; // Por defecto

    // Imágenes para cada tema - CORRIGE LAS RUTAS AQUÍ
    const imagenesTemas = {
        terrestre: '/public/images/terrestre.webp', // Asegúrate que esta imagen existe
        acuatico: '/public/images/buceando.jpg'     // Asegúrate que esta imagen existe
    };

    // Función para cambiar entre temas
    window.cambiarTema = function(tema, color) {
        console.log(`Cambiando a tema: ${tema}, color: ${color}`);
        
        // Cambiar tema actual
        temaActual = tema;
        
        // 1. Cambiar color de fondo del body
        body.style.backgroundColor = color;
        
        // 2. Cambiar imagen principal
        if (imagenesTemas[tema] && imagenPrincipal) {
            console.log(`Cambiando imagen a: ${imagenesTemas[tema]}`);
            
            // Primero aplicar fade out
            imagenPrincipal.style.opacity = '0';
            
            // Después de un breve delay, cambiar la imagen y fade in
            setTimeout(() => {
                imagenPrincipal.src = imagenesTemas[tema];
                imagenPrincipal.alt = tema === 'terrestre' ? 'Portada Terrestre' : 'Portada Acuática';
                imagenPrincipal.style.opacity = '1';
            }, 300);
        }
        
        // 3. Activar/desactivar efectos según el tema
        if (tema === 'terrestre') {
            // Desactivar efectos acuáticos
            desactivarEfectosAcuaticos();
        } else {
            // Activar efectos acuáticos
            activarEfectosAcuaticos();
        }
        
        // 4. Cambiar galería automáticamente
        if (tema === 'terrestre') {
            cambiarGaleria('serie-a');
        } else {
            cambiarGaleria('serie-b');
        }
        
        // 5. Actualizar estado de botones
        actualizarBotonesTema(tema);
        
        // 6. Añadir clase al body para CSS
        body.classList.remove('tema-terrestre', 'tema-acuatico');
        body.classList.add(`tema-${tema}`);
    };
    
    // Función para desactivar efectos acuáticos
    function desactivarEfectosAcuaticos() {
        console.log('Desactivando efectos acuáticos');
        
        // Ocultar olas
        if (wavesContainer) {
            wavesContainer.style.opacity = '0';
            wavesContainer.style.pointerEvents = 'none';
        }
        
        // Remover efecto de lluvia
        if (rainOverlay) {
            rainOverlay.style.display = 'none';
        }
        
        // Remover animaciones de lluvia de tarjetas
        const tarjetas = document.querySelectorAll('.tarjeta');
        tarjetas.forEach(tarjeta => {
            tarjeta.style.animation = 'none';
        });
        
        // Añadir clase al body para CSS
        body.classList.add('sin-efectos-acuaticos');
    }
    
    // Función para activar efectos acuáticos
    function activarEfectosAcuaticos() {
        console.log('Activando efectos acuáticos');
        
        // Mostrar olas
        if (wavesContainer) {
            wavesContainer.style.opacity = '1';
            wavesContainer.style.pointerEvents = 'auto';
        }
        
        // Restaurar efecto de lluvia
        if (rainOverlay) {
            rainOverlay.style.display = 'block';
        }
        
        // Restaurar animaciones de tarjetas
        const tarjetas = document.querySelectorAll('.tarjeta');
        tarjetas.forEach(tarjeta => {
            tarjeta.style.animation = '';
        });
        
        // Remover clase del body
        body.classList.remove('sin-efectos-acuaticos');
    }
    
    // Función para actualizar estado de botones
    function actualizarBotonesTema(temaActivo) {
        // Remover clase activa de todos los botones
        const botones = document.querySelectorAll('.btn-tema');
        botones.forEach(btn => {
            btn.classList.remove('activo');
            btn.style.transform = 'scale(1)';
        });
        
        // Activar botón correspondiente
        const btnActivo = document.getElementById(`btn-${temaActivo}`);
        if (btnActivo) {
            btnActivo.classList.add('activo');
            btnActivo.style.transform = 'scale(1.05)';
        }
    }
    
    // Función para cambiar galería (existente pero corregida)
    window.cambiarGaleria = function(idGaleria) {
        console.log(`Cambiando a galería: ${idGaleria}`);
        
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
    
    // Inicializar con tema acuático
    setTimeout(() => {
        cambiarTema('acuatico', '#129fae');
    }, 100);
    
    // DEPURACIÓN: Verifica que los elementos existan
    console.log('Elementos encontrados:');
    console.log('- imagenPrincipal:', imagenPrincipal);
    console.log('- rainOverlay:', rainOverlay);
    console.log('- wavesContainer:', wavesContainer);
    console.log('- btnTerrestre:', btnTerrestre);
    console.log('- btnAcuatico:', btnAcuatico);
    console.log('- Imágenes disponibles:', imagenesTemas);
});