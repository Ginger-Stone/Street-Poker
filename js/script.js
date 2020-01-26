let Bottom
let pickedCards= new Set()
function play(){
    humanPlayer()
    computerPlayer()
    Bottom=cardOnBoard()
    console.log(pickedCards)

}

// Gives players any of the 52 cards
function handler(){
    let cards=['K','A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q']
    let flowers=['S','C','D','H']
    // let cardsMap={'A':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':0}

    let randomCards=Math.floor(Math.random()*13)
    let randomFlowers=Math.floor(Math.random()*4)
    // console.log(rand)
    let imgName=cards[randomCards]+flowers[randomFlowers]
    if(pickedCards.size!=52){
        if(pickedCards.has(imgName)===false){
        pickedCards.add(imgName)
        }else{
            handler()
        }
    }else{
        // how to clear but still remain with cards that players have
        // hio time yenye cards huisha then cards on the table zinachukuliwa kuendelesha game
        pickedCards.clear()
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
    let cards=['4', '5', '6', '7', '9', '10']
    let card=random()
    let randomFlowers=Math.floor(Math.random()*4)
    let flowers=['S','C','D','H']
    let imgName=cards[card]+flowers[randomFlowers]
    if(pickedCards.has(imgName)===false){
    pickedCards.add(imgName)
    // console.log(imgName)
    let cardImg= document.createElement('img');
    cardImg.setAttribute('id',imgName)
    cardImg.src=`img/PNG/${imgName}.png`;
    let imagesDiv=document.createElement('div')
    imagesDiv.setAttribute('class','playing-card' )
    document.querySelector('#starting-card').appendChild(imagesDiv)
    imagesDiv.appendChild(cardImg);
    }else{
        startingCard()
    }
    
    return imgName
}

// Randomly allocate the human player four cards
function humanPlayer(){
    let humanCards=[]
    let count=0
    while (count<4){
        let humanRandomCard=handler()
        let cardImg= document.createElement('img');
        cardImg.setAttribute('id',humanRandomCard)
        cardImg.setAttribute('onclick',"getPlayedCard(this.id)")
        // cardImg.addEventListener("click",play)
        // cardImg.addEventListener("click",getPlayedCard(this.id))
        cardImg.src=`img/PNG/${humanRandomCard}.png`;
        let imagesDiv=document.createElement('div')
        imagesDiv.setAttribute('class','images' )
        document.querySelector('#main').appendChild(imagesDiv)
        imagesDiv.appendChild(cardImg);
        // console.log(cardImg.id);
        humanCards.push(humanRandomCard)
        count++
    }
    console.log(humanCards)
    return humanCards;
}

function getPlayedCard(humanCardChoice){
    console.log(humanCardChoice)
    gameRules(Bottom,humanCardChoice)
    return humanCardChoice
}

// randomly allocate the computer player four cards
function computerPlayer(){
    let computerCards=[]
    let count=0
    while (count<4){
        let computerRandomCard=handler()
        let back=['yellow','red','purple','green','gray','blue']
        let computerDisplayCard=random()
        let computerDisplayCards=back[computerDisplayCard]+"_back"
        let cardImg= document.createElement('img');
        cardImg.setAttribute('id',computerRandomCard)
        cardImg.src=`img/PNG/${computerDisplayCards}.png`;
        let imagesDiv=document.createElement('div')
        imagesDiv.setAttribute('class','images' )
        document.querySelector('#computer-player').appendChild(imagesDiv)
        imagesDiv.appendChild(cardImg);
        // console.log(cardImg);
        computerCards.push(computerRandomCard)
        count++
    }
    console.log(computerCards)
    return computerCards;

}

function cardOnBoard(){
 let first=startingCard()
 console.log(first)

 return first;
}

// the logic of the game. Used by the computer to understand the game
function gameLogic(human,computer,firstCard){


}

// Rules of the game
function gameRules(cardBottom,cardOnTop){
    console.log(cardBottom.length)
    console.log(cardOnTop.length)    
    if(cardBottom.length===3&&cardOnTop.length===3){
        if(cardBottom[0]+cardBottom[1]===cardOnTop[0]+cardOnTop[1]||cardBottom[cardBottom.length-1]===cardOnTop[cardOnTop.length-1]){
            document.getElementById(cardBottom).remove()
            cardBottom=cardOnTop
            Bottom=cardOnTop
            let cardImg= document.createElement('img');
            cardImg.setAttribute('id',cardBottom)
            cardImg.src=`img/PNG/${cardBottom}.png`;
            let imagesDiv=document.createElement('div')
            imagesDiv.setAttribute('class','images' )
            document.querySelector('#starting-card').appendChild(imagesDiv)
            imagesDiv.appendChild(cardImg);
            console.log(cardBottom)
            console.log("Play")

        }
    }else if(cardBottom.length===3&&cardOnTop.length===2||cardBottom.length===2&&cardOnTop.length===3){
        if(cardBottom[cardBottom.length-1]===cardOnTop[cardOnTop.length-1]){
            document.getElementById(cardBottom).remove()
            cardBottom=cardOnTop
            Bottom=cardOnTop
            let cardImg= document.createElement('img');
            cardImg.setAttribute('id',cardBottom)
            cardImg.src=`img/PNG/${cardBottom}.png`;
            let imagesDiv=document.createElement('div')
            imagesDiv.setAttribute('class','images' )
            document.querySelector('#starting-card').appendChild(imagesDiv)
            imagesDiv.appendChild(cardImg);
            // console.log(typeof(cardBottom))
            // console.log(typeof(cardOnTop))
            console.log(cardBottom)
            console.log("Play")
    
        }
    }else if(cardBottom.length===2&&cardOnTop.length===2){
        if(cardBottom[0]===cardOnTop[0]||cardBottom[1]===cardOnTop[1]){
            if(cardBottom[0]!="2"||cardBottom[0]!="3"){
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
            let v=document.getElementById("starting-card");
            v=v.classList;
            console.log("classList: "+v)
            console.log(cardBottom)
            console.log("Play")
    
            }else if(cardBottom[0]==="2"){
                if(cardBottom[0]===cardOnTop[0]||cardBottom[0]==="A"){
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
                let v=document.getElementById("starting-card");
                v=v.classList;
                console.log("classList: "+v)
                console.log(cardBottom)
                console.log("Play")
                }else{
                    collectCard(2)
                }
            }else if(cardBottom[0]==="3"){
                if(cardBottom[0]===cardOnTop[0]||cardBottom[0]==="A"){
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
                    let v=document.getElementById("starting-card");
                    v=v.classList;
                    console.log("classList: "+v)
                    console.log(cardBottom)
                    console.log("Play")
                }else{
                    collectCard(3)
                }
            }
        }
    }else{
        console.log(cardBottom)
        console.log(cardOnTop)
        console.log("oops try again")
        
    }
}

// Gives a player cards during the game depending on the situation
// check which card is on board first
function collectCard(numberOfCards){
    console.log(numberOfCards)
    let i=0
    while (i<numberOfCards){
        let cardCollected=handler()
        let cardImg= document.createElement('img');
        cardImg.setAttribute('id',cardCollected)
        cardImg.src=`img/PNG/${cardCollected}.png`;
        let imagesDiv=document.createElement('div')
        imagesDiv.setAttribute('class','playing-card')
        document.querySelector('#main').appendChild(imagesDiv)
        imagesDiv.appendChild(cardImg);
        // let v=document.getElementById("starting-card");
        // v=v.classList;
        // console.log("classList: "+v)
        // console.log(cardBottom)
        i++
    }
    console.log("Cards collected" +pickedCards.size)

}

// May the games begin :)
play()