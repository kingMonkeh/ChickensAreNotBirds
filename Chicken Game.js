const player = document.getElementById("player");
var playerTop = 0, playerLeft = 0;
var playerSpeed = 4;
var mouseX, mouseY;

var bullets = [];

class proj{
    constructor(bullet, speed){
        this.bullet = bullet;
        this.bulletTop = playerTop;
        this.bulletLeft = playerLeft;
        this.speed = speed;
        this.rise = (playerTop - mouseY) / Math.sqrt((playerTop - mouseY)**2 + (playerLeft - mouseX)**2);
        this.run = (playerLeft - mouseX) / Math.sqrt((playerTop - mouseY)**2 + (playerLeft - mouseX)**2);
        //console.log(this.rise + " " + this.run);
    }
    update(){
        this.bulletTop -= this.rise * this.speed;
        this.bulletLeft -= this.run * this.speed;
        if (this.bulletTop < 0){
            this.bullet.remove();
        }
        this.bullet.style.top = this.bulletTop + "px";
        this.bullet.style.left = this.bulletLeft + "px";
    }
}


//Handle player movement
var mouseDown = false;
var keysPressed = {}; //Map containing keys pressed

function playerMovement(){
    if (keysPressed["w"]){
        playerTop -= playerSpeed;
        player.style.top = playerTop + "px";
    }
    if (keysPressed["a"]){
        playerLeft -= playerSpeed;
        player.style.left = playerLeft + "px";
    }
    if (keysPressed["s"]){
        playerTop += playerSpeed;
        player.style.top = playerTop + "px";
    }
    if (keysPressed["d"]){
        playerLeft += playerSpeed;
        player.style.left = playerLeft + "px";
    }
}

function shoot(){
    if (mouseDown){
        //Construct HTML element
        const bulletHTML = document.createElement("div");
        bulletHTML.style.width = "10px";
        bulletHTML.style.height = "10px";
        bulletHTML.style.background = "blue";
        bulletHTML.style.position = "absolute";
        bulletHTML.style.top = playerTop + "px";
        bulletHTML.style.left = playerLeft + "px";
        //Construct projectile object
        var bullet = new proj(bulletHTML, 10);
        bullets.push(bullet);
        document.body.appendChild(bullets[bullets.length - 1].bullet);
    }
}

//Update which keys are active
window.addEventListener("keydown", function(e){
    keysPressed[e.key] = true;
});

window.addEventListener("keyup", function(e){
    keysPressed[e.key] = false;
});

//Check for mouse clicks
window.addEventListener("mousedown", function(e){
    mouseDown = true;
});

window.addEventListener("mouseup", function(e){
    mouseDown = false;
});

window.addEventListener("mousemove", function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
    //console.log(playerTop + " " + playerLeft + " " + mouseX + " " + mouseY);
});

//Move the player ~60 fps
setInterval(function(){
    playerMovement();
    shoot();
}, 16);

setInterval(function(){
    for (var i = 0; i < bullets.length; i++){
        bullets[i].update();
    }
    console.log(bullets.length);
}, 100);