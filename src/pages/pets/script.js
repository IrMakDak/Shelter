//GET DATA FROM JSON-SERVER
//to start json-server ---> npx json-server src/pages/petsDB.json
const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
};
//AFTER DOM LOADED
window.addEventListener('DOMContentLoaded', function() {
    createModal();
    closeModal();

    // LISTENERS FOR BUTTONS
    const next = document.querySelector('.slider__next'),
        prev = document.querySelector('.slider__prev'),
        doubleNext = document.querySelector('.slider__next_double'),
        doublePrev = document.querySelector('.slider__prev_double'),
        sliderNum = document.querySelector('.slider__num'),
        countOfAllSlides = 8;

    let width = window.innerWidth;
    let firstItem = 1;
        
    if (width > 1279) {
        visibleItems = 8;
        renderSlidesInRange(visibleItems);
        makeArrowGrey(prev, doublePrev, next, doubleNext);
    }
    //GET TWO ITEMS OF SLIDER
    if (width > 767 && width <= 1279) {
        visibleItems = 6;
        renderSlidesInRange(visibleItems);
        makeArrowGrey(prev, doublePrev);
    }
    //GET ONE ITEM OF SLIDER
    if (width <= 767 && width > 319) {
        visibleItems = 3;
        renderSlidesInRange(visibleItems);
        makeArrowGrey(prev, doublePrev);
    }
    let lastItem = visibleItems;
    let sliderNumber = +sliderNum.textContent;

    //LISTENERS FOR "OUR PETS"
    next.addEventListener('click', () => {
        if (!next.classList.contains('slider__round_grey')) {
            //delete old page
            removeAllPetItems();
            //count number of first item
            firstItem = lastItem + 1;
            console.log('first - ', firstItem);

            // make arrows grey/active & count number of last slide
            if (lastItem * 2 >= countOfAllSlides) {
                makeArrowGrey(next, doubleNext);
                makeArrowActive(prev, doublePrev);
                lastItem = countOfAllSlides;
            } else {
                makeArrowActive(prev, doublePrev);
                lastItem = lastItem * 2;
            }
            console.log('last - ', lastItem);

            //load new page
            renderSlidesInRange(lastItem, firstItem);

            //change page number
            sliderNumber++;
            sliderNum.textContent = sliderNumber;
        }
    })
    prev.addEventListener('click', () => {
        if (!prev.classList.contains('slider__round_grey')) {
            //delete old page
            removeAllPetItems();

            lastItem = firstItem - 1;
            
            // make arrows grey/active
            firstItem = firstItem - visibleItems;
            if (firstItem <= 1) {
                makeArrowGrey(prev, doublePrev);
                makeArrowActive(next, doubleNext);
            }
            console.log('first - ', firstItem);
            console.log('last - ', lastItem);

            //load new page
            renderSlidesInRange(lastItem, firstItem);

            //change page number
            sliderNumber--;
            sliderNum.textContent = sliderNumber;
        }    
    })
    doubleNext.addEventListener('click', () => {
        if (!doubleNext.classList.contains('slider__round_grey')) {
            removeAllPetItems();
            lastItem = countOfAllSlides;
            firstItem = lastItem - (countOfAllSlides % visibleItems) + 1;
            console.log('first - ', firstItem);
            console.log('last - ', lastItem);

            renderSlidesInRange(lastItem, firstItem);

            makeArrowGrey(next, doubleNext);
            makeArrowActive(prev, doublePrev);

            sliderNumber = parseInt(countOfAllSlides / visibleItems) + 1;
            sliderNum.textContent = sliderNumber;
            console.log(sliderNumber);
        }
    })
    doublePrev.addEventListener('click', () => {
        if (!doublePrev.classList.contains('slider__round_grey')) {
            removeAllPetItems();
            lastItem = visibleItems;
            firstItem = 1;
            console.log('first - ', firstItem);
            console.log('last - ', lastItem);

            renderSlidesInRange(lastItem, firstItem);
            
            makeArrowGrey(prev, doublePrev);
            makeArrowActive(next, doubleNext);

            sliderNumber = 1;
            sliderNum.textContent = sliderNumber;
        }
    })
    //LISTENER FOR MENU
    const hamburger = document.querySelector('.hamburger'),
            modalMenu = document.querySelector('.menu');
    hamburger.addEventListener('click', () => {
        if (modalMenu.classList.contains('hide')) {
            modalMenu.classList.remove('hide');
            hamburger.style="transform: rotate(90deg)";
        } else {
            modalMenu.classList.add('hide');
            hamburger.style="";
        }
    })
})
//GET ALL SLIDES IN A RANGE
async function renderSlidesInRange(end, start = 1) {
    for (let i = start; i <= end; i++) {
        await getResource("http://localhost:3000/petsDB")
        .then(data => {
            data.forEach(({img, name, type, descr, age, inoculations, diseases, parasites, id}) => {
                if (id === i) {
                    new PetSlide(img, name, type, descr, age, inoculations, diseases, parasites, id, 'next', '.friends__wrapper').render();
                }
            })
        })
    }
}  
//GET ANY SLIDE FROM 1-ST TO "N"-S
async function renderSlides(slides) {
    for (let i = 1; i <= slides; i++) {
        await getResource("http://localhost:3000/petsDB")
        .then(data => {
            data.forEach(({img, name, type, descr, age, inoculations, diseases, parasites, id}) => {
                if (id === i) {
                    new PetSlide(img, name, type, descr, age, inoculations, diseases, parasites, id, 'next', '.friends__wrapper').render();
                }
            })
        })
    }
}
function removeAllPetItems() {
    document.querySelectorAll('.slider__item').forEach(i => {
        i.remove();
    })
}
function makeArrowGrey(...selector) {
    selector.forEach(i => {
        i.classList.remove('slider__round');
        i.classList.add('slider__round_grey');
        i.childNodes[1].classList.add('grey');
    })
}
function makeArrowActive(...selector) {
    selector.forEach(i => {
        i.classList.remove('slider__round_grey');
        i.classList.add('slider__round');
        i.childNodes[1].classList.remove('grey');
    })
}
//CREATE PET-SLIDE
class PetSlide {
    constructor(img, name, type, descr, age, inoculations, diseases, parasites, id, direction, parent) {
        this.img = img,
        this.name = name,
        this.id = id,
        this.direction = direction,
        this.type = type,
        this.descr = descr,
        this.age = age,
        this.inoculations = inoculations,
        this.diseases = diseases,
        this.parasites = parasites,
        this.parent = document.querySelector(parent)
    }
    render() {
        const item = document.createElement('div');
        item.classList.add('slider__item');
        item.innerHTML = `
            <img src='${this.img}' alt=${this.name} class="slider__img">
            <div class="slider__name">${this.name}</div>
            <button class="slider__more">Learn more</button>
            </div>
        `;
        this.direction === 'next' ? this.parent.append(item) : this.parent.prepend(item);

        hoverToSliderItem(item);

        item.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.classList.add('modal__window');
            modal.innerHTML = `
                <img class="modal__img" src=${this.img} alt=${this.name}>
                <div class="modal__info">
                    <div class="modal__info_name">${this.name}</div>
                    <div class="modal__info_type">${this.type}</div>
                    <div class="modal__info_descr">${this.descr}</div>
                    <ul class="modal__ul">
                        <li ><span class="big__text">Age: </span><span class="modal__li">${this.age}</span></li>
                        <li><span class="big__text">Inoculations: </span> <span class="modal__li">${this.inoculations}</span></li>
                        <li><span class="big__text">Diseases: </span><span class="modal__li">${this.diseases}</span></li>
                        <li><span class="big__text">Parasites: </span><span class="modal__li">${this.parasites}</span></liss=>
                    </ul>
                </div>
            `;
            const parent = document.querySelector('.modal__container'),
                modalHidden = document.querySelector('.modal');
            modalHidden.classList.remove('hide');
            document.querySelector('.hamburger').classList.add('hide');
            parent.append(modal);
        })
    }
}
// HOVER TO SLIDER ITEM
function hoverToSliderItem(item) {
    
    item.addEventListener('mouseover', () => {
        let btn = item.querySelector('.slider__more');
        btn.classList.add('slider__more_active');
    })
    item.addEventListener('mouseout', () => {
        let btn = item.querySelector('.slider__more');
        btn.classList.remove('slider__more_active');
    })
}
//CREATE MODAL WINDOW
function createModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'hide');
    modal.innerHTML = `
        <div class="modal__container">
            <div class="slider__round modal__round">
                <img src="../../assets/images/icons/close.png" alt="close" class="slider__indicator modal__close">
            </div>
        </div>
    `;
    document.body.append(modal);
}
// CLOSE MODAL
function closeModal() {
    const modal = document.querySelector('.modal');
    const close = document.querySelector(".modal__round");
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal(modal);
        }
    })
    close.addEventListener('click', () => {
        hideModal(modal);
    })
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && !(modal.classList.contains('hide'))) {
            hideModal(modal);
        }
    })
}
//HIDE BACKGROUND OF MODAL WINDOW
function hideModal(modal) {
    document.querySelector(".modal__window").remove();
    modal.classList.add('hide');
    document.querySelector('.hamburger').classList.remove('hide');
}