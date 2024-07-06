document.addEventListener("DOMContentLoaded", () => {
    //References to Required DOM elements
    const prevButton = document.querySelector("#prev-button");
    const nextButton = document.querySelector("#next-button");
    const card = document.querySelector("#card");

    const papers = document.querySelectorAll(".paper");

    const paper1 = document.querySelector("#p1");
    const paper2 = document.querySelector("#p2");

    //Transition Logic
    let currentLocation = 1;
    let numOfPapers = 2;
    let maxLocation = numOfPapers + 1;
    let turningForwards = undefined;
    let birthdaySequencePlaying = false;

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
            if(!birthdaySequencePlaying) {
                if(currentLocation !== 1) {
                    prevButton.disabled = false;
                }
    
                if(currentLocation !== 3) {
                    nextButton.disabled = false;
                }
            }
        })
    }



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
        const flameContainers = document.querySelectorAll(".flame-container");
        const blueGlows = document.querySelectorAll(".blue-glow");
        const flames = document.querySelectorAll(".flame");
        const blinkingGlows = document.querySelectorAll(".blinking-glow");
        const focusScreen = document.querySelector("#f2 > .inner-border");
        const partyContainer = document.querySelector(".party-container");
        const controlButtons = document.querySelectorAll(".control-panel-button");
        const playButton = document.querySelector(".play-button");
        const blowoutButton = document.querySelector(".blowout-button");

        playButton.disabled = false;
        blowoutButton.disabled = true;

        function singHappyBirthday() {
            let audio = new Audio("audio\\test_sound.m4a");
            audio.play();
        }

        function lightCandles() {
            /*
            setTimeout(() => {
                flameContainers.forEach(flameContainer => {
                    flameContainer.style.display = "block";
                })
            }, 1000);
            */

            flameContainers.forEach(flameContainer => {
                flameContainer.style.opacity = "1";
                flameContainer.style.transform = "scaleX(1)"
                flameContainer.style.transform = "scaleY(1)"
            });
            /*
            blueGlows.forEach((blueGlow) => {
                blueGlow.style.display = "block";
            })

            flames.forEach((flame) => {
                flame.style.display = "block";
            })

            blinkingGlows.forEach((blinkingGlow) => {
                blinkingGlow.style.display = "block";
            })
            */
        }

        function dimScreen() {
            focusScreen.style.boxShadow = "0px 0px 0px 1000px rgba(0, 0, 0, 0.7)";
            focusScreen.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            partyContainer.style.backgroundColor = "black";
            partyContainer.style.border = "2px solid white"
        }    

        function disableLeftRightButtons() {
            prevButton.disabled = true;
            nextButton.disabled = true;
        }

        function enableBlowoutButton() {
            birthdaySequencePlaying = true;
            setTimeout(() => {blowoutButton.disabled = false;}, 1000);
        }

        function unlightCandles() {

            flameContainers.forEach(flameContainer => {
                flameContainer.style.opacity = "0";
                flameContainer.style.transform = "scaleY(0)"
            });

            /*
            blueGlows.forEach((blueGlow) => {
                blueGlow.style.display = "none";
            })

            flames.forEach((flame) => {
                flame.style.display = "none";
            })

            blinkingGlows.forEach((blinkingGlow) => {
                blinkingGlow.style.display = "none";
            })
            */
        }

        function undimScreen() {
            setTimeout(() => {
                focusScreen.style.boxShadow = "";
                focusScreen.style.backgroundColor = "white";
                partyContainer.style.backgroundColor = "gray";
                partyContainer.style.border = "";
            }, 1000)
        }

        function enableLeftRightButtons () {
            setTimeout(() => {
                prevButton.disabled = false;
                nextButton.disabled = false;
                birthdaySequencePlaying = false;
            }, 1000)

        }

        function enablePlayButton() {
            setTimeout(() => {
                playButton.disabled = false;
            }, 1000)

        }

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

        playButton.addEventListener("click", singHappyBirthday);
        playButton.addEventListener("click", lightCandles);
        playButton.addEventListener("click", dimScreen);
        playButton.addEventListener("click", disableLeftRightButtons);
        playButton.addEventListener("click", enableBlowoutButton);

        blowoutButton.addEventListener("click", unlightCandles);
        blowoutButton.addEventListener("click", undimScreen);
        blowoutButton.addEventListener("click", enableLeftRightButtons);
        blowoutButton.addEventListener("click", enablePlayButton);
    }

    function addCandles(numCandles) {
        const candlesContainer = document.querySelector(".candles-container")
        for(let i = 0; i < numCandles; i++) {
            currClass = "candle-" + (i + 1);
            // Create the main container
            const candle = document.createElement("div");
            candle.className = "candle";
            candle.classList.add(currClass);

            const flameContainer = document.createElement("div");
            flameContainer.classList.add("flame-container");

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

            flameContainer.appendChild(blinkingGlow);
            flameContainer.appendChild(blueGlow);
            flameContainer.appendChild(flame);

            candle.appendChild(thread);
            candle.appendChild(flameContainer);

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
            path.setAttribute('stroke', 'white');
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
        addCandles(21);
        addBalloons(3);
        setupControlPanel();
    }

    main();
})