// Shared Navbar Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navbarMenu = document.querySelector('.navbar-menu');

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
});
