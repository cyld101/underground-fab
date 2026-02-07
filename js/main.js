/* ============================================
   UNDERGROUND FAB — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation ---
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Sticky Header Shadow ---
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // --- Scroll Fade-In Animation ---
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeElements.forEach(el => fadeObserver.observe(el));
  }

  // --- Product / Gallery Filter Buttons ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter product cards (shop page)
      if (productCards.length > 0) {
        productCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            // Re-trigger fade-in
            setTimeout(() => card.classList.add('visible'), 50);
          } else {
            card.style.display = 'none';
            card.classList.remove('visible');
          }
        });
      }

      // Filter gallery items (gallery page)
      if (typeof galleryImages !== 'undefined') {
        renderGallery(filter);
      }
    });
  });

  // --- Gallery Rendering ---
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryEmpty = document.getElementById('galleryEmpty');

  function renderGallery(filter = 'all') {
    if (!galleryGrid || typeof galleryImages === 'undefined') return;

    const filtered = filter === 'all'
      ? galleryImages
      : galleryImages.filter(img => img.category === filter);

    if (filtered.length === 0) {
      galleryGrid.style.display = 'none';
      if (galleryEmpty) galleryEmpty.style.display = 'block';
      return;
    }

    galleryGrid.style.display = '';
    if (galleryEmpty) galleryEmpty.style.display = 'none';

    galleryGrid.innerHTML = filtered.map((img, index) => `
      <div class="gallery-item fade-in" data-index="${index}" data-src="${img.src}">
        <img src="${img.src}" alt="${img.title}" loading="lazy">
        <div class="gallery-item-overlay">
          <h4>${img.title}</h4>
          <p>${img.description}</p>
        </div>
      </div>
    `).join('');

    // Fade in gallery items with stagger
    const items = galleryGrid.querySelectorAll('.gallery-item');
    items.forEach((item, i) => {
      setTimeout(() => item.classList.add('visible'), i * 100);
    });

    // Attach lightbox click events
    items.forEach(item => {
      item.addEventListener('click', () => {
        const src = item.dataset.src;
        const index = parseInt(item.dataset.index);
        openLightbox(src, index, filtered);
      });
    });
  }

  // Initialize gallery if on gallery page
  if (galleryGrid && typeof galleryImages !== 'undefined') {
    renderGallery();
  }

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let currentLightboxIndex = 0;
  let currentLightboxImages = [];

  function openLightbox(src, index, images) {
    if (!lightbox || !lightboxImage) return;
    currentLightboxIndex = index;
    currentLightboxImages = images;
    lightboxImage.src = src;
    lightboxImage.alt = images[index]?.title || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    if (currentLightboxImages.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + direction + currentLightboxImages.length) % currentLightboxImages.length;
    const img = currentLightboxImages[currentLightboxIndex];
    if (lightboxImage) {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.title || '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // --- Contact Form ---
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // For a static site, we'll show the success message
      // In production, you'd send this to a service like Formspree, Netlify Forms, etc.
      console.log('Form submitted:', data);

      // Show success message
      contactForm.querySelectorAll('input, textarea, select, button').forEach(el => {
        el.style.display = 'none';
      });
      contactForm.querySelector('.form-row').style.display = 'none';
      if (formSuccess) formSuccess.classList.add('show');

      // Reset after 5 seconds
      setTimeout(() => {
        contactForm.reset();
        contactForm.querySelectorAll('input, textarea, select, button').forEach(el => {
          el.style.display = '';
        });
        contactForm.querySelector('.form-row').style.display = '';
        if (formSuccess) formSuccess.classList.remove('show');
      }, 5000);
    });
  }

});
