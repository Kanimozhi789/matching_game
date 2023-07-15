document.addEventListener("DOMContentLoaded", function () {
    
    let score = 0;
    let clicks = 0;
    const MAX_CLICKS = 2;
    let gameBoard = document.getElementById("game-board");
    let cards = [];
    let selectedCards = [];
    let gameTimer;
    let time = 200;
    let timerElement = document.createElement("div");
    timerElement.classList.add("timer");
    this.getElementById('main').appendChild(timerElement);

    gameTimer = setInterval(()=>{
        timerElement.textContent = 'TIME : '+time+' s'
        time--;
        if(!time) {
            alert(`Game Over! Your score is ${score} .`);
            restartGame();
        }
    },1000)

    
    const cardImages = [...[1,2,3,4,5,6,7,8].map(n=>`public/card${n}.jpg`)];
        
    

   
    const cardImagesPairs = cardImages.concat(cardImages);

   
    cardImagesPairs.sort(() => Math.random() - 0.5);

   
    for (let i = 0; i < cardImagesPairs.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = cardImagesPairs[i];
        card.addEventListener("click", handleCardClick);
        gameBoard.appendChild(card);
        cards.push(card);
    }

    
    let restartButton = document.getElementById("restart-btn");
    restartButton.addEventListener("click", restartGame);

    
    function handleCardClick() {
        if (clicks < MAX_CLICKS && !this.classList.contains("matched") && !this.classList.contains("selected")) {
            this.classList.add("selected");
            this.innerHTML =  `<img src = ${this.dataset.image} ></img>`;
            selectedCards.push(this);
            clicks++;
            checkMatchingPairs();
        }
    }
    
    function checkMatchingPairs() {
       
        if (selectedCards.length === 2) {
            let firstCard = selectedCards[0];
            let secondCard = selectedCards[1];

            if (firstCard.dataset.image === secondCard.dataset.image) {
                
                score++;
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");

               
                selectedCards = [];
            } else {
                
                setTimeout(function () {
                    firstCard.classList.remove("selected");
                    firstCard.innerHTML = "";
                    secondCard.classList.remove("selected");
                    secondCard.innerHTML = "";

                   
                    selectedCards = [];
                }, 1000);
            }

            
            clicks = 0;

           
            if (document.getElementsByClassName("card").length === document.getElementsByClassName("matched").length) {
                clearInterval(gameTimer);
                setTimeout(function () {
                    alert(`Game Over! Your score is ${score} and time taken is ${200-time}s.`);
                }, 500);
            }
        }
    }

   
    function restartGame() {
       
        score = 0;
        clicks = 0;
        selectedCards = [];
        clearInterval(gameTimer);
        time = 0;
        timerElement.textContent = "";

       
        cards.forEach(function (card) {
            card.classList.remove("selected", "matched");
            card.innerHTML = "";
        });

        
        cardImagesPairs.sort(() => Math.random() - 0.5);
        for (let i = 0; i < cardImagesPairs.length; i++) {
            cards[i].dataset.image = cardImagesPairs[i];
        }

        time =200;

        gameTimer = setInterval(()=>{
            timerElement.textContent = 'TIME : '+time+' s'
            time--
            if(!time) {
                alert(`Game Over! Your score is ${score} .`);
                restartGame();
            }
        },1000)
    }
});
