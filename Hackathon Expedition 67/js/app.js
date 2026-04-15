/* ===================================================
   HambreZero — Main App Logic
   =================================================== */

// ─── Mock Data ───────────────────────────────────────
const MOCK_ENTITIES = [
  {
    id: 1, type: 'school',
    name: 'Colegio Rural San Francisco',
    location: 'Vereda El Palmar, Cundinamarca',
    avatar: '🏫', color: '#3182ce',
    contact: '+57 310 234 5678',
    email: 'sanfrancisco@edu.co',
    account: '0045-1234-5678-9012 | Bancolombia',
    needs: ['Útiles escolares', 'Computadores', 'Libros de texto', 'Pupitres'],
    description: 'Institución educativa rural con 240 estudiantes de primaria y bachillerato. Necesitamos materiales urgentemente para el inicio del año escolar.',
    urgency: 'high', urgencyVal: 90,
    verified: true, posted: '2026-04-14',
    received: 12500000
  },
  {
    id: 2, type: 'hospital',
    name: 'Hospital Comunitario San José',
    location: 'Municipio de Tibacuy, Cundinamarca',
    avatar: '🏥', color: '#e53e3e',
    contact: '+57 311 876 5432',
    email: 'hcsanjose@salud.gov.co',
    account: '0012-9876-5432-1098 | Banco Bogotá',
    needs: ['Medicamentos básicos', 'Guantes quirúrgicos', 'Tapabocas N95', 'Jeringas'],
    description: 'Puesto de salud que atiende a más de 800 familias en zona rural. Escasez crítica de insumos médicos básicos.',
    urgency: 'high', urgencyVal: 95,
    verified: true, posted: '2026-04-13',
    received: 8700000
  },
  {
    id: 3, type: 'food',
    name: 'Banco de Alimentos Esperanza',
    location: 'Zipaquirá, Cundinamarca',
    avatar: '🍽️', color: '#dd6b20',
    contact: '+57 312 456 7890',
    email: 'bancoalimentos@esperanza.org',
    account: '0067-4321-8765-2109 | Davivienda',
    needs: ['Arroz por bultos', 'Aceite litros', 'Lentejas kg', 'Leche en polvo', 'Sal y azúcar'],
    description: 'Comedor comunitario que alimenta diariamente a 350 personas en situación de vulnerabilidad, incluyendo adultos mayores y niños.',
    urgency: 'medium', urgencyVal: 70,
    verified: true, posted: '2026-04-12',
    received: 22000000
  },
  {
    id: 4, type: 'elderly',
    name: 'Hogar de Ancianos Santa Clara',
    location: 'Facatativá, Cundinamarca',
    avatar: '👴', color: '#805ad5',
    contact: '+57 313 654 3210',
    email: 'santaclara@hogares.org',
    account: '0089-1111-2222-3333 | BBVA',
    needs: ['Pañales adulto', 'Silla de ruedas', 'Medicamentos crónicos', 'Ropa de cama'],
    description: 'Hogar que cuida a 65 adultos mayores en situación de abandono. Requerimos donaciones de insumos de cuidado y medicamentos.',
    urgency: 'medium', urgencyVal: 65,
    verified: true, posted: '2026-04-11',
    received: 5400000
  },
  {
    id: 5, type: 'nursery',
    name: 'Jardín Infantil Semillas de Luz',
    location: 'Soacha, Cundinamarca',
    avatar: '👶', color: '#22976e',
    contact: '+57 314 222 3344',
    email: 'semillasdeluz@cdi.gov.co',
    account: '0033-5555-6666-7777 | Nequi',
    needs: ['Pañales bebé', 'Leche maternizada', 'Juguetes didácticos', 'Cunas', 'Ropa talla 0-3'],
    description: 'Centro de desarrollo infantil para 180 niños menores de 5 años en barrios vulnerables de Soacha.',
    urgency: 'high', urgencyVal: 80,
    verified: true, posted: '2026-04-10',
    received: 9100000
  },
  {
    id: 6, type: 'fire',
    name: 'Cuerpo de Bomberos Voluntarios',
    location: 'La Mesa, Cundinamarca',
    avatar: '🚒', color: '#e53e3e',
    contact: '+57 315 789 0123',
    email: 'bomberos@lamesa.gov.co',
    account: '0022-8888-9999-0000 | Banco Agrario',
    needs: ['Equipos de protección EPP', 'Mangueras', 'Extintores recarga', 'Botas industriales'],
    description: 'Cuerpo voluntario con 28 bomberos que cubre 3 municipios. Equipos deteriorados requieren reposición urgente.',
    urgency: 'medium', urgencyVal: 60,
    verified: false, posted: '2026-04-09',
    received: 3200000
  },
  {
    id: 7, type: 'farm',
    name: 'Asociación de Pequeños Agricultores',
    location: 'Vereda Alto del Vino, Tocaima',
    avatar: '🌾', color: '#116644',
    contact: '+57 316 321 6547',
    email: 'agricultores@altovino.org',
    account: '0055-7777-8888-9999 | Bancolombia',
    needs: ['Semillas certificadas', 'Herramientas agrícolas', 'Fertilizante orgánico', 'Kit de riego'],
    description: '45 familias campesinas afectadas por sequía necesitan apoyo para recuperar sus cultivos de pancoger.',
    urgency: 'high', urgencyVal: 85,
    verified: true, posted: '2026-04-08',
    received: 6800000
  },
  {
    id: 8, type: 'library',
    name: 'Biblioteca Comunitaria El Saber',
    location: 'San Bernardo, Cundinamarca',
    avatar: '📚', color: '#3182ce',
    contact: '+57 317 456 7890',
    email: 'elsaber@bibliotecas.co',
    account: '0077-4444-5555-6666 | AV Villas',
    needs: ['Libros literatura', 'Computadores', 'Impresora', 'Conexión internet'],
    description: 'Biblioteca que atiende a 500 usuarios mensuales. El 80% de los libros están deteriorados y no contamos con acceso a internet.',
    urgency: 'low', urgencyVal: 45,
    verified: true, posted: '2026-04-07',
    received: 1500000
  }
];

