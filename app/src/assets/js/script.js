// In all cards, Z has been used to represent 10, hence ZS, ZH, ZS, ZD
// j/k/=75  A=100
let cardsArray = [
  "AS",
  "AH",
  "AD",
  "AC",
  "2S",
  "2H",
  "2D",
  "2C",
  "3S",
  "3H",
  "3D",
  "3C",
  "4S",
  "4H",
  "4D",
  "4C",
  "5S",
  "5H",
  "5D",
  "5C",
  "6S",
  "6H",
  "6D",
  "6C",
  "7S",
  "7H",
  "7D",
  "7C",
  "8S",
  "8H",
  "8D",
  "8C",
  "9S",
  "9H",
  "9D",
  "9C",
  "ZS",
  "ZH",
  "ZD",
  "ZC",
  "JS",
  "JH",
  "JD",
  "JC",
  "QS",
  "QH",
  "QD",
  "QC",
  "KS",
  "KH",
  "KD",
  "KC",
];
let cardSet = new Set(cardsArray);
let Bottom,
  gameOverTimer,
  counter = 0,
  humanCardChoice;
let GameStatus; //when human plays it turns to true and thus is the turn of the computer to make its move
let pickedCards = new Set();
let special = ["A", "2", "3", "8", "J", "Q", "K"];
let computerCards = new Set();
let humanCards = new Set();
let info = document.getElementById("info");
let timerT = document.getElementById("timer");
let k = document.getElementsByClassName("listener");
let BottomUi = document.getElementById(Bottom);
let currentCard = document.getElementById("currentCard");

status = false;

// let g=document.getElementById('info')

async function play() {
  document.getElementById("sounds").addEventListener("click", function () {
    sound(random(5));
  });
  humanPlayer();
  computerPlayer();
  // playMusic.play()
  Bottom = cardOnBoard();
  console.log(Bottom);
  info.innerHTML = "Choosing who to start";
  await sleep(2000);
  whoStarts();
  // console.log(cardsArray.length)

  gameOverTimer = setInterval(gameOver, 1000);

  // console.log(pickedCards)
  // while (GameStatus===true){
  //     gameLogic()
  // }
}

async function whoStarts() {
  let randomStarter = random(2);
  if (randomStarter === 1) {
    GameStatus = false;
    info.innerHTML = "You Start";
    await sleep(1500);
    switchBetweenPlayers(false);
  } else if (randomStarter === 0) {
    GameStatus = true;
    info.innerHTML = "Computer Starts";
    await sleep(1500);
    switchBetweenPlayers(true);
  }
}

// Gives players any of the 52 cards
function handler() {
  let randomCards = Math.floor(Math.random() * cardSet.size);
  let imgName = Array.from(cardSet)[randomCards];
  cardSet.delete(imgName);
  // console.log(cardSet.size)
  if (cardSet.size === 0) {
    // how to clear but still remain with cards that players have
    // hio time yenye cards huisha then cards on the table zinachukuliwa kuendelesha game
    // console.log("Before cards are shuffled"+cardSet.size)
    cardSet = new Set(cardsArray);
    count = 0;
    while (count < humanCards.size) {
      cardSet.delete(Array.from(cardSet)[count]);
      count++;
    }
    count = 0;
    while (count < computerCards.size) {
      cardSet.delete(Array.from(cardSet)[count]);
      count++;
    }
    // console.log("cards shuffled"+cardSet.size)
  }
  return imgName;
}

// generate random numbers used for starting card and back of cards for comp player
function random(n) {
  return Math.floor(Math.random() * n);
}

// Game sounds
function sound(randomSound) {
  randomSound++;
  console.log(randomSound);
  let state = confirm("listen to some background music while you play..");
  let playMusic = new Audio(`assets/sounds/sound${randomSound}.mp3`);
  playMusic.volume = 0.2;
  playMusic.muted = true;
  if (state === true) {
    playMusic.muted = false;
    playMusic.play();
    info.innerHTML = "Playing Background Music...";
  } else if (state === false) {
    // playMusic.muted=true
    playMusic.pause();
    playMusic.currentTime = 0;
    info.innerHTML = "Stopped";
  }
}

// Generates a random starting card from none special cards
function startingCard() {
  let imgName = handler();
  let rightCard;
  console.log(`selecing starting card ${imgName}`);
  while (
    imgName[0] === "A" ||
    imgName[0] === "2" ||
    imgName[0] === "3" ||
    imgName[0] === "8" ||
    imgName[0] === "J" ||
    imgName[0] === "K" ||
    imgName[0] === "Q"
  ) {
    imgName = handler();
    // startingCard()
  }
  if (
    imgName[0] != "A" &&
    imgName[0] != "2" &&
    imgName[0] != "3" &&
    imgName[0] != "8" &&
    imgName[0] != "J" &&
    imgName[0] != "K" &&
    imgName[0] != "Q"
  ) {
    // console.log(imgName[0])
    let cardImg = document.createElement("img");
    cardImg.setAttribute("id", imgName);
    cardImg.src = `images/PNG/${imgName}.png`;
    let imagesDiv = document.createElement("div");
    imagesDiv.setAttribute("class", "playing-card");
    document.querySelector("#starting-card").appendChild(imagesDiv);
    imagesDiv.appendChild(cardImg);
    info.innerHTML = "Starting Card is: " + imgName;
    // rightCard=imgName
  }

  return imgName;
}

