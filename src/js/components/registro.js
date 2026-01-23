// export const initRegistroForm = () => {
//   const form = document.querySelector('#registro-form');
//   if (!form) return;
  
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // Lógica de validación y envío
//     console.log('Formulario enviado');
//   });
// };

// src/js/registro.js

const estadosMexico = [
  "Aguascalientes",
  "Baja California", 
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "CDMX",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas"
];

// Expresiones regulares para validaciones
const patterns = {
  nombre: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,50}$/, // Solo letras y espacios, 2-50 caracteres
  apellidos: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,80}$/, //segun stackoverflow
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial
  telefono: /^[\d\s\-\+\(\)]{10,15}$/, // Formato de teléfono internacional
  ciudad: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,30}$/,
  direccion: /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ\s\.,#\-]{5,100}$/
};

// Mensajes de error
const errorMessages = {
  nombre: {
    required: 'El nombre es obligatorio',
    invalid: 'Solo se permiten letras y espacios (2-50 caracteres)'
  },
  apellidos: {
    required: 'Los apellidos son obligatorios',
    invalid: 'Solo se permiten letras y espacios (2-80 caracteres)'
  },
  email: {
    required: 'El correo electrónico es obligatorio',
    invalid: 'Por favor, ingresa un correo válido (ejemplo: usuario@dominio.com)'
  },
  password: {
    required: 'La contraseña es obligatoria',
    invalid: 'La contraseña debe tener mínimo 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)'
  },
  confirmPassword: {
    required: 'Debes confirmar tu contraseña',
    invalid: 'Las contraseñas no coinciden'
  },
  estado: {
    required: 'Debes seleccionar un estado'
  }
};

const cargarEstadosEnSelect = () => {
  const select = document.getElementById('estadoSelect');
  if (!select) return;
  
  // Ordenar alfabéticamente
  estadosMexico.sort();
  
  // Limpiar opciones existentes excepto la primera
  while (select.options.length > 1) {
    select.remove(1);
  }
  
  // Agregar opciones
  estadosMexico.forEach(estado => {
    const option = document.createElement('option');
    option.value = estado.toLowerCase().replace(/\s+/g, '_');
    option.textContent = estado;
    select.appendChild(option);
  });
  
  console.log(`${estadosMexico.length} estados cargados`);
};

const mostrarError = (input, message) => {
  // Limpiar error anterior
  const existingError = input.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Crear elemento de error
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message text-danger mt-1 small';
  errorElement.textContent = message;
  
  // Agregar clase de error al input
  input.classList.add('is-invalid');
  input.classList.remove('is-valid');
  
  // Insertar después del input
  input.parentElement.appendChild(errorElement);
  
  // Enfocar el campo con error
  input.focus();
};

const mostrarExito = (input) => {
  // Limpiar error anterior
  const existingError = input.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Agregar clase de éxito
  input.classList.add('is-valid');
  input.classList.remove('is-invalid');
};

const validarCampo = (input, type) => {
  const value = input.value.trim();
  
  // Si el campo es opcional (dirección o ciudad) y está vacío, es válido
  const camposOpcionales = ['direccion', 'ciudad'];
  if (camposOpcionales.includes(input.name) && value === '') {
    mostrarExito(input);
    return true;
  }
  
  // Validar campo requerido
  if (input.required && value === '') {
    mostrarError(input, errorMessages[type]?.required || 'Este campo es obligatorio');
    return false;
  }
  
  // Validar patrón específico
  if (patterns[type] && !patterns[type].test(value)) {
    mostrarError(input, errorMessages[type]?.invalid || 'Formato inválido');
    return false;
  }
  
  // Validaciones específicas
  switch(type) {
    case 'confirmPassword':
      const password = document.querySelector('input[name="password"]');
      if (password && value !== password.value) {
        mostrarError(input, errorMessages.confirmPassword.invalid);
        return false;
      }
      break;
      
    case 'email':
      if (value && !patterns.email.test(value)) {
        mostrarError(input, errorMessages.email.invalid);
        return false;
      }
      break;
  }
  
  // Si pasa todas las validaciones
  mostrarExito(input);
  return true;
};

const validarFormulario = (form) => {
  let isValid = true;
  
  // Validar todos los campos
  const campos = [
    { selector: 'input[name="nombre"]', type: 'nombre' },
    { selector: 'input[name="apellidos"]', type: 'apellidos' },
    { selector: 'input[name="email"]', type: 'email' },
    { selector: 'input[name="password"]', type: 'password' },
    { selector: 'input[name="confirmPassword"]', type: 'confirmPassword' },
    { selector: 'select[name="estado"]', type: 'estado' },
    { selector: 'input[name="direccion"]', type: 'direccion' },
    { selector: 'input[name="ciudad"]', type: 'ciudad' }
  ];
  
  campos.forEach(campo => {
    const input = form.querySelector(campo.selector);
    if (input && !validarCampo(input, campo.type)) {
      isValid = false;
    }
  });
  
  return isValid;
};

const mostrarMensajeExito = () => {
  // Crear o mostrar mensaje de éxito
  let successMessage = document.querySelector('.success-message');
  
  if (!successMessage) {
    successMessage = document.createElement('div');
    successMessage.className = 'success-message alert alert-success mt-3';
    successMessage.innerHTML = `
      <i class="fas fa-check-circle me-2"></i>
      <strong>¡Registro exitoso!</strong> Te hemos enviado un correo de confirmación.
    `;
    
    const form = document.querySelector('form');
    form.parentNode.insertBefore(successMessage, form.nextSibling);
  }
  
  successMessage.style.display = 'block';
  
  // Desplazar al mensaje de éxito
  setTimeout(() => {
    successMessage.scrollIntoView({ behavior: 'smooth' });
  }, 100);
  
  // Ocultar mensaje después de 5 segundos
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 5000);
};

