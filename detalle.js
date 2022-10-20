
// DIV PARA MOSTRAR LOS PRODUCTOS EN INDEX
const divMostrarProductos = document.querySelector("#divMostrarProductos");
const productos = JSON.parse(localStorage.getItem('productos')) || [];
const formSearch = document.getElementById('formSearch');

//FORMULARIO DE REGISTRO
const formRegistro = document.getElementById("registrationForm");
const inputNameRegistro = document.getElementById("InputNameRegistro");
const inputLastNameRegistro = document.getElementById("InputLastNameRegistro");
const inputEmailRegistro = document.getElementById("InputEmailRegistro");
const inputPassRegistro = document.getElementById("InputPasswordRegistro");
const modalRegistro = document.getElementById("Registro");
const pAlreadyEmail = document.getElementById("alreadyEmail");
const pPassInvalid = document.getElementById("passValid");

//REGEX - PASSWORD
const regexPass =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

//FORMULARIO DE LOGIN
const formLogin = document.getElementById("FormularioLogin");
const inputEmailLogin = document.getElementById("InputEmailLogin");
const inputPassLogin = document.getElementById("InputPasswordLogin");
const modalLogin = document.getElementById("Login");
const pUserNotCreated = document.getElementById("pUserNotCreated");
const inputSearch = document.getElementById("inputSearch");

//INFO LOCAL STORAGE
//Seteamos `users` y `usersLogged`
const users = JSON.parse(localStorage.getItem("users")) || [];
const userLogged = JSON.parse(localStorage.getItem("userLogged"));
const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

//HTML
const divShowbtnNavbar = document.getElementById("divShowbtnNavbar");

if (!userLogged) {
    divShowbtnNavbar.innerHTML = `
    <button type="button" class="btn bg-transparent text-dark mx-1 fs-5 text-white" data-bs-toggle="modal" data-bs-target="#Login">
      Inicia sesion
    </button>
    <button type="button" class="btn bg-transparent text-dark mx-1 fs-5 text-white" data-bs-toggle="modal" data-bs-target="#Registro">
      Registrate
    </button>
    `;
} else {
    divShowbtnNavbar.innerHTML = `
    <div class="dropdown">
    <button class="btn bg-transparent text-dark dropdown-toggle fs-5 text-white" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="fa-solid fa-user-astronaut"></i>
      ${userLogged.name}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <button type="button" class="dropdown-item" onclick="redirect()">Mi perfil</button>
      <button type="button" class="dropdown-item" onclick="logOut()">Cerrar Sesión</button>
    </div>
  </div>
    `;
}

const logOut = () => {
    localStorage.removeItem("userLogged");
    setTimeout(() => {
        location.reload();
    }, 1000);
};

const redirect = () => {
    if (userLogged.email === "admin@admin.com") {
        setTimeout(() => {
            window.location.href = "./administrador/administrador.html";
        }, 1000);
    } else {
        setTimeout(() => {
            window.location.href = "./index.html";
        }, 1000);
    }
};