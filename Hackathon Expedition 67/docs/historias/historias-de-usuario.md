# Historias de Usuario e Integración de Equipo

Para la estructuración ágil (Scrum) y asumiendo un equipo core compuesto por **4 personas**, hemos dividido las tareas de la siguiente manera.

### 👥 Distribución del Equipo (Roles sugeridos)
*   👩‍💻 **Persona 1:** Frontend Developer (Especialidad UI/UX & Componentes)
*   🧑‍💻 **Persona 2:** Frontend Developer (Especialidad Lógica de Cliente JS, Integración API, Leaflet Maps)
*   👨‍💻 **Persona 3:** Backend / Database Engineer
*   👩‍💼 **Persona 4:** Project Manager (Scrum Master) & QA Engineer

---

## 📅 Sprint 1: Autenticación, Frontend Cero y Arquitectura Base

### Persona 1 (Frontend UI)
*   **HU-001:** *Como usuario, quiero acceder a una Landing Page atractiva para entender de qué trata HambreZero antes de registrarme.*
    *   **Criterio:** Hero animado, contadores, responsividad.
*   **HU-002:** *Como usuario, quiero una vista unificada para Login / Registro.*
    *   **Criterio:** Formularios dinámicos dependiendo del tipo de cuenta selecionada.

### Persona 2 (Frontend Logic & Mapas)
*   **HU-003:** *Como donante, quiero visualizar un Mapa interactivo general que muestre Colombia.*
    *   **Criterio:** Instalar y configurar Leaflet.js, pintar el mapa base (Tiles) centrado en Huila/Colombia.

### Persona 3 (Backend / DB)
*   **HU-004:** *Como desarrollador, necesito el esquema base de la BD levantado y endpoints de autenticación.*
    *   **Criterio:** Diseñar ERL. Endpoints `/api/auth/register` y `/api/auth/login`. Emisión tokens JWT.

### Persona 4 (PM / QA)
*   **HU-005:** *Como responsable de calidad, necesito el backlog documentado y la prueba de la infraestructura base.*
    *   **Criterio:** Tickets listos en Jira/Trello. Testing manual del UI del Login.

---

## 📅 Sprint 2: Tablones, Paneles y Mapa Avanzado

### Persona 1 (Frontend UI)
*   **HU-006:** *Como entidad, quiero visualizar un panel Dashboard con mi progreso, botones claros y estatus.*
    *   **Criterio:** Sidebar izquierdo, Cards de donación centralizadas.
*   **HU-007:** *Como donante, quiero ver el tablón de anuncios (necesidades) un listado estilizado con filtros de urgencia.*
    *   **Criterio:** Grid CSS de tablones. Etiquetas tipo "Pill" para criticidad.

### Persona 2 (Frontend Logic & Mapas)
*   **HU-008:** *Como usuario, quiero poder ver Zonas e Instituciones puntuales directamente en el Mapa geolocalizador interactivo.*
    *   **Criterio:** Pines en el mapa mediante lat/lng. Tabs al costado izquierdo (Zonas / Instituciones) que al hacer *click* vuelen hacia el punto *(flyTo)*. Integrar data del frontend a Leaflet.

### Persona 3 (Backend / DB)
*   **HU-009:** *Como Frontenders, necesitamos una API REST para crear requerimientos (tablones) y obtener lista de tablones.*
    *   **Criterio:** Endpoints `/api/bulletins` (GET/POST).

### Persona 4 (PM / QA)
*   **HU-010:** *Como usuario, garantizo que el sistema de filtros funcione. Revisión de flujos de interacción.*
    *   **Criterio:** Pruebas UAT en staging del dashboard. Validar flujos de rediseño.

---

## 📅 Sprint 3: Flujo de Donación, Ranking y Beneficios

### Persona 1 (Frontend UI)
*   **HU-011:** *Como donante, quiero poder ir a una sección de Ranking Top Anual/Mensual visualmente empoderada.*
    *   **Criterio:** Pódium Top 3, Listado Top 5 destacado con coronas. Card lateral superior de "Mi posición y certificado".
*   **HU-012:** *Como donante, quiero poder abrir un modal e ingresar mi donación/tarjeta fácilmente.*
    *   **Criterio:** CSS Modal de donación. Selectores amigables de monto ($50.000, $1M, etc).

### Persona 2 (Frontend Logic & Mapas)
*   **HU-013:** *Como usuario normal, quiero que el botón donar gatille el proceso y se simule correctamente una donación incrementando los contadores.*
    *   **Criterio:** Programar envío de formulario de donación falso/integrado. Emitir evento.
*   **HU-014:** *Como Top Donante, quiero que se genere un certificado virtual.*
    *   **Criterio:** Modal DOM dinámico cargando información del usuario activo.

### Persona 3 (Backend / DB)
*   **HU-015:** *Como sistema, necesito registrar las trazas de donación y calcular el Top Donantes.*
    *   **Criterio:** Endpoint `/api/donations/process`. Endpoint `/api/ranking`. Calcular sums() cruzando DB de transacciones. 

### Persona 4 (PM / QA)
*   **HU-016:** *Como QA, debo asegurar que las transacciones y cambios de ranking estén en vivo sin romper el backend.*
    *   **Criterio:** Testear concurrencia y preparar entrega final y demo del proyecto (Sustentación / Cierre).
