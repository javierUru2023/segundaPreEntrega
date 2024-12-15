
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

// Función para obtener las marcas disponibles en la categoría seleccionada
function obtenerMarcasDisponibles(categoria) {
  let marcas = new Set();
  productos[categoria].forEach(producto => {
    marcas.add(producto.marca.toLowerCase()); // Agregar marcas en minúsculas
  });
  return Array.from(marcas); // Convertir el Set en un Array
}

// Función de filtrado por marca o precio
function filtrarProductos(categoria, criterio, valor) {
  let productosFiltrados = productos[categoria];

  // Convertimos el valor a minúsculas para hacer una comparación insensible al caso (mayúsculas/minúsculas)
  valor = valor.toLowerCase();

  if (criterio === "marca") {
    // Filtra por marca, asegurando que tanto el valor del usuario como la marca del producto estén en minúsculas
    let productosDeMarca = productosFiltrados.filter(producto => producto.marca.toLowerCase() === valor);
    if (productosDeMarca.length === 0) {
      alert("No se encontraron productos de la marca indicada.");
    }
    return productosDeMarca;
  } else if (criterio === "precio") {
    // Filtra por precio
    let limitePrecio = parseFloat(valor);
    let productosPorPrecio = productosFiltrados.filter(producto => producto.precio <= limitePrecio);
    if (productosPorPrecio.length === 0) {
      alert("No se encontraron productos con ese rango de precio.");
    }
    return productosPorPrecio;
  } else {
    return productosFiltrados;
  }
}

function mostrarProductos(categoria) {
  let filtro = prompt("¿Deseas filtrar los productos?\n1. Filtrar por marca\n2. Filtrar por precio\n3. No filtrar\nPor favor, selecciona una opción:");

  let productosLista;

  switch (filtro) {
    case "1":
      // Obtener marcas disponibles en la categoría seleccionada
      let marcasDisponibles = obtenerMarcasDisponibles(categoria);
      let marcasLista = "Selecciona una marca:\n";
      marcasDisponibles.forEach((marca, index) => {
        marcasLista += `${index + 1}. ${marca}\n`;
      });
      let seleccionMarca = prompt(marcasLista);

      if (seleccionMarca !== null && seleccionMarca >= 1 && seleccionMarca <= marcasDisponibles.length) {
        let marcaSeleccionada = marcasDisponibles[seleccionMarca - 1];
        productosLista = filtrarProductos(categoria, "marca", marcaSeleccionada);
      } else {
        alert("Selección inválida. Mostrando todos los productos.");
        productosLista = productos[categoria];
      }
      break;
    case "2":
      let precio = prompt("Ingresa el precio máximo para el filtro:");
      productosLista = filtrarProductos(categoria, "precio", precio);
      break;
    case "3":
      productosLista = productos[categoria];
      break;
    default:
      alert("Opción inválida. Mostrando todos los productos.");
      productosLista = productos[categoria];
      break;
  }

  if (productosLista.length === 0) {
    alert("No se encontraron productos para mostrar.");
    return;
  }

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
  } else if (continuarCompra === "2") {
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