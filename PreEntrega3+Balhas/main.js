const productos = [
    { nombre: "cajon", precio: 20000 },
    { nombre: "pandereta", precio: 12000 },
    { nombre: "conga compacta", precio: 25000 },
];

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
    const carritoContainer = document.getElementById("carrito-container");
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
    const productosContainer = document.getElementById("productos-container");
    productosContainer.innerHTML = "";
  
    productos.forEach((producto) => {
      const productoElement = document.createElement("div");
      productoElement.classList.add("producto");
  
      const nombreElement = document.createElement("h3");
      nombreElement.innerText = producto.nombre;
  
      const precioElement = document.createElement("p");
      precioElement.innerText = `Precio: $${producto.precio}`;
  
      const agregarBtn = document.createElement("button");
      agregarBtn.innerText = "Agregar al Carrito";
      agregarBtn.dataset.nombre = producto.nombre;
      agregarBtn.dataset.precio = producto.precio;
      agregarBtn.addEventListener("click", agregarAlCarrito);
  
      productoElement.appendChild(nombreElement);
      productoElement.appendChild(precioElement);
      productoElement.appendChild(agregarBtn);
  
      productosContainer.appendChild(productoElement);
    });
  }
  

  function agregarAlCarrito(event) {
    const nombre = event.target.dataset.nombre;
    const precio = Number(event.target.dataset.precio);
  
    const productoExistente = carrito.find((item) => item.nombre === nombre);
  
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }
  
    guardarCarrito();
    mostrarCarrito();
  }
  

  function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
  }
  

  mostrarProductos();
  cargarCarrito();
  mostrarCarrito();

  const vaciarBtn = document.getElementById("vaciar-btn");
  vaciarBtn.addEventListener("click", vaciarCarrito);
  