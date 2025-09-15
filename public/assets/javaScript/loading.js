
  // Show loader immediately
  document.getElementById('loader').style.display = 'block';

  // Hide loader when page is fully loaded
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = 1;
      const fadeOut = setInterval(() => {
        loader.style.opacity -= 0.05;
        if (loader.style.opacity <= 0) {
          loader.style.display = 'none';
          clearInterval(fadeOut);
        }
      }, 16); // smooth fade out
    }
  });

