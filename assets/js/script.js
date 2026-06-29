/**
 * RIAN ROCHA ARQUITETURA — assets/js/script.js
 *
 * Módulos
 * ───────
 * 1.  Menu mobile
 * 2.  Scroll reveal
 * 3.  Portfólio — expandir / recolher
 * 4.  Processo — abas (Interiores / Arquitetura)
 * 5.  Depoimentos — renderização
 * 6.  Estrelas de avaliação
 * 7.  Formulário de avaliação
 * 8.  Auxiliares
 */

'use strict';

/* ============================================================
   1. MENU MOBILE
   ============================================================ */
var hamburgerBtn = document.getElementById('hamburger-btn');
var menuCloseBtn = document.getElementById('menu-close-btn');
var mobileMenu   = document.getElementById('mobile-menu');

/** Abre o menu mobile. */
function openMenu() {
  mobileMenu.classList.add('is-open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

/** Fecha o menu mobile. */
function closeMenu() {
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/** Alterna o menu mobile. */
function toggleMenu() {
  mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu();
}

if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);

/* Fecha ao clicar em link interno */
if (mobileMenu) {
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
}

/* Fecha com Escape */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
    closeMenu();
  }
});


/* ============================================================
   2. SCROLL REVEAL
   ============================================================ */
var revealEls = document.querySelectorAll('.reveal');

/** Verifica se cada elemento está na viewport e o exibe. */
function checkReveal() {
  var vpH = window.innerHeight || document.documentElement.clientHeight;
  revealEls.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < vpH * 0.9 && rect.bottom > 0) {
      el.classList.add('is-visible');
    }
  });
}

/* Aplica delay escalonado para efeito cascata */
revealEls.forEach(function (el, i) {
  el.style.transitionDelay = (Math.min(i, 5) * 0.07) + 's';
});

window.addEventListener('scroll', checkReveal, { passive: true });
window.addEventListener('resize', checkReveal);
checkReveal();
[120, 350, 700].forEach(function (t) { setTimeout(checkReveal, t); });


/* ============================================================
   3. PORTFÓLIO — EXPANDIR / RECOLHER
   ============================================================ */
var portfolioExpanded = false;

var portfolioToggle = document.getElementById('portfolio-toggle');
var portfolioExtra  = document.getElementById('portfolio-extra');
var portfolioLabel  = document.getElementById('portfolio-label');
var portfolioArrow  = document.getElementById('portfolio-arrow');

/** Alterna a visibilidade da grade extra de projetos. */
function togglePortfolio() {
  portfolioExpanded = !portfolioExpanded;

  portfolioExtra.classList.toggle('is-open', portfolioExpanded);
  portfolioExtra.setAttribute('aria-hidden', String(!portfolioExpanded));
  portfolioArrow.classList.toggle('is-open', portfolioExpanded);
  portfolioToggle.setAttribute('aria-expanded', String(portfolioExpanded));
  portfolioLabel.textContent = portfolioExpanded
    ? 'VER MENOS'
    : 'VER TODOS OS PROJETOS';
}

if (portfolioToggle) portfolioToggle.addEventListener('click', togglePortfolio);


/* ============================================================
   3b. LIGHTBOX — VISUALIZAR PROJETO EM TELA CHEIA
   ============================================================ */
var lightbox      = document.getElementById('lightbox');
var lightboxImg   = document.getElementById('lightbox-img');
var lightboxCap   = document.getElementById('lightbox-caption');
var lightboxClose = document.getElementById('lightbox-close');

/** Abre o lightbox com a imagem do item clicado. */
function openLightbox(src, caption, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightboxCap.textContent = caption || '';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

/** Fecha o lightbox. */
function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

/* Clique no botão fechar */
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

/* Clique no fundo do lightbox (fora da imagem) */
if (lightbox) {
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
}

/* Tecla Escape fecha o lightbox */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
    closeLightbox();
  }
});

/* Delegação de clique para todos os port-item com data-src */
document.addEventListener('click', function (e) {
  var item = e.target.closest('.port-item[data-src]');
  if (!item) return;
  var src     = item.getAttribute('data-src');
  var caption = item.getAttribute('data-caption');
  var img     = item.querySelector('.port-img');
  var alt     = img ? img.alt : '';
  openLightbox(src, caption, alt);
});

