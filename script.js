const modal = document.querySelector(`.modal`);
    
const modalImage = modal.querySelector(`.full-size-image`);
const modalTitle = modal.querySelector(`h2`);
const modalDescription = modal.querySelector(`p`);

const previousButton = modal.querySelector(`.prev`);
const nextButton = modal.querySelector(`.next`);

function Gallery(gallery) {
    const images = gallery.querySelectorAll(`img`);
    
    

    // state variable;
    let currentImage;

    const closeModal = function(event) {
        const isOutside = !event.target.closest(`.modalInner`);
        if(isOutside) {
            modal.classList.remove(`open`);
            window.removeEventListener(`keydown`, identifyKey);
            previousButton.removeEventListener(`click`, fetchPreviousImage);
            nextButton.removeEventListener(`click`, fetchNextImage);
        }
    }

    const fetchPreviousImage = function() {
        currentImage = currentImage.previousElementSibling || gallery.lastElementChild;
        updateCurrentimage(currentImage);
    }

    const fetchNextImage = function() {
        currentImage = currentImage.nextElementSibling || gallery.firstElementChild;
        updateCurrentimage(currentImage);
    }

    const identifyKey = function(event) {
        if(event.key === `Escape`) {
            modal.classList.remove(`open`);
            window.removeEventListener(`keydown`, identifyKey);
            previousButton.removeEventListener(`click`, fetchPreviousImage);
            nextButton.removeEventListener(`click`, fetchNextImage);
        }

        else if(event.key === `ArrowLeft`) {
            fetchPreviousImage();
        }

        else if(event.key === `ArrowRight`) {
            fetchNextImage();
        }
    }

    const showModal = function() {
        modal.classList.add(`open`);
        window.addEventListener(`keydown`, identifyKey);
        previousButton.addEventListener(`click`, fetchPreviousImage);
        nextButton.addEventListener(`click`, fetchNextImage);
    }

    const populateModal = function() {
        modalImage.src = currentImage.src;
        modalTitle.textContent =  currentImage.title;
        modalDescription.textContent = currentImage.dataset.description;

        showModal();
    }

    const updateCurrentimage = function(image) {
        currentImage = image;
        populateModal();
    }

    images.forEach(image => {
        image.addEventListener(`click`, (event) => {
            updateCurrentimage(event.target);
        })
    });

    images.forEach(image => {
        image.addEventListener(`keydown`, (event) => {
            if(event.key === `Enter`) {
                updateCurrentimage(event.target);
            }
        })
    });

    modal.addEventListener(`click`, closeModal);
}

const gallery1 = document.querySelector(`.gallery1`);
const gallery2 = document.querySelector(`.gallery2`);

Gallery(gallery1);
Gallery(gallery2);