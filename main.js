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
            button.addEventListener("click", (e) => {
                singHappyBirthday();
            })
        })
    }

    function addCandles(numCandles) {
        const candlesContainer = document.querySelector(".candles-container")
        for(let i = 0; i < numCandles; i++) {
            currClass = "candle-" + (i + 1);
            // Create the main container
            const candle = document.createElement("div");
            candle.className = "candle";
            candle.classList.add(currClass);

            // Create the blinking-glow element
            const blinkingGlow = document.createElement('div');
            blinkingGlow.className = 'blinking-glow';

            // Create the thread element
            const thread = document.createElement('div');
            thread.className = 'thread';

            // Create the blue-glow element
            const blueGlow = document.createElement('div');
            blueGlow.className = 'blue-glow';

            // Create the flame element
            const flame = document.createElement('div');
            flame.className = 'flame';

            candle.appendChild(blinkingGlow);
            candle.appendChild(thread);
            candle.appendChild(blueGlow);
            candle.appendChild(flame);
            candle.style.setProperty('--random', Math.random());
            candlesContainer.appendChild(candle);
        }
        console.log(candlesContainer);
    }

    function addBalloons(numBalloons) {
        const balloonsContainer = document.querySelector(".balloons-container");
        for(let i = 0; i < numBalloons; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.classList.add("balloon-" + (i + 1))

            const balloonHead = document.createElement('div');
            balloonHead.classList.add('balloon-head');

            const balloonString = document.createElement('div');
            balloonString.classList.add('balloon-string');

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '36');
            svg.setAttribute('height', '252');
            svg.setAttribute('viewBox', '0 0 36 252');
            svg.setAttribute('fill', 'none');

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'M24.5 1C22.9 -3.8 -20 68.0001 15 118C50 168 31 201 15 251');
            path.setAttribute('stroke', '#271B1B');
            path.setAttribute('stroke-width', '4');

            balloon.style.setProperty("--x1", `${-5 + 10 * Math.random()}px`);
            balloon.style.setProperty("--x2", `${-5 + 10 * Math.random()}px`);
            balloon.style.setProperty("--x3", `${-5 + 10 * Math.random()}px`);
            balloon.style.setProperty("--x4", `${-5 + 10 * Math.random()}px`);
            balloon.style.setProperty("--x5", `${-5 + 10 * Math.random()}px`);

            balloon.style.setProperty("--y1", `${-10 + 20 * Math.random()}px`);
            balloon.style.setProperty("--y2", `${-10 + 10 * Math.random()}px`);
            balloon.style.setProperty("--y3", `${-10 + 10 * Math.random()}px`);
            balloon.style.setProperty("--y4", `${-10 + 10 * Math.random()}px`);
            balloon.style.setProperty("--y5", `${-10 + 10 * Math.random()}px`);

            balloon.style.setProperty("--ang1", `${-4 + 8 * Math.random()}deg`);
            balloon.style.setProperty("--ang2", `${-4 + 8 * Math.random()}deg`);
            balloon.style.setProperty("--ang3", `${-4 + 8 * Math.random()}deg`);
            balloon.style.setProperty("--ang4", `${-4 + 8 * Math.random()}deg`);
            balloon.style.setProperty("--ang5", `${-4 + 8 * Math.random()}deg`);


            // Append elements
            svg.appendChild(path);
            balloonString.appendChild(svg);
            balloon.appendChild(balloonHead);
            balloon.appendChild(balloonString);
            balloonsContainer.append(balloon);

        }
        console.log(balloonsContainer);
    }

    function main() {
        setupCard();
        setupControlPanel();
        addCandles(21);
        addBalloons(3);
    }

    main();
})