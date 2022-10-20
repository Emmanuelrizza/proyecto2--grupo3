// Inyectando en el  documento HTML
const tablaDeProductos = document.querySelector("#tablaDeProductos");
// Datos JSON
const userAdmin = JSON.parse(localStorage.getItem("isAdmin"));
const productos = JSON.parse(localStorage.getItem("productos")) || [];
const productosHardCod = [
{
  id : idRandom(),
    nombre : "Samsung A30",
    precio : 40000,
    foto : "https://http2.mlstatic.com/D_NQ_NP_738933-MLA31838585007_082019-O.jpg" ,
    video : "https://youtu.be/u0_-vm-3dHo",
    descripcion : "características técnicas del A30: Sistema operativo Android 9.0 2340 x 1080 (FHD+) Cámara dual trasera16 Mpx + 5 Mpx Cámara frontal 16 Mpx Pantalla Touchscreen Batería 4000 mA RAM 3GB Memoria interna 32GB Memoria externa hasta 512GB Dual-SIM",
    categoria : "Tecnologia",
    deleteAt : "no",
    publicado : true,
    hardCode : true
},

{
  id : idRandom(),
    nombre : "Smart Philir 32",
    precio : 44000,
    foto : "https://images.philips.com/is/image/PhilipsConsumer/32PHG5301_77-IMS-es_AR?$jpglarge$&wid=1250" ,
    video : "https://youtu.be/6AROcVRbeg8",
    descripcion : "SMART LED TV PHILIPS 32 PULGADAS HD 32HD Alto: 48.62.  Ancho: 71.92.  Color: NEGRO.  Angulo de vision: AMPLIO.  Tipo: CD.  Base giratoria: NO.",
    categoria : "Tecnologia, Hogar",
    deleteAt : "no",
    publicado : true,
    hardCode : true
}
]
const hasProduct = ()=>{
  return productos.find(
    (producto)=> producto.hardCode === true 
  )
}

if(!hasProduct()){
  const newproducto = productos.concat(productosHardCod)
localStorage.setItem("productos", JSON.stringify(newproducto) )
}



// Mostrar tabla de productos
const mostrarProductos = (productos) => {
  tablaDeProductos.innerHTML = productos
    .map(
      (prod, i) => `
    <tr>
        <td>${++i}</td>
        <td class="contenedor-imagen d-none d-md-flex"><img src="${prod.foto}" alt="${prod.nombre}" class="w-100 d-none d-md-block imagen-producto"/></td>
        <td>${prod.nombre}</td>
        <td>${prod.descripcion}</td>
        <td>${prod.precio}</td>
        <td>
        <div class="d-none d-md-flex">
        <button type="button" onclick="uploadFormEditProduct(${prod.id})" class="mx-1  btn btn-sm btn-warning text-light" data-bs-toggle="modal" data-bs-target="#editarProducto"><i class="fas fa-user-edit"></i></button>
        <button type="button" onclick="eliminarProducto(${prod.id})" class="mx-1  btn btn-sm btn-danger"><i class="fas fa-trash-alt"></i></button>
        <button type="button" onclick="NoPublicarProducto(${prod.id})" class="mx-1  btn btn-sm ${prod.publicado === false ? "d-none" : "d.block"} ${prod.publicado === true ? "btn-success" : "btn-secondary"} ${prod.publicado === true ? "active" : "disable"}">No publicar</i></button>
        <button type="button" onclick="publicarProducto(${prod.id})" class="mx-1  btn btn-sm ${prod.publicado === true ? "d-none" : "d.block"} ${prod.publicado === false ? "btn-success" : "btn-secondary"} ${prod.publicado === false ? "active" : "disable"}">Publicar</i></button>
        </div>
        
        
        <div class="dropdown d-md-none">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Opciones</button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><button type="button" onclick="uploadFormEditProduct(${prod.id})" class="btn btn-sm btn-warning text-light" data-bs-toggle="modal" data-bs-target="#editarProducto"><i class="fas fa-user-edit"></i></button>
          <button type="button" onclick="eliminarProducto(${prod.id})" class="btn btn-sm btn-danger"><i class="fas fa-trash-alt"></i></button>
          <button type="button" onclick="NoPublicarProducto(${prod.id})" class="btn btn-sm ${prod.publicado === false ? "d-none" : "d.block"} ${prod.publicado === true ? "btn-success" : "btn-secondary"} ${prod.publicado === true ? "active" : "disable"}">No publicar</i></button>
          <button type="button" onclick="publicarProducto(${prod.id})" class="btn btn-sm ${prod.publicado === true ? "d-none" : "d.block"} ${prod.publicado === false ? "btn-success" : "btn-secondary"} ${prod.publicado === false ? "active" : "disable"}">Publicar</i></button></li>
        </ul>
        </div></td>
        
        
        
        </tr>`).join("");
};
// Funcion para mostrar los productos
const displayProductos = () => {
  const productosLocalStorage =
    JSON.parse(localStorage.getItem("productos")) || [];
  const productosDisponibles = productosLocalStorage.filter(
    (producto) => producto.deleteAt === "no"
  );
  mostrarProductos(productosDisponibles);
};
displayProductos();

// Datos para agregar productos
const formAgregarProductos = document.querySelector("#formAgregarProductos");
const nombreDelProducto = document.querySelector("#nombreDelProducto");
const precioDelProducto = document.querySelector("#precioDelProducto");
const fotoDelProducto = document.querySelector("#fotoDelProducto");
const videoDelProducto = document.querySelector("#videoDelProducto");
const descripcionDelProducto = document.querySelector(
  "#descripcionDelProducto"
);
const categoriaDelProducto = document.querySelector("#categoriaDelProducto");

