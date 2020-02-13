// In all cards, Z has been used to represent 10, hence ZS, ZH, ZS, ZD
// j/k/=75  A=100 
let cardsArray=['AS','AH','AD','AC','2S','2H','2D','2C','3S','3H','3D','3C','4S','4H','4D','4C','5S','5H','5D','5C','6S','6H','6D','6C','7S','7H','7D','7C','8S','8H','8D','8C','9S','9H','9D','9C','ZS','ZH','ZD','ZC','JS','JH','JD','JC','QS','QH','QD','QC','KS','KH','KD','KC',]
let cardSet=new Set(cardsArray)
let Bottom, gameOverTimer, counter=0, humanCardChoice
let GameStatus //when human plays it turns to true and thus is the turn of the computer to make its move
let pickedCards= new Set()
let special=['A','2','3','8','J','Q','K']
let computerCards=new Set();
let humanCards=new Set()
let info=document.getElementById('info')
let timerT=document.getElementById('timer')
let k=document.getElementsByClassName('listener')
// let g=document.getElementById('info')

async function play(){
    humanPlayer()
    computerPlayer()
    // playMusic.play()
    Bottom=cardOnBoard()
    info.innerHTML="Choosing who to start"
    await sleep(2000)
    whoStarts()
    // console.log(cardsArray.length)
    
    gameOverTimer=setInterval(gameOver,1000)
    
    // console.log(pickedCards) 
    // while (GameStatus===true){
    //     gameLogic()
    // }

}

function whoStarts(){
    let randomStarter=random(2)
    if(randomStarter===0){
        GameStatus=false
        switchBetweenPlayers(false)
        info.innerHTML="You Start"
    }else if(randomStarter===1){
        GameStatus=true
        switchBetweenPlayers(true)
        info.innerHTML="Computer Starts"
    }
}

// Gives players any of the 52 cards
function handler(){
    let randomCards=Math.floor(Math.random()*cardSet.size)
    let imgName=Array.from(cardSet)[randomCards]
    cardSet.delete(imgName)
    console.log(cardSet.size)
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
    return imgName;
}

// generate random numbers used for starting card and back of cards for comp player
function random(n){
    return Math.floor(Math.random()*n)
}

// Game sounds
function sound(){
    let state=confirm("listen to some background music while you play..")
    let playMusic=new Audio('../sounds/sound4.mp3')
    playMusic.volume=0.2
    
    if(state===true){
        playMusic.play()
        info.innerHTML="Playing Background Music..." 
    }else if(state===false){
        playMusic.paused()
        info.innerHTML="Stopped"
    }
}

