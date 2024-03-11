

let n; /*number of player*/
let cardsArray=[];
const cTI={
    '1':1,
    '2':2,
    '3':3,
    '4':4,
    '5':5,
    '6':6,
    '7':7,
    '8':8,
    '9':9,
    '10':10,
    '11':11,
    '12':12,
    '13':13
}
const rTC={
    "1":1,
    "2":1,
    "3":2,
    "4":2,
    "5":3,
    "6":3,
    "7":4,
    "8":4,  
}


let deck=[];
let handPlayer0=[];
let handPlayer1=[];
let handPlayer2=[];
let handPlayer3=[];
let message=$("#message");
let tableArray=[];
const playerBoard= document.querySelectorAll('.board');
var flag=0;
//////////////////////verify//////////////////////////
function verify(){
    n=$('input[name="num_of_players"]:checked').val();
    if(n==undefined){
        $("#message").html("please choose number of players!");
        return;
    }
    console.log(n);
    $("#main").css("visibility","hidden")
    $("#game").css("visibility","visible")
    Start();
};

function updateDeck(){
    $("#draw").empty();
    let len= deck.length;
    $("#draw").append("➕" +`<br>` +len);
}

/////////////////start//////////////////////////
function Start(){
    console.log(n);
   for (i=2;i<=n;i++){
        $("#game").append(`<div id="player-${i-1}" class="board"></div>`);
        
   }
   setDeck();
   Shuffle(cardsArray);
   deal_cards(n,deck);
   makeTable();
   turn();
};
function makeTable(){
    for (i=0;i<78;i++)
    {
        $("#floor").append(`<div class="empty"></div>`);
        tableArray[i]='#';
    }
}
function setDeck(){
    let counter=0;
 for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 13; j++) {
            if (i%2 === 1) {
               cardsArray.push({
                    "id": `${i}${cTI[j]}`,
                    "card": `<div id="${i}${cTI[j]}" class="card" draggable="true" style="background-image:url('/pics/${rTC[i]}-0${cTI[j]}.svg')" color="${rTC[i]}" number="${cTI[j]}"></div>`,
                    "color": rTC[i],
                    "number": `${cTI[j]}`,
                    "style":`background-image:url('/pics/${rTC[i]}-0${cTI[j]}.svg')`
                    
                });
            } else {
                cardsArray.push({
                    "id": `${i}${cTI[j]}`,
                    "card": `<div id="${i}${cTI[j]}" class="card" draggable="true" style="background-image:url('/pics/${rTC[i]}-0${cTI[j]}.svg')" color="${rTC[i]}" number="${cTI[j]}"></div>`,
                    "color": rTC[i],
                    "number": `${cTI[j]}`,
                    "style":`background-image:url('/pics/${rTC[i]}-0${cTI[j]}.svg')`
                });
            }
        }
    }
    cardsArray.push({
        "id": `0`,
        "card": `<div id="0" class="card" draggable="true" style="background-image:url('/pics/0-0.svg')" color="0" number="0"></div>`,
        "color": 0,
        "number": `0`,
        "style":`background-image:url('/pics/0-0.svg')`
    });
    cardsArray.push({
        "id": `0`,
        "card": `<div id="0" class="card" draggable="true" style="background-image:url('/pics/0-0.svg')" color="0" number="0"></div>`,
        "color": 0,
        "number": `0`,
        "style":`background-image:url('/pics/0-0.svg')`
    });
}