// Datos para editar productos

const formEditarProductos = document.querySelector("#formEditarProductos");
const nombreDelProductoEditado = document.querySelector(
  "#nombreDelProductoEditado"
);
const precioDelProductoEditado = document.querySelector(
  "#precioDelProductoEditado"
);
const fotoDelProductoEditado = document.querySelector(
  "#fotoDelProductoEditado"
);
const videoDelProductoEditado = document.querySelector(
  "#videoDelProductoEditado"
);
const descripcionDelProductoEditado = document.querySelector(
  "#descripcionDelProductoEditado"
);
const categoriaDelProductoEditado = document.querySelector(
  "#categoriaDelProductoEditado"
);

//Funcion para control de acceso
const controlDeAcceso = () => {
  if (!userAdmin) {
    window.location.href = `../index.html`;
  }
};
//controlDeAcceso()

// Funcion para hacer un ID random
function idRandom() {
  return new Date().getTime();
}

// Funcion para agregar productos
formAgregarProductos.onsubmit = (e) => {
  e.preventDefault();
  const id = idRandom();
  const nombre = nombreDelProducto.value;
  const precio = precioDelProducto.value;
  const foto = fotoDelProducto.value;
  const video = videoDelProducto.value;
  const descripcion = descripcionDelProducto.value;
  const categoria = categoriaDelProducto.value;
  const deleteAt = "no";
  const publicado = true;

  productos.push({
    id,
    nombre,
    precio,
    foto,
    video,
    descripcion,
    categoria,
    deleteAt,
    publicado,
  });

  localStorage.setItem("productos", JSON.stringify(productos));
  swal("producto guardado con exito", "success");
  formAgregarProductos.reset();
  displayProductos();
  // bootstrap.Modal.getInstance(modalAgregarProductos).hide();
};

// Funciones para publicar los productos

// Funciones para editar los productos

let idProductoEditado;
const uploadFormEditProduct = (id) => {
  idProductoEditado = id;
  const producto = productos.find(
    (producto) => producto.id == idProductoEditado
  );
  nombreDelProductoEditado.value = producto.nombre;
  precioDelProductoEditado.value = producto.precio;
  fotoDelProductoEditado.value = producto.foto;
  videoDelProductoEditado.value = producto.video;
  descripcionDelProductoEditado.value = producto.descripcion;
  categoriaDelProductoEditado.value = producto.categoria;
};

formEditarProductos.onsubmit = (e) => {
  e.preventDefault();
  const nombre = nombreDelProductoEditado.value;
  const precio = precioDelProductoEditado.value;
  const foto = fotoDelProductoEditado.value;
  const video = videoDelProductoEditado.value;
  const descripcion = descripcionDelProductoEditado.value;
  const categoria = categoriaDelProductoEditado.value;

  const productoActualizado = productos.map((producto) =>
    producto.id === idProductoEditado
      ? { ...producto, nombre, precio, foto, video, descripcion, categoria }
      : producto
  );

  localStorage.setItem("productos", JSON.stringify(productoActualizado));
  swal("Producto editado con éxito", "success");
  formEditarProductos.reset();
  displayProductos();
  bootstrap.Modal.getInstance(editarProducto).hide();
};
formEditarProductos.onsubmit = (e)=>{
    e.preventDefault();
    const nombre = nombreDelProductoEditado.value;
    const precio = precioDelProductoEditado.value;
    const foto = fotoDelProductoEditado.value;
    const video = videoDelProductoEditado.value;
    const descripcion = descripcionDelProductoEditado.value;
    const categoria = categoriaDelProductoEditado.value;

    const productoActualizado = productos.map(
        (producto)=> producto.id === idProductoEditado ? {...producto,nombre, precio, foto, video, descripcion, categoria} : producto);

    localStorage.setItem('productos', JSON.stringify(productoActualizado)) 
    swal('Producto editado con éxito', 'success');   
    formEditarProductos.reset();
    displayProductos();
    bootstrap.Modal.getInstance(editarProducto).hide();

}

// FUNCION PARA ELIMINAR PRODUCTOS
const eliminarProducto = (id) => {
  productos.forEach((producto) => {
    if (producto.id === id) 
        
        producto.deleteAt= new Date()
  })

localStorage.setItem('productos', JSON.stringify(productos));
displayProductos();

};



const NoPublicarProducto = (id) => {
    productos.forEach((producto) => {
        if (producto.id === id && producto.publicado === true) 
            
            producto.publicado= false;
      })
    localStorage.setItem('productos', JSON.stringify(productos));
    displayProductos();
};



const publicarProducto = (id) => {
    productos.forEach((producto) => {
        if (producto.id === id && producto.publicado === false) 
            
            producto.publicado= true;
      })
    localStorage.setItem('productos', JSON.stringify(productos));
    displayProductos();
};

// Admin Navbar
const userLogged = JSON.parse(localStorage.getItem("userLogged"));
const divShowbtnNavbarAdmin = document.getElementById("divShowbtnNavbarAdmin");

if (userLogged) {
  divShowbtnNavbarAdmin.innerHTML = `
    <div class="dropdown-end">
    <button class="btn bg-transparent text-dark dropdown-toggle fs-5 text-white" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="fa-solid fa-user-astronaut"></i>
      ${userLogged.name}
    </button>
    <div class="dropdown-menu " aria-labelledby="dropdownMenuButton1">
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
