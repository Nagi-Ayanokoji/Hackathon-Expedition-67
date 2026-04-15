/* ===================================================
   HambreZero — Auth Logic
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const steps = {
    typeSelect: document.getElementById('step-type'),
    form:       document.getElementById('step-form'),
  };
  
  let selectedType = null;
  let authMode = 'login'; // login | register

  // ─── Mode toggle ───────────────────────────────────
  const modeLoginBtn   = document.getElementById('mode-login');
  const modeRegisterBtn= document.getElementById('mode-register');
  const formTitle      = document.getElementById('form-main-title');
  const loginSection   = document.getElementById('section-login');
  const registerSection= document.getElementById('section-register');
  const typeSelectorWrap= document.getElementById('type-selector-wrap');

  function setMode(mode) {
    authMode = mode;
    modeLoginBtn?.classList.toggle('active', mode === 'login');
    modeRegisterBtn?.classList.toggle('active', mode === 'register');
    if (loginSection)   loginSection.style.display   = mode === 'login'    ? 'block' : 'none';
    if (registerSection) registerSection.style.display = mode === 'register' ? 'block' : 'none';
    if (typeSelectorWrap) typeSelectorWrap.style.display = mode === 'register' ? 'block' : 'none';
    if (formTitle) {
      formTitle.textContent = mode === 'login' ? 'Bienvenido de vuelta' : 'Crear tu cuenta';
    }
  }

  modeLoginBtn?.addEventListener('click',    () => setMode('login'));
  modeRegisterBtn?.addEventListener('click', () => setMode('register'));

  // ─── Account type cards ─────────────────────────────
  const typeCards = document.querySelectorAll('.auth-type-card');
  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedType = card.dataset.type;
      updateRegisterForm(selectedType);
    });
  });

  // ─── Register form fields per type ─────────────────
  const extraFields = document.getElementById('extra-fields');
  function updateRegisterForm(type) {
    if (!extraFields) return;
    const fieldSets = {
      entity: `
        <div class="form-group">
          <label class="form-label">Nombre de la institución *</label>
          <div class="input-group">
            <i class="fas fa-building input-icon"></i>
            <input type="text" class="form-control" name="institution_name" placeholder="Ej: Colegio Rural San Francisco" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Tipo de entidad *</label>
          <select class="form-control form-select" name="entity_type" required>
            <option value="">Seleccionar tipo...</option>
            <option value="school">🏫 Colegio / Escuela</option>
            <option value="hospital">🏥 Hospital / Clínica</option>
            <option value="food">🍽️ Banco de Alimentos / Comedor</option>
            <option value="elderly">👴 Hogar de Ancianos</option>
            <option value="nursery">👶 Jardín Infantil / CDI</option>
            <option value="fire">🚒 Bomberos / Defensa Civil</option>
            <option value="farm">🌾 Asociación Agrícola</option>
            <option value="library">📚 Biblioteca Comunitaria</option>
            <option value="shelter">🐾 Refugio de Animales</option>
            <option value="health">💊 Puesto de Salud Rural</option>
            <option value="community">⛪ Centro Comunitario</option>
            <option value="childcare">🧒 Fundación para Niños</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Municipio / Vereda *</label>
          <div class="input-group">
            <i class="fas fa-map-marker-alt input-icon"></i>
            <input type="text" class="form-control" name="location" placeholder="Ej: Vereda El Palmar, Cundinamarca" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Teléfono de contacto *</label>
          <div class="input-group">
            <i class="fas fa-phone input-icon"></i>
            <input type="tel" class="form-control" name="phone" placeholder="+57 300 000 0000" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">No. de cuenta bancaria (para transferencias) *</label>
          <div class="input-group">
            <i class="fas fa-university input-icon"></i>
            <input type="text" class="form-control" name="account" placeholder="Número de cuenta | Banco" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Red social / Instagram / Facebook (opcional)</label>
          <div class="input-group">
            <i class="fas fa-share-alt input-icon"></i>
            <input type="text" class="form-control" name="social" placeholder="@institución">
          </div>
        </div>`,
      donor: `
        <div class="form-group">
          <label class="form-label">Nombre de la empresa *</label>
          <div class="input-group">
            <i class="fas fa-building input-icon"></i>
            <input type="text" class="form-control" name="company_name" placeholder="Ej: Empresa S.A.S" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Sector / Industria *</label>
          <select class="form-control form-select" name="sector" required>
            <option value="">Seleccionar sector...</option>
            <option>Retail / Supermercados</option>
            <option>Construcción</option>
            <option>Tecnología</option>
            <option>Alimentos y Bebidas</option>
            <option>Finanzas / Banca</option>
            <option>Salud / Farmacéutico</option>
            <option>Logística / Transporte</option>
            <option>Educación</option>
            <option>Agropecuario</option>
            <option>Manufactura</option>
            <option>Energía</option>
            <option>Otro</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">NIT de la empresa *</label>
          <div class="input-group">
            <i class="fas fa-id-card input-icon"></i>
            <input type="text" class="form-control" name="nit" placeholder="900.123.456-7" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Teléfono corporativo *</label>
          <div class="input-group">
            <i class="fas fa-phone input-icon"></i>
            <input type="tel" class="form-control" name="phone" placeholder="+57 (1) 000-0000">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Representante legal *</label>
          <div class="input-group">
            <i class="fas fa-user input-icon"></i>
            <input type="text" class="form-control" name="legal_rep" placeholder="Nombre completo" required>
          </div>
        </div>`,
      zone: `
        <div class="form-group">
          <label class="form-label">Nombre de la zona / vereda *</label>
          <div class="input-group">
            <i class="fas fa-map input-icon"></i>
            <input type="text" class="form-control" name="zone_name" placeholder="Ej: Vereda La Esperanza" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Municipio y Departamento *</label>
          <div class="input-group">
            <i class="fas fa-map-marker-alt input-icon"></i>
            <input type="text" class="form-control" name="municipality" placeholder="Ej: Tibacuy, Cundinamarca" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Población aproximada *</label>
          <div class="input-group">
            <i class="fas fa-users input-icon"></i>
            <input type="number" class="form-control" name="population" placeholder="Número de habitantes" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Nombre del representante de la comunidad *</label>
          <div class="input-group">
            <i class="fas fa-user input-icon"></i>
            <input type="text" class="form-control" name="representative" placeholder="Nombre completo" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Principales necesidades de la zona *</label>
          <textarea class="form-control" name="main_needs" rows="3" placeholder="Ej: Agua potable, alimentos, atención médica..." required></textarea>
        </div>`,
    };
    extraFields.innerHTML = fieldSets[type] || '';
    // Animate in
    extraFields.style.opacity = '0';
    requestAnimationFrame(() => {
      extraFields.style.transition = 'opacity 0.3s ease';
      extraFields.style.opacity = '1';
    });
  }

  // ─── Login form ─────────────────────────────────────
  const loginForm = document.getElementById('form-login');
  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('[name="email"]').value;
    const pass  = loginForm.querySelector('[name="password"]').value;

    if (!email || !pass) { Toast.show('Completa todos los campos', 'warning'); return; }

    setLoading(loginForm.querySelector('[type="submit"]'), true);
    setTimeout(() => {
      // Mock auth — detect type from email
      const mockUser = { email, type: 'donor', name: 'Empresa Demo' };
      if (email.includes('colegio') || email.includes('hospital') || email.includes('fundacion')) {
        mockUser.type = 'entity';
        mockUser.name = 'Entidad Demo';
      } else if (email.includes('zona') || email.includes('vereda')) {
        mockUser.type = 'zone';
        mockUser.name = 'Zona Demo';
      }
      localStorage.setItem('hz_user', JSON.stringify(mockUser));
      Toast.show('¡Bienvenido de vuelta! 👋', 'success');
      setTimeout(() => {
        const redirects = { donor: 'dashboard-donor.html', entity: 'dashboard-entity.html', zone: 'map.html' };
        window.location.href = redirects[mockUser.type] || '../index.html';
      }, 1000);
    }, 1500);
  });

  // ─── Register form ──────────────────────────────────
  const registerForm = document.getElementById('form-register');
  registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selectedType) { Toast.show('Selecciona un tipo de cuenta', 'warning'); return; }
    const email    = registerForm.querySelector('[name="email"]').value;
    const password = registerForm.querySelector('[name="password"]').value;
    const password2= registerForm.querySelector('[name="password2"]').value;
    if (password !== password2) { Toast.show('Las contraseñas no coinciden', 'error'); return; }
    if (password.length < 6)    { Toast.show('La contraseña debe tener al menos 6 caracteres', 'warning'); return; }

    setLoading(registerForm.querySelector('[type="submit"]'), true);
    setTimeout(() => {
      const newUser = { email, type: selectedType, name: 'Nuevo Usuario', created: new Date().toISOString() };
      localStorage.setItem('hz_user', JSON.stringify(newUser));
      Toast.show('¡Cuenta creada exitosamente! 🎉', 'success', 4000);
      setTimeout(() => {
        const redirects = { donor: 'dashboard-donor.html', entity: 'dashboard-entity.html', zone: 'map.html' };
        window.location.href = redirects[selectedType] || '../index.html';
      }, 1500);
    }, 1800);
  });

  function setLoading(btn, loading) {
    if (!btn) return;
    btn.disabled = loading;
    btn.innerHTML = loading
      ? '<span style="display:inline-block;width:18px;height:18px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.8s linear infinite"></span> Procesando...'
      : btn.dataset.originalText || btn.textContent;
    if (!btn.dataset.originalText) btn.dataset.originalText = btn.textContent;
  }

  // ─── Password toggle ─────────────────────────────────
  document.querySelectorAll('[data-toggle-password]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.querySelector(btn.dataset.togglePassword);
      if (!input) return;
      const isPass = input.type === 'password';
      input.type = isPass ? 'text' : 'password';
      btn.innerHTML = isPass ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
    });
  });

  // Default mode
  setMode('login');
});
