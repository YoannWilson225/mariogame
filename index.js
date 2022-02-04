// Recupere notre element canvas
const canvas = document.querySelector('canvas');
const gravity = 0.5
canvas.width = innerWidth;
canvas.height = 800;
const imagePlatform = document.querySelector('.imageplatform');
const imageHill = document.querySelector('.imagehill');
const imagePlatformSmallTall = document.querySelector('.imageplatformsmall');
const imagePlatformSmall = document.querySelector('.imageplatformSmall');
const imagePlatformTallName = document.querySelector('.platformtallname');
const imageSpriteStandRight = document.querySelector('.spriteStandRight')
const imageSpriteRunRight = document.querySelector('.spriteRunRight')
const imageSpriteRunLeft = document.querySelector('.spriteRunLeft')
const imageSpriteStandLeft = document.querySelector('.spriteStandLeft')
const jumpSound = new Audio("audio/jumpShort.mp3");
const initSound = new Audio("audio/initSoundShort.mp3");
const marcheSound = new Audio("audio/marcheShort.mp3");
// On lui donne un contexte
let ctx = canvas.getContext('2d');

console.log(ctx);

class Player {
    constructor() {
        this.speed = 10
        this.position = {x: 200, y: 200};
        this.width =  66;
        this.height = 150;
        this.velocity = {x: 0, y: 1};

        this.image = imageSpriteStandRight
        this.frames = 0

        this.sprites = {
            stand: {
                right: imageSpriteStandRight,
                left: imageSpriteStandLeft,
                cropWidht: 177,
                width: 66
            },
            run: {
                right: imageSpriteRunRight,
                left: imageSpriteRunLeft,
                cropWidht: 341,
                width: 127.875
            }
        }
 
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidht = 177

    }

    draw() {
        ctx.drawImage(
            this.currentSprite,
            this.currentCropWidht * this.frames,
            0,
            this.currentCropWidht,
            400,
            this.position.x,
            this.position.y, 
            this.width, 
            this.height
        )
    }


    update() {
        this.frames++ 
        if (this.frames > 59 &&
            (this.currentSprite === this.sprites.stand.right ||
                this.currentSprite === this.sprites.stand.left))
        this.frames = 0
        else if (
            this.frames > 29 &&
            (this.currentSprite === this.sprites.run.right ||
                this.currentSprite === this.sprites.run.left))
        this.frames = 0 
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y +this.height +this.velocity.y <= canvas.height)
        this.velocity.y += gravity 
    }
}

let player = new Player();

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }   
}

addEventListener('keydown', ({ keyCode }) => {
    switch(keyCode) {
        case 37: 
            keys.left.pressed = true
            lastKey = 'left';
            marcheSound.play();
            break;

        // case 40: 
        //     console.log('down')
        //     player.velocity.y += 20
        //     break;

        case 39: 
            keys.right.pressed = true
            lastKey = 'right'
            marcheSound.play();
            break;

        case 38: 
            player.velocity.y -= 20
            jumpSound.play();
            break;
    }
})


addEventListener('keyup', ({ keyCode }) => {
    switch(keyCode) {
        case 37: 
            keys.left.pressed = false
            break;

        // case 40: 
        //     console.log('down')
        //     player.velocity.y += 20
        //     break;

        case 39: 
            keys.right.pressed = false
            break;

        case 38: 
            player.velocity.y = 0
            break;
    }
})


class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 20

        this.image = image,
        this.width = this.image.width
        this.height = this.image.height
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        // ctx.fillStyle = 'blue';
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class PlatformSmallTall {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 20

        this.image = image,
        this.width = this.image.width
        this.height = this.image.height
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        // ctx.fillStyle = 'blue';
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}


class PlatformTallName {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 20

        this.image = image,
        this.width = this.image.width
        this.height = this.image.height
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        // ctx.fillStyle = 'blue';
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}



class PlatformSmall {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 20

