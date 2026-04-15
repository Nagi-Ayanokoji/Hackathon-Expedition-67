# 🚀 Pitch HambreZero

## 1. Presentación
**HambreZero** es una plataforma tecnológica de impacto social diseñada para democratizar el acceso a recursos en Colombia. Nuestro propósito es conectar directamente a empresas con capacidad de donación, con entidades necesitadas y comunidades rurales que carecen de cobertura institucional. Buscamos erradicar las barreras burocráticas y garantizar que cada peso o recurso material llegue íntegramente a donde más se necesita, promoviendo un entorno de transparencia y trazabilidad total.

## 2. Problema
Actualmente existe una **desconexión crítica** entre el sector empresarial (con excedentes o programas de Responsabilidad Social RSE) y las zonas vulnerables de nuestro país. Los principales dolores son:
- **Desconfianza corporativa:** Falta de transparencia y trazabilidad sobre el destino real de los recursos y donaciones.
- **Microtráfico de la caridad:** Exceso de intermediarios que diluyen el valor del recurso antes de llegar a los afectados.
- **Invisibilidad rural:** Zonas apartadas (veredas y corregimientos) quedan fuera del radar y no tienen cómo pedir ayuda formal al carecer de instituciones sólidamente constituidas.

## 3. Solución
HambreZero resuelve esta problemática centralizando la ayuda y optimizando la comunicación mediante:
- **Conexión Directa a través de Tablones:** Entidades verificadas (escuelas, comedores, bomberos) publican necesidades urgentes; las empresas responden y donan directamente, sin fricciones.
- **Georreferenciación Inclusiva:** Un mapa interactivo que señala "Zonas en Blanco", permitiendo canalizar la ayuda incluso a comunidades que no tienen instituciones formales.
- **Gamificación y Beneficios (Win-Win):** Sistema de niveles para donadores. Las empresas acceden a un ranking público que mejora su reputación, obteniendo de inmediato certificados de donación para beneficios y reducciones fiscales expedidos conforme a la ley.
- **Auditoría Transparente:** Un historial centralizado del destino y cumplimiento de cada acuerdo pactado.

## 4. Priorización
Bajo el concepto de *Producto Mínimo Viable (MVP)* centrado en el impacto temprano, nuestras prioridades son:
1. **Acuerdos sobre transacciones únicas:** Priorizar que empresas e instituciones logren alianzas de mediano y largo plazo en vez de hacer solo donaciones puntuales.
2. **Onboarding Ágil:** Implementación de flujos de registro optimizados y diferenciados de acuerdo a si el usuario es un Donante, una Entidad o un Vocero Zonal.
3. **Escalabilidad Geográfica:** Demostración en zonas de caso crítico (Piloto en el Huila) para un escalamiento posterior rápido a nivel nacional.

## 5. Arquitectura y Stack Tecnológico
Para garantizar una accesibilidad ininterrumpida y la máxima capacidad de crecimiento, la plataforma está diseñada bajo una arquitectura Full-Stack robusta:

- **Frontend (Cliente):** HTML5, CSS3 con Design System propio y JavaScript ES6+ Vanilla para maximizar la velocidad y reducir dependencias pesadas en zonas de baja conectividad. Integración de mapas geolocalizados con Leaflet.js.
- **Backend (Servidor):** API RESTful desarrollada en Node.js con Express, encargada de procesar la lógica de negocio, los módulos de autenticación, la georreferenciación y la gestión transparente de transacciones.
- **Base de Datos:** PostgreSQL para la persistencia transaccional y relacional (entidades, empresas, acuerdos), garantizando la integridad de los datos. Redis actúa como caché para renderizar el sistema de ranking y los contadores en tiempo real.

### Estrategia de Escalabilidad
El sistema está diseñado para el crecimiento exponencial mediante dos enfoques de escalamiento:
- **Crecimiento Vertical:** Ante eventualidades o picos tempranos (ej. grandes campañas solidarias en un departamento base), los servidores core y la base de datos incrementan automáticamente su capacidad de procesamiento (CPU y Memoria).
- **Crecimiento Horizontal:** Al expandirnos regional e internacionalmente, el diseño sin estado (*stateless*) del Back-End permite clonar servidores en paralelo y colocar un balanceador de carga; procesando miles de peticiones de donación simultáneas de manera descentralizada sin colapsar la página.

## 6. Demostración del Proyecto

El flujo a demostrar en nuestra sesión será el siguiente:
1. **La Puerta de Entrada (Landing):** Visualización de métricas de impacto en tiempo real.
2. **El "Grito de Ayuda" (Dashboard Entidad):** Simularemos cómo una escuela sube una petición rápida al tablón de necesidades debido al desabastecimiento.
3. **La Acción (Dashboard Empresa):** Mostraremos la perspectiva del empresario: filtra por severidad, selecciona la petición, define el formato de ayuda y evalúa cómo sube de rango para ganar puntos e insignias de RSE.
4. **El Descubrimiento (Mapa Interactivo):** Ubicamos a zonas rurales excluidas del sistema que ahora logran visualizarse a la espera de un "Acuerdo Zonal".

### 🌱 Sostenibilidad del Negocio (La Plataforma)
Para operar y escalar el impacto hacia el millón de usuarios, **HambreZero debe ser tecnológicamente sostenible**.
Para sostener la infraestructura (servidores, APIs, seguridad y bases de datos), la política de la plataforma contempla **retener un micro-porcentaje transparente (ej. 2% - 4%) sobre el valor gestionado en donaciones monetarias**.
De este modo, se elimina la dependencia absoluta a los fondos estatales o rondas constantes de capital, asegurando que el core tecnológico de las donaciones continúe operando activamente, permitiendo sostener la página en el tiempo con autonomía.