const MOCK_DONORS = [
  { id: 1, name: 'Grupo Éxito S.A.S', sector: 'Retail / Supermercados', avatar: '🛒', color: '#22976e', total: 145000000, level: 'platinum', donations: 28, period: 'month' },
  { id: 2, name: 'Cementos Argos', sector: 'Construcción', avatar: '🏗️', color: '#495057', total: 98000000, level: 'gold', donations: 19, period: 'month' },
  { id: 3, name: 'Bavaria S.A.', sector: 'Bebidas', avatar: '🍺', color: '#d4940a', total: 76500000, level: 'gold', donations: 15, period: 'month' },
  { id: 4, name: 'TechColombia SAS', sector: 'Tecnología', avatar: '💻', color: '#3182ce', total: 42000000, level: 'gold', donations: 12, period: 'month' },
  { id: 5, name: 'Constructora Bolívar', sector: 'Construcción', avatar: '🏢', color: '#116644', total: 28000000, level: 'silver', donations: 8, period: 'month' },
  { id: 6, name: 'Avianca Holdings', sector: 'Transporte', avatar: '✈️', color: '#e53e3e', total: 17500000, level: 'silver', donations: 6, period: 'month' },
  { id: 7, name: 'Bancolombia', sector: 'Finanzas', avatar: '🏦', color: '#f0a500', total: 11200000, level: 'silver', donations: 5, period: 'month' },
  { id: 8, name: 'Alpina Productos', sector: 'Alimentos', avatar: '🧀', color: '#805ad5', total: 6800000, level: 'bronze', donations: 4, period: 'month' },
];

