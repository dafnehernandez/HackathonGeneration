import { initLayout } from './components/load-components.js';
import { initRegistro } from './components/registro.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM Content Loaded');
  
  try {
    await initLayout();
    
    // Verificar que todo se cargó correctamente
    setTimeout(() => {
      const navbar = document.querySelector('.navbar');
      const footer = document.querySelector('footer');
      
      console.log('Navbar found:', !!navbar);
      console.log('Footer found:', !!footer);
      
      if (navbar) {
        // Asegurar que el navbar sea fixed
        navbar.classList.add('fixed-top');
        console.log('Navbar classes:', navbar.className);
      }
      
    }, 100);
    
  } catch (error) {
    console.error('Error loading layout:', error);
  }

  // Verificar si estamos en la página con el formulario de registro
  const registroSection = document.getElementById('registro');
    if (registroSection) {
      initRegistro();
    }
});
