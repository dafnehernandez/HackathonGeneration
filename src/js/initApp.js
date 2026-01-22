import { navbar } from "./components/navbar.js";

const initApp = () => {
  console.log("App initialized");

  const navbarContainer = document.getElementById("navbar");
  navbarContainer.innerHTML = navbar();

}

export {initApp};