// this part has the game variable and const
let inputDirection = {x:0 , y:0}; // input direction
const foodMusic = new Audio("food.mp3");
const gameOverMusic = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
   {x:13 , y:15}
];
 food = {x: 6 , y: 7};


// Game functions
// Game functions
function main(currenttime) {  // current time of the game 
   
    window.requestAnimationFrame(main); // using this function just to call  the main function repeatedely as we need
     //console.log(ctime);
    if((currenttime - lastPaintTime)/1000 < 1/speed ){ /* for reducing the fame  per second and reder the scrren    to print 0.2 sec*/
       return;
}
   lastPaintTime = currenttime ;
   gameEngine(); // used to run the game
    // this fuction is also show the notification for game over if the snake hit the wall
    //if snake hit the wall game will over and give the new notification to start over the game
}

function isCollide(snake) {
   // if snake its tail, it is for colfilct
   for (let i = 1; i < snakeArr.length; i++) {
      if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
       return true;
      }
   }
     if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
     return true;
     } 
     return false; 
}

function gameEngine(){
      // part 1 here we do updating the snake array and food
      if(isCollide(snakeArr)){
         gameOverMusic.play();
         musicSound.pause();
         inputDirection = {x:0 , y:0};
         alert("Game Over !!! Start Again!!!");
         snakeArr = [{x:13,y:15}]; // after the user press the enter or any other key then restart game
            musicSound.play();
            score=0;
      }

    
      // this is part under part 1 also
   // if u  eat the food then increase score and regenrate the food at the random place
     if(snakeArr[0].y === food.y && snakeArr[0].x===food.x){
        foodMusic.play();
        score +=1;
        if(score>hiscoreval){
           hiscoreval  = score ; 
         localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
         hiscoreBox.innerHTML = "HIScore " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score ;
        snakeArr.unshift({x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y});   // when sanke eat its food than it add the extra body
        // snake length increased when its eat
       let a = 1; 
       let b = 16;
        food = { x : Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
      }

    // moving the snake 
    // the snake movement controler
    for (let i = snakeArr.length-2; i >= 0; i--) {
     snakeArr[i+1] = {...snakeArr[i]};  // it will create a new object to avoid the refenrnce problem
    }
      snakeArr[0].x += inputDirection.x;
      snakeArr[0].y += inputDirection.y;


      // part 2 will display the  food and position on the screen
      // display the snake
   box.innerHTML = ""; // to avoid the mutiple snake creation as we want only one snake here
   snakeArr.forEach((e, index) => {
      snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = e.y ; // it is vertical that is row which will helps to fix the row
      snakeElement.style.gridColumnStart = e.x ; // is vertical a vertical row as it helps to fix the row in the screen
       
       if(index==0){
         snakeElement.classList.add("head");
       }else{
       snakeElement.classList.add("snake");
       }
       box.appendChild(snakeElement);
   });

   //display food
   //display food
   //display food
   foodElement = document.createElement('div');
   foodElement.style.gridRowStart = food.y ; // is vertical that is row helps to fix the row
   foodElement.style.gridColumnStart = food.x ; // is vertical that is row helps to fix the row
   foodElement.classList.add("food")
  box.appendChild(foodElement);

}





// our main logic of the game will start here 
//musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null ){
    hiscoreval = 0;
   localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else{
   hiscoreval = JSON.parse(hiscore);
   hiscoreBox.innerHTML = "HIScore " + hiscore;
}
window.requestAnimationFrame(main); //it makes main fire for the game


window.addEventListener('keydown',e => {      // listen to the keywords i.e the -> <-  basiclly up, down, left right
  // start the game if any key is pressed
  // it needs to press any key 
 moveSound.play();
 switch(e.key){
     case "ArrowUp":
        console.log("ArrowUp");
        inputDirection.x = 0;
        inputDirection.y = -1;
        break;

        case "ArrowDown":
         console.log("ArrowDown");
         inputDirection.x = 0;
        inputDirection.y = 1;
         break;

         case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1;
           inputDirection.y = 0;
            break;

            case "ArrowRight":
               console.log("ArrowRight");
               inputDirection.x = 1;
               inputDirection.y = 0;
               break;

               default:
                  break;
  }
});
