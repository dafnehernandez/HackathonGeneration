/**
 * Carga un componente HTML en un contenedor
 * @param {string} id - ID del elemento contenedor
 * @param {string} path - Ruta al archivo HTML
 */
const loadComponent = async (id, path) => {
  const container = document.getElementById(id);
  if (!container) return;

  try {
    const html = await (await fetch(path)).text();
    container.innerHTML = html;
  } catch {
    console.warn(`Could not load: ${path}`);
  }
};

/**
 * Inicializa el layout cargando header y footer enn medio carga a registro
 */
export const initLayout = async () => {
  console.log('Loading layout components...'); //debug
  //cargar en orden componentes
  await loadComponent('header-placeholder', '/src/components/header.html');
  await loadComponent('registro-placeholder', '/src/components/registro.html');
  await loadComponent('footer-placeholder', '/src/components/footer.html');
};
