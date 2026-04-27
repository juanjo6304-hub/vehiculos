let vehiculos = [];
let actual = 0;

// Cargar datos
fetch("data/vehiculos.json")
  .then(r => r.json())
  .then(data => {

    vehiculos = data.sort((a, b) => {
      if (a.marca < b.marca) return -1;
      if (a.marca > b.marca) return 1;

      if (a.modelo < b.modelo) return -1;
      if (a.modelo > b.modelo) return 1;

      return 0;
    });

    mostrarVehiculo(0);
    activarBuscador();
  });

// Mostrar vehículo
function mostrarVehiculo(i) {
  actual = i;

  const v = vehiculos[i];

  document.getElementById("titulo-marca").textContent = v.marca;
  document.getElementById("titulo-modelo").textContent = v.modelo;

  document.getElementById("foto").src = "img/" + v.imagen;

  const datos = document.getElementById("datos");
  datos.innerHTML = "";

  for (const campo in v) {
    if (campo !== "imagen" && campo !== "nombre" && campo !== "id") {

      const etiqueta =
        campo.charAt(0).toUpperCase() + campo.slice(1);

      const p = document.createElement("p");
      p.innerHTML = `<strong>${etiqueta}:</strong> ${v[campo]}`;
      datos.appendChild(p);
    }
  }

  actualizarNav();
}

// Navegación
function actualizarNav() {
  document.getElementById("contador").textContent =
    `${actual + 1} / ${vehiculos.length}`;

  document.getElementById("prev").disabled = actual === 0;
  document.getElementById("next").disabled = actual === vehiculos.length - 1;
}

document.getElementById("prev").onclick = () => {
  if (actual > 0) mostrarVehiculo(actual - 1);
};

document.getElementById("next").onclick = () => {
  if (actual < vehiculos.length - 1) mostrarVehiculo(actual + 1);
};

document.getElementById("home").onclick = () => {
  mostrarVehiculo(0);
};

// Zoom imagen
const foto = document.getElementById("foto");

foto.addEventListener("click", () => {
  foto.classList.toggle("zoom");
  document.body.classList.toggle("no-scroll");
});

// 🔍 Buscador con lista de resultados
function activarBuscador() {
  const input = document.getElementById("buscar");
  const contenedor = document.getElementById("resultados");

  if (!input || !contenedor) return;

  input.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase().trim();

    contenedor.innerHTML = "";

    if (texto === "") return;

    const resultados = vehiculos.filter(v =>
      (v.modelo && v.modelo.toLowerCase().includes(texto)) ||
      (v.marca && v.marca.toLowerCase().includes(texto))
    );

    resultados.slice(0, 10).forEach(v => {
      const div = document.createElement("div");
      div.className = "resultado";
      div.textContent = `${v.marca} ${v.modelo}`;

      div.onclick = () => {
        const index = vehiculos.indexOf(v);
        mostrarVehiculo(index);
        contenedor.innerHTML = "";
        input.value = "";
      };

      contenedor.appendChild(div);
    });
  });
}
