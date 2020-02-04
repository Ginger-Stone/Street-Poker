// In all cards, Z has been used to represent 10, hence ZS, ZH, ZS, ZD
// j/k/=75  A=100 
let cardsArray=['AS','AH','AD','AC','2S','2H','2D','2C','3S','3H','3D','3C','4S','4H','4D','4C','5S','5H','5D','5C','6S','6H','6D','6C','7S','7H','7D','7C','8S','8H','8D','8C','9S','9H','9D','9C','ZS','ZH','ZD','ZC','JS','JH','JD','JC','QS','QH','QD','QC','KS','KH','KD','KC',]
let cardSet=new Set(cardsArray)
let Bottom, gameOverTimer, counter=0
let GameStatus=false //when human plays it turns to true and thus is the turn of the computer to make its move
let pickedCards= new Set()
let special=['A','2','3','8','J','Q','K']
let computerCards=new Set();
let humanCards=new Set()
async function play(){
    // setInterval(humanPlayer,1000)
    humanPlayer()
    computerPlayer()
    await sleep(2000)
    Bottom=cardOnBoard()
    console.log(cardsArray.length)
    gameOverTimer=setInterval(gameOver,1000)
    // console.log(pickedCards)
    // while (GameStatus===true){
    //     gameLogic()
    // }

}

// Gives players any of the 52 cards
function handler(){
    // let cards=['K','A', '2', '3', '4', '5', '6', '7', '8', '9', 'Z', 'J', 'Q']
    // let flowers=['S','C','D','H']
    // let cardsMap={'A':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':0}

    let randomCards=Math.floor(Math.random()*cardSet.size)
    // console.log(randomCards)
    let imgName=Array.from(cardSet)[randomCards]
    cardSet.delete(imgName)
    // let randomFlowers=Math.floor(Math.random()*4)
    console.log(cardSet.size)
    // let imgName=cards[randomCards]+flowers[randomFlowers]
    if(cardSet.size===0){
        // how to clear but still remain with cards that players have
        // hio time yenye cards huisha then cards on the table zinachukuliwa kuendelesha game
        console.log("Before cards are shuffled"+cardSet.size)
        cardSet=new Set(cardsArray)
        count=0
        while(count<humanCards.size){
            cardSet.delete(Array.from(cardSet)[count])
            count++
        }
        count=0
        while(count<computerCards.size){
            cardSet.delete(Array.from(cardSet)[count])
            count++
        }
        console.log("cards shuffled"+cardSet.size)
    }

    // console.log(imgName)
    return imgName;

    
}

// generate random numbers used for starting card and back of cards for comp player
function random(){
    return Math.floor(Math.random()*6)
}

// Generates a random starting card from none special cards
function startingCard(){
    // let cards=['4', '5', '6', '7', '9', 'Z']
    let imgName=handler()
    // let randomFlowers=Math.floor(Math.random()*4)
    // let flowers=['S','C','D','H']
    
    // let imgName=Array.from(cardSet)[card]
    // if(pickedCards.has(imgName)===false){
    // pickedCards.add(imgName)
    console.log(typeof(imgName[0]))
    if(imgName[0]!="A"||imgName[0]!="2"||imgName[0]!="3"||imgName[0]!="8"||imgName[0]!="J"||imgName[0]!="K"||imgName[0]!="Q"){
    let cardImg= document.createElement('img');
    cardImg.setAttribute('id',imgName)
    cardImg.src=`img/PNG/${imgName}.png`;
    let imagesDiv=document.createElement('div')
    imagesDiv.setAttribute('class','playing-card' )
    document.querySelector('#starting-card').appendChild(imagesDiv)
    imagesDiv.appendChild(cardImg);
    console.log("Starting Card is: "+imgName)
    }else{
        startingCard()
    }
    
    return imgName
}

// Randomly allocate the human player four cards
async function humanPlayer(){
    let count=0   
    while (count<4){
        human()
        await sleep(500)
        count++
    }
    console.log(humanCards)
    compCards=humanCards
    return humanCards;
}
function human(){
    let humanRandomCard=handler()
    let cardImg= document.createElement('img');
    cardImg.setAttribute('id',humanRandomCard)
    cardImg.setAttribute('onclick',"getPlayedCard(this.id)")
    // cardImg.addEventListener("click",play)
    // cardImg.addEventListener("click",getPlayedCard(this.id))
    cardImg.src=`img/PNG/${humanRandomCard}.png`;
    // let imagesDiv=document.createElement('div')
    cardImg.setAttribute('class','images' )
    document.querySelector('#main').appendChild(cardImg)
    // imagesDiv.appendChild(cardImg);
    // console.log(cardImg.id);
    humanCards.add(humanRandomCard)
    // count++
}

