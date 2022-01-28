// Recupere notre element canvas
const canvas = document.querySelector('canvas');
const gravity = 0.5
canvas.width = 1000;
canvas.height = 576;
const imagePlatform = document.querySelector('.imageplatform');
const imageHill = document.querySelector('.imagehill');
// On lui donne un contexte
let ctx = canvas.getContext('2d');

console.log(ctx);

class Player {
    constructor() {
        this.position = {x: 200, y: 200};
        this.width =  30;
        this.height = 30;
        this.velocity = {x: 0, y: 1};
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }


    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y +this.height +this.velocity.y <= canvas.height)
        this.velocity.y += gravity 
        else this.velocity.y = 0
    }
}

const player = new Player();

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }   
}

addEventListener('keydown', ({ keyCode }) => {
    console.log(keyCode)
    switch(keyCode) {
        case 37: 
            console.log('left')
            keys.left.pressed = true
            break;

        // case 40: 
        //     console.log('down')
        //     player.velocity.y += 20
        //     break;

        case 39: 
            console.log('right')
            keys.right.pressed = true

            break;

        case 38: 
            console.log('up');
            player.velocity.y -= 20
            break;
    }
})


addEventListener('keyup', ({ keyCode }) => {
    console.log(keyCode)
    switch(keyCode) {
        case 37: 
            console.log('left')
            keys.left.pressed = false
            break;

        // case 40: 
        //     console.log('down')
        //     player.velocity.y += 20
        //     break;

        case 39: 
            console.log('right')
            keys.right.pressed = false
            break;

        case 38: 
            console.log('up');
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

const hills = [new Hill({
    x: -1, 
    y: 0,
    image: imageHill
})]

const platforms = [new Platform({ 
    x: -1, 
    y:515,
    image:imagePlatform
}),
 new Platform({
    x : imagePlatform.width - 3,
    y : 515,
    image:imagePlatform
 }),
 new Platform({
    x : imagePlatform.width * 2 + 100,
    y : 515,
    image:imagePlatform
 })];


//  const generateObjects = [
//     new GenerateObject({
//         x:0,
//         y:0,
//         image: createImage(background)
//      })
//  ]
     

 let scrollOffset = 0;


function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = '#124552';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // generateObjects.forEach(generateObject => {
    //     generateObject.draw()
    // });
    hills.forEach((hill) => {
        hill.draw();
    })
    platforms.forEach((platform) => {
        platform.draw();
    })

    player.update(); 

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    }else if(keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    }  else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach((platform) => {
                platform.position.x -= 5
            })

            hills.forEach((hill) => {
                hill.position.x -= 3;
            })
        }else if (keys.left.pressed) {
            scrollOffset -= 5


            platforms.forEach((platform) => {
                platform.position.x += 5
            })
            hills.forEach((hill) => {
                hill.position.x += 3;
            })
        }


    }

    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width ) 
    {
        player.velocity.y = 0
    }
        
    })   
    
    if (scrollOffset > 2000) {
        console.log(scrollOffset)
    }
}

animate();

// 37 left
// 39 right
// 38 top
// 40 down
// 32 space

