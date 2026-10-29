/**
 * TareaListo — Gestor de Tareas Académicas para Estudiantes Universitarios
 * Cumplimiento estricto del PRD (Grupo 29)
 * 1. Registrar tareas (nombre, asignatura, fecha)
 * 2. Consultar actividades (pendientes y completadas)
 * 3. Marcar como terminada (cambio de estado dinámico)
 * 4. Buscar tareas (por nombre o asignatura)
 * 5. Ordenar por fecha de entrega
 */

// 1. Datos iniciales de demostración basados en las pantallas de Stitch
const INITIAL_DEMO_TASKS = [
  {
    id: "task-1",
    title: "Taller de Derivadas e Integrales",
    subject: "Cálculo II",
    dueDate: getRelativeDateISO(1, "23:59"),
    completed: false,
    priority: "Alta",
    notes: "Ejercicios pares de la sección 4.3 (Teorema Fundamental del Cálculo)."
  },
  {
    id: "task-2",
    title: "Diagrama de Clases UML del Sistema",
    subject: "Ing. Software",
    dueDate: getRelativeDateISO(2, "18:00"),
    completed: false,
    priority: "Media",
    notes: "Modelar clases de dominio con cardinalidades y atributos."
  },
  {
    id: "task-3",
    title: "Laboratorio de Ondas Electromagnéticas",
    subject: "Física II",
    dueDate: getRelativeDateISO(4, "23:59"),
    completed: false,
    priority: "Alta",
    notes: "Entrega en formato IEEE con gráficas y cálculo de incertidumbre."
  },
  {
    id: "task-4",
    title: "Ensayo sobre Ética en la Inteligencia Artificial",
    subject: "Humanidades",
    dueDate: getRelativeDateISO(6, "20:00"),
    completed: false,
    priority: "Baja",
    notes: "Extensión máxima de 3 páginas con 5 fuentes académicas."
  },
  {
    id: "task-5",
    title: "Quiz previo de Series de Taylor",
    subject: "Cálculo II",
    dueDate: getRelativeDateISO(-2, "10:00"),
    completed: true,
    completedAt: getRelativeDateISO(-2, "09:45"),
    priority: "Media",
    notes: "Evaluación formativa completada con éxito."
  },
  {
    id: "task-6",
    title: "Guía de Requisitos Funcionales",
    subject: "Ing. Software",
    dueDate: getRelativeDateISO(-3, "16:00"),
    completed: true,
    completedAt: getRelativeDateISO(-3, "15:30"),
    priority: "Alta",
    notes: "Redacción del PRD y especificaciones del producto."
  }
];

// Asignación de colores y estilos por materia según el Design System "Academic Momentum"
const SUBJECT_COLORS = {
  "Cálculo II": {
    badgeBg: "bg-surface-container",
    badgeText: "text-primary",
    dot: "bg-primary",
    border: "border-primary/20"
  },
  "Ing. Software": {
    badgeBg: "bg-primary-fixed",
    badgeText: "text-on-primary-fixed-variant",
    dot: "bg-secondary-fixed-dim",
    border: "border-primary-fixed"
  },
  "Física II": {
    badgeBg: "bg-tertiary-fixed",
    badgeText: "text-tertiary-container",
    dot: "bg-tertiary",
    border: "border-tertiary/20"
  },
  "Humanidades": {
    badgeBg: "bg-secondary-container",
    badgeText: "text-on-secondary-container",
    dot: "bg-secondary",
    border: "border-secondary/20"
  }
};

function getSubjectStyle(subject) {
  return SUBJECT_COLORS[subject] || {
    badgeBg: "bg-surface-container-high",
    badgeText: "text-on-surface",
    dot: "bg-outline",
    border: "border-surface-container"
  };
}

// 2. Estado Global de la Aplicación
const AppState = {
  currentUser: null,
  tasks: [],
  currentView: "pendientes",
  pendingFilter: "all", // "all", "urgent", "week", "later"
  sortAscending: true,  // true: próximas primero; false: lejanas primero
  globalSearchQuery: "",
  globalSearchFilter: "all", // "all", "pending", "completed"
  formSelectedSubject: "Cálculo II"
};