function Shuffle(cardsArray){
    for(i=0;i<cardsArray.length;i++)
    {
        deck.push(cardsArray[i]);
    }
    for (var i = cardsArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function deal_cards(numberOfPlayers,Deck){
    for(i=0;i<numberOfPlayers;i++)
    {
        for(j=0;j<14;j++){
                temp=Deck.pop();
                let tileElement=$(temp.card)
            if (i==0)
            {
                $("#player-0").append(tileElement)
                handPlayer0.push(temp);
            }
            else if(i==1)
            {
                $("#player-1").append(tileElement)
                handPlayer1.push(temp);
            }
            else if (i==2)
            {
                $("#player-2").append(tileElement)
                handPlayer2.push(temp);
            }
            else
            {
                $("#player-3").append(tileElement)
                handPlayer3.push(temp);
            }
        }
    }
   //dragNDrop();
    //$(".board").sortable();
    updateDeck();
}
function updateHand(hand){
    for(i=0;i<handPlayer0.length;i++)
    {
        console.log(handPlayer0[i].card);
    }
    
    fc = document.getElementById('player-0');
    while (fc.firstChild) {
        fc.removeChild(fc.firstChild);
    }
    for(j=0;j<handPlayer0.length;j++){

        var temp=$(handPlayer0[j].card)
        $("#player-0").append(temp);
    }
    turn();
    updateDeck();
}

////////////////////////////////in game//////////////////////////
function draw(Deck){
    let temp
    if(deck.length==0){
        console.log("the deck is empty");   
    }
    else
    {
        temp=deck.pop();
        let tileElement=$(temp.card)
        $("#player-0").append(tileElement);
        handPlayer0.push(temp);
    }
   //dragNDrop();
   updateDeck();
   turn();
}

function sort789()
{
    
    handPlayer0.sort(function(a,b){return parseInt(a.color)-parseInt(b.color)});

    $(`#player-0`).empty();
    for(i=0;i<handPlayer0.length;i++){
        temp=handPlayer0[i].card;
        
        $("#player-0").append(temp);
    }
    turn();
}
 function sort777(){

    handPlayer0.sort(function(a,b){return parseInt(a.number) -parseInt(b.number)});

    $(`#player-0`).empty();
    for(i=0;i<handPlayer0.length;i++){
        temp=handPlayer0[i].card;
       
        $("#player-0").append(temp);
    }
    turn();
}

const screenShot={
    //"computerHand":[],//cards in array (stirngs)
    "playerHand":[],//cards in array (stirngs)
    "floor":[],//cards in array (stirngs)
    "remainDeck":[]//cards in array (stirngs)
}

//deep copy each array from screenShot
const deepClone=(target,arr)=>{
    for(let i=0;i<arr.length;i++){
        target.push(arr[i]);
    }
}
   
const snap=()=>{
    deepClone(screenShot.playerHand,playerHand);
    deepClone(screenShot.floor,floor);
    deepClone(screenShot.remainDeck,remainDeck);
}




//////////////////////////TEST TWO//////////////////////////////

//fill Listeners



function turn(){
    if(flag===0){
        flag=1;
        deepClone(screenShot.playerHand,handPlayer0);
       //deepClone(screenShot.floor,floor);
        //deepClone(screenShot.playerHand,handplayer0);
    }

    $(function(){
        $( "#floor" ).sortable(
            {
                cancel: ".ui-state-disabled"   
        });
    })


    const fill = document.querySelectorAll('.card');
    const empties=document.querySelectorAll('.empty');
    var temp;
    
    for(const empty of empties){
        console.log("empty!");
        empty.addEventListener('dragover',dragOver);
        empty.addEventListener('dragenter',dragEnter);
        empty.addEventListener('dragleave',dragLeave);
        empty.addEventListener('drop',dragDrop);
    }
    
    fill.forEach(element => {
        
        element.addEventListener('dragstart',dragStart);
    });
    
    fill.forEach(element => {
        element.addEventListener('dragend',dragEnd);

    });
    //Drag Function

    function dragStart(e){
        
        
        console.log(this);
        temp=this;
        //this.className += 'hold';
        //setTimeout(()=>(this.className ='invisible'),0)
    }
    function dragEnd(){
        //this.className= 'card';
        //setTimeout(()=>(this.className ='visible'),0)
        

    }
   function dragOver(e)
   {
    e.preventDefault();
   }
   function dragEnter()
   {
   } 
   function dragLeave()
   {
   } 
   function dragDrop(e)
   {
    const target=e.target;
    const newDiv = document.createElement('div');
    var tempcard=handPlayer0.find(item=>item.id===temp.id);
    handPlayer0=handPlayer0.filter(item=>item.id!==temp.id);
    newDiv.id = temp.id; 
    newDiv.className = temp.className;
    newDiv.style= tempcard.style;
    newDiv.color= tempcard.color;
    newDiv.number=tempcard.number;
    target.replaceWith(newDiv);
    updateHand(handPlayer0);
    
   }
   

}



/////////////exit///////////////
function exit(){
    $("#game").css("visibility","hidden")
    $("#main").css("visibility","visible")
    $("#player-1").remove();
    $("#player-2").remove();
    $("#player-3").remove();
    fc = document.getElementById('player-0');
    while (fc.firstChild) {
        fc.removeChild(fc.firstChild);
    }
    deck=[];
    fb=document.getElementById('floor')
    while(fb.firstChild){
        fb.removeChild(fb.firstChild)
    }
    cardsArray=[];
    handPlayer0=[];
    
    
}





//function turn(){


    //  $( ".board" ).sortable({
    //      revert: true
    //    });
    //$( ".card" ).draggable()//{
        //helper:"clone",
        //  connectToSortable: ".board",
        //      drag:function(){
        //      console.log('drag');
        //   }


    // $(".floor").each(card=>{
    //         card.drag('drag',()=>{
    //             console.log('drag');
    //         })
    //     })
    // }
    //);
      //$( "div, span" ).disableSelection();
      
//}

    // $(".floor").droppable({
    //      drop:function(event,ui){
    //          var position=ui.position;
    //          var cellX=calculaceCellX(position.left);
    //          var cellY=calculaceCellY(position.top);

    //          moveCardToCell(ui.draggable, cellX, cellY);
    //           tableArray.push($(this));
    //           moveCard(ui.draggable,$(this))

    //          moveCard(tableArray)
    //      }
        
    //});

//     function calculateCellX(positionLeft) {
//         var relativeX = positionLeft - floorOffsetLeft; 
//         return Math.floor(relativeX / cellSize); 
//     }
    
//     function calculateCellY(positionTop) {
//         var relativeY = positionTop - floorOffsetTop; 
//         return Math.floor(relativeY / cellSize); 
//     }
    
//     function moveCardToCell(cardDiv, cellX, cellY) {
//         cardDiv.detach();
//         cardDiv.css({ 
//             position: 'absolute', 
//             left: (cellX * cellSize) + 'px',  
//             top: (cellY * cellSize) + 'px' 
//         });
//         cardDiv.appendTo('#floor'); 
//     }

// }

// function moveCard(cardDiv, destinationDiv) {
//     // Detach the cardDiv (removes it but preserves data)
//     cardDiv.detach(); 

//     // Append the cardDiv to the destination
//     destinationDiv.appendTo(destinationDiv);  
// }






// function renderFloor(Array){
//     console.log(Array);
//     $(".floor").empty();
//     for(var i in Array){
//         var node = Array [i]
//         console.log(Array);
//         $(".floor").append("<span>somthing</span>");
//     }

// }
























// document.addEventListener('DOMContentLoaded', function() {
//     const card=document.getElementById('card');
//     let table=document.getElementById('floor');
    
//     card.addEventListener('dragstart', function(event) {
//         console.log(event);
//     });

//     table.addEventListener('dragover',function(event){
//         event.preventDefault()

//     })
//     table.addEventListener('drop',function(event){
//         table.prepend(card);
//     })


//  });

// function drag(card){
//     let card=

// }





//  $(function(){
//      $(".floor").sortable();

//  });
//  $(function(){
//     $(".board").sortable();

// });

//////////////////TEST ONE/////////////////
// var container;
// var draggables;
// var floors;
// function turn(){
//     draggables=document.querySelectorAll('.card');
//     containers=document.querySelectorAll('.board');
//     floors=document.querySelectorAll('.floor')
    
    
//     draggables.forEach(draggable => {
//         draggable.addEventListener('dragstart',()=>{
//             draggable.classList.add('dragging');
//         })
        
//         draggable.addEventListener('dragend',()=>{
//             draggable.classList.remove('dragging');
//         })
//     });
    
//     containers.forEach(container=>{
//         container.addEventListener('dragover',e => {
//             e.preventDefault();
//             const afterElement=getDragAfterElement(container,e.clientY);
//             //console.log('drag over');
//             const draggable=document.querySelector('.dragging');
//             container.appendChild(draggable);
//         })
//     })

//     function getDragAfterElement(container,y)
//     {
//        const draggableElements= [...container.querySelectorAll('.card:not(.dragging)')]
      
//        return draggableElements.reduce((closest,child)=>{
//         const box=child.getBoundingClientRect();
//         const offset= y - box.top - box.height / 2
//         //console.log(offset);
        
//         if(offset<0 && offset > closest.offset){
//             return {offset:offset,element:child}
//         }
//         else{
//             return closest
//         }

//        }
//        ,{ offset:Number.NEGATIVE_INFINITY}).element;
//     }
// }