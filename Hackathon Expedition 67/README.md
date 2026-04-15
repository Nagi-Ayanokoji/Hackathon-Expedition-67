# 🌱 HambreZero

> **Plataforma colombiana de impacto social** que conecta empresas donantes con entidades necesitadas y zonas rurales sin cobertura institucional.

---

## 📁 Estructura del Proyecto

```
📦 Proyecto Hambre/
│
├── 📄 index.html                  ← Punto de entrada (Landing Page)
├── 📄 README.md                   ← Este archivo
│
├── 📁 pages/                      ← Páginas de la aplicación
│   ├── auth.html                  # Login / Registro
│   ├── dashboard-donor.html       # Panel del Donante
│   ├── dashboard-entity.html      # Panel de la Entidad
│   ├── map.html                   # Mapa Interactivo (Leaflet.js)
│   ├── ranking.html               # Ranking de Donantes
│   ├── about.html                 # Sobre Nosotros
│   ├── mobile-preview.html        # Vista Previa Móvil
│   └── presentacion.html          # Presentación del Proyecto
│
├── 📁 css/                        ← Estilos
│   └── styles.css                 # Design System completo (36 KB)
│
├── 📁 js/                         ← Lógica JavaScript
│   ├── app.js                     # Core (estado, toast, modal, datos mock)
│   ├── auth.js                    # Autenticación (login/registro)
│   └── map.js                     # Mapa interactivo (Leaflet.js)
│
├── 📁 assets/                     ← Recursos multimedia
│   └── img/                       # Imágenes del proyecto
│
└── 📁 docs/                       ← Documentación
    ├── DOCUMENTACION_HAMBREZERO.md # Documentación técnica completa
    ├── 📁 diagramas/
    │   └── HambreZero_Diagramas_C4_UML.drawio  # C4 + UML (draw.io)
    └── 📁 historias/
        └── historias-de-usuario.md # Historias de usuario (Scrum)
```

## 🚀 Inicio Rápido

```bash
# Opción 1: Abrir directamente en el navegador
open index.html

# Opción 2: Servidor local (recomendado)
npx serve .
# Luego visitar http://localhost:3000
```

## 🛠 Stack Tecnológico

| Tecnología | Uso |
|-----------|-----|
| HTML5 | Estructura semántica |
| CSS3 (Custom Properties) | Design System completo |
| JavaScript ES6+ | Lógica de aplicación |
| Leaflet.js 1.9.4 | Mapa interactivo |
| Font Awesome 6.5.0 | Iconografía |

## 👥 Tipos de Usuario

- 🏛️ **Entidad Necesitada** — Publica necesidades, recibe donaciones
- 🏢 **Empresa Donante** — Dona, aparece en ranking, obtiene certificados
- 🗺️ **Zona Geográfica** — Registra zonas rurales sin instituciones

## 📖 Documentación

- [Documentación Técnica Completa](docs/DOCUMENTACION_HAMBREZERO.md)
- [Historias de Usuario](docs/historias/historias-de-usuario.md)
- [Diagramas C4 + UML](docs/diagramas/HambreZero_Diagramas_C4_UML.drawio) (abrir con draw.io)

---

> **HambreZero** © 2026 — Hecho con 💚 para Colombia