// 3. Inicialización
document.addEventListener("DOMContentLoaded", () => {
  initUserSession();
  loadTasksFromStorage();
  initFormDates();
  setupEventListeners();
  renderAll();
});

// Inicializar sesión personalizada del estudiante
function initUserSession() {
  const savedUser = localStorage.getItem("tarealisto_current_user");
  if (savedUser) {
    try {
      AppState.currentUser = JSON.parse(savedUser);
    } catch(e) {
      AppState.currentUser = {
        name: "Sebastián Castellanos",
        email: "sebcastellanos@uniboyca.edu.co"
      };
    }
  } else {
    // Usuario inicial por defecto
    AppState.currentUser = {
      name: "Sebastián Castellanos",
      email: "sebcastellanos@uniboyca.edu.co"
    };
    saveUserSession();
  }
  updateUserUI();
}

function saveUserSession() {
  if (AppState.currentUser) {
    localStorage.setItem("tarealisto_current_user", JSON.stringify(AppState.currentUser));
  }
}

// Clave única de almacenamiento por cuenta (aísla las tareas por usuario)
function getStorageKey() {
  const email = AppState.currentUser ? AppState.currentUser.email.replace(/[^a-zA-Z0-9]/g, "_") : "default";
  return `tarealisto_tasks_${email}`;
}

// Cargar tareas de LocalStorage para el usuario activo
function loadTasksFromStorage() {
  const key = getStorageKey();
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      AppState.tasks = JSON.parse(saved);
    } catch (e) {
      console.error("Error al leer tareas guardadas:", e);
      AppState.tasks = [...INITIAL_DEMO_TASKS];
      saveTasksToStorage();
    }
  } else {
    AppState.tasks = [...INITIAL_DEMO_TASKS];
    saveTasksToStorage();
  }
}

function saveTasksToStorage() {
  const key = getStorageKey();
  localStorage.setItem(key, JSON.stringify(AppState.tasks));
}