// Randomly allocate the human player four cards
async function humanPlayer() {
  let count = 0;
  while (count < 4) {
    human();
    await sleep(500);
    count++;
  }
  console.log(humanCards);
  compCards = humanCards;
  return humanCards;
}
function human() {
  let humanRandomCard = handler();
  let cardImg = document.createElement("img");
  cardImg.setAttribute("id", humanRandomCard);
  cardImg.src = `images/PNG/${humanRandomCard}.png`;
  cardImg.setAttribute("class", "images listener");
  document.querySelector("#main").appendChild(cardImg);
  humanCards.add(humanRandomCard);
}

// switch between players
async function switchBetweenPlayers(status) {
  if (status === true) {
    GameStatus = true;
    info.innerHTML = "Computer's turn";
    removeEventListeners();
    sleep(100);
    gameLogic(computerCards);
    await sleep(500);
  } else if (status === false) {
    GameStatus = false;
    info.innerHTML = "Your turn";
    console.log("your turn");
    addEventListeners();
    // console.log(humanCardChoiceListener)
  }
}

let i = 0;
async function removeEventListeners() {
  while (i < k.length) {
    // console.log(k[i]);
    k[i].removeEventListener("click", function () {
      getPlayedCard(this.id);
    });
    i++;
  }
  // console.log(document.getElementsByClassName("unpicked-cards")[0]);
  document
    .getElementsByClassName("unpicked-cards")[0]
    .removeEventListener("click", collectCard);
  // console.log("removed event listeners");
}

function addEventListeners() {
  let j = 0;
  while (j < k.length) {
    // console.log(k[j]);
    k[j].addEventListener("click", function () {
      getPlayedCard(this.id);
    });
    j++;
    // console.log(j)
  }
  // console.log(document.getElementsByClassName("unpicked-cards")[0]);
  document
    .getElementsByClassName("unpicked-cards")[0]
    .addEventListener("click", collectCard);

  if (Bottom[0] === "J") {
    document.getElementById("command").innerHTML = "Jump";
    document.getElementById("command").addEventListener("click", function () {
      jump(true);
    });
  }
}

// let humanCardChoiceListener=document.addEventListener("click",func)

function getPlayedCard(humanCardChoice) {
  // console.log("my"+humanCardChoice)
  if (humanCardChoice != null) {
    let cardIsPlayed = gameRules(Bottom, humanCardChoice);
    if (cardIsPlayed === humanCardChoice) {
      console.log(`Bottom card is ${humanCardChoice}`);
      console.log(`card is played ${cardIsPlayed}`);
      sleep(1000);
      info.innerHTML = "You Played: " + humanCardChoice;
      if (
        humanCardChoice[0] === Bottom[0] ||
        (humanCardChoice[1] === Bottom[1] && humanCardChoice != false)
      ) {
        console.log(`removing from human pack ${humanCardChoice}`);
        // document.getElementById(humanCardChoice).remove()

        humanCards.delete(humanCardChoice);
      }

      if (humanCardChoice[0] === "Q" || humanCardChoice[0] === "8") {
        switchBetweenPlayers(false);
      } else {
        switchBetweenPlayers(true);
      }
    }
    // else if(cardIsPlayed!=humanCardChoice&&cardIsPlayed[0]==="K"){
    //         // cardBottom=cardOnTop
    //         switchBetweenPlayers(true)
    // }
    else if (cardIsPlayed != humanCardChoice && cardIsPlayed[0] === "J") {
      // cardBottom=cardOnTop
      switchBetweenPlayers(true);
    } else if (cardIsPlayed != humanCardChoice) {
      info.innerHTML = "Not a possible move";
      sleep(1500);
      switchBetweenPlayers(false);
    }
  } else {
    // humanCardChoice=cardOnBoard
  }

  // while (GameStatus===true){
  //     // console.log(computerCards)
  //     gameLogic(computerCards)
  // }
  return humanCardChoice;
}

// randomly allocate the computer player four cards
async function computerPlayer() {
  let count = 0;
  while (count < 4) {
    computer();
    await sleep(500);
    count++;
  }
  console.log(computerCards);
  return computerCards;
}

function computer() {
  let computerRandomCard = handler();
  let back = ["yellow", "red", "purple", "green", "gray", "blue"];
  let computerDisplayCard = random(6);
  let computerDisplayCards = back[computerDisplayCard] + "_back";
  let cardImg = document.createElement("img");
  cardImg.setAttribute("id", computerRandomCard);
  cardImg.src = `images/PNG/${computerDisplayCards}.png`;
  // let imagesDiv=document.createElement('div')
  cardImg.setAttribute("class", "images");
  document.querySelector("#computer-player").appendChild(cardImg);
  // imagesDiv.appendChild(cardImg);
  // console.log(cardImg);
  computerCards.add(computerRandomCard);
}

