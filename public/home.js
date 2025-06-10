const slideContainer = document.querySelector('.carousel-slide');
  const slides = slideContainer.querySelectorAll('img');
  const prevBtn = document.querySelector('.arrow-left');
  const nextBtn = document.querySelector('.arrow-right');
  let currentIndex = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    // Clamp index to valid range
    if(index < 0) currentIndex = totalSlides - 1;
    else if(index >= totalSlides) currentIndex = 0;
    else currentIndex = index;

    slideContainer.style.transform = `translateX(-${currentIndex * 900}px)`;
  }

  prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
    resetAutoSlide();
  });
  nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
    resetAutoSlide();
  });

  // Auto slide every 15 seconds
  let slideInterval = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 15000);

  function resetAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 15000);
  }

  // Initialize
  showSlide(currentIndex);