// 4. Configuración de eventos de UI
function setupEventListeners() {
  // Botón para ver perfil / cuenta
  document.getElementById("profile-toggle-btn")?.addEventListener("click", () => {
    openProfileModal();
  });
  // Filtros rápidos en Tareas Pendientes
  document.querySelectorAll("#pending-filters-bar .filter-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll("#pending-filters-bar .filter-pill").forEach(p => {
        p.classList.remove("active-pill", "bg-primary", "text-on-primary");
        p.classList.add("bg-surface-container-lowest", "text-on-surface-variant");
      });
      pill.classList.add("active-pill", "bg-primary", "text-on-primary");
      pill.classList.remove("bg-surface-container-lowest", "text-on-surface-variant");

      AppState.pendingFilter = pill.dataset.filter;
      renderPendingTasks();
    });
  });

  // Búsqueda en tiempo real en Tareas Pendientes
  const pendSearch = document.getElementById("pendientes-search-input");
  const pendClear = document.getElementById("pendientes-clear-search-btn");
  if (pendSearch && pendClear) {
    pendSearch.addEventListener("input", (e) => {
      const val = e.target.value.trim();
      pendClear.classList.toggle("hidden", val.length === 0);
      renderPendingTasks();
    });
    pendClear.addEventListener("click", () => {
      pendSearch.value = "";
      pendClear.classList.add("hidden");
      renderPendingTasks();
      pendSearch.focus();
    });
  }

  // Ordenamiento por fecha (Requisito 5 PRD)
  const sortBtn = document.getElementById("toggle-sort-order-btn");
  const sortLabel = document.getElementById("sort-order-label");
  if (sortBtn && sortLabel) {
    sortBtn.addEventListener("click", () => {
      AppState.sortAscending = !AppState.sortAscending;
      sortLabel.textContent = AppState.sortAscending ? "Más próximas primero" : "Más lejanas primero";
      renderPendingTasks();
      showToast(AppState.sortAscending ? "Ordenadas: Próximas primero" : "Ordenadas: Más lejanas primero");
    });
  }

  // Búsqueda Global (Requisito 4 PRD)
  const globSearch = document.getElementById("global-search-input");
  const globClear = document.getElementById("global-clear-search-btn");
  if (globSearch && globClear) {
    globSearch.addEventListener("input", (e) => {
      AppState.globalSearchQuery = e.target.value.trim();
      globClear.classList.toggle("hidden", AppState.globalSearchQuery.length === 0);
      renderSearchResults();
    });
    globClear.addEventListener("click", () => {
      globSearch.value = "";
      AppState.globalSearchQuery = "";
      globClear.classList.add("hidden");
      renderSearchResults();
      globSearch.focus();
    });
  }

  // Filtros de estado en Búsqueda Global
  document.querySelectorAll(".search-filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".search-filter-chip").forEach(c => {
        c.classList.remove("active-search-chip", "bg-primary", "text-on-primary");
        c.classList.add("bg-surface-container-lowest", "text-on-surface-variant");
      });
      chip.classList.add("active-search-chip", "bg-primary", "text-on-primary");
      chip.classList.remove("bg-surface-container-lowest", "text-on-surface-variant");

      AppState.globalSearchFilter = chip.dataset.searchFilter;
      renderSearchResults();
    });
  });

  // Botón superior de acceso directo a búsqueda
  document.getElementById("header-search-btn").addEventListener("click", () => {
    navigateTo("busqueda");
    setTimeout(() => {
      const input = document.getElementById("global-search-input");
      if (input) input.focus();
    }, 150);
  });

  // Botón para restablecer datos de muestra si el usuario quiere reiniciar
  document.getElementById("reset-data-btn").addEventListener("click", () => {
    if (confirm("¿Deseas restaurar las tareas de muestra iniciales?")) {
      AppState.tasks = [...INITIAL_DEMO_TASKS];
      saveTasksToStorage();
      renderAll();
      showToast("Datos restaurados correctamente");
    }
  });
}

// 5. Navegación entre vistas
function navigateTo(viewName) {
  AppState.currentView = viewName;

  // Actualizar paneles visibles
  document.querySelectorAll(".view-panel").forEach(panel => {
    panel.classList.add("hidden");
  });
  const targetPanel = document.getElementById(`view-${viewName}`);
  if (targetPanel) {
    targetPanel.classList.remove("hidden");
  }

  // Actualizar Título de cabecera
  const titles = {
    pendientes: "Pendientes",
    completadas: "Completadas",
    busqueda: "Búsqueda y Materias",
    registrar: "Nueva Tarea"
  };
  document.getElementById("header-active-view-title").textContent = titles[viewName] || "TareaListo";

  // Actualizar items de la barra inferior de navegación
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active-nav", "text-primary");
    item.classList.add("text-on-surface-variant");
  });
  const activeNav = document.getElementById(`nav-btn-${viewName}`);
  if (activeNav) {
    activeNav.classList.add("active-nav", "text-primary");
    activeNav.classList.remove("text-on-surface-variant");
  }

  // Ocultar FAB si estamos en la vista de registrar tarea
  const fab = document.getElementById("fab-container");
  if (fab) {
    fab.classList.toggle("hidden", viewName === "registrar");
  }

  // Renderizar la vista correspondiente
  if (viewName === "pendientes") renderPendingTasks();
  if (viewName === "completadas") renderCompletedTasks();
  if (viewName === "busqueda") renderSearchResults();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// 6. RENDERIZADO: TAREAS PENDIENTES (Requisito 2 y 5 del PRD)