// Get card played by human and switch player to computer
async function switchBetweenPlayers(status){
    await sleep(1500)
    if(status===true){
        GameStatus=true
        console.log("Computer's turn")
        gameLogic(computerCards)
    }else if(status===false){
        GameStatus=false
        console.log("Your turn")
        // getPlayedCard()
    }
}

function getPlayedCard(humanCardChoice){
    if(humanCardChoice!=null){
        console.log("human Played: "+humanCardChoice)
        document.getElementById(humanCardChoice).remove()
        humanCards.delete(humanCardChoice)
        // console.log(humanCards)
        gameRules(Bottom,humanCardChoice)
    }else{
        // humanCardChoice=cardOnBoard
    }
    
    // while (GameStatus===true){
    //     // console.log(computerCards)
    //     gameLogic(computerCards)
    // }
    return humanCardChoice
}

// randomly allocate the computer player four cards
async function computerPlayer(){
    let count=0
    while (count<4){
        computer()
        await sleep(500)
        count++
    }
    console.log(computerCards)
    return computerCards;
}

function computer(){
    let computerRandomCard=handler()
    let back=['yellow','red','purple','green','gray','blue']
    let computerDisplayCard=random()
    let computerDisplayCards=back[computerDisplayCard]+"_back"
    let cardImg= document.createElement('img');
    cardImg.setAttribute('id',computerRandomCard)
    cardImg.src=`img/PNG/${computerDisplayCards}.png`;
    // let imagesDiv=document.createElement('div')
    cardImg.setAttribute('class','images' )
    document.querySelector('#computer-player').appendChild(cardImg)
    // imagesDiv.appendChild(cardImg);
    // console.log(cardImg);
    computerCards.add(computerRandomCard)
}

function cardOnBoard(){
 let first=startingCard()
//  console.log(first)

 return first;
}

// the logic of the game. Used by the computer to understand the game
//human=>the last card played while computer=>computer array of cards

function gameLogic(computer){
    let computerPlayed
    let i=0
        // console.log(computer)
        // if (human.length==3&&computer.length==2){
        //     while{human.}
        // }
        // GameStatus=true
        if(GameStatus==true){
            i=0
            compNumberOfCards=computer.size
            // console.log(computerIndex[0])
            while(i<=compNumberOfCards){
                computerIndex=Array.from(computer)[i]
                if(i<compNumberOfCards){
                    // console.log(Bottom+", "+computerIndex)
                    if(Bottom[0]===computerIndex[0]||Bottom[1]===computerIndex[1]){
                        computerPlayed=gameRules(Bottom,computerIndex)
                        console.log("computer Played: "+computerPlayed)
                        document.getElementById(computerPlayed).remove()
                        computerCards.delete(computerPlayed)
                        break;
                    }
                }else if(i===compNumberOfCards){
                    collectCard(1)
                    break
                }
                // console.log(i)
                i++
            }
            // GameStatus=false
        }
        
}
// Rules of the game

// After card is placed on board, remove it from player's cards and from the set
function placeCardInCanBeCollected(player,fromSet){

    
}

