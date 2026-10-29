# TareaListo 📝🎓
**Gestor Inteligente de Tareas Académicas para Estudiantes Universitarios**  
*Documento de Requisitos del Producto (PRD) — Grupo 29*

---

## 📌 1. El Problema

En la vida universitaria, los estudiantes suelen tener varias asignaturas, trabajos, evaluaciones y fechas de entrega al mismo tiempo. Con frecuencia anotan sus compromisos en distintos lugares, como cuadernos, chats o aplicaciones diferentes, por lo que resulta difícil consultar toda la información de manera rápida. Esta desorganización puede ocasionar que olviden actividades, entreguen trabajos fuera de plazo o no sepan qué tarea deben priorizar.

**TareaListo** resuelve esta necesidad reuniendo todas las actividades académicas en un solo lugar ágil, intuitivo y fácil de utilizar.

---

## 👤 2. El Usuario

El usuario principal es un estudiante universitario que cursa varias materias y debe cumplir con trabajos individuales, proyectos en grupo y otras actividades académicas. Necesita:
- Registrar lo que debe hacer sin fricciones.
- Conocer con precisión sus fechas límite de entrega.
- Revisar su progreso general sin perder tiempo buscando información en diferentes medios.

---

## 🚀 3. Funciones Implementadas (Cumplimiento 100% del PRD)

| Requisito PRD | Implementación en TareaListo |
|---|---|
| **1. Registrar tareas** | Formulario rápido con nombre de la actividad, selector interactivo de asignatura (o asignatura personalizada), fecha y hora de entrega. |
| **2. Consultar actividades** | Pantalla de **Pendientes** y pantalla de **Completadas**, con badges de urgencia, conteo dinámico e historial. |
| **3. Marcar como terminada** | Checkbox interactivo en cada tarjeta para alternar el estado en un clic (con opción de desmarcar y feedback visual). |
| **4. Buscar tareas** | Barra de búsqueda reactiva en tiempo real que filtra al instante por **nombre de la actividad** o por **asignatura**, con selector de estado y catálogo de materias. |
| **5. Ordenar por fecha** | Botón para alternar el orden cronológico (*Más próximas primero* o *Más lejanas primero*), alertando entregas en menos de 24 horas. |

---

## 🚫 4. Lo que no hace (Fuera de Alcance)

Siguiendo estrictamente las especificaciones del PRD:
- ❌ No redacta ni resuelve tareas por el estudiante.
- ❌ No envía trabajos a profesores ni sincroniza calificaciones.
- ❌ No incluye chat ni conexiones complejas que distraigan al usuario.
- ❌ No requiere conexión a plataformas externas ni servicios de IA pesados.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 Semántico:** Estructura limpia y accesible.
- **Tailwind CSS:** Sistema de diseño basado en la especificación **"Academic Momentum"** (paleta Índigo Eléctrico `#3525cd`, Esmeralda Menta `#006c49` y Ámbar).
- **JavaScript Moderno (ES6+):** Lógica reactiva sin dependencias pesadas.
- **LocalStorage:** Persistencia automática en el navegador del usuario para que las tareas nunca se pierdan al cerrar o recargar la página.
- **Google Fonts:** *Plus Jakarta Sans* para tipografías de cabecera y *Inter* para lectura continua.
- **Material Symbols Outlined:** Iconografía oficial de Google.

---

## 💻 Cómo Ejecutar la Aplicación

No requiere instalaciones complejas ni servidores de backend. Puedes abrirla directamente:

1. Haz doble clic en el archivo **`index.html`** para abrirlo en cualquier navegador web (Chrome, Edge, Firefox, Safari).
2. O inicia un servidor local en esta carpeta con PowerShell:
   ```bash
   npx serve .
   ```
   Y abre `http://localhost:3000`.

---

## 📦 Estructura del Proyecto

```
tarealisto/
├── index.html        # Aplicación web unificada con todas las vistas
├── app.js            # Lógica completa: estado, persistencia y eventos
├── README.md         # Documentación del proyecto
└── stitch_tarealisto_student_task_manager/  # Mockups y recursos de diseño de Google Stitch
```