function renderPendingTasks() {
  const container = document.getElementById("pending-tasks-container");
  const emptyState = document.getElementById("pending-empty-state");
  const query = (document.getElementById("pendientes-search-input")?.value || "").toLowerCase().trim();

  // 1. Filtrar solo tareas incompletas
  let list = AppState.tasks.filter(t => !t.completed);

  // 2. Filtro de búsqueda en la vista
  if (query) {
    list = list.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.subject.toLowerCase().includes(query)
    );
  }

  // 3. Filtro por chips (all, urgent, week, later)
  const now = new Date();
  if (AppState.pendingFilter === "urgent") {
    const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    list = list.filter(t => new Date(t.dueDate) <= in24h);
  } else if (AppState.pendingFilter === "week") {
    const in7days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    list = list.filter(t => new Date(t.dueDate) <= in7days);
  } else if (AppState.pendingFilter === "later") {
    const in7days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    list = list.filter(t => new Date(t.dueDate) > in7days);
  }

  // 4. Ordenamiento por fecha (Requisito 5 PRD)
  list.sort((a, b) => {
    const diff = new Date(a.dueDate) - new Date(b.dueDate);
    return AppState.sortAscending ? diff : -diff;
  });

  // Actualizar contadores
  updateCounters();

  if (list.length === 0) {
    container.innerHTML = "";
    emptyState.classList.remove("hidden");
    emptyState.classList.add("flex");
    return;
  }

  emptyState.classList.add("hidden");
  emptyState.classList.remove("flex");

  container.innerHTML = list.map(task => createTaskCardHTML(task, false)).join("");
}

// 7. RENDERIZADO: TAREAS COMPLETADAS (Requisito 2 y 3 del PRD)
function renderCompletedTasks() {
  const container = document.getElementById("completed-tasks-container");
  const emptyState = document.getElementById("completed-empty-state");
  const list = AppState.tasks.filter(t => t.completed).sort((a, b) => {
    return new Date(b.completedAt || b.dueDate) - new Date(a.completedAt || a.dueDate);
  });

  updateCounters();

  if (list.length === 0) {
    container.innerHTML = "";
    emptyState.classList.remove("hidden");
    emptyState.classList.add("flex");
    return;
  }

  emptyState.classList.add("hidden");
  emptyState.classList.remove("flex");

  container.innerHTML = list.map(task => createTaskCardHTML(task, true)).join("");
  renderSubjectProgressGrid();
}

// 8. RENDERIZADO: BÚSQUEDA Y MATERIAS (Requisito 4 del PRD)
function renderSearchResults() {
  const container = document.getElementById("search-results-container");
  const emptyState = document.getElementById("search-empty-state");
  const queryTag = document.getElementById("search-query-tag");
  const counterText = document.getElementById("search-results-counter");

  let list = [...AppState.tasks];

  // Filtro por estado
  if (AppState.globalSearchFilter === "pending") {
    list = list.filter(t => !t.completed);
  } else if (AppState.globalSearchFilter === "completed") {
    list = list.filter(t => t.completed);
  }

  // Filtro por texto de búsqueda (Requisito 4 PRD: nombre o asignatura)
  const q = AppState.globalSearchQuery.toLowerCase();
  if (q) {
    list = list.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.subject.toLowerCase().includes(q) ||
      (t.notes && t.notes.toLowerCase().includes(q))
    );
    queryTag.textContent = `Coincidencias con: "${AppState.globalSearchQuery}"`;
  } else {
    queryTag.textContent = "";
  }

  // Ordenar por fecha más próxima
  list.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  counterText.textContent = `${list.length} ${list.length === 1 ? "tarea encontrada" : "tareas encontradas"}`;

  if (list.length === 0) {
    container.innerHTML = "";
    emptyState.classList.remove("hidden");
    emptyState.classList.add("flex");
  } else {
    emptyState.classList.add("hidden");
    emptyState.classList.remove("flex");
    container.innerHTML = list.map(task => createTaskCardHTML(task, task.completed)).join("");
  }

  renderMateriasCatalog();
  updateCounters();
}