function gameRules(cardBottom,cardOnTop){
    // console.log("card Bottom: "+cardBottom)
    // console.log("card Top: "+cardOnTop)
        if(cardBottom[0]===cardOnTop[0]||cardBottom[1]===cardOnTop[1]){
            console.log("card Bottom: "+cardBottom)
            console.log("card Top: "+cardOnTop)
            console.log("We're all set")
            if(cardBottom[0]==="2"){
                if(cardBottom[0]===cardOnTop[0]||cardOnTop[0]==="A"){
                    document.getElementById(cardBottom).remove()
                    cardBottom=cardOnTop
                    Bottom=cardOnTop
                    let cardImg= document.createElement('img');
                    cardImg.setAttribute('id',cardBottom)
                    cardImg.src=`img/PNG/${cardBottom}.png`;
                    let imagesDiv=document.createElement('div')
                    imagesDiv.setAttribute('class','playing-card')
                    document.querySelector('#starting-card').appendChild(imagesDiv)
                    imagesDiv.appendChild(cardImg);
                    // document.getElementById(cardOnTop).remove()
                    // humanCards.delete(cardOnTop)
                    // let v=document.getElementById("starting-card");
                    // v=v.classList;
                    // console.log("classList: "+v)
                    // console.log(cardBottom)
                    // console.log("Play")
                }else if(cardBottom[0]!=cardOnTop[0]||cardOnTop[0]!="A"){
                    if(GameStatus=true){
                        collectCard(2)
                    }
                }
            }else if(cardBottom[0]==="3"){
                if(cardBottom[0]===cardOnTop[0]||cardOnTop[0]==="A"){
                    document.getElementById(cardBottom).remove()
                    cardBottom=cardOnTop
                    Bottom=cardOnTop
                    let cardImg= document.createElement('img');
                    cardImg.setAttribute('id',cardBottom)
                    cardImg.src=`img/PNG/${cardBottom}.png`;
                    let imagesDiv=document.createElement('div')
                    imagesDiv.setAttribute('class','playing-card')
                    document.querySelector('#starting-card').appendChild(imagesDiv)
                    imagesDiv.appendChild(cardImg);
                    // document.getElementById(cardOnTop).remove()
                    // humanCards.delete(cardOnTop)
                    // let v=document.getElementById("starting-card");
                    // v=v.classList;
                    // console.log("classList: "+v)
                    // console.log(cardBottom)
                    // console.log("Play")
                }else if(cardBottom[0]!=cardOnTop[0]||cardOnTop[0]!="A"){
                    if(GameStatus=true){
                        collectCard(2)
                    }
                }
            }else if(cardBottom==="J"){
            if(cardBottom[0]==="J"&&cardOnTop[0]==="J"||cardBottom[0]==="J"&&cardOnTop[0]==="A"){
                document.getElementById(cardBottom).remove()
                cardBottom=cardOnTop
                Bottom=cardOnTop
                let cardImg= document.createElement('img');
                cardImg.setAttribute('id',cardBottom)
                cardImg.src=`img/PNG/${cardBottom}.png`;
                let imagesDiv=document.createElement('div')
                imagesDiv.setAttribute('class','playing-card')
                document.querySelector('#starting-card').appendChild(imagesDiv)
                imagesDiv.appendChild(cardImg);
                // document.getElementById(cardOnTop).remove()
                // humanCards.delete(cardOnTop)
            }else if(cardBottom[0]==="J"&&cardOnTop[0]!="J"||cardBottom[0]==="J"&&cardOnTop[0]!="A"){
                jump(GameStatus)
            }
        }else if(cardBottom==="K"){
            if(cardBottom[0]==="K"&&cardOnTop[0]==="K"||cardBottom[0]==="K"&&cardOnTop[0]==="A"){
                    document.getElementById(cardBottom).remove()
                    cardBottom=cardOnTop
                    Bottom=cardOnTop
                    let cardImg= document.createElement('img');
                    cardImg.setAttribute('id',cardBottom)
                    cardImg.src=`img/PNG/${cardBottom}.png`;
                    let imagesDiv=document.createElement('div')
                    imagesDiv.setAttribute('class','playing-card')
                    document.querySelector('#starting-card').appendChild(imagesDiv)
                    imagesDiv.appendChild(cardImg);
                    // document.getElementById(cardOnTop).remove()
                    // humanCards.delete(cardOnTop)
        }else if(cardBottom[0]==="K"&&cardOnTop[0]!="K"||cardBottom[0]==="K"&&cardOnTop[0]!="A"){
                kickback(GameStatus)
            }
        }else if(cardOnTop[0]==="Q"){
            q(GameStatus)
        }else if(cardBottom[0]===cardOnTop[0]||cardBottom[1]===cardOnTop[1]){
                // console.log(cardBottom)
                console.log("Bottom nu"+cardBottom)
                document.getElementById(cardBottom).remove()
                cardBottom=cardOnTop
                Bottom=cardOnTop
                let cardImg= document.createElement('img');
                cardImg.setAttribute('id',cardBottom)
                cardImg.src=`img/PNG/${cardBottom}.png`;
                let imagesDiv=document.createElement('div')
                imagesDiv.setAttribute('class','playing-card')
                document.querySelector('#starting-card').appendChild(imagesDiv)
                imagesDiv.appendChild(cardImg);
                // document.getElementById(cardOnTop).remove()
                // humanCards.delete(cardOnTop)
                // let v=document.getElementById("starting-card");
                // v=v.classList;
                // console.log("classList: "+v)
                // console.log(cardBottom)
                // console.log("Play")
        
                }
                if(GameStatus===false){
                    GameStatus=true
                    switchBetweenPlayers(true)
                    
                }else if(GameStatus===true){
                    GameStatus=false
                    switchBetweenPlayers(false)
                } 
        }else{
            if(GameStatus===false){
                // GameStatus=false
                switchBetweenPlayers(false)
                console.log("Oops! Not a possible move. Check out the rules to see what you are doing wrong!!")
            }else if(GameStatus===true){
                switchBetweenPlayers(true)
                // gameLogic(computerCards)
            } 

    }
    return cardBottom
    
}

