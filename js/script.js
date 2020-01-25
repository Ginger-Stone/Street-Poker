
function play(){
    humanPlayer()
    computerPlayer()
    cardOnBoard()

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
    // console.log(imgName)
    let cardImg= document.createElement('img');
    cardImg.setAttribute('id',imgName)
    cardImg.src=`img/PNG/${imgName}.png`;
    let imagesDiv=document.createElement('div')
    imagesDiv.setAttribute('class','images' )
    document.querySelector('#starting-card').appendChild(imagesDiv)
    imagesDiv.appendChild(cardImg);
    
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
}

// the logic of the game. Used by the computer to understand the game
function gameLogic(human,computer,firstCard){


}

// Rules of the game
function gameRules(){


}

// Gives a player cards during the game depending on the situation
function collectCard(number){

}

// May the games begin :)
play()