        this.image = image,
        this.width = this.image.width
        this.height = this.image.height
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        // ctx.fillStyle = 'blue';
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Hill {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 20

        this.image = image,
        this.width = this.image.width
        this.height = this.image.height
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        // ctx.fillStyle = 'blue';
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// function createImage(imageSrc){
//     const img = new Image();
//     img.src = imageSrc
//     return img
// }

let platformTallNames = [];

let platformSmalls = [];

let lastKey;

let hills = [];

let platforms = [];

let platformSmallTalls = [];


//  const generateObjects = [
//     new GenerateObject({
//         x:0,
//         y:0,
//         image: createImage(background)
//      })
//  ]
let scrollOffset = 0;

function init() {
initSound.play();
player = new Player();

// function createImage(imageSrc){
//     const img = new Image();
//     img.src = imageSrc
//     return img
// }

hills = [
    new Hill({
    x: -1, 
    y: 224,
    image: imageHill
}),
new Hill({
    x: imageHill.width * 1.1, 
    y: 224,
    image: imageHill
})]



platformSmallTalls = [new PlatformSmallTall({
    x: imagePlatformSmallTall.width * 4 + 700 - 2, 
    y: 564,
    image: imagePlatformSmallTall
}),
new PlatformSmallTall({
    x: imagePlatformSmallTall.width * 19 + 1010 - 2, 
    y: 564,
    image: imagePlatformSmallTall
}),
new PlatformSmallTall({
    x: imagePlatformSmallTall.width * 26 + 860 - 2, 
    y: 564,
    image: imagePlatformSmallTall
}),
new PlatformSmallTall({
    x: imagePlatformSmallTall.width * 26 + 860 - 2, 
    y: 390,
    image: imagePlatformSmallTall
}),
new PlatformSmallTall({
    x: imagePlatformSmallTall.width * 27 + 860 - 2, 
    y: 564,
    image: imagePlatformSmallTall
}),
new PlatformSmallTall({
    x: imagePlatformSmallTall.width * 35 + 860 - 2, 
    y: 639,
    image: imagePlatformSmallTall
}),
new PlatformSmallTall({
    x: imagePlatformSmallTall.width * 36 + 860 - 2, 
    y: 639,
    image: imagePlatformSmallTall
}),
new PlatformSmallTall({
    x: imagePlatformSmallTall.width * 37 + 860 - 2, 
    y: 639,
    image: imagePlatformSmallTall
}),
new PlatformSmallTall({
    x: imagePlatformSmallTall.width * 38 + 860 - 2, 
    y: 639,
    image: imagePlatformSmallTall
})
]


platformSmalls = [
    new PlatformSmall({
    x: imagePlatformSmall.width * 65 + 900 - 2, 
    y: 250,
    image: imagePlatformSmall
}),
new PlatformSmall({
    x: imagePlatformSmall.width * 68 + 900 - 2, 
    y: 500,
    image: imagePlatformSmall
}),
new PlatformSmall({
    x: imagePlatformSmall.width * 71 + 900 - 2, 
    y: 739,
    image: imagePlatformSmall
}),
new PlatformSmall({
    x: imagePlatformSmall.width * 71 + 900 - 2, 
    y: 250,
    image: imagePlatformSmall
}),
new PlatformSmall({
    x: imagePlatformSmall.width * 92 + 900 - 2, 
    y: 400,
    image: imagePlatformSmall
}),
new PlatformSmall({
    x: imagePlatformSmall.width * 120 + 900 - 2, 
    y: 739,
    image: imagePlatformSmall
}),
new PlatformSmall({
    x: imagePlatformSmall.width * 124 + 900 - 2, 
    y: 739,
    image: imagePlatformSmall
}),
new PlatformSmall({
    x: imagePlatformSmall.width * 128 + 900 - 2, 
    y: 739,
    image: imagePlatformSmall
}),
new PlatformSmall({
    x: imagePlatformSmall.width * 132 + 900 - 2, 
    y: 739,
    image: imagePlatformSmall
}),
new PlatformSmall({
    x: imagePlatformSmall.width * 136 + 900 - 2, 
    y: 739,
    image: imagePlatformSmall
}),
new PlatformSmall({
    x: imagePlatformSmall.width * 140 + 900 - 2, 
    y: 739,
    image: imagePlatformSmall
}),
new PlatformSmall({
    x: imagePlatformSmall.width * 144 + 900 - 2, 
    y: 739,
    image: imagePlatformSmall
}),
new PlatformSmall({
    x: imagePlatformSmall.width * 148 + 900 - 2, 
    y: 739,
    image: imagePlatformSmall
}),
new PlatformSmall({
    x: imagePlatformSmall.width * 153 + 900 - 2, 
    y: 480,
    image: imagePlatformSmall
})];




platformTallNames = [new PlatformTallName({
    x: imagePlatformTallName.width * 8, 
    y: 1,
    image: imagePlatformTallName
})];



platforms = [new Platform({ 
    x: -1, 
    y:739,
    image:imagePlatform
}),
 new Platform({
    x : imagePlatform.width - 3,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 2 + 160,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 3 + 300,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 4 + 300 - 2,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 5 + 800 - 2,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 6 + 800 - 2,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 7 + 800 - 2,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 8 + 900 - 2,
    y : 449,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 10 + 800 - 2,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 11 + 800 - 2,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 12 + 900 - 2,
    y : 649,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 13 + 900 - 2,
    y : 449,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 15 + 900 - 2,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 20 + 900 - 2,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 21 + 900 - 2,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 22 + 900 - 2,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 25 + 900 - 2,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 41 + 900 - 2,
    y : 739,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 42 + 900 - 2,
    y : 739,
    image:imagePlatform
 })]
//  const generateObjects = [
//     new GenerateObject({
//         x:0,
//         y:0,
//         image: createImage(background)
//      })
//  ]
    
scrollOffset = 0;
}




function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'pink';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // generateObjects.forEach(generateObject => {
    //     generateObject.draw()
    // });

    hills.forEach((hill) => {
        hill.draw();
    })

    platformSmallTalls.forEach((platformSmallTall) => {
        platformSmallTall.draw();
    })

    platformTallNames.forEach((platformTallName)=> {
        platformTallName.draw();
    })

    platformSmalls.forEach((platformSmall) => {
        platformSmall.draw();
    })

    platformSmallTalls.forEach((platformSmallTall) => {
        platformSmallTall.draw();
    })

    platforms.forEach((platform) => {
        platform.draw();
    })

    player.update(); 

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    }else if((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
        player.velocity.x = -player.speed
    }  else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += player.speed

            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            })

            platformTallNames.forEach((platformTallName )=> {
                platformTallName.position.x -= player.speed
            })

            platformSmallTalls.forEach((platformSmallTall) => {
                platformSmallTall.position.x -= player.speed
            })

            platformSmalls.forEach((platformSmall) => {
                platformSmall.position.x -= player.speed
            })


            hills.forEach((hill) => {
                hill.position.x -= player.speed * 0.66;
            })


        }else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed


            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })

            platformTallNames.forEach((platformTallName) => {
                platformTallName.position.x += player.speed
            })

            platformSmallTalls.forEach((platformSmallTall) => {
                platformSmallTall.position.x += player.speed
            })

            platformSmalls.forEach((platformSmall) => {
                platformSmall.position.x += player.speed
            })

            hills.forEach((hill) => {
                hill.position.x += player.speed * 0.66;
            })
        }


    }

    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width ) 
    {
        player.velocity.y = 0
    }
        
    })  
    
    
    platformSmallTalls.forEach((platformSmallTall) => {
        if (player.position.y + player.height <= platformSmallTall.position.y && player.position.y + player.height + player.velocity.y >= platformSmallTall.position.y && player.position.x + player.width >= platformSmallTall.position.x && player.position.x <= platformSmallTall.position.x + platformSmallTall.width ) 
    {
        player.velocity.y = 0
    }
        
    })  

    platformSmalls.forEach((platformSmall) => {
        if (player.position.y + player.height <= platformSmall.position.y && player.position.y + player.height + player.velocity.y >= platformSmall.position.y && player.position.x + player.width >= platformSmall.position.x && player.position.x <= platformSmall.position.x + platformSmall.width ) 
    {
        player.velocity.y = 0
    }
        
    })  
       

    // platformTallNames.forEach((platformTallName) => {
    //     if (player.position.y + player.height <= platformTallName.position.y && player.position.y + player.height + player.velocity.y >= platformTallName.position.y && player.position.x + player.width >= platformTallName.position.x && player.position.x <= platformTallName.position.x + platformTallName.width ) 
    // {
    //     player.velocity.y = 0
    // }
        
    // })  
       
    
    if (
        keys.right.pressed &&
        lastKey === 'right' && 
        player.currentSprite !== player.sprites.run.right
        ) {
        player.frames = 1
        player.currentSprite = player.sprites.run.right
        player.currentCropWidht = player.sprites.run.cropWidht
        player.width = player.sprites.run.width
    } else if(
        keys.left.pressed &&
        lastKey === 'left' && 
        player.currentSprite !== player.sprites.run.left
        ) {              
         player.currentSprite = player.sprites.run.left
            player.currentCropWidht = player.sprites.run.cropWidht
            player.width = player.sprites.run.width
    }else if(
        !keys.left.pressed &&
        lastKey === 'left' && 
        player.currentSprite !== player.sprites.stand.left
        ) {              
         player.currentSprite = player.sprites.stand.left
            player.currentCropWidht = player.sprites.stand.cropWidht
            player.width = player.sprites.stand.width
    }else if(
        !keys.right.pressed &&
        lastKey === 'right' && 
        player.currentSprite !== player.sprites.stand.right
        ) {              
         player.currentSprite = player.sprites.stand.right
            player.currentCropWidht = player.sprites.stand.cropWidht
            player.width = player.sprites.stand.width
    }
    
    if (scrollOffset > imagePlatform.width * 42 + 900 - 2 || scrollOffset == imagePlatform.width * 42 + 900 - 2 ) {
        document.write('YOU WIN');  
    }

    if (player.position.y > canvas.height) {
        init()
    }
}
init();

animate();

// 37 left
// 39 right
// 38 top
// 40 down
// 32 space
