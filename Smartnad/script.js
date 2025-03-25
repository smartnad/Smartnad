// Initialize GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Hero section animations
gsap.from('.hero-heading', {
  duration: 1,
  opacity: 0,
  y: 50,
  ease: 'power4.out'
});

// Portfolio items data

// Initialize smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    gsap.to(window, {
      duration: 1,
      scrollTo: this.hash,
      ease: 'power2.inOut'
    });
  });
});

// Handle sticky navigation
let lastScroll = 0;
const navbar = document.querySelector('.nav-bar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }
  lastScroll = currentScroll;
});

// Portfolio items data
const portfolioItems = [
  {
    image: 'image copy.png',
    category: 'Logo Design',
    title: 'Brand Logo Design'
  },
  {
    image: 'logo1.jpg',
    category: 'Logo Design',
    title: 'Cafe Brand Identity'
  },
  {
    image: 'website1.jpg',
    category: 'Web Development',
    title: 'Portfolio Website'
  },
  {
    image: 'social1.jpg',
    category: 'Social Media',
    title: 'Instagram Campaign'
  },
  {
    image: 'print1.jpg',
    category: 'Print Media',
    title: 'Business Stationery'
  }
];

// Pricing cards data
const pricingCards = [
  {
    title: 'Logo Design',
    price: '₹3000',
    features: []
  },
  {
    title: 'Business Card Design',
    price: '₹1200',
    features: []
  },
  {
    title: 'Portfolio Website Development',
    price: '₹3000',
    features: []
  },
  {
    title: 'Social Media Branding',
    price: '₹2000',
    features: []
  }
];

// Generate portfolio grid
function renderPortfolio() {
  const grid = document.querySelector('.portfolio-grid');
  grid.innerHTML = portfolioItems.map(item => `
    <div class="portfolio-item">
      <img src="${item.image}" alt="${item.title}">
      <div class="portfolio-overlay">
        <h4>${item.category}</h4>
        <h3>${item.title}</h3>
      </div>
    </div>
  `).join('');
}

// Animate service cards on scroll
  gsap.utils.toArray('.service-card').forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top center+=100'
      },
      opacity: 0,
      y: 50,
      duration: 0.8
    });
  });
});

// Filter portfolio items
function filterPortfolio(category) {
  const items = document.querySelectorAll('.portfolio-item');
  items.forEach(item => {
    const itemCategory = item.querySelector('h4').textContent;
    if (category === 'all' || itemCategory === category) {
      gsap.to(item, { opacity: 1, duration: 0.5, display: 'block' });
    } else {
      gsap.to(item, { opacity: 0, duration: 0.5, display: 'none' });
    }
  });
}

// Render pricing cards
function renderPricing() {
  const grid = document.querySelector('.pricing-grid');
  grid.innerHTML = pricingCards.map(card => `
    <div class="service-card pricing-card">
      <h3>✔️ ${card.title}</h3>
      <p class="price">${card.price}</p>
      <a href="#contact" class="cta-button">Get Started</a>
    </div>
  `).join('');
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  console.log('Form submitted:', data);
  // Add your form submission logic here
  e.target.reset();
}

document.addEventListener('DOMContentLoaded', () => {
  renderPortfolio();
  renderPricing();

  // Initialize smooth scroll
  gsap.utils.toArray('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      gsap.to(window, {
        duration: 1,
        scrollTo: target,
        ease: 'power2.inOut'
      });
    });
  });

  // Initialize portfolio filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');
      filterPortfolio(btn.dataset.filter);
    });
  });

  // Initialize form submission
  document.getElementById('inquiryForm').addEventListener('submit', handleFormSubmit);

  // Animate elements on scroll
  const animateOnScroll = elements => {
    gsap.utils.toArray(elements).forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top center+=100'
        },
        opacity: 0,
        y: 50,
        duration: 0.8
      });
    });
  };

  // Apply animations to various sections
  animateOnScroll('.portfolio-item');
  animateOnScroll('.service-card');
  animateOnScroll('.about-content > *');
  animateOnScroll('.contact-form, .contact-info');
});