const productos = [
    { nombre: "cajon", precio: 20000 },
    { nombre: "pandereta", precio: 12000 },
    { nombre: "conga compacta", precio: 25000 },
];

let carrito = [];

    alert('¡Buenas tardes! Si desea ver nuestros productos disponibles, ingrese "aceptar".');
        let listaDeProductos = productos.map(
        (producto) => ` ${producto.nombre} $${producto.precio}`
);

alert(listaDeProductos);
    let seleccion = "agregar";
    while (seleccion === "agregar") {
        let producto = prompt("Agregue un producto a su carrito");
        let unidades = 0;
        if (
            producto === "cajon" ||
            producto === "pandereta" ||
            producto === "conga compacta"
        ) {
            unidades = parseInt(prompt("¿Cuántas unidades desea llevar?"));
        
            if (unidades > 0) {
            let productoEncontrado = productos.find(
                (p) => p.nombre === producto
            );
        
            if (productoEncontrado) {
                let productoExistente = carrito.find(
                (item) => item.producto === productoEncontrado.nombre
                );
        
                if (productoExistente) {
                    productoExistente.unidades += unidades;
                }     else {
                        carrito.push({
                        producto: productoEncontrado.nombre,
                        unidades: unidades,
                        precio: productoEncontrado.precio,
                    });
                }
        
                    alert("Producto agregado al carrito");
            }     else {
                    alert("Producto no encontrado");
                }
            }     else {
                    alert("El número de unidades debe ser mayor a cero");
            }
        } else {
            alert("Producto no válido");
        }
        
        seleccion = prompt("¿Desea seguir comprando? (Ingrese la palabra `agregar` para continuar, cualquier otra tecla para finalizar)");
        }
        
        if (carrito.length > 0) {
            alert("Gracias por su compra. A continuación, el detalle de su carrito:");
            carrito.forEach((item) => {
                const totalPorProducto = item.unidades * item.precio;
            alert(
            `Producto: ${item.producto}\nUnidades: ${item.unidades}\nTotal a pagar por producto: $${totalPorProducto}`
            );
        });
        const totalCompra = carrito.reduce(
            (total, item) => total + item.unidades * item.precio,
            0
        );
        alert(`Total a pagar por su compra: $${totalCompra}`);
        } else {
        alert("Carrito vacío. Gracias por visitarnos.");
        }