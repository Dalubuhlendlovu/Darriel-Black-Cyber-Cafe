/* ===================================================
   DARRIEL BLACK CYBER CAFE – Global JS
   =================================================== */

/* ---- Navbar scroll effect ---- */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* ---- Mobile hamburger ---- */
const hamburger = document.querySelector('.nav-hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
  const syncMobileMenuState = () => {
    const isMobile = window.innerWidth <= 768;
    const isOpen = navMenu.classList.contains('open');

    if (isMobile) {
      navMenu.style.display = isOpen ? 'flex' : 'none';
      navMenu.style.visibility = isOpen ? 'visible' : 'hidden';
      navMenu.style.opacity = isOpen ? '1' : '0';
    } else {
      navMenu.style.display = '';
      navMenu.style.visibility = '';
      navMenu.style.opacity = '';
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    syncMobileMenuState();
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
      syncMobileMenuState();
    });
  });

  window.addEventListener('resize', syncMobileMenuState);
  syncMobileMenuState();
}

/* ---- Active nav link ---- */
(function setActiveNavLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === page || (page === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });
})();

/* ---- Scroll reveal ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- Gallery filter ---- */
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const items = document.querySelectorAll('[data-category]');
      items.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.style.opacity = match ? '1' : '0.2';
        item.style.transform = match ? 'scale(1)' : 'scale(0.95)';
        item.style.pointerEvents = match ? 'auto' : 'none';
      });
    });
  });
}

/* ---- Cart notification ---- */
function showCartNotification(productName) {
  let notif = document.querySelector('.cart-notification');
  if (!notif) {
    notif = document.createElement('div');
    notif.className = 'cart-notification';
    document.body.appendChild(notif);
  }
  notif.textContent = `✓ ${productName} added to cart`;
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 2800);
}

document.querySelectorAll('.btn-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const name = btn.dataset.name || 'Item';
    showCartNotification(name);
    // Animate button
    btn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => { btn.innerHTML = '<i class="fas fa-cart-plus"></i>'; }, 1500);
  });
});

/* ---- Quote form service dropdown custom behave ---- */
const quoteService = document.getElementById('quoteService');
if (quoteService) {
  quoteService.addEventListener('change', () => {
    quoteService.style.color = 'var(--white)';
  });
}

/* ---- Contact form submission ---- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'var(--accent)';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      this.reset();
    }, 3000);
  });
}

/* ---- Quote form submission ---- */
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Quote Request Sent!';
    setTimeout(() => {
      btn.innerHTML = original;
      this.reset();
    }, 3500);
  });
}

/* ---- File upload label update ---- */
const fileInput = document.getElementById('quoteFile');
if (fileInput) {
  fileInput.addEventListener('change', () => {
    const label = document.querySelector('.file-upload p');
    if (label && fileInput.files.length) {
      label.textContent = `${fileInput.files.length} file(s) selected`;
    }
  });
}

/* ---- Smooth counter animation (homepage stats) ---- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ---- Year in footer ---- */
document.querySelectorAll('.current-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});
