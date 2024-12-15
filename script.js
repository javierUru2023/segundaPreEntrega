
let usuarios = [];

let carrito = [];

function pedirDatosUsuario() {
  let nombre = prompt("Por favor, ingresa tu nombre:");
  let edad = parseInt(prompt("¿Cuántos años tienes?"));

  if (edad < 18) {
    alert("Lo siento, debes ser mayor de 18 años para realizar compras.");
    return false; 
  }

  usuarios.push({ nombre: nombre, edad: edad });

  return nombre;  
}

function verificarDatosUsuario() {
  if (usuarios.length > 0) {
    let ultimoUsuario = usuarios[usuarios.length - 1];  
    return ultimoUsuario.nombre;
  } else {
    return pedirDatosUsuario();  
  }
}

function mostrarProductos(categoria) {
  let productosLista = productos[categoria];
  let listaProductos = "Selecciona un producto:\n";

  productosLista.forEach((producto, index) => {
    listaProductos += `${index + 1}. ${producto.marca} ${producto.modelo} - U$S ${producto.precio}\n`;
  });

  let seleccion = prompt(listaProductos);

  if (seleccion !== null && seleccion >= 1 && seleccion <= productosLista.length) {
    let productoSeleccionado = productosLista[seleccion - 1];
    carrito.push(productoSeleccionado); 
    alert(`Has agregado: ${productoSeleccionado.marca} ${productoSeleccionado.modelo}\nPrecio: U$S ${productoSeleccionado.precio}`);
  } else {
    alert("Selección inválida. Por favor, elige un número de la lista.");
  }
}

function mostrarMenu() {
  let categorias = "Elige una categoría:\n1. Notebooks\n2. Monitores\n3. Impresoras\n4. Finalizar compra";
  let seleccionCategoria = prompt(categorias);

  switch (seleccionCategoria) {
    case "1":
      mostrarProductos("notebooks");
      break;
    case "2":
      mostrarProductos("monitores");
      break;
    case "3":
      mostrarProductos("impresoras");
      break;
    case "4":
      finalizarCompra();
      break;
    default:
      alert("Selección inválida. Por favor, elige una opción válida.");
  }
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("No has seleccionado productos. La compra ha sido cancelada.");
    return;
  }

  let resumenCarrito = "Tu carrito de compras:\n";
  let total = 0;

  carrito.forEach(producto => {
    resumenCarrito += `${producto.marca} ${producto.modelo} - U$S ${producto.precio}\n`;
    total += producto.precio;
  });

  resumenCarrito += `\nTotal a pagar: U$S ${total}`;

  let continuarCompra = prompt(`${resumenCarrito}\nDeseas seguir comprando?\n1. SI\n2. NO`);

  if (continuarCompra === "1") {
    mostrarMenu();
  }else if (continuarCompra === "2"){
    alert("Gracias por tu compra! Te esperamos pronto!!"); 
    usuarios = [];
    carrito = [];  
    iniciarAplicacion();
  }
}

function iniciarAplicacion() {
  let nombreUsuario = verificarDatosUsuario();
  
  if (nombreUsuario) {
    alert(`Bienvenido, ${nombreUsuario} a nuestra tienda online.`);
    while (true) {
      mostrarMenu();
    }
  }
}

iniciarAplicacion();