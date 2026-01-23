import { registro } from "./components/registro.js";

const initApp = () => {
  console.log("App initialized");
  const registroContainer = document.getElementById("registro");
  registroContainer.innerHTML = registro();
}

export {initApp};