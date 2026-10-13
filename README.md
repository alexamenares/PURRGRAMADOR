# Purrgramador

> Aprender tecnología con historias.

Purrgramador es un proyecto educativo, tecnológico y narrativo que busca acercar la informática, la programación, la inteligencia artificial, la ciberseguridad y otras tecnologías, a estudiantes y personas principiantes. Combina un universo narrativo con personajes que enseñan, acompañan y entretienen.

## Estado

**Fase actual:** validación conceptual mediante prototipo visual navegable (mockup).

El prototipo es completamente funcional en el lado del cliente: no existe backend real, autenticación ni base de datos.

## Características del prototipo

- **11 pantallas navegables** con router por hash.
- **Buscador global** sobre historias, personajes y oportunidades.
- **Quiz interactivo** con validación y retroalimentación.
- **Progreso persistente** en `localStorage` e insignias.
- **Laboratorio con editor HTML/CSS/JS en vivo** (vista previa en iframe con sandbox).
- **Tema claro / oscuro / auto** persistido.
- **Filtros de oportunidades** por categoría.
- **Fichas de personajes** en modal.
- **Diseño responsive** y accesible (roles ARIA, foco, contraste).
- **Sin dependencias de runtime**: 100% vanilla JS + módulos ES.

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (ES Modules) |
| Build / Dev server | Vite 5 |
| Tests | Vitest + jsdom |
| Persistencia | localStorage |
| Datos | JSON estáticos |
| Tipografía | Space Grotesk (Google Fonts) |

## Estructura