/* Suporte a teclado: Enter / Espaço nos itens clicáveis */
document.addEventListener('keydown', function (e) {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  var item = e.target.closest('.port-item[data-src]');
  if (!item) return;
  e.preventDefault();
  var src     = item.getAttribute('data-src');
  var caption = item.getAttribute('data-caption');
  var img     = item.querySelector('.port-img');
  var alt     = img ? img.alt : '';
  openLightbox(src, caption, alt);
});


/* ============================================================
   4. PROCESSO — ABAS (INTERIORES / ARQUITETURA)
   ============================================================ */

/** Dados das etapas por tipo de projeto. */
var stepsData = {
  interiores: [
    {
      num: '01',
      title: 'Reunião de briefing',
      desc: 'Entrevista para entender necessidades, rotina e referências de cada cliente.',
    },
    {
      num: '02',
      title: 'Estudo de Layout',
      desc: 'Organização dos ambientes, distribuição dos espaços e definição da planta.',
    },
    {
      num: '03',
      title: 'Estudo Preliminar',
      desc: 'Apresentação do projeto em 3D, com imagens renderizadas que antecipam a experiência.',
    },
    {
      num: '04',
      title: 'Projeto Executivo',
      desc: 'Caderno técnico completo: marcenaria, marmoraria, paginação de pisos, revestimentos, ' +
            'pintura, luminotécnico, pontos elétricos e hidráulicos, planta de forro e todos os detalhamentos.',
    },
  ],
  arquitetura: [
    {
      num: '01',
      title: 'Reunião de briefing',
      desc: 'Entrevista para entender necessidades, rotina e referências de cada cliente.',
    },
    {
      num: '02',
      title: 'Estudo de Layout',
      desc: 'Organização dos ambientes, distribuição dos espaços e definição da planta.',
    },
    {
      num: '03',
      title: 'Estudo Preliminar',
      desc: 'Apresentação do projeto em 3D, com imagens renderizadas que antecipam a experiência.',
    },
    {
      num: '04',
      title: 'Projeto Executivo',
      desc: 'Plantas de todos os pavimentos, cortes, elevações, detalhes construtivos e a ' +
            'documentação técnica necessária para a execução.',
    },
  ],
};

/**
 * Renderiza as etapas do processo no DOM.
 * @param {string} fluxo - 'interiores' | 'arquitetura'
 */
function renderSteps(fluxo) {
  var grid = document.getElementById('steps-grid');
  if (!grid) return;

  grid.innerHTML = stepsData[fluxo].map(function (step) {
    return (
      '<div class="step">' +
        '<div class="step__bubble">' +
          '<span class="step__num">' + step.num + '</span>' +
        '</div>' +
        '<h3 class="step__title">' + step.title + '</h3>' +
        '<p class="step__desc">' + step.desc + '</p>' +
      '</div>'
    );
  }).join('');
}

/**
 * Alterna entre os fluxos Interiores e Arquitetura.
 * @param {string} fluxo - 'interiores' | 'arquitetura'
 */
function setFluxo(fluxo) {
  var tabInt = document.getElementById('tab-interiores');
  var tabArq = document.getElementById('tab-arquitetura');

  if (tabInt) {
    tabInt.classList.toggle('tab-btn--active', fluxo === 'interiores');
    tabInt.setAttribute('aria-selected', String(fluxo === 'interiores'));
  }
  if (tabArq) {
    tabArq.classList.toggle('tab-btn--active', fluxo === 'arquitetura');
    tabArq.setAttribute('aria-selected', String(fluxo === 'arquitetura'));
  }

  renderSteps(fluxo);
}

/* Expõe ao escopo global (chamado via onclick no HTML) */
window.setFluxo = setFluxo;

/* Renderização inicial */
renderSteps('interiores');


/* ============================================================
   5. DEPOIMENTOS — RENDERIZAÇÃO
   ============================================================ */

