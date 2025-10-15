// Shared Navbar Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navbarMenu = document.querySelector('.navbar-menu');
  const navbar = document.querySelector('.site-navbar');

  if (hamburger && navbarMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = hamburger.contains(event.target) || navbarMenu.contains(event.target);

      if (!isClickInside && navbarMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
      }
    });

    // Close menu when clicking a link
    const navLinks = navbarMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    });
  }

  // Highlight active page in navbar
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-menu a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage ||
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Hide/show navbar on scroll
  let lastScrollTop = 0;
  const scrollThreshold = 5;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(scrollTop - lastScrollTop) < scrollThreshold) {
      return;
    }

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.classList.add('navbar-hidden');
    } else {
      // Scrolling up
      navbar.classList.remove('navbar-hidden');
    }

    lastScrollTop = scrollTop;
  });
});
