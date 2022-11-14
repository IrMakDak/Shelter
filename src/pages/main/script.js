window.addEventListener('DOMContentLoaded', function() {

    // SLIDER
    function slider({slide, nextArrow, prevArrow, wrapper}) {

        const slides = document.querySelectorAll(slide),
            prev = document.querySelector(prevArrow),
            next = document.querySelector(nextArrow),
            sliderWrapper = document.querySelector(wrapper);

            let visibleSlides = [];
            slides.forEach(item => {
                if (item.classList.contains('show')) {
                    visibleSlides.push(item);
                }
            })

        next.addEventListener('click', () => {

            let slideToShowNext = +(visibleSlides[2].getAttribute('data-slide')) + 1;
            if (slideToShowNext < 8) {
                showNextSlide(slideToShowNext);
            } else {
                showNextSlide(0);
            }

            let slideToHide = +(visibleSlides[0].getAttribute('data-slide'));
            visibleSlides = visibleSlides.slice(1);
            hideSlide(slideToHide);
            
        })
        function showNextSlide(attr) {
            if (attr === 0) {
                slides.forEach(i => {
                    i.style = "";
                    if (('' + attr) === i.getAttribute('data-slide')) {
                        i.classList.remove('hide');
                        i.classList.add('third-slide');
                        visibleSlides.push(i);
                    }
                    if (('' + 6) === i.getAttribute('data-slide')) {
                        i.classList.remove('second-slide');
                        i.classList.add('first-slide');
                    }
                    if (('' + 7) === i.getAttribute('data-slide')) {
                        i.classList.remove('third-slide');
                        i.classList.add('second-slide');
                    }
                })
            } 
            if (attr === 1) {
                slides.forEach(i => {
                    i.style="";
                    if (('' + attr) === i.getAttribute('data-slide')) {
                        i.classList.remove('hide');
                        i.classList.add('third-slide');
                        visibleSlides.push(i);
                    }
                    if (('' + 0) === i.getAttribute('data-slide')) {
                        i.classList.remove('third-slide');
                        i.classList.add('second-slide');
                    }
                    if (('' + 7) === i.getAttribute('data-slide')) {
                        i.classList.remove('second-slide');
                        i.classList.add('first-slide');
                    }
                })
            }
            if (attr !== 0 && attr !== 1) {
                slides.forEach(i => {
                    i.style = "";
                    if (('' + attr) === i.getAttribute('data-slide')) {
                        i.classList.remove('hide');
                        i.classList.add('third-slide');
                        visibleSlides.push(i);
                    }
                    if (('' + (attr - 1)) === i.getAttribute('data-slide')) {
                        i.classList.remove('third-slide');
                        i.classList.add('second-slide');
                    }
                    if (('' + (attr - 2)) === i.getAttribute('data-slide')) {
                        i.classList.remove('second-slide');
                        i.classList.add('first-slide');
                    }
                })
            }
        }
        function hideSlide(attr) {
            slides.forEach(i => {
                if (('' + attr) === i.getAttribute('data-slide')) {
                    if (i.classList.contains('first-slide')) {
                        i.classList.remove('first-slide');
                        i.style = "left: -100%; transition-duration: 1.5s";
                        i.classList.add('hide');
                    }
                    if (i.classList.contains('third-slide')) {
                        i.classList.remove('third-slide');
                        i.style = "left: 100%; transition-duration: 0.5s";
                        i.classList.add('hide');
                    }
                }
            })
        }
        prev.addEventListener('click', () => {

            let slideToShowPrev = +(visibleSlides[0].getAttribute('data-slide')) - 1;

            if (slideToShowPrev < 0) {
                showPrevSlide(7);
            } else {
                showPrevSlide(slideToShowPrev);
            }
            let slideToHide = +(visibleSlides[3].getAttribute('data-slide'));
            visibleSlides = visibleSlides.slice(0, 3);

            hideSlide(slideToHide);
        })
        function showPrevSlide(attr) {
            console.log(attr);
            if (attr === 7) {
                slides.forEach(i => {
                    i.style = "";
                    if (('' + attr) === i.getAttribute('data-slide')) {
                        i.classList.remove('hide');
                        i.classList.add('first-slide');
                        visibleSlides.unshift(i);
                    }
                    if (('' + 0) === i.getAttribute('data-slide')) {
                        i.classList.remove('first-slide');
                        i.classList.add('second-slide');
                    }
                    if (('' + 1) === i.getAttribute('data-slide')) {
                        i.classList.remove('second-slide');
                        i.classList.add('third-slide');
                    }
                    if (('' + 6) === i.getAttribute('data-slide')) {
                        i.style="left: -100%; transition-duration: 0s";
                    }
                })
            }
            if (attr === 6) {
                slides.forEach(i => {
                    i.style = "";
                    if (('' + attr) === i.getAttribute('data-slide')) {
                        i.classList.remove('hide');
                        i.classList.add('first-slide');
                        visibleSlides.unshift(i);
                    }
                    if (('' + 7) === i.getAttribute('data-slide')) {
                        i.classList.remove('first-slide');
                        i.classList.add('second-slide');
                    }
                    if (('' + 0) === i.getAttribute('data-slide')) {
                        i.classList.remove('second-slide');
                        i.classList.add('third-slide');
                    }
                    if (('' + 5) === i.getAttribute('data-slide')) {
                        i.style="left: -100%; transition-duration: 0s";
                    }
                })
            }
            if (attr !== 7 && attr !== 6) {
                slides.forEach(i => {
                    i.style = "";
                    if (('' + attr) === i.getAttribute('data-slide')) {
                        i.classList.remove('hide');
                        i.classList.add('first-slide');
                        visibleSlides.unshift(i);
                    }
                    if (('' + (attr + 1)) === i.getAttribute('data-slide')) {
                        i.classList.remove('first-slide');
                        i.classList.add('second-slide');
                    }
                    if (('' + (attr + 2)) === i.getAttribute('data-slide')) {
                        i.classList.remove('second-slide');
                        i.classList.add('third-slide');
                    }
                    if (('' + (attr - 1)) === i.getAttribute('data-slide')) {
                        i.style="left: -100%; transition-duration: 0s";
                    }
                    if (attr === 0) {
                        slides.forEach(i => {
                            if (('' + 7) === i.getAttribute('data-slide')) {
                                i.style="left: -100%; transition-duration: 0s";
                            }
                        })
                    }
                })
            }
        }
    }

    slider ({
        slide: '.slider__item',
        nextArrow: '.slider__next',
        prevArrow: '.slider__prev',
        wrapper: '.slider__wrapper',
    })
})