const MOCK_ZONES = [
  { id: 1, name: 'Vereda El Palmar', dept: 'Cundinamarca', population: 1240, hasInstitutions: false, needLevel: 'critical', needs: ['Atención médica', 'Alimentos', 'Educación', 'Agua potable'], lat: 4.3, lng: -74.2 },
  { id: 2, name: 'Corregimiento San Luis', dept: 'Chocó', population: 890, hasInstitutions: false, needLevel: 'high', needs: ['Alimentos', 'Medicamentos', 'Ropa', 'Herramientas'], lat: 5.7, lng: -76.6 },
  { id: 3, name: 'Vereda Alto del Monte', dept: 'Nariño', population: 670, hasInstitutions: false, needLevel: 'medium', needs: ['Útiles escolares', 'Alimentos', 'Ropa abrigada'], lat: 1.2, lng: -77.3 },
  { id: 4, name: 'Inspección La Florida', dept: 'Putumayo', population: 1540, hasInstitutions: false, needLevel: 'critical', needs: ['Agua potable', 'Alimentos', 'Atención médica', 'Vivienda'], lat: 0.5, lng: -76.5 },
  { id: 5, name: 'Vereda Las Brisas', dept: 'Bolívar', population: 420, hasInstitutions: false, needLevel: 'high', needs: ['Alimentos', 'Ropa', 'Material educativo'], lat: 9.3, lng: -74.8 },
];

// ─── App State ───────────────────────────────────────
const AppState = {
  user: JSON.parse(localStorage.getItem('hz_user') || 'null'),
  currentFilter: 'all',
  entities: [...MOCK_ENTITIES],
  donors: [...MOCK_DONORS],
  zones: [...MOCK_ZONES],
};

// ─── Utility Functions ───────────────────────────────
// ─── Base Path Helper ─────────────────────────────
const basePath = (() => {
  const path = window.location.pathname;
  const inPages = path.includes('/pages/');
  return {
    page: (name) => inPages ? name : 'pages/' + name,
    root: (name) => inPages ? '../' + name : name,
  };
})();

const fmt = {
  currency: (n) => '$' + Number(n).toLocaleString('es-CO'),
  date: (d) => new Date(d).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' }),
  number: (n) => Number(n).toLocaleString('es-CO'),
  level: (total) => {
    if (total >= 100000000) return { name: 'Platino 💎', class: 'level-platinum' };
    if (total >= 20000000)  return { name: 'Oro 🥇',     class: 'level-gold' };
    if (total >= 5000000)   return { name: 'Plata 🥈',   class: 'level-silver' };
    return { name: 'Bronce 🥉', class: 'level-bronze' };
  },
  urgency: (level) => ({
    high:   { label: 'Urgencia Alta',   color: '#e53e3e' },
    medium: { label: 'Urgencia Media',  color: '#d4940a' },
    low:    { label: 'Urgencia Baja',   color: '#22976e' },
  }[level] || { label: 'Normal', color: '#6c757d' }),
  entityType: (type) => ({
    school:   { label: 'Colegio/Escuela',        icon: '🏫', color: '#3182ce' },
    hospital: { label: 'Hospital/Clínica',        icon: '🏥', color: '#e53e3e' },
    food:     { label: 'Banco de Alimentos',      icon: '🍽️', color: '#dd6b20' },
    elderly:  { label: 'Hogar de Ancianos',       icon: '👴', color: '#805ad5' },
    nursery:  { label: 'Jardín Infantil',         icon: '👶', color: '#22976e' },
    fire:     { label: 'Bomberos',                icon: '🚒', color: '#e53e3e' },
    farm:     { label: 'Agricultores',            icon: '🌾', color: '#116644' },
    library:  { label: 'Biblioteca',              icon: '📚', color: '#3182ce' },
    shelter:  { label: 'Refugio Animal',          icon: '🐾', color: '#dd6b20' },
    health:   { label: 'Puesto de Salud',         icon: '💊', color: '#e53e3e' },
    community:{ label: 'Centro Comunitario',      icon: '⛪', color: '#116644' },
    childcare:{ label: 'Fundación Niños',         icon: '🧒', color: '#f0a500' },
  }[type] || { label: 'Entidad', icon: '🏢', color: '#6c757d' }),
  needColor: (level) => ({
    critical: '#e53e3e',
    high:     '#dd6b20',
    medium:   '#d4940a',
    low:      '#22976e',
  }[level] || '#6c757d'),
};

