function setup(){
    let myCanvas = createCanvas(600,600)
    myCanvas.parent("sketchHolder2")
    colorMode(HSB,TWO_PI,1,1)
}

function draw(){
    background(0,0,0)
    strokeWeight(10)
    stroke(0,0.8,0.8)
    noFill()
    for(let i = 0; i<10; i++){
        let diam = 200 + i*20
        let thishue = (TWO_PI/10) * i
        stroke(thishue,0.8,0.8)
        
        push()
        translate(width * 0.5, height * 0.5)
        let angle = millis() * 0.001 * (i*0.1+1)
        
        rotate(sin(angle))
        arc(0, 0, diam,diam,PI*0.75,PI*2.25)
        pop()
    }
}