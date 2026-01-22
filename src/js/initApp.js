import { navbar } from "./components/navbar.js";
import { registro } from "./components/registro.js";

const initApp = () => {
  console.log("App initialized");

  const navbarContainer = document.getElementById("navbar");
  navbarContainer.innerHTML = navbar();
  const registroContainer = document.getElementById("registro");
  registroContainer.innerHTML = registro();
}

export {initApp};