// ─── Counter Animation ───────────────────────────────
function animateCounter(el, target, duration = 1500, prefix = '', suffix = '') {
  const start = 0;
  const startTime = performance.now();
  const abbreviate = (n) => {
    if (n >= 1e9)  return (n / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
    if (n >= 1e6)  return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1e3)  return (n / 1e3).toFixed(0) + 'K';
    return n.toLocaleString('es-CO');
  };
  const useAbbrev = target >= 100000;
  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);
    el.textContent = prefix + (useAbbrev ? abbreviate(current) : current.toLocaleString('es-CO')) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        entry.target.dataset.done = 'true';
        const target = parseInt(entry.target.dataset.counter);
        const prefix = entry.target.dataset.prefix || '';
        const suffix = entry.target.dataset.suffix || '';
        animateCounter(entry.target, target, 1800, prefix, suffix);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(el => observer.observe(el));
}

// ─── Navbar Scroll ───────────────────────────────────
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
  // Mobile toggle
  const toggle = document.querySelector('.navbar-toggle');
  const menu = document.querySelector('.navbar-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.style.display = menu.style.display === 'flex' ? '' : 'flex';
    });
  }
}

// ─── Page Loader ─────────────────────────────────────
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 500);
  });
}

// ─── Toast System ─────────────────────────────────────
const Toast = {
  container: null,
  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },
  show(message, type = 'success', duration = 3500) {
    if (!this.container) this.init();
    const icons = { success: '✅', warning: '⚠️', error: '❌', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || '✅'}</span><span>${message}</span>`;
    this.container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }
};

// ─── Modal System ─────────────────────────────────────
const Modal = {
  open(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  },
  close(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  },
  init() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
      }
      if (e.target.dataset.modalClose) {
        this.close(e.target.dataset.modalClose);
      }
      if (e.target.dataset.modalOpen) {
        this.open(e.target.dataset.modalOpen);
      }
    });
  }
};

// ─── Tabs ─────────────────────────────────────────────
function initTabs(containerSel) {
  const containers = document.querySelectorAll(containerSel || '[data-tabs]');
  containers.forEach(container => {
    const btns = container.querySelectorAll('.tab-btn');
    const contents = container.querySelectorAll('.tab-content');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        btns.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const targetContent = container.querySelector(`[data-tab-content="${target}"]`);
        if (targetContent) targetContent.classList.add('active');
      });
    });
  });
}

// ─── Chip Filters ─────────────────────────────────────
function initChipFilters(onFilter) {
  const chips = document.querySelectorAll('.chip[data-filter]');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      if (onFilter) onFilter(filter);
    });
  });
}

// ─── Scroll Reveal ────────────────────────────────────
function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('animate-fade-up');
          entry.target.style.opacity = '1';
        }, delay * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ─── Donation Modal ────────────────────────────────────
function openDonationModal(entityId) {
  const entity = AppState.entities.find(e => e.id === entityId);
  if (!entity) return;
  const modal = document.getElementById('modal-donate');
  if (!modal) return;

  modal.querySelector('#donate-entity-name').textContent = entity.name;
  modal.querySelector('#donate-entity-avatar').textContent = entity.avatar;
  modal.querySelector('#donate-entity-location').textContent = entity.location;
  modal.querySelector('#donate-account').textContent = entity.account;
  modal.querySelector('#donate-contact').textContent = entity.contact;
  modal.querySelector('#donate-email').textContent = entity.email;

  const quickBtns = modal.querySelectorAll('.quick-amount-btn');
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      quickBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const input = modal.querySelector('#donate-amount');
      if (input) input.value = btn.dataset.amount;
    });
  });

  const form = modal.querySelector('#form-donate');
  if (form) {
    form.onsubmit = (e) => {
      e_preventDefault(e);
      const amount = modal.querySelector('#donate-amount').value;
      if (!amount || amount <= 0) { Toast.show('Ingresa un monto válido', 'warning'); return; }
      Modal.close('modal-donate');
      Toast.show(`¡Donación de ${fmt.currency(amount)} registrada exitosamente! 🎉`, 'success', 5000);
    };
  }
  Modal.open('modal-donate');
}

function e_preventDefault(e) { if (e && e.preventDefault) e.preventDefault(); }

// ─── Agreement Modal ───────────────────────────────────
function openAgreementModal(entityId) {
  const entity = AppState.entities.find(e => e.id === entityId) ||
                 AppState.zones.find(z => z.id === entityId);
  if (!entity) return;
  Modal.open('modal-agreement');
  const nameEl = document.querySelector('#modal-agreement .agreement-target');
  if (nameEl) nameEl.textContent = entity.name;
}

// ─── Bulletin Card HTML ────────────────────────────────
function createBulletinCard(entity, showActions = true) {
  const typeInfo = fmt.entityType(entity.type);
  const urgInfo  = fmt.urgency(entity.urgency);
  const urgPct   = entity.urgencyVal || 50;

  return `
  <div class="bulletin-card urgency-${entity.urgency}" data-entity="${entity.id}">
    <div class="bulletin-header">
      <div class="bulletin-avatar" style="background:${entity.color||typeInfo.color}">
        ${entity.avatar || typeInfo.icon}
      </div>
      <div style="flex:1; min-width:0">
        <div class="bulletin-title">${entity.name}</div>
        <div class="bulletin-meta">
          📍 ${entity.location} &nbsp;·&nbsp;
          🕒 ${fmt.date(entity.posted || new Date())}
          ${entity.verified ? '&nbsp;·&nbsp; <span class="badge badge-green">✓ Verificado</span>' : ''}
        </div>
        <div class="urgency-bar" title="${urgInfo.label}">
          <div class="urgency-fill" style="width:${urgPct}%; background:${urgInfo.color}"></div>
        </div>
      </div>
      <span class="badge" style="background:${urgInfo.color}20; color:${urgInfo.color}; flex-shrink:0">
        ${urgInfo.label}
      </span>
    </div>
    <div class="bulletin-body">
      <p class="bulletin-description">${entity.description}</p>
      <div class="bulletin-needs">
        ${entity.needs.map(n => `<span class="tag tag-primary">${n}</span>`).join('')}
      </div>
      <div style="margin-top:var(--space-md); display:flex; align-items:center; gap:var(--space-md); font-size:0.85rem; color:var(--text-muted)">
        <span>💰 Recibido: <strong style="color:var(--green-700)">${fmt.currency(entity.received || 0)}</strong></span>
        <span class="tag" style="background:${typeInfo.color}15; color:${typeInfo.color}; border-color:${typeInfo.color}30">
          ${typeInfo.icon} ${typeInfo.label}
        </span>
      </div>
    </div>
    ${showActions ? `
    <div class="bulletin-footer">
      <div style="display:flex; gap:var(--space-sm); flex-wrap:wrap">
        <button class="btn btn-primary btn-sm" onclick="openDonationModal(${entity.id})">
          <i class="fas fa-hand-holding-heart"></i> Donar
        </button>
        <button class="btn btn-outline btn-sm" onclick="openAgreementModal(${entity.id})">
          <i class="fas fa-handshake"></i> Acuerdo
        </button>
        <button class="btn btn-ghost btn-sm" onclick="viewEntityProfile(${entity.id})">
          <i class="fas fa-eye"></i> Ver perfil
        </button>
      </div>
      <div style="display:flex; gap:8px">
        <button class="btn btn-ghost btn-sm btn-icon" title="Compartir" onclick="shareEntity(${entity.id})">
          <i class="fas fa-share-alt"></i>
        </button>
      </div>
    </div>` : ''}
  </div>`;
}

// ─── Rank Card HTML ────────────────────────────────────
function createRankCard(donor, index) {
  const level = fmt.level(donor.total);
  const medals = ['🥇','🥈','🥉'];
  const medal = medals[index] || `#${index + 1}`;
  const isTop5 = index < 5;

  return `
  <div class="rank-card ${isTop5 ? 'top5' : ''}" data-donor="${donor.id}">
    <div class="rank-badge" style="color:${index===0?'#ffd700':index===1?'#c0c0c0':index===2?'#cd7f32':'var(--gray-500)'}">
      ${medal}
    </div>
    <div class="avatar" style="background:${donor.color}; font-size:1.2rem; width:44px; height:44px; border-radius:var(--radius-md)">
      ${donor.avatar}
    </div>
    <div class="rank-info">
      <div class="rank-name">${donor.name}</div>
      <div class="rank-sub">
        ${donor.sector} · ${donor.donations} donaciones
      </div>
      <div class="rank-level">
        <span class="level-badge ${level.class}">${level.name}</span>
        ${isTop5 ? '<span class="badge badge-gold" style="font-size:0.7rem">⭐ Top 5 — Reducción fiscal</span>' : ''}
      </div>
    </div>
    <div class="rank-amount">
      ${fmt.currency(donor.total)}
      <div style="font-size:0.75rem; color:var(--text-muted); font-weight:500">donado</div>
    </div>
  </div>`;
}