// Generador de tarjeta HTML para cada tarea
function createTaskCardHTML(task, isCompleted) {
  const style = getSubjectStyle(task.subject);
  const deadline = formatDeadline(task.dueDate);

  // Badge de urgencia
  let deadlineBadge = "";
  if (!isCompleted) {
    if (deadline.isUrgent) {
      deadlineBadge = `
        <span class="px-2 py-0.5 rounded-full text-[11px] font-display font-bold bg-error-container text-on-error-container flex items-center gap-1 shadow-sm">
          <span class="material-symbols-outlined text-[13px]">alarm</span>
          ${deadline.relative}
        </span>`;
    } else {
      deadlineBadge = `
        <span class="px-2 py-0.5 rounded-full text-[11px] font-display font-semibold bg-surface-container-high text-on-surface-variant flex items-center gap-1">
          <span class="material-symbols-outlined text-[13px]">calendar_today</span>
          ${deadline.formattedDate}
        </span>`;
    }
  } else {
    deadlineBadge = `
      <span class="px-2 py-0.5 rounded-full text-[11px] font-display font-semibold bg-secondary-container text-on-secondary-container flex items-center gap-1">
        <span class="material-symbols-outlined text-[13px]">task_alt</span>
        Completada
      </span>`;
  }

  const checkboxIcon = isCompleted ? "check_box" : "check_box_outline_blank";
  const checkboxColor = isCompleted ? "text-secondary" : "text-outline hover:text-primary";
  const titleClass = isCompleted ? "line-through text-outline" : "text-on-surface";
  const cardOpacity = isCompleted ? "opacity-75 bg-surface-container-low" : "bg-surface-container-lowest";

  return `
    <article class="${cardOpacity} rounded-2xl p-4 shadow-sm border border-surface-container-high/70 flex flex-col gap-3 transition-all hover:shadow-md">
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-display font-bold ${style.badgeBg} ${style.badgeText} flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full ${style.dot}"></span>
            ${escapeHTML(task.subject)}
          </span>
          ${deadlineBadge}
        </div>
        
        <button onclick="deleteTask('${task.id}')" title="Eliminar tarea" class="text-outline-variant hover:text-error transition-colors p-1 rounded-lg">
          <span class="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>

      <div class="flex items-start gap-3">
        <button onclick="toggleTaskCompletion('${task.id}')" aria-label="Cambiar estado" 
                class="${checkboxColor} transition-all mt-0.5 flex-shrink-0 active:scale-90">
          <span class="material-symbols-outlined text-[24px]">${checkboxIcon}</span>
        </button>

        <div class="flex-1 min-w-0" onclick="toggleTaskCompletion('${task.id}')">
          <h3 class="font-display font-bold text-sm ${titleClass} leading-snug cursor-pointer">
            ${escapeHTML(task.title)}
          </h3>
          ${task.notes ? `<p class="text-xs text-on-surface-variant mt-1 line-clamp-2">${escapeHTML(task.notes)}</p>` : ""}
        </div>
      </div>

      <div class="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 border-t border-surface-container/60">
        <span class="flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">schedule</span>
          Entrega: ${deadline.formattedTime}
        </span>
        <button onclick="toggleTaskCompletion('${task.id}')" class="font-display font-bold text-xs ${isCompleted ? 'text-primary' : 'text-secondary'} hover:underline">
          ${isCompleted ? 'Desmarcar' : 'Marcar como lista'}
        </button>
      </div>
    </article>
  `;
}

// 9. GESTIÓN DE TAREAS (Acciones: Crear, Alternar, Eliminar)

// Alternar estado de terminada (Requisito 3 PRD)
function toggleTaskCompletion(taskId) {
  const task = AppState.tasks.find(t => t.id === taskId);
  if (!task) return;

  task.completed = !task.completed;
  if (task.completed) {
    task.completedAt = new Date().toISOString();
    showToast(`¡Tarea completada! 🎉`);
  } else {
    delete task.completedAt;
    showToast(`Tarea reactivada como pendiente`);
  }

  saveTasksToStorage();
  renderAll();
}