function cardOnBoard() {
  let first = startingCard();
  console.log(`starting card is ${first}`);

  return first;
}

// the logic of the game. Used by the computer to understand the game
//human=>the last card played while computer=>computer array of cards

function gameLogic(computer) {
  let computerPlayed;
  let i = 0;
  if (GameStatus == true) {
    i = 0;
    compNumberOfCards = computer.size;

    while (i <= compNumberOfCards) {
      if (compNumberOfCards === 1) {
        console.log("nko Kadi" + computerCards);
        nkoKadi(true);
        // break
      }
      computerIndex = Array.from(computer)[i];

      if (i < compNumberOfCards) {
        console.log(Bottom);
        console.log(computerIndex);
        if (Bottom[0] === computerIndex[0] || Bottom[1] === computerIndex[1]) {
          computerPlayed = gameRules(Bottom, computerIndex);
          let bb = computerPlayed;
          console.log(`Computer Played: ${computerPlayed}`);
          console.log(computerPlayed);
          if (
            computerPlayed[0] === Bottom[0] ||
            (computerPlayed[1] === Bottom[1] && computerPlayed != false)
          ) {
            console.log(`removing comp card from pack ${computerPlayed}`);
            // document.getElementById(computerPlayed).remove()
            computerCards.delete(computerPlayed);
          }
          if (bb[0] === "Q" || bb[0] === "8") {
            switchBetweenPlayers(true);
            bb = 0;
          } else {
            console.log("switching");
            switchBetweenPlayers(false);
            break;
          }
        }
      } else if (i === compNumberOfCards && Bottom[0] != "J") {
        collectCard();
        switchBetweenPlayers(false);
        break;
      }
      //    else if(i===compNumberOfCards&&Bottom[0]==="K"){
      //     kickback(false)
      //     break
      //    }
      else if (i === compNumberOfCards && Bottom[0] === "J") {
        jump(false);
        break;
      }

      i++;
      console.log("i is:" + i);
    }

    // }
  }
}