// Generates a random starting card from none special cards
function startingCard(){
    let imgName=handler()
    // console.log(imgName[0]!="A")
    if(imgName[0]!="A"&&imgName[0]!="2"&&imgName[0]!="3"&&imgName[0]!="8"&&imgName[0]!="J"&&imgName[0]!="K"&&imgName[0]!="Q"){
    console.log(imgName[0])
    let cardImg= document.createElement('img');
    cardImg.setAttribute('id',imgName)
    cardImg.src=`images/PNG/${imgName}.png`;
    let imagesDiv=document.createElement('div')
    imagesDiv.setAttribute('class','playing-card' )
    document.querySelector('#starting-card').appendChild(imagesDiv)
    imagesDiv.appendChild(cardImg);
    info.innerHTML="Starting Card is: "+imgName
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
    // cardImg.setAttribute('onclick',"getPlayedCard(this.id)")
    cardImg.src=`images/PNG/${humanRandomCard}.png`;
    cardImg.setAttribute('class','images listener' )
    document.querySelector('#main').appendChild(cardImg)
    humanCards.add(humanRandomCard)
}

// switch between players
async function switchBetweenPlayers(status){
    if(status===true){
        GameStatus=true
        info.innerHTML="Computer's turn"
        
        gameLogic(computerCards)
        await sleep(1000)
        
    }else if(status===false){
        GameStatus=false
        info.innerHTML="Your turn"
        console.log("your turn")
        addEventListeners()
        // console.log(humanCardChoiceListener)

    }
}

let i=0
function addEventListeners(){
    while (i<k.length){
        console.log(k[i])
        k[i].addEventListener("click",function(){
            getPlayedCard(this.id)
        })
        i++
    }
    console.log(document.getElementsByClassName("unpicked-cards")[0])
        document.getElementsByClassName("unpicked-cards")[0].addEventListener("click",collectCard)

}

// let humanCardChoiceListener=document.addEventListener("click",func)

async function getPlayedCard(humanCardChoice){
    if(humanCardChoice!=null){
        gameRules(Bottom,humanCardChoice)
        console.log(`Bottom card is ${Bottom}`)
        console.log(`Human card is ${humanCardChoice}`)
        await sleep(1000)
        info.innerHTML="You Played: "+humanCardChoice
        if(humanCardChoice[0]===Bottom[0]||humanCardChoice[1]===Bottom[1]){
            console.log(`removing ${humanCardChoice}`)
            document.getElementById(humanCardChoice).remove()
            humanCards.delete(humanCardChoice)
        }

        if(humanCardChoice[0]==="Q"||humanCardChoice[0]==="8"){
            playMore(GameStatus)
        }else{
            // let playClock=10
            // var playTimer=setInterval(function(){
            //     playClock-=1
            //     playMoreSame(Bottom,humanCardChoice)
            //     console.log("playmore")
            //     if(playClock<=0){
            //         clearInterval(playTimer);
            //     }
            // },100)
            switchBetweenPlayers(true)
        }
        // console.log(humanCards)
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
    let computerDisplayCard=random(6)
    let computerDisplayCards=back[computerDisplayCard]+"_back"
    let cardImg= document.createElement('img');
    cardImg.setAttribute('id',computerRandomCard)
    cardImg.src=`images/PNG/${computerDisplayCards}.png`;
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
        if(GameStatus==true){
            i=0
            compNumberOfCards=computer.size
            while(i<=compNumberOfCards){
                computerIndex=Array.from(computer)[i]
                if(i<compNumberOfCards){
                    if(Bottom[0]===computerIndex[0]||Bottom[1]===computerIndex[1]){
                        computerPlayed=gameRules(Bottom,computerIndex)
                        let bb=computerPlayed
                        info.innerHTML=`Computer Played: ${computerPlayed}`
                        // info.innerHTML="computer Played: "+computerPlayed                        let bb=computerPlayed
                        if(computerPlayed!=null){
                        document.getElementById(computerPlayed).remove()
                        computerCards.delete(computerPlayed)
                        }
                        if(bb[0]==="Q"||bb[0]==="8"){
                            playMore(GameStatus)
                        }else{
                            console.log("switching")
                            switchBetweenPlayers(false)
                        }
                        break;
                    }
                }else if(i===compNumberOfCards){
                    collectCard()
                    break
                }
                if (compNumberOfCards===1){
                    nkoKadi(true)
                }
                i++
            }
        }        
}

// Rules of the game
function gameRules(cardBottom,cardOnTop){
    // console.log("card Bottom: "+cardBottom)
    // console.log("card Top: "+cardOnTop)
if(cardBottom[0]===cardOnTop[0]||cardBottom[1]===cardOnTop[1]){
            console.log("card Bottom: "+cardBottom)
            console.log("card Top: "+cardOnTop)
            console.log("We're all set")
            if(cardBottom[0]==="2"){
                if(cardBottom[0]===cardOnTop[0]||cardOnTop[0]==="A"){
                    if(cardBottom!=null){
                        document.getElementById(cardBottom).remove()
                        }
                    cardBottom=cardOnTop
                    Bottom=cardOnTop
                    let cardImg= document.createElement('img');
                    cardImg.setAttribute('id',cardBottom)
                    cardImg.src=`images/PNG/${cardBottom}.png`;
                    let imagesDiv=document.createElement('div')
                    imagesDiv.setAttribute('class','playing-card')
                    document.querySelector('#starting-card').appendChild(imagesDiv)
                    imagesDiv.appendChild(cardImg);
                }else if(cardOnTop[0]==="3"&&cardOnTop[1]===cardBottom[1]){
                    if(cardBottom!=null){
                        document.getElementById(cardBottom).remove()
                        }
                    cardBottom=cardOnTop
                    Bottom=cardOnTop
                    let cardImg= document.createElement('img');
                    cardImg.setAttribute('id',cardBottom)
                    cardImg.src=`images/PNG/${cardBottom}.png`;
                    let imagesDiv=document.createElement('div')
                    imagesDiv.setAttribute('class','playing-card')
                    document.querySelector('#starting-card').appendChild(imagesDiv)
                    imagesDiv.appendChild(cardImg);
                }else if(cardBottom[0]!=cardOnTop[0]||cardOnTop[0]!="A"){
                    if(GameStatus=true){
                        collectCard(2)
                    }
                }
            }else if(cardBottom[0]==="3"){
                if(cardBottom[0]===cardOnTop[0]||cardOnTop[0]==="A"){
                    if(Bottom!=null){
                        document.getElementById(cardBottom).remove()
                        }
                    cardBottom=cardOnTop
                    Bottom=cardOnTop
                    let cardImg= document.createElement('img');
                    cardImg.setAttribute('id',cardBottom)
                    cardImg.src=`images/PNG/${cardBottom}.png`;
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
                }else if(cardOnTop[0]==="2"&&cardOnTop[1]===cardBottom[1]){
                    if(cardBottom!=null){
                        document.getElementById(cardBottom).remove()
                        }
                    cardBottom=cardOnTop
                    Bottom=cardOnTop
                    let cardImg= document.createElement('img');
                    cardImg.setAttribute('id',cardBottom)
                    cardImg.src=`images/PNG/${cardBottom}.png`;
                    let imagesDiv=document.createElement('div')
                    imagesDiv.setAttribute('class','playing-card')
                    document.querySelector('#starting-card').appendChild(imagesDiv)
                    imagesDiv.appendChild(cardImg);
                }else if(cardBottom[0]!=cardOnTop[0]||cardOnTop[0]!="A"){
                    if(GameStatus=true){
                        collectCard(2)
                    }
                }
            

                if(cardBottom[0]==="J"&&cardOnTop[0]==="J"||cardBottom[0]==="J"&&cardOnTop[0]==="A"){
                    if(Bottom!=null){
                        document.getElementById(cardBottom).remove()
                        }
                    cardBottom=cardOnTop
                    Bottom=cardOnTop
                    let cardImg= document.createElement('img');
                    cardImg.setAttribute('id',cardBottom)
                    cardImg.src=`images/PNG/${cardBottom}.png`;
                    let imagesDiv=document.createElement('div')
                    imagesDiv.setAttribute('class','playing-card')
                    document.querySelector('#starting-card').appendChild(imagesDiv)
                    imagesDiv.appendChild(cardImg);
                    // document.getElementById(cardOnTop).remove()
                    // humanCards.delete(cardOnTop)
                // }else if(cardBottom[0]==="J"&&cardOnTop[0]!="J"||cardBottom[0]==="J"&&cardOnTop[0]!="A"){
                    }else{   
                    jump(GameStatus)
                }
            }else if(cardBottom==="J"){

            if(cardBottom[0]==="J"&&cardOnTop[0]==="J"||cardBottom[0]==="J"&&cardOnTop[0]==="A"){
                if(Bottom!=null){
                    document.getElementById(cardBottom).remove()
                    }
                cardBottom=cardOnTop
                Bottom=cardOnTop
                let cardImg= document.createElement('img');
                cardImg.setAttribute('id',cardBottom)
                cardImg.src=`images/PNG/${cardBottom}.png`;
                let imagesDiv=document.createElement('div')
                imagesDiv.setAttribute('class','playing-card')
                document.querySelector('#starting-card').appendChild(imagesDiv)
                imagesDiv.appendChild(cardImg);
                // document.getElementById(cardOnTop).remove()
                // humanCards.delete(cardOnTop)
            // }else if(cardBottom[0]==="J"&&cardOnTop[0]!="J"||cardBottom[0]==="J"&&cardOnTop[0]!="A"){
            }
        }else if(cardBottom==="K"){
            if(cardBottom[0]==="K"&&cardOnTop[0]==="K"||cardBottom[0]==="K"&&cardOnTop[0]==="A"){
                    document.getElementById(cardBottom).remove()
                    cardBottom=cardOnTop
                    Bottom=cardOnTop
                    let cardImg= document.createElement('img');
                    cardImg.setAttribute('id',cardBottom)
                    cardImg.src=`images/PNG/${cardBottom}.png`;
                    let imagesDiv=document.createElement('div')
                    imagesDiv.setAttribute('class','playing-card')
                    document.querySelector('#starting-card').appendChild(imagesDiv)
                    imagesDiv.appendChild(cardImg);
                    // document.getElementById(cardOnTop).remove()
                    // humanCards.delete(cardOnTop)
        }
        }else if(cardOnTop[0]==="Q"||cardOnTop[0]==="8"){
            if(Bottom!=null){
                document.getElementById(cardBottom).remove()
                }
            cardBottom=cardOnTop
            Bottom=cardOnTop
            console.log("Bottom is Q or 8 "+cardBottom)
            let cardImg= document.createElement('img');
            cardImg.setAttribute('id',cardBottom)
            cardImg.src=`images/PNG/${cardBottom}.png`;
            let imagesDiv=document.createElement('div')
            imagesDiv.setAttribute('class','playing-card')
            document.querySelector('#starting-card').appendChild(imagesDiv)
            imagesDiv.appendChild(cardImg);
            // playMore(GameStatus)
        }else if(cardBottom[0]==="Q"&&cardBottom[1]===cardOnTop[1]||cardOnTop[0]==="8"&&cardBottom[1]===cardOnTop[1]){
            console.log("Bottom nu"+cardBottom)
            if(Bottom!=null){
            document.getElementById(cardBottom).remove()
            }
            cardBottom=cardOnTop
            Bottom=cardOnTop
            let cardImg= document.createElement('img');
            cardImg.setAttribute('id',cardBottom)
            cardImg.src=`images/PNG/${cardBottom}.png`;
            let imagesDiv=document.createElement('div')
            imagesDiv.setAttribute('class','playing-card')
            document.querySelector('#starting-card').appendChild(imagesDiv)
            imagesDiv.appendChild(cardImg);
        }else if(cardBottom[0]==="Q"&&cardBottom[1]!=cardOnTop[1]||cardBottom[0]==="8"&&cardBottom[1]!=cardOnTop[1]){
            collectCard()
        }else if(cardBottom[0]!="2"&&cardBottom[0]!="3"&&cardBottom[0]!="8"&&cardBottom[0]!="J"&&cardBottom[0]!="Q"&&cardBottom[0]!="K"){
            if(cardBottom[0]===cardOnTop[0]||cardBottom[1]===cardOnTop[1]){
                // console.log(cardBottom)
                console.log("Bottom nu"+cardBottom)
                if(Bottom!=null&&cardBottom!=null){
                    console.log(Bottom)
                    console.log(cardBottom)
                    document.getElementById(cardBottom).remove()
                    }

                cardBottom=cardOnTop
                Bottom=cardOnTop
                console.log("Bottom nu2"+cardBottom)
                let cardImg= document.createElement('img');
                cardImg.setAttribute('id',cardBottom)
                cardImg.src=`images/PNG/${cardBottom}.png`;
                let imagesDiv=document.createElement('div')
                imagesDiv.setAttribute('class','playing-card')
                document.querySelector('#starting-card').appendChild(imagesDiv)
                imagesDiv.appendChild(cardImg);
        
                } 
            } 
        }else if(cardBottom[0]!=cardOnTop[0]&&cardOnTop[0]==="A"){
            if(Bottom!=null||cardBottom!=null){
            document.getElementById("cardBottom").remove()
            }
            console.log("change game")
            cardBottom=cardOnTop
            Bottom=cardOnTop
            console.log("Bottom nu2"+cardBottom)
            let cardImg= document.createElement('img');
            cardImg.setAttribute('id',cardBottom)
            cardImg.src=`images/PNG/${cardBottom}.png`;
            let imagesDiv=document.createElement('div')
            imagesDiv.setAttribute('class','playing-card')
            document.querySelector('#starting-card').appendChild(imagesDiv)
            imagesDiv.appendChild(cardImg);
        }else{
            console.log(GameStatus)
            if(GameStatus===false){
                // GameStatus=false
                info.innerHTML="Not a possible move"
                switchBetweenPlayers(false)

                console.log("Oops! Not a possible move. Check out the rules to see what you are doing wrong!!")
                // break;
            }else if(GameStatus===true){
                switchBetweenPlayers(true)
                // gameLogic(computerCards)
                // break;
            } 

    }
    
    return cardBottom
    
}

// place card function instead of repeating he same code over and over again in gameRules()-->I think this is where classes can be used
function placeCard(){

}

// change game
function changeGame(){
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
    // Bottom=cardOnBoard
    sleep(10)
    if (status===true){
        switchBetweenPlayers(true)
    }else if (status===false){
        switchBetweenPlayers(false)
    } 
}

// Q function
function playMore(status) {
    if (status===true){
        console.log("computer still playing")
        switchBetweenPlayers(status)
    }else if (status===false){
        console.log("you are still playing")
        switchBetweenPlayers(status)
    }
}

// Play More for real
function playMoreSame(cardBottom,cardOnTop){
    if(cardBottom[0]===cardOnTop[0]){
        if(cardBottom!=null){
            document.getElementById(cardBottom).remove()
            }
        cardBottom=cardOnTop
        Bottom=cardOnTop
        let cardImg= document.createElement('img');
        cardImg.setAttribute('id',cardBottom)
        cardImg.src=`images/PNG/${cardBottom}.png`;
        let imagesDiv=document.createElement('div')
        imagesDiv.setAttribute('class','playing-card')
        document.querySelector('#starting-card').appendChild(imagesDiv)
        imagesDiv.appendChild(cardImg);
        // playMoreSame)
    }else{
        // break;
    }
}

// Gives a player cards during the game depending on the situation
// check which card is on board first
async function collectCard(){
    console.log("collect card Bottom"+Bottom)
    let i=0
    if(Bottom[0]==="2"){
        number=2
        if(Bottom!=null){
        document.getElementById(Bottom).remove()
        }
        Bottom=0+Bottom[1]
        let cardImg= document.createElement('img');
        cardImg.setAttribute('id',Bottom)
        cardImg.src=`images/PNG/${Bottom}.png`;
        let imagesDiv=document.createElement('div')
        imagesDiv.setAttribute('class','playing-card')
        document.querySelector('#starting-card').appendChild(imagesDiv)
        imagesDiv.appendChild(cardImg);
        console.log("Game continues with " +Bottom)
    }else if(Bottom[0]==="3"){
        number=3
        if(Bottom!=null){
        document.getElementById(Bottom).remove()
        }
        Bottom=0+Bottom[1]
        let cardImg= document.createElement('img');
        cardImg.setAttribute('id',Bottom)
        cardImg.src=`images/PNG/${Bottom}.png`;
        let imagesDiv=document.createElement('div')
        imagesDiv.setAttribute('class','playing-card')
        document.querySelector('#starting-card').appendChild(imagesDiv)
        imagesDiv.appendChild(cardImg);
        console.log("Game continues with " +Bottom)
    }else{
        number=1
        if(Bottom!=null){
            console.log(Bottom)
        document.getElementById(Bottom).remove()
        }
        let cardImg= document.createElement('img');
        cardImg.setAttribute('id',Bottom)
        cardImg.src=`images/PNG/${Bottom}.png`;
        let imagesDiv=document.createElement('div')
        imagesDiv.setAttribute('class','playing-card')
        document.querySelector('#starting-card').appendChild(imagesDiv)
        imagesDiv.appendChild(cardImg);
        console.log("Game continues with " +Bottom)
    }

    if (GameStatus===false){
       
        while (i<number){
            human()
            i++
        }
    }else if (GameStatus===true){
        while (i<number){
            await sleep(2000)
            computer()
            i++
        }

    }

    
    if (GameStatus===true){
        switchBetweenPlayers(false)
        
    }else if (GameStatus===false){
        switchBetweenPlayers(true)
    } 

}

function gameOver(){
    timerT.innerHTML=counter
    counter++
    timer(counter,12000,"Time Out",gameOverTimer)

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

function nkoKadi(status){
    let playerCard
    if (status===false){
        playerCard=Array.from(humanCards)
        status=true
    }else{
        playerCard=Array.from(computerCards)
        status=false
    }
    console.log(playerCard.length)


    if(playerCard.length===1){
        console.log(playerCard[0])
        if(playerCard[0][0]==="4"||playerCard[0][0]==="5"||playerCard[0][0]==="6"||playerCard[0][0]==="7"||playerCard[0][0]==="9"||playerCard[0][0]==="Z"){
            if(Bottom[0]===playerCard[0][0]||Bottom[1]===playerCard[0][1]){
                document.getElementById('end-game').style="display:block;visibility:visible"
                info.innerHTML="you win!!"
            }
        }else{
            info.innerHTML="Cannot finish game with a special card"
        }
    }else if(playerCard.length>1){
        info.innerHTML="Only one card ends game"
        switchBetweenPlayers(status)
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



function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms))
}

// May the games begin :)
play()