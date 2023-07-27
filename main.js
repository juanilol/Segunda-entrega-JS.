const productos = [
  { id: 1, nombre: "papas", precio: 2.5 },
  { id: 2, nombre: "coca cola", precio: 3.0 },
  { id: 3, nombre: "gomitas", precio: 2.0 },
  { id: 4, nombre: "masitas", precio: 2.8 }
];

const carrito = [];

function mostrarProductos() {
  const productosContainer = document.getElementById("productos-container");

  productos.forEach((producto, index) => {
    const productoDiv = document.createElement("div");
    productoDiv.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
    `;
    productosContainer.appendChild(productoDiv);
  });
}

function agregarAlCarrito(index) {
  carrito.push(productos[index]);
  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoContainer = document.getElementById("carrito-container");
  carritoContainer.innerHTML = "";

  let total = 0;

  carrito.forEach((producto, index) => {
    const productoDiv = document.createElement("div");
    productoDiv.innerHTML = `
      ${producto.nombre} - $${producto.precio.toFixed(2)}
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    carritoContainer.appendChild(productoDiv);
    total += producto.precio;
  });

  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `
    Total del carrito: $${total.toFixed(2)}
  `;
  carritoContainer.appendChild(totalDiv);

  const metodoPagoSelect = document.getElementById("metodo-pago");
  const montoEfectivoDiv = document.getElementById("monto-efectivo");

  metodoPagoSelect.addEventListener("change", () => {
    if (metodoPagoSelect.value === "efectivo") {
      montoEfectivoDiv.style.display = "block";
    } else {
      montoEfectivoDiv.style.display = "none";
    }
  });
}

function realizarCompra(event) {
  event.preventDefault();

  const metodoPagoSelect = document.getElementById("metodo-pago");
  const metodoPago = metodoPagoSelect.value.trim();

  if (metodoPago === "") {
    alert("Por favor, seleccione un método de pago válido.");
  } else {
    if (metodoPago === "efectivo") {
      const montoInput = document.getElementById("monto");
      const monto = parseFloat(montoInput.value);

      if (isNaN(monto)) {
        alert("Por favor, ingrese un monto válido en efectivo.");
        return;
      }

      let total = 0;
      carrito.forEach((producto) => {
        total += producto.precio;
      });

      if (monto < total) {
        alert("El monto ingresado es menor al total de la compra. Por favor, ingrese un monto suficiente.");
        return;
      }

      const vuelto = monto - total;
      if (vuelto > 0) {
        alert(`Compra realizada. Gracias por tu compra. Vuelto: $${vuelto.toFixed(2)}`);
      } else {
        alert("Compra realizada. Gracias por tu compra.");
      }
    } else {
      alert("Compra realizada. Gracias por tu compra.");
    }

    carrito.length = 0;
    metodoPagoSelect.value = "";
    const montoInput = document.getElementById("monto");
    montoInput.value = "";
    actualizarCarrito();
  }
}

const metodoPagoForm = document.getElementById("metodo-pago-form");
metodoPagoForm.addEventListener("submit", realizarCompra);

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
});