// Registrar nueva tarea (Requisito 1 PRD)
function handleCreateTask(e) {
  e.preventDefault();

  const titleInput = document.getElementById("form-task-name");
  const dateInput = document.getElementById("form-task-date");
  const timeInput = document.getElementById("form-task-time");

  const title = titleInput.value.trim();
  const dateVal = dateInput.value;
  const timeVal = timeInput.value || "23:59";
  const subject = AppState.formSelectedSubject || "Cálculo II";

  if (!title) {
    alert("Por favor escribe el nombre de la actividad.");
    titleInput.focus();
    return;
  }

  if (!dateVal) {
    alert("Por favor selecciona una fecha de entrega.");
    dateInput.focus();
    return;
  }

  const dueIsoString = `${dateVal}T${timeVal}:00`;

  const newTask = {
    id: "task-" + Date.now(),
    title: title,
    subject: subject,
    dueDate: dueIsoString,
    completed: false,
    priority: "Normal",
    notes: ""
  };

  AppState.tasks.unshift(newTask);
  saveTasksToStorage();

  // Limpiar formulario
  titleInput.value = "";
  
  showToast("¡Tarea registrada con éxito! ✨");
  navigateTo("pendientes");
  renderAll();
}

// Eliminar tarea
function deleteTask(taskId) {
  if (confirm("¿Deseas eliminar esta tarea?")) {
    AppState.tasks = AppState.tasks.filter(t => t.id !== taskId);
    saveTasksToStorage();
    renderAll();
    showToast("Tarea eliminada");
  }
}

// 10. Formulario: Asignatura y Fechas Rápidas
function selectFormSubject(subjectName, buttonElement) {
  AppState.formSelectedSubject = subjectName;

  document.querySelectorAll(".form-subject-btn").forEach(btn => {
    btn.classList.remove("active-form-subject", "bg-primary", "text-on-primary");
    btn.classList.add("bg-surface-container-lowest", "text-on-surface-variant");
    const check = btn.querySelector(".material-symbols-outlined");
    if (check) check.classList.add("opacity-0");
  });

  if (buttonElement) {
    buttonElement.classList.add("active-form-subject", "bg-primary", "text-on-primary");
    buttonElement.classList.remove("bg-surface-container-lowest", "text-on-surface-variant");
    const check = buttonElement.querySelector(".material-symbols-outlined");
    if (check) check.classList.remove("opacity-0");
  }

  const label = document.getElementById("form-selected-subject-label");
  if (label) label.textContent = subjectName;
}

function applyCustomSubject() {
  const customInput = document.getElementById("form-custom-subject-input");
  const value = customInput.value.trim();
  if (!value) return;

  selectFormSubject(value, null);
  const label = document.getElementById("form-selected-subject-label");
  if (label) label.textContent = `${value} (Personalizada)`;

  showToast(`Materia "${value}" seleccionada`);
}

function setQuickDate(daysFromNow) {
  const target = new Date();
  target.setDate(target.getDate() + daysFromNow);

  const year = target.getFullYear();
  const month = String(target.getMonth() + 1).padStart(2, "0");
  const day = String(target.getDate()).padStart(2, "0");

  const dateInput = document.getElementById("form-task-date");
  if (dateInput) {
    dateInput.value = `${year}-${month}-${day}`;
  }
}

function initFormDates() {
  setQuickDate(1); // Mañana por defecto
}

// 11. Rendimiento y Métricas por Asignatura (Completadas y Búsqueda)
function renderSubjectProgressGrid() {
  const grid = document.getElementById("subject-progress-grid");
  if (!grid) return;

  const subjects = getUniqueSubjects();
  grid.innerHTML = subjects.map(subject => {
    const style = getSubjectStyle(subject);
    const total = AppState.tasks.filter(t => t.subject === subject).length;
    const done = AppState.tasks.filter(t => t.subject === subject && t.completed).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    return `
      <div class="bg-surface-container-lowest p-3 rounded-2xl border border-surface-container shadow-sm flex flex-col gap-1">
        <div class="flex items-center justify-between">
          <span class="w-2.5 h-2.5 rounded-full ${style.dot}"></span>
          <span class="font-display font-bold text-xs ${pct === 100 ? 'text-secondary' : 'text-primary'}">${done} / ${total}</span>
        </div>
        <p class="font-display font-bold text-xs text-on-surface truncate mt-1">${escapeHTML(subject)}</p>
        <div class="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-1">
          <div class="bg-secondary h-full rounded-full transition-all duration-300" style="width: ${pct}%"></div>
        </div>
        <span class="text-[11px] text-on-surface-variant font-medium mt-0.5">
          ${pct === 100 ? '✅ Al día' : `${total - done} pendiente(s)`}
        </span>
      </div>
    `;
  }).join("");
}