// Rules of the game
function gameRules(cardBottom, cardOnTop) {
  let BottomUi = document.getElementById(cardBottom);
  let cardOnTopUi = document.getElementById(cardOnTop);
  // console.log("card Top: "+cardOnTop)
  if (cardBottom[0] === cardOnTop[0] || cardBottom[1] === cardOnTop[1]) {
    // console.log("card Bottom: " + cardBottom);
    // console.log("card Top: " + cardOnTop);
    // console.log("We're all set");
    if (cardBottom[0] === "2") {
      if (cardBottom[0] === cardOnTop[0] || cardOnTop[0] === "A") {
        // place this first line before any rule so as to remove player card once its clicked
        if (cardOnTopUi != null) {
          document.getElementById(cardOnTop).remove();
        }
        if (BottomUi != null) {
          // document.getElementById(cardBottom).remove()
          let pc = document.getElementsByClassName("playing-card");
          let i = 0;
          while (i < pc.length) {
            pc[0].remove();
            i++;
          }
        }
        cardReplace(cardBottom, cardOnTop);
      } else if (cardOnTop[0] === "3" && cardOnTop[1] === cardBottom[1]) {
        // place this first line before any rule so as to remove player card once its clicked
        if (cardOnTopUi != null) {
          document.getElementById(cardOnTop).remove();
        }
        if (BottomUi != null) {
          // document.getElementById(cardBottom).remove()
          let pc = document.getElementsByClassName("playing-card");
          let i = 0;
          while (i < pc.length) {
            pc[0].remove();
            i++;
          }
        }
        cardReplace(cardBottom, cardOnTop);
      } else if (cardBottom[0] != cardOnTop[0] || cardOnTop[0] != "A") {
        // if(GameStatus=true){
        // collectCard(2);
        // }
      }
    } else if (cardBottom[0] === "3") {
      if (cardBottom[0] === cardOnTop[0] || cardOnTop[0] === "A") {
        // place this first line before any rule so as to remove player card once its clicked
        if (cardOnTopUi != null) {
          document.getElementById(cardOnTop).remove();
        }
        if (BottomUi != null) {
          // document.getElementById(cardBottom).remove()
          let pc = document.getElementsByClassName("playing-card");
          let i = 0;
          while (i < pc.length) {
            pc[0].remove();
            i++;
          }
        }
        cardReplace(cardBottom, cardOnTop);
      } else if (cardOnTop[0] === "2" && cardOnTop[1] === cardBottom[1]) {
        // place this first line before any rule so as to remove player card once its clicked
        if (cardOnTopUi != null) {
          document.getElementById(cardOnTop).remove();
        }
        if (BottomUi != null) {
          // document.getElementById(cardBottom).remove()
          let pc = document.getElementsByClassName("playing-card");
          let i = 0;
          while (i < pc.length) {
            pc[0].remove();
            i++;
          }
        }
        cardReplace(cardBottom, cardOnTop);
      } else if (cardBottom[0] != cardOnTop[0] || cardOnTop[0] != "A") {
        // if(GameStatus=true){
        // collectCard(2);
        // }
      }
    } else if (cardBottom[0] === "J") {
      // if(GameStatus===false){
      // document.getElementById('command').innerHTML="Jump"
      // document.getElementById('command').addEventListener("click",function(){
      //     jump(GameStatus)
      // })
      // }
      if (
        (cardBottom[0] === "J" && cardOnTop[0] === "J") ||
        (cardBottom[0] === "J" && cardOnTop[0] === "A")
      ) {
        // place this first line before any rule so as to remove player card once its clicked
        if (cardOnTopUi != null) {
          document.getElementById(cardOnTop).remove();
        }
        if (BottomUi != null) {
          // document.getElementById(cardBottom).remove()
          let pc = document.getElementsByClassName("playing-card");
          let i = 0;
          while (i < pc.length) {
            pc[0].remove();
            i++;
          }
        }
        document
          .getElementById("command")
          .removeEventListener("click", function () {
            jump(status);
          });
        document.getElementById("command").innerHTML = "Command";
        Bottom = 0 + Bottom[1];
        let cardImg = document.createElement("img");
        cardImg.setAttribute("id", Bottom);
        cardImg.src = `images/PNG/${Bottom}.png`;
        let imagesDiv = document.createElement("div");
        imagesDiv.setAttribute("class", "playing-card");
        document.querySelector("#starting-card").appendChild(imagesDiv);
        imagesDiv.appendChild(cardImg);
        console.log("Game continues with " + Bottom);
      } else {
      }
      // }else if(cardBottom==="K"){
      //     // if(GameStatus===false){
      //         document.getElementById('command').innerHTML="Kickback"
      //         document.getElementById('command').addEventListener("click",function(){
      //             kickback(GameStatus)
      //         })
      //     // }
      //     if(cardBottom[0]==="K"&&cardOnTop[0]==="K"||cardBottom[0]==="K"&&cardOnTop[0]==="A"){
      //         if(BottomUi!=null){
      //             document.getElementById(cardBottom).remove()
      //             }
      //             cardReplace(cardBottom,cardOnTop)
      //         }else{

      //         }
    } else if (cardOnTop[0] === "Q" || cardOnTop[0] === "8") {
      // place this first line before any rule so as to remove player card once its clicked
      if (cardOnTopUi != null) {
        document.getElementById(cardOnTop).remove();
      }
      if (BottomUi != null && cardBottom != null) {
        // document.getElementById(cardBottom).remove()
        let pc = document.getElementsByClassName("playing-card");
        let i = 0;
        while (i < pc.length) {
          pc[0].remove();
          i++;
        }
      }
      cardReplace(cardBottom, cardOnTop);
    } else if (cardBottom[0] === "Q" || cardBottom[0] === "8") {
      if (cardBottom[1] === cardOnTop[1]) {
        // place this first line before any rule so as to remove player card once its clicked
        if (cardOnTopUi != null) {
          document.getElementById(cardOnTop).remove();
        }
        console.log("Bottom nu" + cardBottom);
        if (BottomUi != null) {
          // document.getElementById(cardBottom).remove()
          let pc = document.getElementsByClassName("playing-card");
          let i = 0;
          while (i < pc.length) {
            pc[0].remove();
            i++;
          }
        }
        cardReplace(cardBottom, cardOnTop);
      }
    } else if (
      (cardBottom[0] === "Q" && cardBottom[1] != cardOnTop[1]) ||
      (cardBottom[0] === "8" && cardBottom[1] != cardOnTop[1])
    ) {
      collectCard();
    } else if (
      cardBottom[0] != "2" &&
      cardBottom[0] != "3" &&
      cardBottom[0] != "8" &&
      cardBottom[0] != "J" &&
      cardBottom[0] != "Q"
    ) {
      if (cardBottom[0] === cardOnTop[0] || cardBottom[1] === cardOnTop[1]) {
        // place this first line before any rule so as to remove player card once its clicked
        if (cardOnTopUi != null) {
          document.getElementById(cardOnTop).remove();
        }
        // console.log(cardBottom)
        console.log("not special" + cardBottom);
        if (BottomUi != null) {
          console.log(Bottom);
          console.log(cardBottom);
          // document.getElementById(cardBottom).remove()
          let pc = document.getElementsByClassName("playing-card");
          let i = 0;
          while (i < pc.length) {
            pc[0].remove();
            i++;
          }
        }

        cardReplace(cardBottom, cardOnTop);
        console.log(cardBottom);
      }
    }
  } else if (cardOnTop[0] === "A") {
    // place this first line before any rule so as to remove player card once its clicked
    let ACard = cardOnTop;
    if (cardOnTopUi != null) {
      document.getElementById(cardOnTop).remove();
    }
    if (BottomUi != null) {
      //   document.getElementById(cardBottom).remove();
      let pc = document.getElementsByClassName("playing-card");
      let i = 0;
      while (i < pc.length) {
        pc[0].remove();
        i++;
      }
    }
    console.log("change game");
    cardBottom = ACard;
    Bottom = ACard;
    cardReplace(cardBottom, cardOnTop);
  } else if (cardBottom[0] != cardOnTop[0] && cardBottom[1] != cardOnTop[1]) {
    console.log(GameStatus);
    if (GameStatus === false) {
      // GameStatus=false
      info.innerHTML = "Not a possible move";
      // switchBetweenPlayers(false)

      console.log(
        "Oops! Not a possible move. Check out the rules to see what you are doing wrong!!"
      );
      return false;
      // break;
    } else if (GameStatus === true) {
      switchBetweenPlayers(true);
      return cardBottom;
      // gameLogic(computerCards)
      // break;
    }
  }
  console.log(Bottom);
  return Bottom;
}

