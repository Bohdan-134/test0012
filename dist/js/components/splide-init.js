function initializeSplide(){let i;function e(){if(window.innerWidth<=768)i||((e=document.querySelector(".cards__list"))?(e.classList.add("splide"),e.innerHTML=`
        <div class="splide__track">
          <ul class="splide__list">${e.innerHTML}</ul>
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
      `,document.querySelectorAll(".splide__list > li").forEach(e=>e.classList.add("splide__slide")),(i=new Splide(".splide",{type:"loop",perPage:1,gap:"1rem",pagination:!0,arrows:!0,drag:!0,flickPower:300})).mount(),console.log("Splide успешно инициализирован.")):console.error("Элемент .cards__list не найден!"));else if(i){i.destroy(),i=null;var e=document.querySelector(".splide");let l=document.createElement("ul");l.className="cards__list",document.querySelectorAll(".splide__slide").forEach(e=>{e.classList.remove("splide__slide"),l.appendChild(e)}),e.replaceWith(l),console.log("Splide успешно уничтожен.")}}e(),window.addEventListener("resize",e)}export{initializeSplide};