// kickback function

function kickback(status){
    // Bottom=cardOnBoard
    if (status===true){
        switchBetweenPlayers(true)
    }else if (status===false){
        // cardBottom=cardOnTop
        switchBetweenPlayers(false)
    } 
}

// jump function

function jump(status){
    Bottom=cardOnBoard
    if (status===true){
        switchBetweenPlayers(false)
    }else if (status===false){
        switchBetweenPlayers(true)
    } 
}

// Q function
function q(status) {
    if (status===true){
        status=true
        switchBetweenPlayers(status)
    }else if (status===false){
        status=false
        switchBetweenPlayers(status)
    }
}

// Gives a player cards during the game depending on the situation
// check which card is on board first
function collectCard(){
    console.log("collect card Bottom"+Bottom)
    let i=0
    // console.log()
    if(Bottom[0]==="2"){
        number=2
        document.getElementById(Bottom).remove()
        Bottom=0+Bottom[1]
        console.log("Game continues with " +Bottom)
    }else if(Bottom==="3"){
        number=3
        document.getElementById(Bottom).remove()
        Bottom=0+Bottom[1]
        console.log("Game continues with " +Bottom)
    }else{
        number=1
    }

    // if(Bottom[0]==="2"){
    if (GameStatus===false){
       
        while (i<number){
            human()
            i++
            // count++
        }
        // GameStatus=true
    }else if (GameStatus===true){
        while (i<number){
            computer()
            i++
            // count++
        }
        // GameStatus=false    

    }

    
    if (GameStatus===true){
        switchBetweenPlayers(false)
    }else if (GameStatus===false){
        switchBetweenPlayers(true)
    } 

    // console.log("GS: "+GameStatus)

    // if (GameStatus===true){
    //     GameStatus=false
    //     console.log(GameStatus)
    // }else if(GameStatus===false){
    //     GameStatus=true
    //     console.log(GameStatus)
    //     gameLogic(computerCards)
    // }
    // console.log("GS: "+GameStatus)

}

function gameOver(){
    // if(humanCards.size>=10){
    //     console.log("Game Over, Computer Wins")
    //     clearInterval(gameOverTimer)
    // }else if(computerCards.size>=10){
    //     console.log("Game Over, You Win")
    //     clearInterval(gameOverTimer)
    // }else{
    // }
    counter++
    // console.log(counter)
    timer(counter,300,"Game Over, Someone Win",gameOverTimer)
    // if(counter>=300){
    //     console.log("Game Over, Someone Win")
    //     clearInterval(gameOverTimer)
    // } 
}

// counter(Timer) function
function timer(countdownFrom,countdownTo,message,functionToExecute){
    if(countdownFrom>=countdownTo){
        console.log(message)
        clearInterval(functionToExecute)
    }
}

function nkoKadi(){
    if(humanCards.size===1){
        if(humanCards[0][0]==="4"||humanCards[0][0]==="5"||humanCards[0][0]==="6"||humanCards[0][0]==="7"||humanCards[0][0]==="9"||humanCards[0][0]==="Z"){
            if(Bottom[0]===humanCards[0][0]||Bottom[1]===humanCards[0][1]){
                console.log("you win!!")
            }
        }
    }else if(humanCards.size>1){
        console.log("You can only finish game with one card"+humanCards)
        gameLogic(computerCards)
    }
}



function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms))
}

// May the games begin :)
play()