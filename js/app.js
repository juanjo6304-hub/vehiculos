let vehiculos = [];
let actual = 0;

fetch("data/vehiculos.json")
  .then(r => r.json())
  .then(data => {
    vehiculos = data;
    mostrarVehiculo(0);
  });

function mostrarVehiculo(i) {
  actual = i;

  const v = vehiculos[i];

  document.getElementById("titulo").textContent = v.nombre;
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


  actualizarNav(); // ✅ AQUÍ, fuera del for
}

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