// ─── Entity Profile View ───────────────────────────────
function viewEntityProfile(entityId) {
  const entity = AppState.entities.find(e => e.id === entityId);
  if (!entity) return;
  Toast.show(`Viendo perfil de ${entity.name}`, 'info');
}

function shareEntity(entityId) {
  const entity = AppState.entities.find(e => e.id === entityId);
  if (!entity) return;
  if (navigator.share) {
    navigator.share({ title: entity.name, text: entity.description, url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href);
    Toast.show('Enlace copiado al portapapeles', 'success');
  }
}

// ─── Search Filter ────────────────────────────────────
function filterBulletins(q, type, container) {
  if (!container) return;
  let filtered = AppState.entities;
  if (type && type !== 'all') filtered = filtered.filter(e => e.type === type);
  if (q) {
    const ql = q.toLowerCase();
    filtered = filtered.filter(e =>
      e.name.toLowerCase().includes(ql) ||
      e.location.toLowerCase().includes(ql) ||
      e.needs.some(n => n.toLowerCase().includes(ql)) ||
      e.description.toLowerCase().includes(ql)
    );
  }
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-title">No se encontraron resultados</div>
        <p>Intenta con otros términos de búsqueda</p>
      </div>`;
  } else {
    container.innerHTML = filtered.map(e => createBulletinCard(e)).join('');
  }
}

// ─── Init common ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initNavbar();
  initCounters();
  initScrollReveal();
  Modal.init();
  Toast.init();
  initTabs();

  // Ranking preview on index page
  const rankingPreviewList = document.getElementById('ranking-preview-list');
  if (rankingPreviewList) {
    rankingPreviewList.innerHTML = AppState.donors.slice(0, 5).map((d, i) => createRankCard(d, i)).join('');
  }

  // Update auth nav links
  const user = AppState.user;
  const authBtns = document.getElementById('nav-auth');
  if (authBtns && user) {
    authBtns.innerHTML = `
      <a href="${
        basePath.page(user.type === 'donor' ? 'dashboard-donor.html' :
        user.type === 'entity' ? 'dashboard-entity.html' :
        'map.html')
      }" class="btn btn-outline btn-sm">
        <i class="fas fa-tachometer-alt"></i> Mi Panel
      </a>
      <button class="btn btn-ghost btn-sm" onclick="logout()">Salir</button>
    `;
  }
});

function logout() {
  localStorage.removeItem('hz_user');
  Toast.show('Sesión cerrada', 'info');
  setTimeout(() => window.location.href = basePath.root('index.html'), 1000);
}

// Expose globally
window.openDonationModal  = openDonationModal;
window.openAgreementModal = openAgreementModal;
window.viewEntityProfile  = viewEntityProfile;
window.shareEntity        = shareEntity;
window.filterBulletins    = filterBulletins;
window.Toast  = Toast;
window.Modal  = Modal;
window.AppState = AppState;
window.fmt    = fmt;
window.createBulletinCard = createBulletinCard;
window.createRankCard     = createRankCard;
window.basePath = basePath;
