document.addEventListener("DOMContentLoaded", () => {
    //References to Required DOM elements
    const prevButton = document.querySelector("#prev-button");
    const nextButton = document.querySelector("#next-button");
    const card = document.querySelector("#card");

    const papers = document.querySelectorAll(".paper");

    const paper1 = document.querySelector("#p1");
    const paper2 = document.querySelector("#p2");

    //Event Listeners
    function addPaperEventListeners(paper, index) {
        //paper.style.zIndex = index * -1;

        paper.addEventListener("transitionend", () => {
            /*
            let zIndex = parseFloat(window.getComputedStyle(paper).getPropertyValue('z-index'));
            if(turningForwards) {
                paper.style.zIndex = zIndex - 1;
            }
            zIndex = parseFloat(window.getComputedStyle(paper).getPropertyValue('z-index'));
            console.log(`Page ${index + 1} has z-index ${zIndex}`)  ;
            */
            prevButton.disabled = false;
            nextButton.disabled = false;
        })
    }

    //Transition Logic
    let currentLocation = 1;
    let numOfPapers = 2;
    let maxLocation = numOfPapers + 1;
    let turningForwards = undefined;


    function openBook() { 
        prevButton.style.transform = "translateX(-205px)";
        nextButton.style.transform = "translateX(205px)";
        card.style.transform = "translateX(50%)";
    }

    function closeBook(isAtBeginning) {
        prevButton.style.transform = "translateX(0px)";
        nextButton.style.transform = "translateX(0px)";

        if(isAtBeginning) {
            card.style.transform = "translateX(0%)";
        } else {
            card.style.transform = "translateX(100%)";
        }
    }

    function goNextPage() {
        if(currentLocation < maxLocation) {
            turningForwards = true;
            prevButton.disabled = true;
            nextButton.disabled = true;
            switch(currentLocation) {
                case 1: 
                    openBook();
                    paper1.classList.add("flipped");
                    break;
                case 2:
                    closeBook(false);
                    paper2.classList.add("flipped");
                    paper2.style.zIndex = 2;
                    break;
                default : 
                    throw new Error("unknown state");
            }
            currentLocation += 1;
        }
    }

    function goPrevPage() {
        if(currentLocation > 1) {
            turningForwards = false;
            prevButton.disabled = true;
            nextButton.disabled = true;
            switch(currentLocation) {
                case 2:
                    closeBook(true);
                    paper1.classList.remove("flipped");
                    paper1.style.zIndex = 2;
                    break;
                case 3:
                    openBook();
                    paper2.classList.remove("flipped");
                    paper2.style.zIndex = 1;
                    break;
                default : 
                throw new Error("unknown state");
            }
            currentLocation -= 1;
        }
    }

    function setupCard() {
        prevButton.addEventListener("click", goPrevPage);
        nextButton.addEventListener("click", goNextPage);

        papers.forEach(addPaperEventListeners)
        paper1.addEventListener("transitionend", () => {
            if(turningForwards) {
                paper1.style.zIndex = 1;
            }
        })
        prevButton.disabled = true;
    }

    function setupControlPanel() {
        const controlButtons = document.querySelectorAll(".control-panel-button");
        controlButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                button.classList.add("animate");
                setTimeout(() => {
                    button.classList.remove("animate");
                    button.disabled = true;
                }, 600);
            })
        })
    }

    function main() {
        setupCard();
        setupControlPanel();
    }

    main();
})