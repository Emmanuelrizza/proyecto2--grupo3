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
        <td class="w-25"><img src="${prod.foto}" alt="${
            prod.nombre
            }" class="w-25"/></td>
        <td>${prod.nombre}</td>
        <td>${prod.descripcion}</td>
        <td>${prod.precio}</td>
        <td>
        <button type="button" onclick="uploadFormEditProduct(${prod.id})" class="btn btn-sm btn-warning text-light" data-bs-toggle="modal" data-bs-target="#editarProducto">
        <i class="fas fa-user-edit"></i></button>
        <button type="button" onclick="eliminarProducto(${
        prod.id
        })" class="btn btn-sm btn-danger">
        <i class="fas fa-trash-alt"></i></button></td>
        </tr>
        
        
        
        `).join('')
    
    
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

    productos.push({
        id,
        nombre,
        precio,
        foto,
        video,
        descripcion,
        categoria,
        deleteAt
    });

    localStorage.setItem('productos', JSON.stringify(productos));
    swal('producto guardado con exito','success');
    formAgregarProductos.reset();
    displayProductos();
   // bootstrap.Modal.getInstance(modalAgregarProductos).hide();
    
}





// Funciones para editar los productos 

let idProductoEditado;
const uploadFormEditProduct = (id) => {
  const producto = productos.find(producto => producto.id === id);
  nombreDelProductoEditado.value = producto.nombreDelProducto;
  precioDelProductoEditado.value = producto.precioDelProducto;
  fotoDelProductoEditado.value = producto.fotoDelProducto;
  videoDelProductoEditado.value = producto.videoDelProducto;
  descripcionDelProductoEditado.value = producto.descripcionDelProducto; 
  categoriaDelProductoEditado.value = producto.categoriaDelProducto;
  idProductoEditado = id;
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
    const updateProducts = productos.map((producto) =>
      producto.id === id ? producto.deleteAt = Date()  : producto
    );
    localStorage.setItem('productos', JSON.stringify(updateProducts));
    displayProductos();
};

