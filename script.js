// alert("JS connected");
let ball = document.querySelector(".ball");
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");
let board = document.querySelector(".board");
let boardBound = board.getBoundingClientRect();
let y = true, x = true;
let leftPlayerlive = 3;
let rightPlayerlive = 3 ;
//user input listen
function movePaddle(curPaddle, change) {
    let cPaddleBounds = curPaddle.getBoundingClientRect();
    if(cPaddleBounds.top + change >= boardBound.top && cPaddleBounds.bottom+change <= boardBound.bottom)
    curPaddle.style.top = cPaddleBounds.top + change + "px";

}
document.addEventListener("keydown", function(e){
    // console.log("Koi toh key hai");
    // console.log(e);
    // console.log
    if(e.key == "w"){
        movePaddle(leftPaddle,-window.innerHeight*0.1);
    }
    else
    if(e.key == "s"){
        movePaddle(leftPaddle, +window.innerHeight * 0.1);
    }
    else 
    if(e.key == "ArrowUp"){
        movePaddle(rightPaddle, -window.innerHeight * 0.1);
    }
    else
    if(e.key == "ArrowDown"){
        movePaddle(rightPaddle, window.innerHeight * 0.1);
    }
});
function setColor(idx) {
    let allIcons = document.querySelectorAll(".fas.fa-circle");
    allIcons[idx].style.color = "#75bee9";
}
function moveBall(){
    let ballcoord = ball.getBoundingClientRect();
    let balltop = ballcoord.top;
    let ballleft = ballcoord.left;
    let ballbottom = ballcoord.bottom;
    let ballright = ballcoord.right;
    //is ball in bound
    // handle vertical bound

    // check if collided with boundary
    function resetGame() {
        ball.style.top = window.innerHeight*0.45+"px";
        ball.style.left = window.innerWidth * 0.45 + "px";
        requestAnimationFrame(moveBall);
    }
    
    let hasTouchedLeft = ballleft<boardBound.left;
    let hasTouchedRight = ballright>boardBound.right;
    if(hasTouchedLeft || hasTouchedRight){
        if(hasTouchedLeft){
            leftPlayerlive--;
            setColor(leftPlayerlive);
            if(leftPlayerlive == 0){
                alert("Game Over Player Right Won");
                document.location.reload();
            }
            else{
                return resetGame();
            }
        }
        else{
            rightPlayerlive--;
            setColor(rightPlayerlive+3);
            if (rightPlayerlive == 0) {
                alert("Game Over Player Left Won");
                document.location.reload();
            }
            else {
                return resetGame();
            }
        }
    }


    if(balltop <= boardBound.top || ballbottom >= boardBound.bottom){
        // vertically outside
        y = !y;
    }
    // handle horizontal bound
    if (ballleft <= boardBound.left || ballright >= boardBound.right) {
        // horizontally outside
        x = !x;
    } 
    // ******collision************
    // left hit -> np
    let leftPaddleBounds = leftPaddle.getBoundingClientRect();
    let rightPaddleBounds = rightPaddle.getBoundingClientRect();
    if(ballleft <= leftPaddleBounds.right && ballright >= leftPaddleBounds.left && balltop+30>=leftPaddleBounds.top&&ballbottom-30<=leftPaddleBounds.bottom){
        x = !x;
    }
    //right hit -> np
    if (ballleft <= rightPaddleBounds.right && ballright >= rightPaddleBounds.left && balltop + 30 >= rightPaddleBounds.top && ballbottom - 30 <= rightPaddleBounds.bottom) {
        x = !x;
    }
    //issue
    // *************************
    ball.style.top = (y == true ? balltop + 4 + "px" : balltop - 4 + "px");
    ball.style.left = (x == true ? ballleft + 4 + "px" : ballleft - 4 + "px");
    requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);


