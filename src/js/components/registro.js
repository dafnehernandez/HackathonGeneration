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

const cargarEstadosEnSelect = () => {
  const select = document.getElementById('estadoSelect');
  if (!select) return;
  
  // Ordenar alfabéticamente
  estadosMexico.sort();
  
  // Agregar opciones
  estadosMexico.forEach(estado => {
    const option = document.createElement('option');
    option.value = estado;
    option.textContent = estado;
    select.appendChild(option);
  });
  
  console.log(`${estadosMexico.length} estados cargados`);
};

const inicializarFormulario = () => {
  // Cargar estados
  cargarEstadosEnSelect();
  
  // Configurar evento de envío
  const form = document.getElementById('formRegistro');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Formulario de registro enviado');
      // Aquí iría la lógica de envío real
    });
  }
};

// Exportar solo la función de inicialización
export const initRegistro = () => {
  // Esperar un momento para que el HTML se cargue
  setTimeout(() => {
    inicializarFormulario();
  }, 100);
};