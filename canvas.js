const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const backroundImg = document.createElement("img");
backroundImg.src = "photos/backround.jpg";

const ninja = document.createElement("img");
ninja.src = "photos/ninja.png"

const star = document.createElement("img");
star.src = "photos/bullet.png"

const voice = document.createElement("audio");
voice.src = "photos/laser.wav"


let data = {
    hero: {
        xDelta: 0,
        yDelta: 0,
        x: 10,
        y: 320,
        width: 100,
        height: 100
    },

    bullets: []
}

function draw(){
    context.drawImage(backroundImg, 0, 0, canvas.width, canvas.height);
    context.drawImage(ninja, data.hero.x, data.hero.y, data.hero.width, data.hero.height);

    data.bullets.forEach(function(bullet){
        context.drawImage(star, bullet.x, bullet.y, bullet.width, bullet.height)
    })
}




function update(){
    data.hero.x += data.hero.xDelta
    data.hero.y += data.hero.yDelta

    data.bullets.forEach(function(bullet){
        bullet.x += bullet.xDelta
    })


    data.bullets = data.bullets.filter(function(bullet){
        if(bullet.x > canvas.width){
            return false
        }

        return true
    })
}

function loop(){
    requestAnimationFrame(loop);
    update();
    draw()
}

loop()

document.addEventListener("keydown", function(evt){
    if(evt.code === "ArrowRight"){
        data.hero.xDelta = 1;
    }else if(evt.code === "ArrowLeft"){
        data.hero.xDelta = -1;
    }else if(evt.key === " " || evt.key === 32){
        voice.currentTime = 0
        voice.play()
        data.bullets.push(
            {
                xDelta: 5,
                x: data.hero.x + 55,
                y: data.hero.y + 10,
                width: 30,
                height: 30,
            }
        )
    }
});

document.addEventListener("keyup", function(){
    data.hero.xDelta = 0;
});