// card Check and replace - reusable
function cardReplace(cb, ct) {
  cb = ct;
  Bottom = ct;
  console.log(ct);
  let cardImg = document.createElement("img");
  cardImg.setAttribute("id", cb);
  cardImg.src = `images/PNG/${cb}.png`;
  let imagesDiv = document.createElement("div");
  imagesDiv.setAttribute("class", "playing-card");
  document.querySelector("#starting-card").appendChild(imagesDiv);
  imagesDiv.appendChild(cardImg);
}

// place card function instead of repeating he same code over and over again in gameRules()-->I think this is where classes can be used
function placeCard() {}

// change game
function changeGame() {
  //     console.log("change game")
  //     cardBottom=cardOnTop
  //     Bottom=cardOnTop
  //     console.log("Bottom nu2"+cardBottom)
  //     let cardImg= document.createElement('img');
  //     cardImg.setAttribute('id',cardBottom)
  //     cardImg.src=`images/PNG/${cardBottom}.png`;
  //     let imagesDiv=document.createElement('div')
  //     imagesDiv.setAttribute('class','playing-card')
  //     document.querySelector('#starting-card').appendChild(imagesDiv)
  //     imagesDiv.appendChild(cardImg);
}

// kickback function

// function kickback(status){
//     document.getElementById('command').removeEventListener("click",function(){
//         kickback(status)
//     })
//     document.getElementById('command').innerHTML="Command"
//     console.log("Botoom kk"+Bottom)
//     BottomUi=document.getElementById(Bottom)
//     if(BottomUi!=null){
//         document.getElementById(Bottom).remove()
//         }
//         Bottom=0+Bottom[1]

//         let cardImg= document.createElement('img');
//         cardImg.setAttribute('id',Bottom)
//         cardImg.src=`images/PNG/${Bottom}.png`;
//         let imagesDiv=document.createElement('div')
//         imagesDiv.setAttribute('class','playing-card')
//         document.querySelector('#starting-card').appendChild(imagesDiv)
//         imagesDiv.appendChild(cardImg);
//         console.log("Game continues with " +Bottom)
//     if (status===true){
//         switchBetweenPlayers(true)
//     }else if (status===false){
//         // cardBottom=cardOnTop
//         // switchBetweenPlayers(false)
//     }
// }

// jump function

function jump(statuss) {
  document.getElementById("command").removeEventListener("click", function () {
    jump(status);
  });
  document.getElementById("command").innerHTML = "Command";
  if (Bottom != null) {
    document.getElementById(Bottom).remove();
  }
  Bottom = 0 + Bottom[1];
  let cardImg = document.createElement("img");
  cardImg.setAttribute("id", Bottom);
  cardImg.src = `images/PNG/${Bottom}.png`;
  let imagesDiv = document.createElement("div");
  imagesDiv.setAttribute("class", "playing-card");
  document.querySelector("#starting-card").appendChild(imagesDiv);
  imagesDiv.appendChild(cardImg);
  console.log("Game continues with " + Bottom);
  sleep(10);
  if (status === true) {
    switchBetweenPlayers(true);
  } else if (status === false) {
    switchBetweenPlayers(false);
  }
}

// Q function
function playMore(status) {
  if (status === true) {
    console.log("computer still playing");
    switchBetweenPlayers(status);
  } else if (status === false) {
    console.log("you are still playing");
    switchBetweenPlayers(status);
  }
}

// Play More for real
function playMoreSame(cardBottom, cardOnTop) {
  if (cardBottom[0] === cardOnTop[0]) {
    if (cardBottom != null) {
      document.getElementById(cardBottom).remove();
    }
    cardBottom = cardOnTop;
    Bottom = cardOnTop;
    let cardImg = document.createElement("img");
    cardImg.setAttribute("id", cardBottom);
    cardImg.src = `images/PNG/${cardBottom}.png`;
    let imagesDiv = document.createElement("div");
    imagesDiv.setAttribute("class", "playing-card");
    document.querySelector("#starting-card").appendChild(imagesDiv);
    imagesDiv.appendChild(cardImg);
    // playMoreSame)
  } else {
    // break;
  }
}

