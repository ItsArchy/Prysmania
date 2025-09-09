const searchInput = document.getElementById('searchInput');
const tableRows = Array.from(document.querySelectorAll('#banTable tbody tr'));
const boxes = document.querySelectorAll('.totalBox');
let currentPage = 1;
let filtroTipo = null;
const rowsPerPage = 10;

// Guardar colores originales
boxes.forEach(box => {
  box.dataset.originalColor = box.style.color;
  box.dataset.originalBg = box.style.backgroundColor;
});

// Filtrar filas según búsqueda y filtro
function filtrarFilas() {
  const busqueda = searchInput.value.trim().toLowerCase();
  return tableRows.filter(row => {
    const nombre = row.cells[0].textContent.trim().toLowerCase();
    const cumpleBusqueda = nombre.includes(busqueda);
    const cumpleFiltro = filtroTipo ? row.dataset.tipo === filtroTipo : true;
    return cumpleBusqueda && cumpleFiltro;
  });
}

// Mostrar la página actual
function mostrarPagina() {
  const filasFiltradas = filtrarFilas();
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  tableRows.forEach(row => row.style.display = 'none');
  filasFiltradas.slice(start, end).forEach(row => row.style.display = '');
  actualizarNumerosPagina(filasFiltradas.length);
}

// Actualizar botones de paginación
function actualizarNumerosPagina(totalFilas) {
  const totalPages = Math.ceil(totalFilas / rowsPerPage) || 1;
  const pageNumbersContainer = document.getElementById('pageNumbers');
  pageNumbersContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.style.backgroundColor = (i === currentPage) ? '#6514b5' : 'white';
    btn.style.color = (i === currentPage) ? 'white' : '#6514b5';
    btn.addEventListener('click', () => {
      currentPage = i;
      mostrarPagina();
    });
    pageNumbersContainer.appendChild(btn);
  }
}

// Eventos del buscador
searchInput.addEventListener('input', () => {
  currentPage = 1;
  mostrarPagina();
});

// Botones de paginación
document.getElementById('prevPage').addEventListener('click', () => {
  if (currentPage > 1) { currentPage--; mostrarPagina(); }
});
document.getElementById('nextPage').addEventListener('click', () => {
  const totalFilas = filtrarFilas().length;
  const totalPages = Math.ceil(totalFilas / rowsPerPage) || 1;
  if (currentPage < totalPages) { currentPage++; mostrarPagina(); }
});

// Eventos de los recuadros
boxes.forEach(box => {
  const originalColor = box.dataset.originalColor;
  const originalBg = box.dataset.originalBg;

  box.addEventListener('mouseenter', () => {
    box.style.transform = 'scale(1.08)';
    box.style.backgroundColor = originalColor;
    box.style.color = 'white';
    box.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
  });

  box.addEventListener('mouseleave', () => {
    if (filtroTipo !== box.dataset.tipo) {
      box.style.transform = 'scale(1)';
      box.style.backgroundColor = originalBg;
      box.style.color = originalColor;
      box.style.boxShadow = 'none';
    }
  });

  box.addEventListener('click', () => {
    filtroTipo = (filtroTipo === box.dataset.tipo) ? null : box.dataset.tipo;
    boxes.forEach(b => {
      if (b.dataset.tipo === filtroTipo) {
        b.style.backgroundColor = b.dataset.originalColor;
        b.style.color = 'white';
        b.style.transform = 'scale(1.08)';
        b.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
      } else {
        b.style.backgroundColor = b.dataset.originalBg;
        b.style.color = b.dataset.originalColor;
        b.style.transform = 'scale(1)';
        b.style.boxShadow = 'none';
      }
    });
    currentPage = 1;
    mostrarPagina();
  });
});

// Actualizar contadores
function actualizarTotales() {
  let totalB = 0, totalE = 0, totalS = 0, totalA = 0;
  tableRows.forEach(fila => {
    switch(fila.cells[2].textContent.trim()) {
      case '🛡️ Baneo': totalB++; break;
      case '⛔ Expulsión': totalE++; break;
      case '🔇 Silenciado': totalS++; break;
      case '⚠️ Advertencia': totalA++; break;
    }
  });
  document.getElementById('totalBaneos').textContent = totalB;
  document.getElementById('totalExpulsiones').textContent = totalE;
  document.getElementById('totalSilenciamientos').textContent = totalS;
  document.getElementById('totalAdvertencias').textContent = totalA;
}

// Inicializar
actualizarTotales();
mostrarPagina();
