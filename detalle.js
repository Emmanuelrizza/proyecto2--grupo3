// Admin Navbar
const userLogged = JSON.parse(localStorage.getItem("userLogged"));
const divShowbtnNavbardetalle = document.getElementById("divShowbtnNavbardetalle");

if (!userLogged) {
    divShowbtnNavbardetalle.innerHTML = `
    <button type="button" class="btn bg-transparent text-white mx-1 fs-5" data-bs-toggle="modal" data-bs-target="#Login">
      Inicia sesion
    </button>
    <button type="button" class="btn bg-transparent text-white mx-1 fs-5" data-bs-toggle="modal" data-bs-target="#Registro">
      Registrate
    </button>
    `;
} else {
    divShowbtnNavbardetalle.innerHTML = `
    <div class="dropdown">
    <button class="btn bg-transparent text-white dropdown-toggle fs-5" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="fa-solid fa-user-astronaut"></i>
      ${userLogged.name}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <button type="button" class="dropdown-item" onclick="redirecti()">Mi perfil</button>
      <button type="button" class="dropdown-item" onclick="logOut()">Cerrar Sesión</button>
    </div>
  </div>
    `;
}

const redirecti = () => {
    window.location.href = "./index.html";
}

// const logOut = () => {
//     localStorage.removeItem("userLogged");
//     localStorage.removeItem("isAdmin");
//     setTimeout(() => {
//         window.location.href = `./index.html`;
//     }, 1000);
// };

const logOut = () => {
    localStorage.removeItem("userLogged");
    setTimeout(() => {
        window.location.href = `./index.html`;
    }, 1000);
    console.log ('hola')
};

