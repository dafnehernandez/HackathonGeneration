const navbar = () => {
    return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="#">Home</a>
          <ul class="navbar-nav mx-auto me-lg-auto text-center text-lg-start">
              <li class="nav-item">
              <a class="nav-link active" href="#">Productos</a>
              </li>
              <li class="nav-item">
              <a class="nav-link active" href="#">Nosotros</a>
              </li>
              <li class="nav-item">
              <a class="nav-link active" href="#">Contactanos</a>
              </li>
              <li class="nav-item">
              <a class="nav-link active" href="#">Cuenta</a>
              </li>
              <li class="nav-item">
              <a class="navbar-brand" href="#">
                  <img src="public/images/carritoBlanco.png" alt="carrito" width="25">
              </a>
              </li>
          </div>
      </div>
    </nav>
    `
}

export {navbar};