// Gives a player cards during the game depending on the situation
// check which card is on board first
function collectCard() {
  console.log("collect card Bottom" + Bottom);
  let i = 0;
  if (Bottom[0] === "2") {
    number = 2;
    if (Bottom != null) {
      //   document.getElementById(Bottom).remove();
      let pc = document.getElementsByClassName("playing-card");
      let i = 0;
      while (i < pc.length) {
        pc[0].remove();
        i++;
      }
    }
    Bottom = 0 + Bottom[1];
    let cardImg = document.createElement("img");
    cardImg.setAttribute("id", Bottom);
    cardImg.src = `images/PNG/${Bottom}.png`;
    let imagesDiv = document.createElement("div");
    imagesDiv.setAttribute("class", "playing-card");
    document.querySelector("#starting-card").appendChild(imagesDiv);
    imagesDiv.appendChild(cardImg);
    console.log("Game continues with " + Bottom);
  } else if (Bottom[0] === "3") {
    number = 3;
    if (Bottom != null) {
      //   document.getElementById(Bottom).remove();
      let pc = document.getElementsByClassName("playing-card");
      let i = 0;
      while (i < pc.length) {
        pc[0].remove();
        i++;
      }
    }
    Bottom = 0 + Bottom[1];
    let cardImg = document.createElement("img");
    cardImg.setAttribute("id", Bottom);
    cardImg.src = `images/PNG/${Bottom}.png`;
    let imagesDiv = document.createElement("div");
    imagesDiv.setAttribute("class", "playing-card");
    document.querySelector("#starting-card").appendChild(imagesDiv);
    imagesDiv.appendChild(cardImg);
    console.log("Game continues with " + Bottom);
  } else if (Bottom[0] === "J") {
    number = 0;
  } else {
    number = 1;
    // if (Bottom != null) {
    //   //   document.getElementById(Bottom).remove();
    //   let pc = document.getElementsByClassName("playing-card");
    //   let i = 0;
    //   while (i < pc.length) {
    //     pc[0].remove();
    //     i++;
    //   }
    // }
    // if(Bottom!=null){
    //     console.log(Bottom)
    // document.getElementById(Bottom).remove()
    // }
    // let cardImg= document.createElement('img');
    // cardImg.setAttribute('id',Bottom)
    // cardImg.src=`images/PNG/${Bottom}.png`;
    // let imagesDiv=document.createElement('div')
    // imagesDiv.setAttribute('class','playing-card')
    // document.querySelector('#starting-card').appendChild(imagesDiv)
    // imagesDiv.appendChild(cardImg);
    // console.log("Game continues with " +Bottom)
  }

  if (GameStatus === false) {
    console.log("You are collecting " + number + "cards");
    while (i < number) {
      human();
      i++;
    }
    GameStatus = true;
    switchBetweenPlayers(true);
  } else if (GameStatus === true) {
    console.log("computer collecting " + number + "cards");
    while (i < number) {
      sleep(1500);
      computer();
      i++;
    }
    // GameStatus=false
    // switchBetweenPlayers(false)
  }
}

function gameOver() {
  timerT.innerHTML = counter;
  counter++;
  timer(counter, 12000, "Time Out", gameOverTimer);

  currentCard.innerHTML = `Current card is :${Bottom}`;
}

// counter(Timer) function
function timer(countdownFrom, countdownTo, message, functionToExecute) {
  if (countdownFrom >= countdownTo) {
    console.log(message);
    clearInterval(functionToExecute);
  }
}