/** Lista de depoimentos (pode ser alimentada via Supabase). */
var testimonials = [
  {
    name:    'Marina Albuquerque',
    role:    'RESIDÊNCIA JARDIM',
    rating:  5,
    comment: 'O Rian traduziu em projeto exatamente a forma como sonhávamos viver. Cada detalhe tem intenção.',
  },
  {
    name:    'Eduardo Tavares',
    role:    'COBERTURA AURORA',
    rating:  5,
    comment: 'Profissionalismo e sensibilidade raros. O resultado superou qualquer referência que levamos.',
  },
  {
    name:    'Camila Rezende',
    role:    'APARTAMENTO CENTRO',
    rating:  5,
    comment: 'Conduziu todo o processo com clareza e elegância. Confiança do primeiro encontro à entrega.',
  },
];

/**
 * Retorna as iniciais de um nome (máx. 2 letras).
 * @param {string} name
 * @returns {string}
 */
function monogram(name) {
  var parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length)    return '·';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Renderiza os cards de depoimentos no DOM. */
function renderTestimonials() {
  var grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  grid.innerHTML = testimonials.map(function (t) {
    var full  = '★'.repeat(t.rating);
    var empty = '★'.repeat(Math.max(0, 5 - t.rating));

    return (
      '<article class="t-card">' +
        '<div class="t-card__stars" aria-label="' + t.rating + ' de 5 estrelas">' +
          '<span class="t-card__stars-full"  aria-hidden="true">' + full  + '</span>' +
          '<span class="t-card__stars-empty" aria-hidden="true">' + empty + '</span>' +
        '</div>' +
        '<p class="t-card__text">' + escapeHTML(t.comment) + '</p>' +
        '<div class="t-card__author">' +
          '<span class="t-card__mono" aria-hidden="true">' + monogram(t.name) + '</span>' +
          '<div>' +
            '<p class="t-card__name">' + escapeHTML(t.name)  + '</p>' +
            '<p class="t-card__role">' + escapeHTML(t.role)  + '</p>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }).join('');
}

renderTestimonials();


/* ============================================================
   6. ESTRELAS DE AVALIAÇÃO
   ============================================================ */
var formRating = 5;

/** Renderiza os botões de estrela no DOM. */
function renderStars() {
  var row = document.getElementById('stars-row');
  if (!row) return;

  row.innerHTML = [1, 2, 3, 4, 5].map(function (n) {
    var filled = n <= formRating ? ' is-filled' : '';
    return (
      '<button class="star' + filled + '" type="button" ' +
        'aria-label="' + n + ' estrela' + (n > 1 ? 's' : '') + '" ' +
        'onclick="setStar(' + n + ')">★</button>'
    );
  }).join('');
}

/**
 * Define a nota de avaliação e atualiza as estrelas.
 * @param {number} n - valor de 1 a 5
 */
function setStar(n) {
  formRating = n;
  renderStars();
}

/* Expõe ao escopo global */
window.setStar = setStar;

renderStars();


/* ============================================================
   7. FORMULÁRIO DE AVALIAÇÃO
   ============================================================ */

/** Valida e envia a avaliação do usuário. */
function submitReview() {
  var nameInput    = document.getElementById('form-name');
  var commentInput = document.getElementById('form-comment');
  var thanksMsg    = document.getElementById('thanks-msg');

  var name    = nameInput    ? nameInput.value.trim()    : '';
  var comment = commentInput ? commentInput.value.trim() : '';

  if (!name || !comment) return;

  /* Adiciona novo depoimento ao topo da lista */
  testimonials.unshift({
    name:    name,
    role:    'CLIENTE',
    rating:  formRating,
    comment: comment,
  });

  renderTestimonials();

  /* Limpa os campos */
  if (nameInput)    nameInput.value    = '';
  if (commentInput) commentInput.value = '';
  formRating = 5;
  renderStars();

  /* Exibe mensagem de confirmação por 4 s */
  if (thanksMsg) {
    thanksMsg.removeAttribute('hidden');
    setTimeout(function () {
      thanksMsg.setAttribute('hidden', '');
    }, 4000);
  }
}

/* Expõe ao escopo global */
window.submitReview = submitReview;


/* ============================================================
   8. AUXILIARES
   ============================================================ */

/**
 * Escapa caracteres HTML para evitar XSS em conteúdo gerado pelo usuário.
 * @param {string} str
 * @returns {string}
 */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}
