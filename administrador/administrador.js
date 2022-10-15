// Inyectando en el  documento HTML
const tablaDeProductos = document.querySelector('#tablaDeProductos')
// Datos JSON
const userAdmin = JSON.parse(localStorage.getItem('isAdmin'));
const productos = JSON.parse(localStorage.getItem('productos')) || [];
// Mostrar tabla de productos 
const mostrarProductos = (productos)=>{
    tablaDeProductos.innerHTML = productos.map(
       (prod, i)=> `
    <tr>
        <td>${++i}</td>
        <td class="th_img d-fle table-secondary my-1"><img src="${prod.foto}" alt="${prod.nombre}" class="img_producto w-100"/></td>
        <td>${prod.nombre}</td>
        <td>${prod.descripcion}</td>
        <td>${prod.precio}</td>
        <td>
        <div class="d-none d-md-flex">
        <button type="button" onclick="uploadFormEditProduct(${prod.id})" class="mx-1 btn btn-sm btn-warning text-light" data-bs-toggle="modal" data-bs-target="#editarProducto"><i class="fas fa-user-edit"></i></button>
        <button type="button" onclick="eliminarProducto(${prod.id})" class="mx-1 btn btn-sm btn-danger"><i class="fas fa-trash-alt"></i></button>
        <button type="button" onclick="NoPublicarProducto(${prod.id})" class="mx-1 btn btn-sm ${prod.publicado === true ? 'btn-success' : 'btn-secondary'} ${prod.publicado === true ? 'active' : 'disable'}">No publicar</i></button>
        <button type="button" onclick="publicarProducto(${prod.id})" class="mx-1 btn btn-sm ${prod.publicado === false ? 'btn-success' : 'btn-secondary'} ${prod.publicado === false ? 'active' : 'disable'}">Publicar</i></button>
        </div>


        <div class="dropdown d-md-none">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Opciones</button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li"><button type="button" onclick="uploadFormEditProduct(${prod.id})" class="btn btn-sm btn-warning text-light" data-bs-toggle="modal" data-bs-target="#editarProducto"><i class="fas fa-user-edit"></i></button> <button type="button" onclick="eliminarProducto(${prod.id})" class="btn btn-sm btn-danger"><i class="fas fa-trash-alt"></i></button></li>
                <li><button type="button" onclick="NoPublicarProducto(${prod.id})" class="btn btn-sm ${prod.publicado === true ? 'btn-success' : 'btn-secondary'} ${prod.publicado === true ? 'active' : 'disable'}">No publicar</i></button></li>
                <li><button type="button" onclick="publicarProducto(${prod.id})" class="btn btn-sm ${prod.publicado === false ? 'btn-success' : 'btn-secondary'} ${prod.publicado === false ? 'active' : 'disable'}">Publicar</i></button></li>
            </ul>
        </div></td>
        </tr>`).join('')
    
    
}
// Funcion para mostrar los productos
const displayProductos= ()=>{
    const productosLocalStorage = JSON.parse(localStorage.getItem('productos')) || []
    const productosDisponibles = productosLocalStorage.filter(
        (producto) => producto.deleteAt === 'no');
    mostrarProductos(productosDisponibles);
}
displayProductos();


// Datos para agregar productos
const formAgregarProductos = document.querySelector('#formAgregarProductos')
const nombreDelProducto = document.querySelector('#nombreDelProducto')
const precioDelProducto = document.querySelector('#precioDelProducto')
const fotoDelProducto = document.querySelector('#fotoDelProducto')
const videoDelProducto = document.querySelector('#videoDelProducto')
const descripcionDelProducto = document.querySelector('#descripcionDelProducto')
const categoriaDelProducto = document.querySelector('#categoriaDelProducto')


// Datos para editar productos

const formEditarProductos = document.querySelector('#formEditarProductos')
const nombreDelProductoEditado = document.querySelector('#nombreDelProductoEditado')
const precioDelProductoEditado = document.querySelector('#precioDelProductoEditado')
const fotoDelProductoEditado = document.querySelector('#fotoDelProductoEditado')
const videoDelProductoEditado = document.querySelector('#videoDelProductoEditado')
const descripcionDelProductoEditado = document.querySelector('#descripcionDelProductoEditado')
const categoriaDelProductoEditado = document.querySelector('#categoriaDelProductoEditado')








//Funcion para control de acceso
const controlDeAcceso = ()=>{
    if (!userAdmin){
        window.location.href = 'index.html'
    }
}

// Funcion para hacer un ID random 
function idRandom() {
    return new Date().getTime();
  }




// Funcion para agregar productos
formAgregarProductos.onsubmit = (e)=>{
    e.preventDefault();
    const id = idRandom();
    const nombre = nombreDelProducto.value;
    const precio = precioDelProducto.value;
    const foto = fotoDelProducto.value;
    const video = videoDelProducto.value;
    const descripcion = descripcionDelProducto.value;
    const categoria = categoriaDelProducto.value;
    const deleteAt = 'no';
    const publicado = true

    productos.push({
        id,
        nombre,
        precio,
        foto,
        video,
        descripcion,
        categoria,
        deleteAt,
        publicado
    });

    localStorage.setItem('productos', JSON.stringify(productos));
    swal('producto guardado con exito','success');
    formAgregarProductos.reset();
    displayProductos();
   // bootstrap.Modal.getInstance(modalAgregarProductos).hide();
    
}

// Funciones para publicar los productos



// Funciones para editar los productos 

let idProductoEditado;
const uploadFormEditProduct = (id) => {
  idProductoEditado = id;
  const producto = productos.find(producto => producto.id == idProductoEditado);
  nombreDelProductoEditado.value = producto.nombre;
  precioDelProductoEditado.value = producto.precio;
  fotoDelProductoEditado.value = producto.foto;
  videoDelProductoEditado.value = producto.video;
  descripcionDelProductoEditado.value = producto.descripcion; 
  categoriaDelProductoEditado.value = producto.categoria;
 
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
const eliminarProducto = (id,e) => {
    const updateProducts = productos.map((producto) =>
      producto.id === id ? producto.deleteAt = Date()  : producto
    );
    localStorage.setItem('productos', JSON.stringify(updateProducts));
    displayProductos();
};

const NoPublicarProducto = (id) => {
    const updateProducts = productos.map((producto) =>
      (producto.id === id && producto.publicado === true) ? {...producto, publicado : false}  : producto
    );
    localStorage.setItem('productos', JSON.stringify(updateProducts));
    displayProductos();
};

const publicarProducto = (id) => {
    const updateProducts = productos.map((producto) =>
      (producto.id === id && producto.publicado === false) ? {...producto, publicado : true} : producto
    );
    localStorage.setItem('productos', JSON.stringify(updateProducts));
    displayProductos();
};