function nkoKadi(status) {
  let playerCard, name;
  if (status === false) {
    playerCard = Array.from(humanCards);
    // GameStatus=true
    name = "You";
    status = false;
    reverse = true;
  } else if (status === true) {
    playerCard = Array.from(computerCards);
    status = true;
    reverse = false;
    name = "Computer";
  }
  console.log(playerCard.length);

  if (playerCard.length === 1) {
    // switchBetweenPlayers(reverse)
    console.log(playerCard[0]);
    if (
      playerCard[0][0] === "4" ||
      playerCard[0][0] === "5" ||
      playerCard[0][0] === "6" ||
      playerCard[0][0] === "7" ||
      playerCard[0][0] === "9" ||
      playerCard[0][0] === "Z"
    ) {
      if (Bottom[0] === playerCard[0][0] || Bottom[1] === playerCard[0][1]) {
        document.getElementById("end-game").style =
          "display:block;visibility:visible;color:white";
        if (status === false) {
          document.getElementById("end-game").innerHTML = name + " won!!🎉🎉🎉";
          // document.getElementById('end-game').
        } else if (status === true) {
          document.getElementById("end-game").innerHTML = name + " won!!☹️";
        }
      }
    } else {
      info.innerHTML = "Cannot finish game with a special card";
    }
  } else if (playerCard.length > 1) {
    info.innerHTML = "Only one card ends game";
    switchBetweenPlayers(reverse);
  }
  // if (status===false){
  //     if(humanCards.size===1){
  //         console.log(humanCards[0])
  //         if(humanCards[0][0]==="4"||humanCards[0][0]==="5"||humanCards[0][0]==="6"||humanCards[0][0]==="7"||humanCards[0][0]==="9"||humanCards[0][0]==="Z"){
  //             if(Bottom[0]===humanCards[0][0]||Bottom[1]===humanCards[0][1]){
  //                 console.log("you win!!")
  //             }
  //         }
  //     }else if(humanCards.size>1){
  //         console.log("You can only finish game with one card not "+humanCards.size+" cards")
  //         switchBetweenPlayers(status)
  //     }
  // }else{
  //     if(computerCards.size===1){
  //         console.log(computerCards[0])
  //         if(computerCards[0][0]==="4"||computerCards[0][0]==="5"||computerCards[0][0]==="6"||computerCards[0][0]==="7"||computerCards[0][0]==="9"||computerCards[0][0]==="Z"){
  //             if(Bottom[0]===computerCards[0][0]||Bottom[1]===computerCards[0][1]){
  //                 console.log("you win!!")
  //             }
  //         }
  //     }else if(computerCards.size>1){
  //         console.log("You can only finish game with one card"+computerCards)
  //         switchBetweenPlayers(status)
  //     }
  // }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// May the games begin :)
play();

// // In all cards, Z has been used to represent 10, hence ZS, ZH, ZS, ZD
// // j/k/=75  A=100
// let computerCards = new Set();
// let humanCards = new Set();
// let cardsArray = [
//   "AS",
//   "AH",
//   "AD",
//   "AC",
//   "2S",
//   "2H",
//   "2D",
//   "2C",
//   "3S",
//   "3H",
//   "3D",
//   "3C",
//   "4S",
//   "4H",
//   "4D",
//   "4C",
//   "5S",
//   "5H",
//   "5D",
//   "5C",
//   "6S",
//   "6H",
//   "6D",
//   "6C",
//   "7S",
//   "7H",
//   "7D",
//   "7C",
//   "8S",
//   "8H",
//   "8D",
//   "8C",
//   "9S",
//   "9H",
//   "9D",
//   "9C",
//   "ZS",
//   "ZH",
//   "ZD",
//   "ZC",
//   "JS",
//   "JH",
//   "JD",
//   "JC",
//   "QS",
//   "QH",
//   "QD",
//   "QC",
//   "KS",
//   "KH",
//   "KD",
//   "KC"
// ];
// let Bottom,
//   gameOverTimer,
//   counter = 0,
//   humanCardChoice;
// let cardSet = new Set(cardsArray);
// let GameStatus; //when human plays it turns to true and thus is the turn of the computer to make its move
// let normal = [1, 4, 5, 6, 7, 9, "Z"];
// let special = [2, 3, 8, "K", "Q", "J"];
// let info = document.getElementById("info");
// let timerT = document.getElementById("timer");
// let k = document.getElementsByClassName("listener");
// let BottomUi = document.getElementById(Bottom);
// let currentCard = document.getElementById("currentCard");

// async function play() {
//   computerPlayer();
//   humanPlayer();
//   Bottom = cardOnBoard();
//   info.innerHTML = "Choosing who to start";
//   await sleep(2000);
//   whoStarts();
// }

// // switch between players
// async function switchBetweenPlayers(status) {
//   if (status === true) {
//     GameStatus = true;
//     info.innerHTML = "Computer's turn";
//     removeEventListeners();
//     sleep(100);
//     gameLogic(computerCards);
//     await sleep(500);
//   } else if (status === false) {
//     GameStatus = false;
//     info.innerHTML = "Your turn";
//     console.log("your turn");
//     addEventListeners();
//   }
// }

// // generate random numbers used for starting card and back of cards for comp player
// function random(n) {
//   return Math.floor(Math.random() * n);
// }

// // sleep function
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// // check if a certain value exists in an array
// function arrayHas(value, arr) {
//   let i = 0;
//   while (i < arr.length) {
//     if (arr[i] === value) {
//       return true;
//     }
//     i++;
//   }
//   return false;
// }

// if (arrayHas(5, special) === true) {
//   console.log("No is special");
// } else if (arrayHas(5, normal) === true) {
//   console.log("No is normal");
// }

// // Gives players any of the 52 cards
// function handler() {
//   let randomCards = Math.floor(Math.random() * cardSet.size);
//   let imgName = Array.from(cardSet)[randomCards];
//   cardSet.delete(imgName);

//   // reshuffle action
//   if (cardSet.size === 0) {
//     cardSet = new Set(cardsArray);
//     count = 0;
//     while (count < humanCards.size) {
//       cardSet.delete(Array.from(cardSet)[count]);
//       count++;
//     }
//     count = 0;
//     while (count < computerCards.size) {
//       cardSet.delete(Array.from(cardSet)[count]);
//       count++;
//     }
//   }
//   return imgName;
// }

// // Randomly allocate the human player four cards
// async function humanPlayer() {
//   let count = 0;
//   while (count < 4) {
//     human();
//     await sleep(500);
//     count++;
//   }
//   console.log(humanCards);
//   compCards = humanCards;
//   return humanCards;
// }
// // human card maker
// function human() {
//   let humanRandomCard = handler();
//   let cardImg = document.createElement("img");
//   cardImg.setAttribute("id", humanRandomCard);
//   cardImg.src = `images/PNG/${humanRandomCard}.png`;
//   cardImg.setAttribute("class", "images listener");
//   document.querySelector("#main").appendChild(cardImg);
//   humanCards.add(humanRandomCard);
// }

// // randomly allocate the computer player four cards
// async function computerPlayer() {
//   let count = 0;
//   while (count < 4) {
//     computer();
//     await sleep(500);
//     count++;
//   }
//   console.log(computerCards);
//   return computerCards;
// }

// // computer card maker
// function computer() {
//   let computerRandomCard = handler();
//   let back = ["yellow", "red", "purple", "green", "gray", "blue"];
//   let computerDisplayCard = random(6);
//   let computerDisplayCards = back[computerDisplayCard] + "_back";
//   let cardImg = document.createElement("img");
//   cardImg.setAttribute("id", computerRandomCard);
//   cardImg.src = `images/PNG/${computerDisplayCards}.png`;
//   cardImg.setAttribute("class", "images");
//   document.querySelector("#computer-player").appendChild(cardImg);
//   computerCards.add(computerRandomCard);
// }

// // Generates a random starting card from none special cards
// function startingCard() {
//   let imgName = handler();
//   let rightCard;
//   console.log(`selecing starting card ${imgName}`);
//   while (
//     imgName[0] === "A" ||
//     imgName[0] === "2" ||
//     imgName[0] === "3" ||
//     imgName[0] === "8" ||
//     imgName[0] === "J" ||
//     imgName[0] === "K" ||
//     imgName[0] === "Q"
//   ) {
//     imgName = handler();
//     // startingCard()
//   }
//   if (
//     imgName[0] != "A" &&
//     imgName[0] != "2" &&
//     imgName[0] != "3" &&
//     imgName[0] != "8" &&
//     imgName[0] != "J" &&
//     imgName[0] != "K" &&
//     imgName[0] != "Q"
//   ) {
//     // console.log(imgName[0])
//     let cardImg = document.createElement("img");
//     cardImg.setAttribute("id", imgName);
//     cardImg.src = `images/PNG/${imgName}.png`;
//     let imagesDiv = document.createElement("div");
//     imagesDiv.setAttribute("class", "playing-card");
//     document.querySelector("#starting-card").appendChild(imagesDiv);
//     imagesDiv.appendChild(cardImg);
//     info.innerHTML = "Starting Card is: " + imgName;
//     // rightCard=imgName
//   }

//   return imgName;
// }

// function cardOnBoard() {
//   let first = startingCard();
//   console.log(`starting card is ${first}`);

//   return first;
// }

// // randomly get who starts
// async function whoStarts() {
//   let randomStarter = random(2);
//   if (randomStarter === 1) {
//     GameStatus = false;
//     info.innerHTML = "You Start";
//     await sleep(1500);
//     switchBetweenPlayers(false);
//   } else if (randomStarter === 0) {
//     GameStatus = true;
//     info.innerHTML = "Computer Starts";
//     await sleep(1500);
//     switchBetweenPlayers(true);
//   }
// }

// // add and remove event listeners
// let i = 0;
// async function removeEventListeners() {
//   while (i < k.length) {
//     console.log(k[i]);
//     k[i].removeEventListener("click", function() {
//       getPlayedCard(this.id);
//     });
//     i++;
//   }
//   console.log(document.getElementsByClassName("unpicked-cards")[0]);
//   document
//     .getElementsByClassName("unpicked-cards")[0]
//     .removeEventListener("click", collectCard);
//   console.log("removed event listeners");
// }

// function addEventListeners() {
//   let j = 0;
//   while (j < k.length) {
//     console.log(k[j]);
//     k[j].addEventListener("click", function() {
//       getPlayedCard(this.id);
//     });
//     j++;
//     // console.log(j)
//   }
//   console.log(document.getElementsByClassName("unpicked-cards")[0]);
//   document
//     .getElementsByClassName("unpicked-cards")[0]
//     .addEventListener("click", collectCard);

//   if (Bottom[0] === "J") {
//     document.getElementById("command").innerHTML = "Jump";
//     document.getElementById("command").addEventListener("click", function() {
//       jump(true);
//     });
//   }
// }

// // rules for normal cards
// function normal(cb, ct) {
//   if (cb[0] === t[0] || cb[1] === ct[1]) {
//     cardReplace(cb, ct);
//   }
// }

// // card Check and replace - reusable
// function cardReplace(cb, ct) {
//   cb = ct;
//   Bottom = ct;
//   let cardImg = document.createElement("img");
//   cardImg.setAttribute("id", cb);
//   cardImg.src = `images/PNG/${cb}.png`;
//   let imagesDiv = document.createElement("div");
//   imagesDiv.setAttribute("class", "playing-card");
//   document.querySelector("#starting-card").appendChild(imagesDiv);
//   imagesDiv.appendChild(cardImg);
// }

// play();
