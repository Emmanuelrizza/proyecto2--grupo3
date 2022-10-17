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
const formSearch = document.getElementById("formSearch");
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
    <button type="button" class="btn bg-transparent text-dark mx-1 fs-5" data-bs-toggle="modal" data-bs-target="#Login">
      Inicia sesion
    </button>
    <button type="button" class="btn bg-transparent text-dark mx-1 fs-5" data-bs-toggle="modal" data-bs-target="#Registro">
      Registrate
    </button>
    `;
} else {
  divShowbtnNavbar.innerHTML = `
    <div class="dropdown">
    <button class="btn bg-transparent text-dark dropdown-toggle fs-5" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
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

//FUNCIONES
function idRandom() {
  return new Date().getTime();
}

//FUNCION DE REGISTRO.
formRegistro.onsubmit = (event) => {
  event.preventDefault();
  const name = inputNameRegistro.value;
  const lastName = inputLastNameRegistro.value;
  const email = inputEmailRegistro.value;
  const pass = inputPassRegistro.value;

  if (!regexPass.test(pass)) {
    console.log(regexPass.test(pass));
    pPassInvalid.classList.remove("d-none");
    return;
  }

  const findUser = users.find((user) => user.email === email);

  if (email === "admin@admin.com" && pass === "Admin123*") {
    users.push({
      id: idRandom(),
      name,
      lastName,
      email,
      pass,
      role: "admin",
      delete: false,
      suspended: false,
    });
    localStorage.setItem("users", JSON.stringify(users));
    swal({
      title: "Bienvenido!",
      text: "Te registraste con éxito!",
      icon: "success",
      buttons: false,
      timer: 3000,
    });
    formRegistro.reset();
    let modal = bootstrap.Modal.getInstance(Registro);
    modal.hide();
  } else if (!findUser) {
    users.push({
      id: idRandom(),
      name,
      lastName,
      email,
      pass,
      role: "client",
      delete: false,
      suspended: false,
    });

    localStorage.setItem("users", JSON.stringify(users));
    swal({
      title: "Bienvenido!",
      text: "Te registraste con éxito!",
      icon: "success",
      buttons: false,
      timer: 3000,
    });
    formRegistro.reset();
    let modal = bootstrap.Modal.getInstance(Registro);
    modal.hide();
  } else {
    pAlreadyEmail.classList.remove("d-none");
    return;
  }
};
//LOGIN.
formLogin.onsubmit = (e) => {
  e.preventDefault();
  const email = inputEmailLogin.value;
  const pass = inputPassLogin.value;
  const findUser = users.find(
    (user) => user.email === email && user.pass === pass
  );

  if (!findUser) {
    pUserNotCreated.classList.remove("d-none");
    return;
  } else if (findUser.email === "admin@admin.com" && pass === "Admin123*") {
    localStorage.setItem("isAdmin", JSON.stringify(findUser));
    localStorage.setItem("userLogged", JSON.stringify(findUser));
    swal("Bienvenido Admin");
    setTimeout(() => {
      window.location.href = "./administrador/administrador.html";
    }, 1000);
  } else {
    localStorage.setItem("userLogged", JSON.stringify(findUser));
    swal({
      title: "Bienvenido!",
      text: "Iniciaste sesión con éxito!",
      icon: "success",
      button: "INICIO",
    });
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 1000);
  }
};
//CONTRASEÑA OLVIDADA.
const forgottenPassword = () => {
  swal(
    "Escriba su dirección de correo electrónico para recuperar la contraseña.",
    {
      content: "input",
      closeOnClickOutside: false,
    }
  ).then((value = ``) => {
    swal({
      icon: "info",
      title: "Recuperación en curso",
      text: `Te enviamos una contraseña temporal a ${value}`,
      buttons: true,
      closeOnClickOutside: false,
    });
  });
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

const logOut = () => {
  localStorage.removeItem("userLogged");
  setTimeout(() => {
    location.reload();
  }, 1000);
};

// Ocultar contraseña - iconEye

const iconEye = document.querySelector(".icon-eye");

iconEye.addEventListener("click", function () {
  const icon = this.querySelector("i");

  if (this.nextElementSibling.type === "password") {
    this.nextElementSibling.type = "text";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  } else {
    this.nextElementSibling.type = "password";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  }
});
