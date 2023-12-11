const canvas_player = document.getElementById("canvas_player");
const ctx_pl = canvas_player.getContext("2d");

let canvas_width = 500;
let canvas_height = 600;

ctx_pl.width = canvas_width;
ctx_pl.height = canvas_height;
canvas_player.width = canvas_width;
canvas_player.height = canvas_height;
canvas_player.style.width = canvas_width + "px";
canvas_player.style.height = canvas_height + "px";

const canvas_objects = document.getElementById("canvas_objects");
const ctx_obj = canvas_objects.getContext("2d");

ctx_obj.width = canvas_width;
ctx_obj.height = canvas_height;
canvas_objects.width = canvas_width;
canvas_objects.height = canvas_height;
canvas_objects.style.width = canvas_width + "px";
canvas_objects.style.height = canvas_height + "px";

const player = {
    x: 0,
    y: canvas_height,
    width: 30,
    height: 30,
    left: false,
    right: false,
    accelerationX: 0,
    accelerationY: 0,
    jumpStrength: 20,
    accelerationXStrength: 5,
    jumpBlock: 0,
    isStopped: false
}

class platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

const platforms = [
    new platform(100, 520, 200, 40),
    new platform(250, 420, 250, 40),
    new platform(400, 320, 100, 40),
    new platform(250, 220, 100, 10),
    new platform(0, 220, 100, 10),
    new platform(0, 120, 10, 10),
    new platform(100, 20, 180, 10),
];

for (const platform of platforms) {
    ctx_obj.fillStyle = "rgb(252, 169, 3)";
    ctx_obj.fillRect(platform.x, platform.y, platform.width, platform.height);
}

function update() {
    ctx_pl.clearRect(0, 0, canvas_width, canvas_height);
    
    ctx_pl.fillStyle = "rgb(140, 26, 255)";
    ctx_pl.fillRect(Math.floor(player.x), Math.floor(player.y), player.width, player.height);
    
    //movement
    if(player.left == 1){player.accelerationX = -player.accelerationXStrength;}
    if(player.right == 1){player.accelerationX = player.accelerationXStrength;}
    if(player.left == 0 || player.right == 0){player.accelerationX *= 0.90;}
    //movement

    //edge barrier
    player.x += Math.round(player.accelerationX);
    if(player.x > ctx_pl.width - player.width){player.x = ctx_pl.width - player.width;}
    if(player.x < 0){player.x = 0;}
    //edge barrier

    //up and down movement
    if(player.isStopped == false){
        player.accelerationY += 1;
        player.y += player.accelerationY;
    } else {
        player.accelerationY = 0;
    }
    //up and down movement


    //platform-block
    let isStoppedTemp = false;
    for (const platform of platforms) {
        if(player.y + player.height >= platform.y && player.y <= platform.y + platform.height && player.x + player.width >= platform.x && player.x <= platform.x + platform.width){
            if(player.accelerationY >= 0){
                isStoppedTemp = true;
                player.y = platform.y - player.height;
            } else {
                player.accelerationY = -player.accelerationY;
                player.y = platform.y + platform.height;
            }            
        }
    }
    if(isStoppedTemp == true){
        player.isStopped = true;
        player.jumpBlock = 0;
    }else{
        player.isStopped = false;
    }
    //platform-block

    //bottom barrier
    if(player.y > ctx_pl.height - player.height){
        player.y = ctx_pl.height - player.height;
        player.isStopped = true;
        player.jumpBlock = 0;
    };
    //bottom barrier
    //up and down movement

    if(player.accelerationY > 15){
        player.accelerationY = 15;
    }
    if(player.accelerationY < -15){
        player.accelerationY = -15;
    }

    requestAnimationFrame(update);
}
requestAnimationFrame(update);

function jump() {
    if(player.jumpBlock == 0){
        
        player.accelerationY = -player.jumpStrength;
        player.jumpBlock = 1;
        player.isStopped = false;
    }
}

//     //movement and edge-block
//     if(player.left == 1){player.accelerationX = -player.accelerationXStrength;}
//     if(player.right == 1){player.accelerationX = player.accelerationXStrength;}
//     if(player.left == 0 || player.right == 0){player.accelerationX *= 0.90;}
//     if(player.x > ctx_pl.width - player.size){
//         player.x = ctx_pl.width - player.size;
//     } else if (player.x < 0){
//         player.x = 0;
//     } else{
//         player.x += Math.round(player.accelerationX);
//     }
//     //movement and edge-block

//     //jump
//     if(player.isStopped == false){
//         player.accelerationY += 1;
//         player.y += player.accelerationY;
//     }
//     //jump

//     //platform-block
//     let isStoppedTemp = false;
//     for (const platform of platforms) {
//         if(player.accelerationY > 0){
//             if(player.y + player.size >= platform.y && player.y <= platform.y + platform.height && player.x + player.size >= platform.x && player.x <= platform.x + platform.width){
//                 console.log("sex");
//                 isStoppedTemp = true;
//                 player.y = platform.y - player.size;
//             }
//             // console.log(player.y + player.size , platform.y)
//         }
//     }
//     if(isStoppedTemp == true){
//         player.isStopped = true;
//     }
//     else{
//         player.isStopped = false;
//     }
//     //platform-block

//    console.log(player.accelerationY, player.isStopped);
    
//     //bottom-block
//     if(player.y > ctx_pl.height - player.size && player.isStopped == false){
//         player.y = ctx_pl.height - player.size;
//         // player.accelerationY = -1;
//         player.jumpBlock = 0;
//         player.isStopped = true;
//     };
//     //bottom-block

//     // console.log(player.isStopped)

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            player.left = true;
            break;
        case 'ArrowRight':
            e.preventDefault();
            player.right = true;
            break;
        case 'ArrowUp':
            jump();
            e.preventDefault();
            break;
        case 'ArrowDown':
            e.preventDefault();
            break;
            
        case 'a':
            e.preventDefault();
            player.left = true;
            break;
        case 'd':
            e.preventDefault();
            player.right = true;
            break;
        case 'w':
            jump();
            e.preventDefault();
            break;
        case 's':
            e.preventDefault();
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            player.left = false;
            break;
        case 'ArrowRight':
            player.right = false;
            break;
        case 'ArrowUp':
            
            break;
        case 'ArrowDown':
            
            break;
            
        case 'a':
            player.left = false;
            break;
        case 'd':
            player.right = false;
            break;
        case 'w':
            
            break;
        case 's':
            
            break;
    }
});