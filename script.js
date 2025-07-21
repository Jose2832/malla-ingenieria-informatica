document.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll(".materia");

  function guardarEstado() {
    const estado = {};
    materias.forEach(m => {
      const sigla = m.dataset.sigla;
      estado[sigla] = m.classList.contains("aprobada");
    });
    localStorage.setItem("estadoMaterias", JSON.stringify(estado));
  }

  function cargarEstado() {
    const estado = JSON.parse(localStorage.getItem("estadoMaterias")) || {};
    materias.forEach(m => {
      const sigla = m.dataset.sigla;
      if (estado[sigla]) m.classList.add("aprobada");
    });
  }

  function actualizarRestricciones() {
    materias.forEach(m => {
      const req = m.dataset.requiere;
      if (req) {
        const reqMateria = document.querySelector(`.materia[data-sigla='${req}']`);
        if (!reqMateria || !reqMateria.classList.contains("aprobada")) {
          m.classList.add("restringida");
        } else {
          m.classList.remove("restringida");
        }
      }
    });
  }

  materias.forEach(m => {
    m.addEventListener("click", () => {
      if (m.classList.contains("restringida")) return;
      m.classList.toggle("aprobada");
      guardarEstado();
      actualizarRestricciones();
    });
  });

  cargarEstado();
  actualizarRestricciones();
});
