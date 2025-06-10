 const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;

      // Close all open contents except this one
      document.querySelectorAll('.accordion-content').forEach(panel => {
        if (panel !== content) {
          panel.classList.remove('open');
        }
      });

      content.classList.toggle('open');
    });
  });
