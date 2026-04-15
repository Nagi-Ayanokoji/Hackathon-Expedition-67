/* ===================================================
   HambreZero — Map Logic (Leaflet.js)
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof L === 'undefined') {
    console.error('Leaflet no cargado');
    return;
  }

  // ─── Init map centered on Colombia ────────────────
  const map = L.map('main-map', {
    center: [2.5359, -75.5277],
    zoom: 9,
    zoomControl: false,
  });

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // ─── Tile Layer ──────────────────────────────────
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap © CARTO',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  // ─── Color coding ────────────────────────────────
  const needColors = {
    critical: { fill: '#e53e3e', stroke: '#c53030', opacity: 0.35 },
    high:     { fill: '#dd6b20', stroke: '#c05621', opacity: 0.30 },
    medium:   { fill: '#d4940a', stroke: '#b7791f', opacity: 0.25 },
    low:      { fill: '#22976e', stroke: '#1a7a5e', opacity: 0.20 },
  };

  // ─── Institution markers ─────────────────────────
  const entityIcon = (color, emoji) => L.divIcon({
    html: `<div style="
      background:${color};
      width:36px;height:36px;
      border-radius:10px;
      display:flex;align-items:center;justify-content:center;
      font-size:1.1rem;
      box-shadow:0 4px 12px rgba(0,0,0,0.25);
      border:2px solid white;
      cursor:pointer;
    ">${emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
    className: '',
  });

  const zoneIcon = (color) => L.divIcon({
    html: `<div style="
      background:${color};
      width:28px;height:28px;
      border-radius:50%;
      border:3px solid white;
      box-shadow:0 3px 10px rgba(0,0,0,0.3);
      cursor:pointer;
      animation:pulse 2s ease-in-out infinite;
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
    className: '',
  });

  // ─── Mock institution data (geo) ─────────────────
  const geoEntities = [
    { id: 1,  name: 'IE Rural Los Comuneros — Neiva',        lat: 2.930, lng: -75.290, type: 'school',    avatar: '🏫', color: '#3182ce', urgency: 'high' },
    { id: 2,  name: 'Hospital Hernando Moncaleano',          lat: 2.935, lng: -75.282, type: 'hospital',  avatar: '🏥', color: '#e53e3e', urgency: 'high' },
    { id: 3,  name: 'Banco de Alimentos Huila',              lat: 2.920, lng: -75.305, type: 'food',      avatar: '🍽️', color: '#dd6b20', urgency: 'medium' },
    { id: 4,  name: 'Hogar de Ancianos San Antonio',         lat: 2.560, lng: -75.540, type: 'elderly',   avatar: '👴', color: '#805ad5', urgency: 'medium' },
    { id: 5,  name: 'Jardín Infantil Semillas de Vida',      lat: 2.550, lng: -75.560, type: 'nursery',   avatar: '👶', color: '#22976e', urgency: 'high' },
    { id: 6,  name: 'Bomberos Voluntarios Pitalito',         lat: 1.855, lng: -76.050, type: 'fire',      avatar: '🚒', color: '#e53e3e', urgency: 'medium' },
    { id: 7,  name: 'Asociación Cafetera del Huila',         lat: 2.100, lng: -75.800, type: 'farm',      avatar: '☕', color: '#116644', urgency: 'high' },
    { id: 8,  name: 'Biblioteca Comunitaria Sur del Huila',  lat: 1.860, lng: -76.040, type: 'library',   avatar: '📚', color: '#3182ce', urgency: 'low' },
    { id: 9,  name: 'Puesto de Salud La Plata',              lat: 2.390, lng: -75.900, type: 'health',    avatar: '💊', color: '#e53e3e', urgency: 'high' },
    { id: 10, name: 'Centro Comunitario Garzón',             lat: 2.197, lng: -75.628, type: 'community', avatar: '⛪', color: '#116644', urgency: 'low' },
  ];

  // ─── Mock zone data (no institutions) ─────────────
  const geoZones = [
    { id: 'z1', name: 'Vereda Charguayaco',       lat: 2.700, lng: -75.620, needLevel: 'critical', population: 980,  needs: ['Agua potable', 'Atención médica', 'Alimentos', 'Educación'] },
    { id: 'z2', name: 'Corregimiento San Marcos', lat: 2.300, lng: -75.750, needLevel: 'high',     population: 740,  needs: ['Alimentos', 'Medicamentos', 'Semillas agrícolas'] },
    { id: 'z3', name: 'Vereda Río Frío',          lat: 2.050, lng: -75.950, needLevel: 'medium',   population: 520,  needs: ['Útiles escolares', 'Alimentos básicos'] },
    { id: 'z4', name: 'Inspección El Hobo',       lat: 2.580, lng: -75.440, needLevel: 'critical', population: 1120, needs: ['Agua potable', 'Alimentos', 'Atención médica', 'Ropa'] },
    { id: 'z5', name: 'Vereda La Jagua',          lat: 1.920, lng: -75.820, needLevel: 'high',     population: 380,  needs: ['Alimentos', 'Material escolar', 'Semillas'] },
    { id: 'z6', name: 'Comunidad Tres Esquinas',  lat: 2.450, lng: -75.720, needLevel: 'medium',   population: 460,  needs: ['Herramientas agrícolas', 'Alimentos', 'Medicamentos'] },
    { id: 'z7', name: 'Caserío El Paraíso',       lat: 2.800, lng: -75.400, needLevel: 'high',     population: 310,  needs: ['Agua potable', 'Alimentos', 'Ropa abrigada'] },
  ];

  const markersGroup = L.layerGroup().addTo(map);
  const zonesGroup   = L.layerGroup().addTo(map);

  // ─── Add entity markers ───────────────────────────
  geoEntities.forEach(entity => {
    const marker = L.marker([entity.lat, entity.lng], {
      icon: entityIcon(entity.color, entity.avatar),
    }).addTo(markersGroup);

    const urgColors = { high: '#e53e3e', medium: '#d4940a', low: '#22976e' };
    marker.bindPopup(`
      <div style="font-family:'Inter',sans-serif; min-width:220px; padding:4px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <div style="background:${entity.color};width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.2rem">${entity.avatar}</div>
          <div>
            <div style="font-weight:700;font-size:0.95rem;color:#212529">${entity.name}</div>
            <div style="font-size:0.75rem;color:#6c757d">Institución registrada</div>
          </div>
        </div>
        <div style="background:${urgColors[entity.urgency]}20;color:${urgColors[entity.urgency]};padding:4px 10px;border-radius:20px;font-size:0.75rem;font-weight:600;display:inline-block;margin-bottom:8px">
          ● Urgencia ${entity.urgency === 'high' ? 'Alta' : entity.urgency === 'medium' ? 'Media' : 'Baja'}
        </div>
        <div style="display:flex;gap:6px;margin-top:4px">
          <a href="dashboard-donor.html" style="background:#116644;color:white;padding:6px 12px;border-radius:20px;font-size:0.8rem;font-weight:600;text-decoration:none">💚 Donar</a>
          <button onclick="showZonePanel('${entity.id}')" style="background:#f1f3f5;color:#495057;padding:6px 12px;border-radius:20px;font-size:0.8rem;font-weight:600;border:none;cursor:pointer">Ver más</button>
        </div>
      </div>
    `, { maxWidth: 280 });

    marker.on('click', () => showEntityPanel(entity.id, geoEntities));
  });

  // ─── Add zone circles/markers ─────────────────────
  geoZones.forEach(zone => {
    const colors = needColors[zone.needLevel];
    
    // Pulsing circle
    L.circle([zone.lat, zone.lng], {
      color: colors.stroke,
      fillColor: colors.fill,
      fillOpacity: colors.opacity,
      weight: 2,
      radius: 35000,
    }).addTo(zonesGroup);

    // Zone marker
    const marker = L.marker([zone.lat, zone.lng], {
      icon: zoneIcon(colors.fill),
    }).addTo(zonesGroup);

    marker.bindPopup(`
      <div style="font-family:'Inter',sans-serif; min-width:240px; padding:4px">
        <div style="margin-bottom:10px">
          <div style="font-weight:700;font-size:1rem;color:#212529">📍 ${zone.name}</div>
          <div style="font-size:0.8rem;color:#6c757d">Zona sin instituciones · ${zone.population.toLocaleString()} habitantes</div>
        </div>
        <div style="background:${colors.fill}20;border-left:3px solid ${colors.fill};padding:6px 10px;border-radius:4px;margin-bottom:10px">
          <div style="font-size:0.75rem;font-weight:700;color:${colors.fill};text-transform:uppercase">Nivel de necesidad: ${zone.needLevel === 'critical' ? 'Crítico' : zone.needLevel === 'high' ? 'Alto' : 'Medio'}</div>
        </div>
        <div style="margin-bottom:10px">
          <div style="font-size:0.8rem;font-weight:600;color:#495057;margin-bottom:4px">Principales necesidades:</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px">
            ${zone.needs.map(n => `<span style="background:#f1f3f5;color:#495057;padding:2px 8px;border-radius:20px;font-size:0.75rem">${n}</span>`).join('')}
          </div>
        </div>
        <button onclick="openZoneAgreement('${zone.id}')" style="background:#116644;color:white;padding:8px 16px;border-radius:20px;font-size:0.8rem;font-weight:600;border:none;cursor:pointer;width:100%">
          🤝 Crear Acuerdo de Donación
        </button>
      </div>
    `, { maxWidth: 300 });

    marker.on('click', () => showZonePanel(zone.id, geoZones));
  });

  // ─── Panel lateral ────────────────────────────────
  function showEntityPanel(id, entities) {
    const entity = entities.find(e => e.id == id);
    if (!entity) return;
    const panel = document.getElementById('map-panel');
    const content = document.getElementById('map-panel-content');
    if (!panel || !content) return;

    const typeMap = {
      school:'Colegio/Escuela', hospital:'Hospital', food:'Banco Alimentos',
      elderly:'Hogar Ancianos', nursery:'Jardín Infantil', fire:'Bomberos',
      farm:'Agricultores', library:'Biblioteca', health:'Puesto Salud',
      community:'Centro Comunitario',
    };
    const urgColor = { high: '#e53e3e', medium: '#d4940a', low: '#22976e' };
    const urgLabel = { high: 'Alta', medium: 'Media', low: 'Baja' };

    content.innerHTML = `
      <div class="panel-entity">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
          <div style="background:${entity.color};width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;box-shadow:0 4px 12px ${entity.color}40">${entity.avatar}</div>
          <div>
            <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:1.1rem;color:#212529">${entity.name}</div>
            <div style="font-size:0.8rem;color:#6c757d">${typeMap[entity.type] || 'Institución'}</div>
          </div>
        </div>
        <div style="display:inline-block;background:${urgColor[entity.urgency]}20;color:${urgColor[entity.urgency]};padding:4px 12px;border-radius:20px;font-size:0.8rem;font-weight:600;margin-bottom:16px">
          🔴 Urgencia ${urgLabel[entity.urgency]}
        </div>
        <div style="margin-bottom:16px">
          <div style="font-weight:600;font-size:0.85rem;color:#495057;margin-bottom:8px">Necesidades publicadas:</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            ${(AppState.entities.find(e=>e.id===entity.id)||{needs:[]}).needs?.map(n=>`<span style="background:#edfdf5;color:#116644;padding:4px 10px;border-radius:8px;font-size:0.8rem;font-weight:500;border:1px solid #d4f7ea">${n}</span>`).join('')||'Sin publicaciones aún'}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <a href="dashboard-donor.html" class="btn btn-primary" style="text-align:center;display:block">
            <i class="fas fa-hand-holding-heart"></i> Realizar Donación
          </a>
          <button onclick="Modal.open('modal-agreement')" class="btn btn-outline" style="width:100%">
            <i class="fas fa-handshake"></i> Crear Acuerdo
          </button>
        </div>
      </div>`;

    panel.classList.add('open');
  }

  function showZonePanel(id, zones) {
    const zone = (zones || geoZones).find(z => z.id == id || z.id === id);
    if (!zone) return;
    const panel = document.getElementById('map-panel');
    const content = document.getElementById('map-panel-content');
    if (!panel || !content) return;

    const colors = needColors[zone.needLevel];
    const levelLabel = { critical: 'Crítico 🔴', high: 'Alto 🟠', medium: 'Medio 🟡', low: 'Bajo 🟢' };

    content.innerHTML = `
      <div class="panel-zone">
        <div style="margin-bottom:16px">
          <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:1.2rem;color:#212529">📍 ${zone.name}</div>
          <div style="font-size:0.85rem;color:#6c757d;margin-top:4px">Zona sin cobertura institucional</div>
        </div>
        <div style="background:${colors.fill}15;border:1px solid ${colors.fill}40;border-radius:12px;padding:12px;margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:0.85rem;font-weight:600;color:#495057">Nivel de necesidad</span>
            <span style="font-weight:700;color:${colors.fill}">${levelLabel[zone.needLevel]}</span>
          </div>
          <div style="height:6px;background:#e9ecef;border-radius:3px;margin-top:8px;overflow:hidden">
            <div style="height:100%;background:${colors.fill};border-radius:3px;width:${zone.needLevel==='critical'?'95':zone.needLevel==='high'?'75':zone.needLevel==='medium'?'50':'30'}%"></div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:16px;background:#f8f9fa;border-radius:10px;padding:10px">
          <div style="text-align:center">
            <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:1.25rem;color:#0d4f3c">${zone.population?.toLocaleString()}</div>
            <div style="font-size:0.75rem;color:#6c757d">Habitantes</div>
          </div>
          <div style="width:1px;background:#dee2e6"></div>
          <div style="text-align:center">
            <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:1.25rem;color:#0d4f3c">0</div>
            <div style="font-size:0.75rem;color:#6c757d">Instituciones</div>
          </div>
          <div style="width:1px;background:#dee2e6"></div>
          <div style="text-align:center">
            <div style="font-family:'Outfit',sans-serif;font-weight:800;font-size:1.25rem;color:#0d4f3c">${zone.needs?.length}</div>
            <div style="font-size:0.75rem;color:#6c757d">Necesidades</div>
          </div>
        </div>
        <div style="margin-bottom:16px">
          <div style="font-weight:600;font-size:0.85rem;color:#495057;margin-bottom:8px">Necesidades de la zona:</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            ${zone.needs?.map(n=>`<span style="background:#fff3cd;color:#856404;padding:4px 10px;border-radius:8px;font-size:0.8rem;font-weight:500;border:1px solid #ffc107">${n}</span>`).join('')}
          </div>
        </div>
        <div style="margin-bottom:16px">
          <div style="font-weight:600;font-size:0.85rem;color:#495057;margin-bottom:8px">📋 Tablón de la zona:</div>
          <textarea id="zone-bulletin-input" placeholder="Escribe aquí necesidades adicionales de esta zona..." style="width:100%;padding:10px;border:2px solid #dee2e6;border-radius:10px;font-family:'Inter',sans-serif;font-size:0.85rem;resize:vertical;min-height:80px;outline:none" onfocus="this.style.borderColor='#22976e'" onblur="this.style.borderColor='#dee2e6'"></textarea>
          <button onclick="postZoneBulletin('${zone.id}')" style="width:100%;background:#edfdf5;color:#116644;border:1.5px solid #d4f7ea;padding:8px;border-radius:8px;font-weight:600;font-size:0.85rem;margin-top:6px;cursor:pointer">
            📌 Publicar en tablón
          </button>
        </div>
        <button onclick="openZoneAgreement('${zone.id}')" class="btn btn-primary" style="width:100%;text-align:center;display:block">
          <i class="fas fa-handshake"></i> Crear Acuerdo de Donación
        </button>
      </div>`;

    panel.classList.add('open');
  }

  window.showEntityPanel = showEntityPanel;
  window.showZonePanel = showZonePanel;

  window.postZoneBulletin = function(zoneId) {
    const input = document.getElementById('zone-bulletin-input');
    if (!input?.value.trim()) { Toast.show('Escribe algo en el tablón', 'warning'); return; }
    Toast.show('✅ Publicado en el tablón de la zona', 'success');
    input.value = '';
  };

  window.openZoneAgreement = function(zoneId) {
    Modal.open('modal-agreement');
    const nameEl = document.querySelector('#modal-agreement .agreement-target');
    const zone = geoZones.find(z => z.id == zoneId);
    if (nameEl && zone) nameEl.textContent = zone.name;
  };

  // ─── Layer toggles ─────────────────────────────────
  const toggleInstitutions = document.getElementById('toggle-institutions');
  const toggleZones        = document.getElementById('toggle-zones');

  toggleInstitutions?.addEventListener('change', (e) => {
    if (e.target.checked) map.addLayer(markersGroup);
    else map.removeLayer(markersGroup);
  });

  toggleZones?.addEventListener('change', (e) => {
    if (e.target.checked) map.addLayer(zonesGroup);
    else map.removeLayer(zonesGroup);
  });

  // ─── Close panel ────────────────────────────────────
  document.getElementById('close-panel')?.addEventListener('click', () => {
    document.getElementById('map-panel')?.classList.remove('open');
  });

  // ─── Map search ──────────────────────────────────────
  const mapSearch = document.getElementById('map-search');
  mapSearch?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    if (!q) return;
    const found = geoEntities.find(e => e.name.toLowerCase().includes(q)) ||
                  geoZones.find(z => z.name.toLowerCase().includes(q));
    if (found) {
      map.flyTo([found.lat, found.lng], 10, { duration: 1.5 });
    }
  });

  // Expose map
  window.mainMap = map;
});