function renderMateriasCatalog() {
  const grid = document.getElementById("materias-catalog-grid");
  if (!grid) return;

  const subjects = getUniqueSubjects();
  grid.innerHTML = subjects.map(subject => {
    const style = getSubjectStyle(subject);
    const count = AppState.tasks.filter(t => t.subject === subject).length;
    return `
      <button onclick="filterBySubject('${escapeHTML(subject)}')" class="bg-surface-container-lowest hover:bg-surface-container-low p-3 rounded-2xl border border-surface-container shadow-sm flex items-center justify-between text-left transition-all active:scale-98">
        <div class="flex items-center gap-2 truncate">
          <span class="w-3 h-3 rounded-full ${style.dot} flex-shrink-0"></span>
          <span class="font-display font-bold text-xs text-on-surface truncate">${escapeHTML(subject)}</span>
        </div>
        <span class="px-2 py-0.5 bg-surface-container rounded-full text-[11px] font-bold text-primary">${count}</span>
      </button>
    `;
  }).join("");
}

function filterBySubject(subjectName) {
  const input = document.getElementById("global-search-input");
  if (input) {
    input.value = subjectName;
    AppState.globalSearchQuery = subjectName;
    document.getElementById("global-clear-search-btn")?.classList.remove("hidden");
    renderSearchResults();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function getUniqueSubjects() {
  const defaultList = ["Cálculo II", "Ing. Software", "Física II", "Humanidades"];
  const dynamic = AppState.tasks.map(t => t.subject);
  return Array.from(new Set([...defaultList, ...dynamic]));
}

// 12. Actualización de Estadísticas Generales
function updateCounters() {
  const pending = AppState.tasks.filter(t => !t.completed);
  const completed = AppState.tasks.filter(t => t.completed);
  const total = AppState.tasks.length;

  // Header & Home pills
  document.getElementById("badge-pending-count").textContent = pending.length;
  document.getElementById("badge-completed-count").textContent = completed.length;
  document.getElementById("pending-count-highlight").textContent = `${pending.length} ${pending.length === 1 ? 'entrega pendiente' : 'entregas pendientes'}`;
  document.getElementById("pill-count-all").textContent = pending.length;

  // Search chips
  document.getElementById("search-chip-pending-count").textContent = pending.length;
  document.getElementById("search-chip-completed-count").textContent = completed.length;

  // Completadas view
  const completedHero = document.getElementById("completed-hero-count");
  if (completedHero) completedHero.textContent = `${completed.length} ${completed.length === 1 ? 'tarea' : 'tareas'}`;

  const completionRate = total > 0 ? Math.round((completed.length / total) * 100) : 0;
  const rateText = document.getElementById("completion-rate-text");
  if (rateText) rateText.textContent = `${completionRate}% de efectividad`;

  const progLabel = document.getElementById("progress-percentage-label");
  if (progLabel) progLabel.textContent = `${completionRate}%`;

  const progBar = document.getElementById("progress-bar-fill");
  if (progBar) progBar.style.width = `${completionRate}%`;

  const progDone = document.getElementById("progress-tasks-detail");
  if (progDone) progDone.textContent = `${completed.length} completadas`;

  const progPend = document.getElementById("progress-pending-detail");
  if (progPend) progPend.textContent = `${pending.length} restantes`;

  const completedCountLabel = document.getElementById("completed-list-count");
  if (completedCountLabel) completedCountLabel.textContent = `${completed.length} ${completed.length === 1 ? 'tarea' : 'tareas'}`;
}

function renderAll() {
  renderPendingTasks();
  renderCompletedTasks();
  renderSearchResults();
}

// 13. Utilidades de Fecha y Formato
function getRelativeDateISO(daysOffset, timeString) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}T${timeString || "23:59"}:00`;
}

function formatDeadline(isoString) {
  if (!isoString) return { relative: "Sin fecha", formattedDate: "", formattedTime: "", isUrgent: false };

  const target = new Date(isoString);
  const now = new Date();
  const diffHours = (target - now) / (1000 * 60 * 60);

  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const formattedDate = `${target.getDate()} ${months[target.getMonth()]}`;
  const hours = String(target.getHours()).padStart(2, "0");
  const minutes = String(target.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  let relative = formattedDate;
  let isUrgent = false;

  if (diffHours < 0) {
    relative = "Vencida";
    isUrgent = true;
  } else if (diffHours <= 24) {
    relative = "Mañana, " + formattedTime;
    isUrgent = true;
  } else if (diffHours <= 48) {
    relative = "En 2 días";
    isUrgent = true;
  } else if (diffHours <= 168) {
    relative = "Esta semana";
  }

  return { relative, formattedDate, formattedTime, isUrgent };
}

function escapeHTML(str) {
  if (!str) return "";
  return str.replace(/[&<>'"]/g, tag => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  }[tag] || tag));
}

// Notificación Toast flotante
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-message");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("flex");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add("hidden");
    toast.classList.remove("flex");
  }, 2400);
}

// 14. Personalización y Gestión de Cuentas de Usuario (Google / Gmail)
function loginWithPreset(name, email) {
  AppState.currentUser = { name, email };
  saveUserSession();
  loadTasksFromStorage();
  updateUserUI();
  closeLoginModal();
  renderAll();
  showToast(`Bienvenido, ${getFirstName(name)} ✨`);
}

function handleCustomLogin(e) {
  e.preventDefault();
  const nameInput = document.getElementById("login-name-input");
  const emailInput = document.getElementById("login-email-input");
  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();

  if (!name || !email) return;

  AppState.currentUser = { name, email };
  saveUserSession();
  loadTasksFromStorage();
  updateUserUI();
  closeLoginModal();
  renderAll();
  showToast(`Sesión iniciada como ${getFirstName(name)} ✨`);
}

function promptSwitchAccount() {
  closeProfileModal();
  openLoginModal();
}

function openLoginModal() {
  const modal = document.getElementById("login-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

function closeLoginModal() {
  const modal = document.getElementById("login-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function openProfileModal() {
  const modal = document.getElementById("profile-modal");
  if (!modal || !AppState.currentUser) return;

  const initials = getInitials(AppState.currentUser.name);
  const pendingCount = AppState.tasks.filter(t => !t.completed).length;
  const completedCount = AppState.tasks.filter(t => t.completed).length;

  document.getElementById("modal-user-avatar").textContent = initials;
  document.getElementById("modal-user-name").textContent = AppState.currentUser.name;
  document.getElementById("modal-user-email").innerHTML = `<span class="w-2 h-2 rounded-full bg-secondary"></span> ${escapeHTML(AppState.currentUser.email)}`;
  document.getElementById("modal-user-pending").textContent = pendingCount;
  document.getElementById("modal-user-completed").textContent = completedCount;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeProfileModal() {
  const modal = document.getElementById("profile-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function updateUserUI() {
  if (!AppState.currentUser) return;
  const firstName = getFirstName(AppState.currentUser.name);
  const initials = getInitials(AppState.currentUser.name);

  // Avatar en barra superior
  const headerAvatar = document.getElementById("header-user-avatar");
  if (headerAvatar) headerAvatar.textContent = initials;

  // Saludo dinámico en pantalla principal
  const greetingEl = document.getElementById("user-greeting-name");
  if (greetingEl) greetingEl.textContent = firstName;
}

function getFirstName(fullName) {
  if (!fullName) return "Estudiante";
  return fullName.trim().split(/\s+/)[0];
}

function getInitials(fullName) {
  if (!fullName) return "EST";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
