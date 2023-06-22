const productosContainer = document.getElementById("productos-container");
const carritoContainer = document.getElementById("carrito-container");
const vaciarBtn = document.getElementById("vaciar-btn");

let productos = [];
let carrito = [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

function mostrarCarrito() {
  carritoContainer.innerHTML = "";

  if (carrito.length > 0) {
    let totalCompra = 0;

    carrito.forEach((item) => {
      const totalPorProducto = item.cantidad * item.precio;
      totalCompra += totalPorProducto;

      const productoElement = document.createElement("div");
      productoElement.innerHTML = `
        <p>Producto: ${item.nombre}</p>
        <p>Cantidad: ${item.cantidad}</p>
        <p>Total a pagar por producto: $${totalPorProducto}</p>
        <hr>
      `;

      carritoContainer.appendChild(productoElement);
    });

    const totalCompraElement = document.createElement("p");
    totalCompraElement.innerText = `Total a pagar por su compra: $${totalCompra}`;

    carritoContainer.appendChild(totalCompraElement);
  } else {
    carritoContainer.innerHTML = "<p>Carrito vacío. Gracias por visitarnos.</p>";
  }
}

function mostrarProductos() {
  productosContainer.innerHTML = "";

  productos.forEach((producto) => {
    const productoCard = document.createElement("div");
    productoCard.classList.add("card");

    const imagenElement = document.createElement("img");
    imagenElement.src = producto.imagen;
    imagenElement.alt = producto.nombre;
    imagenElement.classList.add("card-img-top", "small-image"); 

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const nombreElement = document.createElement("h5");
    nombreElement.classList.add("card-title");
    nombreElement.innerText = producto.nombre;

    const precioElement = document.createElement("p");
    precioElement.classList.add("card-text");
    precioElement.innerText = `Precio: $${producto.precio}`;

    const agregarBtn = document.createElement("button");
    agregarBtn.classList.add("btn", "btn-primary");
    agregarBtn.innerText = "Agregar al Carrito";
    agregarBtn.addEventListener("click", () => agregarAlCarrito(producto));

    cardBody.appendChild(nombreElement);
    cardBody.appendChild(precioElement);
    cardBody.appendChild(agregarBtn);

    productoCard.appendChild(imagenElement);
    productoCard.appendChild(cardBody);

    productosContainer.appendChild(productoCard);
  });
}


function agregarAlCarrito(producto) {
  const productoExistente = carrito.find((item) => item.nombre === producto.nombre);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  mostrarCarrito();

  Swal.fire({
    icon: 'success',
    title: 'Producto agregado',
    text: `Se ha agregado ${producto.nombre} al carrito.`,
    showConfirmButton: false,
    timer: 1500
  });
}

function vaciarCarrito() {
  if (carrito.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Carrito vacío',
      text: 'El carrito ya está vacío.',
      showConfirmButton: false,
      timer: 1500
    });
    return;
  }

  Swal.fire({
    icon: 'warning',
    title: 'Vaciar carrito',
    text: '¿Estás seguro de que deseas vaciar el carrito?',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Vaciar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      guardarCarrito();
      mostrarCarrito();

      Swal.fire({
        icon: 'success',
        title: 'Carrito vaciado',
        text: 'El carrito ha sido vaciado.',
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
}

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
    mostrarProductos();
  })
  .catch((error) => {
    console.error("Error al cargar los productos:", error);
  });

cargarCarrito();
mostrarCarrito();

vaciarBtn.addEventListener("click", vaciarCarrito);