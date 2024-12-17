// splide-init.js
export function initializeSplide() {
    let splideInstance;
  
    function initSplide() {
      const cardsList = document.querySelector('.cards__list');
  
      if (!cardsList) {
        console.error('Элемент .cards__list не найден!');
        return;
      }
  
      // Добавляем классы и оборачиваем HTML для Splide
      cardsList.classList.add('splide');
      cardsList.innerHTML = `
        <div class="splide__track">
          <ul class="splide__list">${cardsList.innerHTML}</ul>
        </div>
        <div class="custom-controls">
          <div class="splide__arrows">
            <button class="splide__arrow splide__arrow--prev">
              <svg width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.75 30H17V0H12.75L0 12.5581V17.4419L12.75 30Z" fill="#FF4800"/>
              </svg>
            </button>
            <ul class="splide__pagination"></ul>
            <button class="splide__arrow splide__arrow--next">
              <svg width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.25 30H0V0H4.25L17 12.5581V17.4419L4.25 30Z" fill="#FF4800"/>
              </svg>
            </button>
          </div>
        </div>
      `;
  
      const slides = document.querySelectorAll('.splide__list > li');
      slides.forEach((slide) => slide.classList.add('splide__slide'));
  
      // Инициализация Splide
      splideInstance = new Splide('.splide', {
        type: 'loop',
        perPage: 1,
        gap: '1rem',
        pagination: true,
        arrows: true,
        drag: true,
        flickPower: 300,
      });
  
      splideInstance.mount();
      console.log('Splide успешно инициализирован.');
    }
  
    function destroySplide() {
      if (splideInstance) {
        splideInstance.destroy();
        splideInstance = null;
  
        const splide = document.querySelector('.splide');
        const originalList = document.createElement('ul');
        originalList.className = 'cards__list';
  
        const slides = document.querySelectorAll('.splide__slide');
        slides.forEach((slide) => {
          slide.classList.remove('splide__slide');
          originalList.appendChild(slide);
        });
  
        splide.replaceWith(originalList);
        console.log('Splide успешно уничтожен.');
      }
    }
  
    function checkScreenWidth() {
      const screenWidth = window.innerWidth;
  
      if (screenWidth <= 768) {
        if (!splideInstance) {
          initSplide();
        }
      } else {
        destroySplide();
      }
    }
  
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
  }