const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
};
//AFTER DOM LOADED
window.addEventListener('DOMContentLoaded', function() {

    //GET THREE ITEMS OF SLIDER
    createModal();
    closeModal();
    let width = window.innerWidth;
    if (width > 1279) {
        createSlider('flex');
        renderSlideById([1, 2, 3]);
    }
    //GET TWO ITEMS OF SLIDER
    if (width > 767 && width <= 1279) {
        createSlider('flex');
        renderSlideById([1, 2]);
    }
    //GET ONE ITEM OF SLIDER
    if (width <= 767 && width > 319) {
        createSlider('column');
        renderSlideById(1);
    }
    
    // LISTENERS FOR BUTTONS
    let firstSlideId = 1,
        secondSlideId = 2,
        thirdSlideId = 3;
    const next = document.querySelector('.slider__next'),
        prev = document.querySelector('.slider__prev');

    next.addEventListener('click', () => {
        let oldItem = document.querySelector('.slider__item');
        oldItem.style = "transform: translateX(-1000px); transition-duration: 0.3s";
        setTimeout(() => oldItem.remove(), 200);

        firstSlideId > 7 ? firstSlideId = 1 : firstSlideId++;
        secondSlideId > 7 ? secondSlideId = 1 : secondSlideId++;
        thirdSlideId > 7 ? thirdSlideId = 1 : thirdSlideId++;

        let width = window.innerWidth;
        if (width > 1279) {
            renderSlideById(thirdSlideId);
        }
        if (width > 767 && width <= 1279) {
            renderSlideById(secondSlideId);
        }
        if (width <= 767 && width > 319) {
            renderSlideById(firstSlideId);
        }
    })
    prev.addEventListener('click', () => {
        let oldItem = document.querySelector('.slider__wrapper').lastChild;
        oldItem.style = "transform: translateX(1000px); transition-duration: 0.3s";
        setTimeout(() => oldItem.remove(), 200);

        firstSlideId < 2 ? firstSlideId = 8 : firstSlideId--;
        secondSlideId < 2 ? secondSlideId = 8 : secondSlideId--;
        thirdSlideId < 2 ? thirdSlideId = 8 : thirdSlideId--;
        
        renderSlideById(firstSlideId, 'prev');
    })
    //OPEN MENU

    const hamburger = document.querySelector('.hamburger'),
            modalMenu = document.querySelector('.menu'),
            logo = document.querySelector('.logo__container');
    hamburger.addEventListener('click', () => {
        if (modalMenu.classList.contains('hide')) {
            logo.classList.add('hide');
            modalMenu.classList.remove('hide');
            hamburger.style="transform: rotate(90deg)";
        } else {
            modalMenu.classList.add('hide');
            hamburger.style="";
            logo.classList.remove('hide');
        }
    })

})
//GET ANY SLIDE BY ID
async function renderSlideById(numberOfSlide, dir = 'next') {
    if (typeof(numberOfSlide) == 'number') {

        await getResource("https://irmakdak.github.io/Shelter/src/pages/petsDB.json")
        .then(data => {
            for (let i = 0; i < data.petsDB.length; i++) {
                if (i+1 === numberOfSlide) {
                    new PetSlide(data.petsDB[i], dir, '.slider__wrapper').render();
                }
            }
        })
    } 
    if (typeof(numberOfSlide) == 'object') {
        for (let num of numberOfSlide) {
            await renderSlideById(num);
        }
    }
}
//CREATE SLIDER WRAPPER & NEXT & PREV BTNS
function createSlider(direction) {
    const slider = document.querySelector('.slider'),
        prev = document.createElement('div'),
        next = document.createElement('div');

    prev.classList.add('slider__round', 'slider__prev');
    next.classList.add('slider__round', 'slider__next');
    prev.innerHTML = `
        <div class="slider__indicator">&larr;</div>
    `;
    next.innerHTML = `
        <div class="slider__indicator">&rarr;</div>
    `;
    const wrapperForSlider = document.createElement('div');
    wrapperForSlider.classList.add('slider__wrapper');
    if (direction === 'column') {
        slider.append(wrapperForSlider, prev, next);
    } else {
        slider.append(prev, wrapperForSlider, next);
    }
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
    const hamburger = document.querySelector(".hamburger");
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal(modal);
            document.body.style = "";
            if (hamburger.classList.contains('hide')) {
                hamburger.classList.remove("hide");
            }
        }
    })
    close.addEventListener('click', () => {
        hideModal(modal);
        document.body.style = "";
        if (hamburger.classList.contains('hide')) {
            hamburger.classList.remove("hide");
        }
    })
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && !(modal.classList.contains('hide'))) {
            hideModal(modal);
            document.body.style = "";
            if (hamburger.classList.contains('hide')) {
                hamburger.classList.remove("hide");
            }
        }
    })
}
//HIDE BACKGROUND OF MODAL WINDOW
function hideModal(modal) {
    document.querySelector(".modal__window").remove();
    modal.classList.add('hide');
}

//CREATE PET-SLIDE
class PetSlide {
    constructor({img, name, type, breed, description, age, inoculations, diseases, parasites}, direction, parent) {
        this.img = img,
        this.name = name,
        this.direction = direction,
        this.type = type,
        this.breed = breed,
        this.description = description,
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
        this.direction === 'next' ? item.style="transform: translateX(1000px); transition-duration: 0.3s" : item.style="transform: translateX(-1000px); transition-duration: 0.3s";

        this.direction === 'next' ? this.parent.append(item) : this.parent.prepend(item);
        setTimeout(() => item.style="transition-duration: 0.3s", 200);

        hoverToSliderItem(item);

        item.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.classList.add('modal__window');
            modal.innerHTML = `
                <img class="modal__img" src=${this.img} alt=${this.name}>
                <div class="modal__info">
                    <div class="modal__info_name">${this.name}</div>
                    <div class="modal__info_type">${this.type} - ${this.breed}</div>
                    <div class="modal__info_descr">${this.description}</div>
                    <ul class="modal__ul">
                        <li ><span class="big__text">Age: </span><span class="modal__li">${this.age}</span></li>
                        <li><span class="big__text">Inoculations: </span> <span class="modal__li">${this.inoculations}</span></li>
                        <li><span class="big__text">Diseases: </span><span class="modal__li">${this.diseases}</span></li>
                        <li><span class="big__text">Parasites: </span><span class="modal__li">${this.parasites}</span></liss=>
                    </ul>
                </div>
            `;
            const parent = document.querySelector('.modal__container'),
                modalHidden = document.querySelector('.modal'),
                hamburger = document.querySelector(".hamburger");
            if (!hamburger.classList.contains("hide")) {
                hamburger.classList.add("hide");
            }
            document.body.style="overflow: hidden;";
            modalHidden.classList.remove('hide');
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
function openMenuWindow(hamburger) {
    const menuWindow = document.querySelector('.menu'); 
    if (menuWindow.classList.contains('hide')) {
        hamburger.removeEventListener('click', () => {  
            openMenuWindow(hamburger);
        })
        menuWindow.classList.remove('hide');
        hamburger.classList.add('hamburger__open');
        hamburger.addEventListener('click', () => {
            menuWindow.classList.add('hide');
            hamburger.classList.remove('hamburger__open');
        })
    }
}

