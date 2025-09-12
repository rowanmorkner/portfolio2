document.addEventListener('DOMContentLoaded', function() {
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Highlight active navigation link
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
  
  // Add scroll-based header styling
  const header = document.querySelector('.header');
  
  function handleScroll() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  
  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe paper cards for animation
  const paperCards = document.querySelectorAll('.paper-card');
  paperCards.forEach(card => {
    observer.observe(card);
  });
  
  // Add animation classes to CSS dynamically
  const style = document.createElement('style');
  style.textContent = `
    .nav__links a.active {
      color: #2563eb;
      position: relative;
    }
    
    .nav__links a.active::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #2563eb;
      transform: scaleX(1);
      transition: transform 0.3s ease;
    }
    
    .header.scrolled {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
    }
    
    .paper-card {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .paper-card.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    @media (prefers-reduced-motion: reduce) {
      .paper-card,
      .paper-card.animate-in {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }
  `;
  
  document.head.appendChild(style);
  
  // Add hover effects for buttons
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      if (!this.classList.contains('btn--primary')) {
        this.style.transform = 'translateY(0)';
      }
    });
  });
  
  // Add loading animation
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
      body {
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      
      body.loaded {
        opacity: 1;
      }
    `;
    
    document.head.appendChild(loadingStyle);
  });
  
  // Log page analytics (for development)
  console.log('Research portfolio loaded successfully');
  console.log('Page sections:', document.querySelectorAll('section').length);
  console.log('Research papers:', document.querySelectorAll('.paper-card').length);
  
});