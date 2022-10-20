// Admin Navbar
const userLogged = JSON.parse(localStorage.getItem("userLogged"));
const divShowbtnNavbarAbout = document.getElementById("divShowbtnNavbarAbout");

if (userLogged) {
  divShowbtnNavbarAbout.innerHTML = `
    <div class="dropdown-end">
    <button class="btn bg-transparent text-dark dropdown-toggle fs-5" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="fa-solid fa-user-astronaut"></i>
      ${userLogged.name}
    </button>
    <div class="dropdown-menu " aria-labelledby="dropdownMenuButton1">
      <button type="button" class="dropdown-item" onclick="logOut()">Cerrar Sesión</button>
    </div>
  </div>
    `;
} else {
    divShowbtnNavbarAbout.innerHTML = `
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

const logOut = () => {
  localStorage.removeItem("userLogged");
  localStorage.removeItem("isAdmin");
  setTimeout(() => {
    window.location.href = `../index.html`;
  }, 1000);
};