const enviarFormulario = async (form) => {
  // Recopilar datos del formulario
  const formData = {
    nombre: form.querySelector('input[name="nombre"]').value.trim(),
    apellidos: form.querySelector('input[name="apellidos"]').value.trim(),
    email: form.querySelector('input[name="email"]').value.trim(),
    password: form.querySelector('input[name="password"]').value,
    direccion: form.querySelector('input[name="direccion"]').value.trim() || 'No especificada',
    ciudad: form.querySelector('input[name="ciudad"]').value.trim() || 'No especificada',
    estado: form.querySelector('select[name="estado"]').value,
    fechaRegistro: new Date().toISOString()
  };
  
  console.log('Datos del formulario:', formData);
  
  // Aquí iría la llamada a Formspree
  // Reemplaza 'YOUR_FORMSPREE_ID' con tu ID real
  const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORMSPREE_ID';
  
  try {
    // Simulación de envío (quita esto cuando uses Formspree real)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Para usar Formspree real, descomenta el siguiente código:
    /*
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      throw new Error('Error en el envío');
    }
    */
    
    // Mostrar mensaje de éxito
    mostrarMensajeExito();
    
    // Resetear formulario
    form.reset();
    
    // Limpiar estados de validación
    form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
      el.classList.remove('is-valid', 'is-invalid');
    });
    
    // Limpiar mensajes de error
    form.querySelectorAll('.error-message').forEach(el => {
      el.remove();
    });
    
    // Restaurar estado inicial del select
    const estadoSelect = document.getElementById('estadoSelect');
    if (estadoSelect) {
      estadoSelect.selectedIndex = 0;
    }
    
    return true;
    
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    
    // Mostrar mensaje de error
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Error al enviar';
    submitBtn.classList.add('btn-danger');
    
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.classList.remove('btn-danger');
    }, 3000);
    
    return false;
  }
};

const configurarEventosValidacion = (form) => {
  // Validación en tiempo real
  const inputs = form.querySelectorAll('input, select');
  
  inputs.forEach(input => {
    // Validar al perder foco
    input.addEventListener('blur', (e) => {
      let type = e.target.name;
      
      // Mapear tipos especiales
      if (!type) {
        if (e.target.id === 'estadoSelect') type = 'estado';
        else if (e.target.placeholder?.includes('contraseña')) {
          type = e.target.placeholder.includes('Confirma') ? 'confirmPassword' : 'password';
        }
      }
      
      if (type) {
        validarCampo(e.target, type);
      }
    });
    
    // Limpiar error al empezar a escribir
    input.addEventListener('input', (e) => {
      if (e.target.classList.contains('is-invalid')) {
        const errorElement = e.target.parentElement.querySelector('.error-message');
        if (errorElement) {
          errorElement.remove();
        }
        e.target.classList.remove('is-invalid');
      }
    });
  });
  
  // Validar contraseña en tiempo real
  const passwordInput = form.querySelector('input[name="password"]');
  const confirmPasswordInput = form.querySelector('input[name="confirmPassword"]');
  
  if (passwordInput && confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', () => {
      if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
        mostrarError(confirmPasswordInput, errorMessages.confirmPassword.invalid);
      } else if (confirmPasswordInput.value) {
        mostrarExito(confirmPasswordInput);
      }
    });
  }
};

const inicializarFormulario = () => {
  // Cargar estados
  cargarEstadosEnSelect();
  
  // Configurar evento de envío
  const form = document.querySelector('#registro form');
  if (!form) return;
  
  // Asignar names a los inputs si no los tienen
  const inputs = form.querySelectorAll('input');
  inputs.forEach((input, index) => {
    if (!input.name) {
      const placeholder = input.placeholder.toLowerCase();
      if (placeholder.includes('nombre')) input.name = 'nombre';
      else if (placeholder.includes('apellidos')) input.name = 'apellidos';
      else if (placeholder.includes('correo')) input.name = 'email';
      else if (placeholder.includes('contraseña')) {
        input.name = placeholder.includes('confirma') ? 'confirmPassword' : 'password';
      }
      else if (placeholder.includes('dirección')) input.name = 'direccion';
      else if (placeholder.includes('ciudad')) input.name = 'ciudad';
    }
  });
  
  // Asignar name al select
  const estadoSelect = document.getElementById('estadoSelect');
  if (estadoSelect && !estadoSelect.name) {
    estadoSelect.name = 'estado';
  }
  
  // Configurar eventos de validación
  configurarEventosValidacion(form);
  
  // Configurar evento de envío
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validar formulario
    if (!validarFormulario(form)) {
      // Mostrar alerta de error general
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle me-2"></i>Corrige los errores';
      submitBtn.classList.add('btn-warning');
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('btn-warning');
      }, 3000);
      
      return;
    }
    
    // Cambiar estado del botón
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
    submitBtn.disabled = true;
    
    // Enviar formulario
    const enviado = await enviarFormulario(form);
    
    // Restaurar botón
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    if (enviado) {
      console.log('Formulario enviado exitosamente');
    }
  });
};

// Exportar función de inicialización
export const initRegistro = () => {
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarFormulario);
  } else {
    inicializarFormulario();
  }
};